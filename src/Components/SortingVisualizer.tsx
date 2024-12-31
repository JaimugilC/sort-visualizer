import { Box } from "@mui/material";
import SorterView from "./SorterView";
import BarType from "../interface/BarType";

interface SortingVisualizerProps {
  barArray: BarType[];
  sortingSpeed: number;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  barArray,
  sortingSpeed,
}) => {
  return (
    <Box component="section">
      <SorterView array={barArray} sortingSpeed={sortingSpeed}></SorterView>
    </Box>
  );
};

export default SortingVisualizer;
