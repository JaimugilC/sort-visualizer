import {
  BARCOLOR_BAD,
  BARCOLOR_GOOD,
  BARCOLOR_PIVOT,
  BARCOLOR_PRESORT,
  // FINAL_FLICKER_SPEED,
} from "../constants/UIConstants";
import BarType from "../interface/BarType";
import SortAnimation from "../interface/SortAnimation";

const CreateSortSequence = (
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

      const tmp = array[animations[i].i];
      array[animations[i].i] = array[animations[i].j];
      array[animations[i].j] = tmp;
      sortSequence.push(structuredClone(array));

      array[animations[i].i].color = BARCOLOR_GOOD;
      array[animations[i].j].color = BARCOLOR_GOOD;
      sortSequence.push(structuredClone(array));

      array[animations[i].i].color = BARCOLOR_PRESORT;
      array[animations[i].j].color = BARCOLOR_PRESORT;
      sortSequence.push(structuredClone(array));
    } else if (animations[i].pivot) {
      array[animations[i].i].color = BARCOLOR_PIVOT;
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

export default CreateSortSequence;
