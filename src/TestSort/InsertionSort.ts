import BarType from "../interface/BarType";

const InsertionSort = (array: BarType[]): BarType[] => {
  const size: number = array.length;
  for (let i = 0; i < size - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (array[j].value < array[j - 1].value) {
        const tmp = array[j];
        array[j] = array[j - 1];
        array[j - 1] = tmp;
      } else {
        break;
      }
    }
  }
  return array;
};

export default InsertionSort;
