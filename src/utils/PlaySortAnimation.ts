import {
  BARCOLOR_BAD,
  BARCOLOR_GOOD,
  BARCOLOR_PIVOT,
  BARCOLOR_PRESORT,
  FINAL_FLICKER_SPEED,
} from "../constants/UIConstants";
import BarType from "../interface/BarType";
import SortAnimation from "../interface/SortAnimation";

const PlaySortAnimation = async (
  animations: SortAnimation[],
  array: BarType[],
  sortingSpeed: number,
  updateBarArray: (array: BarType[]) => void
) => {
  for (let i = 0; i < animations.length; i++) {
    if (animations[i].swap) {
      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_BAD;
          array[animations[i].j].color = BARCOLOR_BAD;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          const tmp = array[animations[i].i];
          array[animations[i].i] = array[animations[i].j];
          array[animations[i].j] = tmp;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_GOOD;
          array[animations[i].j].color = BARCOLOR_GOOD;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_PRESORT;
          array[animations[i].j].color = BARCOLOR_PRESORT;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
    } else if (animations[i].pivot) {
      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_PIVOT;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
    } else {
      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_GOOD;
          array[animations[i].j].color = BARCOLOR_GOOD;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_PRESORT;
          array[animations[i].j].color = BARCOLOR_PRESORT;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
    }
  }

  //final flicker animation
  for (let j = 0; j < 3; j++) {
    await new Promise((resolve) =>
      setTimeout(() => {
        for (let i = 0; i < array.length; i++) {
          array[i].color = j % 2 == 0 ? BARCOLOR_GOOD : BARCOLOR_PRESORT;
        }
        updateBarArray([...array]);
        resolve("");
      }, FINAL_FLICKER_SPEED)
    );
  }
};

export default PlaySortAnimation;
