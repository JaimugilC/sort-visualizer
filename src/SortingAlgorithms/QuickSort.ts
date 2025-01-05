import BarType from "../interface/BarType";
import SortAnimation, {
  AnimationConstructor,
} from "../interface/SortAnimation";

const QuickSortAnimation = (array: BarType[]): SortAnimation[] => {
  const animations: SortAnimation[] = [];

  const Partition = (left: number, right: number): number => {
    const pivot = array[left].value;
    animations.push(AnimationConstructor(left, 0, false, true));

    let i = left;
    let j = right + 1;

    while (i < j) {
      while (array[++i].value <= pivot) {
        if (i == right) break;
        // if (i >= left && j <= right)
        // animations.push(AnimationConstructor(i, j, false));
      }
      while (array[--j].value > pivot) {
        if (j == left) break;
        // if (i >= left && j <= right)
        // animations.push(AnimationConstructor(i, j, false));
      }

      if (i >= j) break;

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      animations.push(AnimationConstructor(i, j, true));
    }
    const temp = array[left];
    array[left] = array[j];
    array[j] = temp;
    animations.push(AnimationConstructor(left, j, true));

    return j;
  };

  const QuickSortHelper = (left: number, right: number): void => {
    if (left < right) {
      const partition = Partition(left, right);

      QuickSortHelper(left, partition - 1);
      QuickSortHelper(partition + 1, right);
    }
  };

  QuickSortHelper(0, array.length - 1);

  return animations;
};

export default QuickSortAnimation;
