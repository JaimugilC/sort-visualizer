import BarType from "../interface/BarType";

const QuickSort = (array: BarType[]): BarType[] => {
  const Partition = (left: number, right: number): number => {
    const pivot = array[left].value;

    let i = left;
    let j = right + 1;

    while (i < j) {
      while (array[++i].value <= pivot) {
        if (i == right) break;
      }
      while (array[--j].value > pivot) {
        if (j == left) break;
      }

      if (i >= j) break;

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    const temp = array[left];
    array[left] = array[j];
    array[j] = temp;

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

  return array;
};

export default QuickSort;
