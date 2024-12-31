import BarType from "../interface/BarType";
import SortAnimation, {
  AnimationConstructor,
} from "../interface/SortAnimation";

const BubbleSortAnimation = (array: BarType[]): SortAnimation[] => {
  const animations: SortAnimation[] = [];

  const size: number = array.length;
  for (let i = 0; i < size - 1; i++) {
    let swapped: boolean = false;
    for (let j = 0; j < size - 1 - i; j++) {
      if (array[j].value > array[j + 1].value) {
        animations.push(AnimationConstructor(j, j + 1, true));
        swapped = true;
        const tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      } else {
        animations.push(AnimationConstructor(j, j + 1, false));
      }
    }
    if (!swapped) break;
  }
  return animations;
};

export default BubbleSortAnimation;
