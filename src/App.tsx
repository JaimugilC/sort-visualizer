import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import SortingVisualizer from "./Components/SortingVisualizer";
import { useEffect, useState } from "react";
import {
  BASE_SORTING_SPEED,
  MAXIMUM_ARRAY_SIZE,
  MAXIMUM_SORTING_SPEED,
  MINIMUM_ARRAY_SIZE,
  MINIMUM_SORTING_SPEED,
} from "./constants/UIConstants";
import BarType from "./interface/BarType";
import generateNewArray from "./utils/generateNewArray";
import SortAnimation from "./interface/SortAnimation";
import BubbleSortAnimation from "./SortingAlgorithms/BubbleSort";
import PlaySortAnimation from "./utils/PlaySortAnimation";
import SelectionSortAnimation from "./SortingAlgorithms/SelectionSort";
import InsertionSortAnimation from "./SortingAlgorithms/InsertionSort";
import MergeSortAnimation from "./SortingAlgorithms/MergeSort";
import PlayMergeSortAnimation from "./utils/PlayMergeSortAnimation";
import QuickSortAnimation from "./SortingAlgorithms/QuickSort";
import HeapSortAnimation from "./SortingAlgorithms/HeapSort";

const App: React.FC = () => {
  const [barArray, setBarArray] = useState<BarType[]>([]);
  const [arraySize, setArraySize] = useState<number>(MAXIMUM_ARRAY_SIZE / 2);
  const [sortingSpeed, setSortingSpeed] = useState<number>(3);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<string>("MergeSort");
  const [animationRunning, setAnimationRunning] = useState<boolean>(false);

  useEffect(() => {
    refreshToInitialState(arraySize);
  }, [arraySize]);

  const refreshToInitialState = (arraySize: number) => {
    setBarArray(generateNewArray(arraySize));
  };

  const createNewArray = () => {
    refreshToInitialState(arraySize);
  };

  const handleSizeChange = (_event: Event, value: number | number[]) => {
    setArraySize(Array.isArray(value) ? value[0] : value);
  };

  const handleSpeedChange = (_event: Event, value: number | number[]) => {
    setSortingSpeed(Array.isArray(value) ? value[0] : value);
  };

  const updateBarArray = (barArray: BarType[]) => {
    setBarArray(barArray);
  };

  const calculateSpeed = () => {
    const speedInMs =
      BASE_SORTING_SPEED +
      Math.pow(5, MAXIMUM_SORTING_SPEED - sortingSpeed + 1) -
      5;
    return speedInMs;
  };

  const bubbleSort = () => {
    const tmpArr = [...barArray];
    const sortAnimation: SortAnimation[] = BubbleSortAnimation(tmpArr);
    const speedInMs = calculateSpeed();
    PlaySortAnimation(sortAnimation, [...barArray], speedInMs, updateBarArray);
  };

  const selectionSort = () => {
    const tmpArr = [...barArray];
    const sortAnimation: SortAnimation[] = SelectionSortAnimation(tmpArr);
    const speedInMs = calculateSpeed();
    PlaySortAnimation(sortAnimation, [...barArray], speedInMs, updateBarArray);
  };

  const insertionSort = () => {
    const tmpArr = [...barArray];
    const sortAnimation: SortAnimation[] = InsertionSortAnimation(tmpArr);
    const speedInMs = calculateSpeed();
    PlaySortAnimation(sortAnimation, [...barArray], speedInMs, updateBarArray);
  };

  const mergeSort = () => {
    const tmpArr = [...barArray];
    const sortAnimation: SortAnimation[] = MergeSortAnimation(tmpArr);
    const speedInMs = calculateSpeed();
    PlayMergeSortAnimation(
      sortAnimation,
      [...barArray],
      speedInMs,
      updateBarArray
    );
  };

  const quickSort = () => {
    const tmpArr = [...barArray];
    const sortAnimation: SortAnimation[] = QuickSortAnimation(tmpArr);
    const speedInMs = calculateSpeed();
    PlaySortAnimation(sortAnimation, [...barArray], speedInMs, updateBarArray);
  };

  const heapSort = () => {
    const tmpArr = [...barArray];
    const sortAnimation: SortAnimation[] = HeapSortAnimation(tmpArr);
    const speedInMs = calculateSpeed();
    PlaySortAnimation(sortAnimation, [...barArray], speedInMs, updateBarArray);
  };

  const selectSortingAlgorithm = (event: SelectChangeEvent<string>) => {
    if (event.target.value) {
      setSortingAlgorithm(event.target.value);
    }
  };

  const startSortingAnimation = () => {
    const Algorithms: { [key: string]: () => void } = {
      SelectionSort: selectionSort,
      BubbleSort: bubbleSort,
      InsertionSort: insertionSort,
      MergeSort: mergeSort,
      QuickSort: quickSort,
      HeapSort: heapSort,
    };
    setAnimationRunning(true);
    Algorithms[sortingAlgorithm]();
    setAnimationRunning(false);
  };

  // const sortValidation = () => {
  //   for (let i = 0; i < 1000; i++) {
  //     const actualArr = generateNewArray(1000);
  //     const tmpArr = [...actualArr];
  //     actualArr.sort((a, b) => a.value - b.value);
  //     HeapSort(tmpArr);
  //     // console.log(tmpArr.map((a) => a.value).join(","));
  //     // console.log(actualArr.map((a) => a.value).join(","));
  //     if (
  //       tmpArr.map((a) => a.value).join(",") ===
  //       actualArr.map((a) => a.value).join(",")
  //     ) {
  //       console.log("Test: ", true);
  //     } else console.log("Test: ", false);
  //   }
  // };

  return (
    <>
      <CssBaseline>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sorting Visualizer
              </Typography>
              <Button variant="contained" onClick={createNewArray}>
                New Array
              </Button>
              <InputLabel id="demo-simple-select-label">
                Sorting Algorithm
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortingAlgorithm}
                label="Sorting Algorithms"
                onChange={selectSortingAlgorithm}
              >
                <MenuItem value={"BubbleSort"}>BubbleSort</MenuItem>
                <MenuItem value={"SelectionSort"}>SelectionSort</MenuItem>
                <MenuItem value={"InsertionSort"}>InsertionSort</MenuItem>
                <MenuItem value={"MergeSort"}>MergeSort</MenuItem>
                <MenuItem value={"QuickSort"}>QuickSort</MenuItem>
                <MenuItem value={"HeapSort"}>HeapSort</MenuItem>
              </Select>
              <Button variant="contained" onClick={startSortingAnimation}>
                Sort
              </Button>
              {/* <Button variant="contained" onClick={sortValidation}>
                Test Sort
              </Button> */}
              size
              <Slider
                value={arraySize}
                min={MINIMUM_ARRAY_SIZE}
                max={MAXIMUM_ARRAY_SIZE}
                valueLabelDisplay="auto"
                onChange={handleSizeChange}
              />
              speed
              <Slider
                value={sortingSpeed}
                min={MINIMUM_SORTING_SPEED}
                max={MAXIMUM_SORTING_SPEED}
                valueLabelDisplay="auto"
                onChange={handleSpeedChange}
              />
            </Toolbar>
          </AppBar>
        </Box>
        <SortingVisualizer
          barArray={barArray}
          sortingSpeed={sortingSpeed}
        ></SortingVisualizer>
      </CssBaseline>
    </>
  );
};

export default App;
