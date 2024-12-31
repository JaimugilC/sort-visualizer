import BarType from "../interface/BarType";
import SortAnimation, {
  AnimationConstructor,
} from "../interface/SortAnimation";

const InsertionSortAnimation = (array: BarType[]): SortAnimation[] => {
  const animations: SortAnimation[] = [];

  const size: number = array.length;
  for (let i = 0; i < size - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (array[j].value < array[j - 1].value) {
        animations.push(AnimationConstructor(j, j - 1, true));

        const tmp = array[j];
        array[j] = array[j - 1];
        array[j - 1] = tmp;
      } else {
        animations.push(AnimationConstructor(j, j - 1, false));
        break;
      }
    }
  }
  return animations;
};

export default InsertionSortAnimation;
