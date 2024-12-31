import BarType from "../interface/BarType";

const BubbleSort = (array: BarType[]): BarType[] => {
  const size: number = array.length;
  for (let i = 0; i < size - 1; i++) {
    let swapped: boolean = false;
    for (let j = 0; j < size - 1 - i; j++) {
      if (array[j].value > array[j + 1].value) {
        swapped = true;
        const tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
    if (!swapped) break;
  }
  return array;
};

export default BubbleSort;
