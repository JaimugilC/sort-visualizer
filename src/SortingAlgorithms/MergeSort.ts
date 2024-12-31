import BarType from "../interface/BarType";
import SortAnimation, {
  AnimationConstructor,
} from "../interface/SortAnimation";

const MergeSortAnimation = (array: BarType[]): SortAnimation[] => {
  const animations: SortAnimation[] = [];

  const mergeInPlace = (left: number, right: number, mid: number): void => {
    let start = left;
    let end = mid + 1;

    while (start <= mid && end <= right) {
      if (array[start].value <= array[end].value) {
        animations.push(AnimationConstructor(start, end, false));
        start++;
      } else {
        animations.push(AnimationConstructor(start, end, true));
        const temp = array[end];
        let shiftIndex = end;

        while (shiftIndex > start) {
          array[shiftIndex] = array[shiftIndex - 1];
          shiftIndex--;
        }

        array[start] = temp;
        start++;
        mid++;
        end++;
      }
    }
  };

  const mergeSortHelper = (left: number, right: number): void => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);

      mergeInPlace(left, right, mid);
    }
  };

  mergeSortHelper(0, array.length - 1);

  return animations;
};

export default MergeSortAnimation;
