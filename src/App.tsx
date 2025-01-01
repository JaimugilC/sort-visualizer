import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Slider,
  ThemeProvider,
  Toolbar,
  Tooltip,
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
import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const App: React.FC = (props: Props) => {
  const [barArray, setBarArray] = useState<BarType[]>([]);
  const [arraySize, setArraySize] = useState<number>(MAXIMUM_ARRAY_SIZE / 2);
  const [sortingSpeed, setSortingSpeed] = useState<number>(3);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<string>("MergeSort");
  const [animationRunning, setAnimationRunning] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);

  useEffect(() => {
    refreshToInitialState(arraySize);
  }, [arraySize]);

  useEffect(() => {
    console.log("cancel effect", cancelled);
  }, [cancelled]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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

  const updateAnimationRunningState = () => {
    setAnimationRunning((state) => !state);
  };

  const updateCancellationState = () => {
    console.log("Updated");
    setCancelled((state) => !state);
  };

  const getCancellationState = () => {
    console.log("called cancelled state", cancelled);
    return cancelled;
  };

  const calculateSpeed = () => {
    const speedInMs =
      BASE_SORTING_SPEED +
      Math.pow(5, MAXIMUM_SORTING_SPEED - sortingSpeed + 1) -
      5;
    return speedInMs;
  };

  const selectSortingAlgorithm = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    sortingAlgo: string
  ) => {
    setSortingAlgorithm(sortingAlgo);
  };

  const AlgorithmDescription: { [key: string]: string } = {
    SelectionSort: "Selection Sort: O(n^2)",
    BubbleSort: "Bubble Sort: O(n^2)",
    InsertionSort: "Insertion Sort: O(n^2)",
    MergeSort: "Merge Sort: O(nLogn)",
    QuickSort: "Quick Sort: O(nLogn)",
    HeapSort: "Heap Sort: O(nLogn)",
  };

  const Algorithms: { [key: string]: (array: BarType[]) => SortAnimation[] } = {
    SelectionSort: SelectionSortAnimation,
    BubbleSort: BubbleSortAnimation,
    InsertionSort: InsertionSortAnimation,
    MergeSort: MergeSortAnimation,
    QuickSort: QuickSortAnimation,
    HeapSort: HeapSortAnimation,
  };

  const startSortingAnimation = () => {
    const tmpArr = [...barArray];
    const sortAnimation: SortAnimation[] = Algorithms[sortingAlgorithm](tmpArr);
    const speedInMs = calculateSpeed();
    if (sortingAlgorithm !== "MergeSort")
      PlaySortAnimation(
        sortAnimation,
        [...barArray],
        speedInMs,
        updateBarArray,
        updateAnimationRunningState,
        updateCancellationState,
        getCancellationState
      );
    else
      PlayMergeSortAnimation(
        sortAnimation,
        [...barArray],
        speedInMs,
        updateBarArray,
        updateAnimationRunningState,
        updateCancellationState,
        getCancellationState
      );
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sorting Visualizer
      </Typography>
      <Divider />
      <List>
        <ListItem sx={{ paddingLeft: 1 }} disablePadding>
          Size
        </ListItem>
        <ListItem>
          <Slider
            value={arraySize}
            min={MINIMUM_ARRAY_SIZE}
            max={MAXIMUM_ARRAY_SIZE}
            valueLabelDisplay="auto"
            onChange={handleSizeChange}
            color="info"
            disabled={animationRunning}
          />
        </ListItem>
        <ListItem sx={{ paddingLeft: 1 }} disablePadding>
          Speed
        </ListItem>
        <ListItem>
          <Slider
            value={sortingSpeed}
            min={MINIMUM_SORTING_SPEED}
            max={MAXIMUM_SORTING_SPEED}
            valueLabelDisplay="auto"
            onChange={handleSpeedChange}
            color="info"
            disabled={animationRunning}
          />
        </ListItem>
      </List>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sorting Algorithm
      </Typography>
      <Divider />
      <List>
        {Object.keys(Algorithms).map((k) => {
          return (
            <ListItem key={k} disablePadding>
              <ListItemButton
                onClick={(e) => selectSortingAlgorithm(e, k)}
                sx={{ textAlign: "center" }}
                defaultValue={k}
                disabled={animationRunning}
              >
                <ListItemText primary={k} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar component="nav" color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
            >
              Sorting Visualizer
            </Typography>

            <Box sx={{ display: "flex" }}>
              {animationRunning && !cancelled ? (
                <Tooltip title="Cancel">
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={updateCancellationState}
                    sx={{ mr: 2 }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )}
              <Tooltip title="New Array">
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={createNewArray}
                  sx={{ mr: 2 }}
                  disabled={animationRunning}
                >
                  <ShuffleOnIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Play">
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={startSortingAnimation}
                  sx={{ mr: 2 }}
                  disabled={animationRunning}
                >
                  <PlayCircleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: "block",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main">
          <Toolbar />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "block", padding: 1 }}
          >
            {AlgorithmDescription[sortingAlgorithm]}
          </Typography>
          <SortingVisualizer
            barArray={barArray}
            sortingSpeed={sortingSpeed}
          ></SortingVisualizer>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default App;
