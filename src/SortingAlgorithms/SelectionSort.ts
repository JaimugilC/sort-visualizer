import BarType from "../interface/BarType";
import SortAnimation, {
  AnimationConstructor,
} from "../interface/SortAnimation";

const SelectionSortAnimation = (array: BarType[]): SortAnimation[] => {
  const animations: SortAnimation[] = [];

  const size: number = array.length;
  for (let i = 0; i < size; i++) {
    let minimumElement: number = array[i].value;
    let minimumIndex: number = i;
    for (let j = i; j < size; j++) {
      if (minimumElement > array[j].value) {
        minimumElement = array[j].value;
        minimumIndex = j;
      }
    }
    animations.push(AnimationConstructor(i, minimumIndex, true));
    const tmp = array[i];
    array[i] = array[minimumIndex];
    array[minimumIndex] = tmp;
    animations.push(AnimationConstructor(i, minimumIndex, false));
  }
  return animations;
};

export default SelectionSortAnimation;
