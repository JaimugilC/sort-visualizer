import BarType from "../interface/BarType";

const SelectionSort = (array: BarType[]): BarType[] => {
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
    const tmp = array[i];
    array[i] = array[minimumIndex];
    array[minimumIndex] = tmp;
  }
  return array;
};

export default SelectionSort;
