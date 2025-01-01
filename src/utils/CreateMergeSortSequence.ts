import {
  BARCOLOR_BAD,
  BARCOLOR_GOOD,
  BARCOLOR_PRESORT,
} from "../constants/UIConstants";
import BarType from "../interface/BarType";
import SortAnimation from "../interface/SortAnimation";

const CreateMergeSortSequence = async (
  animations: SortAnimation[],
  array: BarType[],
  updateSortSequence: (array: BarType[][]) => void
) => {
  const sortSequence: BarType[][] = [];

  for (let i = 0; i < animations.length; i++) {
    if (animations[i].swap) {
      array[animations[i].i].color = BARCOLOR_BAD;
      array[animations[i].j].color = BARCOLOR_BAD;
      sortSequence.push(structuredClone(array));

      const temp = array[animations[i].j];
      let shiftIndex = animations[i].j;

      while (shiftIndex > animations[i].i) {
        array[shiftIndex] = array[shiftIndex - 1];
        shiftIndex--;
      }

      array[animations[i].i] = temp;
      sortSequence.push(structuredClone(array));

      array[animations[i].i].color = BARCOLOR_GOOD;
      array[animations[i].i + 1].color = BARCOLOR_GOOD;
      sortSequence.push(structuredClone(array));

      array[animations[i].i].color = BARCOLOR_PRESORT;
      array[animations[i].i + 1].color = BARCOLOR_PRESORT;
      sortSequence.push(structuredClone(array));
    } else {
      array[animations[i].i].color = BARCOLOR_GOOD;
      array[animations[i].j].color = BARCOLOR_GOOD;
      sortSequence.push(structuredClone(array));

      array[animations[i].i].color = BARCOLOR_PRESORT;
      array[animations[i].j].color = BARCOLOR_PRESORT;
      sortSequence.push(structuredClone(array));
    }
  }

  updateSortSequence(sortSequence);
};

export default CreateMergeSortSequence;
