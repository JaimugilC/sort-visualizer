import BarType from "../interface/BarType";
import SortAnimation, {
  AnimationConstructor,
} from "../interface/SortAnimation";

const HeapSortAnimation = (array: BarType[]): SortAnimation[] => {
  const animations: SortAnimation[] = [];

  const swap = (left: number, right: number): void => {
    const temp = array[left];
    array[left] = array[right];
    array[right] = temp;
    animations.push(AnimationConstructor(left, right, true));
  };

  const Heapify = (heapSize: number, i: number) => {
    let largest = i;
    const left = i * 2 + 1;
    const right = i * 2 + 2;

    if (left < heapSize && array[left].value > array[largest].value) {
      largest = left;
    }

    if (right < heapSize && array[right].value > array[largest].value) {
      largest = right;
    }

    if (largest !== i) {
      swap(i, largest);
      Heapify(heapSize, largest);
    }
    if (left < heapSize && right < heapSize)
      animations.push(AnimationConstructor(left, right, false));
  };

  const buildMaxHeap = (heapSize: number): void => {
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      Heapify(heapSize, i);
    }
  };

  const n = array.length;

  buildMaxHeap(n);

  for (let i = n - 1; i > 0; i--) {
    swap(0, i);
    Heapify(i, 0);
  }

  return animations;
};

export default HeapSortAnimation;
