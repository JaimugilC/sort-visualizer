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
  BARCOLOR_GOOD,
  BARCOLOR_PRESORT,
  BASE_SORTING_SPEED,
  FINAL_FLICKER_SPEED,
  MAXIMUM_ARRAY_SIZE,
  MAXIMUM_SORTING_SPEED,
  MINIMUM_ARRAY_SIZE,
  MINIMUM_SORTING_SPEED,
} from "./constants/UIConstants";
import BarType from "./interface/BarType";
import generateNewArray from "./utils/generateNewArray";
import SortAnimation from "./interface/SortAnimation";
import BubbleSortAnimation from "./SortingAlgorithms/BubbleSort";
import SelectionSortAnimation from "./SortingAlgorithms/SelectionSort";
import InsertionSortAnimation from "./SortingAlgorithms/InsertionSort";
import MergeSortAnimation from "./SortingAlgorithms/MergeSort";
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
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import CancelIcon from "@mui/icons-material/Cancel";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CreateSortSequence from "./utils/CreateSortSequence";
import CreateMergeSortSequence from "./utils/CreateMergeSortSequence";

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
  const [paused, setPaused] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);
  const [sortingSequence, setSortingSequence] = useState<BarType[][]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    refreshToInitialState(arraySize);
    //eslint-disable-next-line
  }, [arraySize]);

  useEffect(() => {
    if (cancelled) {
      if (animationRunning) updateAnimationRunningState();
      updateSortSequence([]);
      setIndex(-1);
      const tmpArr = structuredClone(barArray);
      for (let i = 0; i < tmpArr.length; i++) {
        tmpArr[i].color = BARCOLOR_PRESORT;
      }
      setTimeout(() => updateBarArray(tmpArr), calculateSpeed());
      if (paused) {
        updatePauseState();
      }
      updateCancelledState();
    }
    //eslint-disable-next-line
  }, [cancelled]);

  useEffect(() => {
    if (!paused && !cancelled) {
      if (sortingSequence.length > 0 && index < sortingSequence.length) {
        setTimeout(() => {
          updateBarArray(sortingSequence[index]);
          setIndex((i) => i + 1);
        }, calculateSpeed());
      } else if (
        sortingSequence.length > 0 &&
        index >= sortingSequence.length
      ) {
        updateAnimationRunningState();
        updateSortSequence([]);
        setIndex(-1);

        // final flicker animation
        (async () => {
          for (let j = 0; j < 3; j++) {
            await new Promise((resolve) => {
              const tmpArr = barArray;
              setTimeout(() => {
                for (let i = 0; i < tmpArr.length; i++) {
                  tmpArr[i].color =
                    j % 2 == 0 ? BARCOLOR_GOOD : BARCOLOR_PRESORT;
                }
                updateBarArray([...tmpArr]);
                resolve("");
              }, FINAL_FLICKER_SPEED);
            });
          }
        })();
      } else if (sortingSequence.length == 0) {
        if (animationRunning) updateAnimationRunningState();
        updateSortSequence([]);
        setIndex(-1);
      }
    }
    //eslint-disable-next-line
  }, [index]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const refreshToInitialState = (arraySize: number) => {
    if (animationRunning) updateAnimationRunningState();
    if (paused) updatePauseState();
    if (cancelled) updateCancelledState();
    updateSortSequence([]);
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

  const updateCancelledState = () => {
    setCancelled((state) => !state);
  };

  const updatePauseState = () => {
    setPaused((state) => !state);
  };

  const updateSortSequence = (array: BarType[][]) => {
    setSortingSequence(array);
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
    if (paused) {
      updatePauseState();
    }
    if (sortingSequence.length == 0) {
      updateAnimationRunningState();
      const tmpArr = [...barArray];
      const sortAnimation: SortAnimation[] =
        Algorithms[sortingAlgorithm](tmpArr);
      if (sortingAlgorithm !== "MergeSort")
        CreateSortSequence(sortAnimation, [...barArray], updateSortSequence);
      else
        CreateMergeSortSequence(
          sortAnimation,
          [...barArray],
          updateSortSequence
        );
    }
    setIndex((i) => i + 1);
  };

  const stepBackward = () => {
    if (index > 0) {
      updateBarArray(sortingSequence[index - 1]);
      setIndex((i) => i - 1);
    }
  };
  const stepForward = () => {
    if (index < sortingSequence.length) {
      updateBarArray(sortingSequence[index + 1]);
      setIndex((i) => i + 1);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sort Visualizer
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
            sx={{ width: "95%" }}
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
            sx={{ width: "95%" }}
            // disabled={animationRunning}
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
              Sort Visualizer
            </Typography>

            <Box sx={{ display: "flex" }}>
              {paused ? (
                <Tooltip title="Step Backward">
                  <span>
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={stepBackward}
                      sx={{ ml: 1, mr: 1 }}
                      disabled={index == 0}
                    >
                      <SkipPreviousIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              ) : (
                <>
                  {animationRunning && !cancelled ? (
                    <Tooltip title="Cancel">
                      <span>
                        <IconButton
                          color="inherit"
                          edge="start"
                          onClick={updateCancelledState}
                          sx={{ ml: 1, mr: 1 }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {!animationRunning || paused ? (
                <Tooltip title={paused ? "Resume" : "Play"}>
                  <span>
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={startSortingAnimation}
                      sx={{ ml: 1, mr: 1 }}

                      // disabled={animationRunning}
                    >
                      <PlayCircleIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title="Pause">
                  <span>
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={updatePauseState}
                      sx={{ ml: 1, mr: 1 }}

                      // disabled={animationRunning}
                    >
                      <PauseCircleFilledIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
              {paused ? (
                <Tooltip title="Step Forward">
                  <span>
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={stepForward}
                      sx={{ ml: 1, mr: 1 }}
                      disabled={index == sortingSequence.length - 1}
                    >
                      <SkipNextIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title="New Array">
                  <span>
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={createNewArray}
                      sx={{ ml: 1, mr: 1 }}
                      disabled={animationRunning}
                    >
                      <ShuffleIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
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
