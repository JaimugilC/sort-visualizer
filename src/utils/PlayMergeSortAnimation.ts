import {
  BARCOLOR_BAD,
  BARCOLOR_GOOD,
  BARCOLOR_PRESORT,
  FINAL_FLICKER_SPEED,
} from "../constants/UIConstants";
import BarType from "../interface/BarType";
import SortAnimation from "../interface/SortAnimation";

const PlayMergeSortAnimation = async (
  animations: SortAnimation[],
  array: BarType[],
  sortingSpeed: number,
  updateBarArray: (array: BarType[]) => void,
  updateAnimationRunningState: () => void,
  updateCancellationState: () => void,
  getCancellationState: () => boolean
) => {
  updateAnimationRunningState();
  for (let i = 0; i < animations.length; i++) {
    console.log("inside animation", getCancellationState());
    if (getCancellationState() === true) {
      console.log("Entered Cancellation");
      break;
    }
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
          const temp = array[animations[i].j];
          let shiftIndex = animations[i].j;

          while (shiftIndex > animations[i].i) {
            array[shiftIndex] = array[shiftIndex - 1];
            shiftIndex--;
          }

          array[animations[i].i] = temp;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );

      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_GOOD;
          array[animations[i].i + 1].color = BARCOLOR_GOOD;
          updateBarArray([...array]);
          resolve("");
        }, sortingSpeed)
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          array[animations[i].i].color = BARCOLOR_PRESORT;
          array[animations[i].i + 1].color = BARCOLOR_PRESORT;
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
  if (getCancellationState() === false) {
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
  } else {
    await new Promise((resolve) =>
      setTimeout(() => {
        for (let i = 0; i < array.length; i++) {
          array[i].color = BARCOLOR_PRESORT;
        }
        updateBarArray([...array]);
        resolve("");
      }, FINAL_FLICKER_SPEED)
    );
  }
  updateCancellationState();
  updateAnimationRunningState();
};

export default PlayMergeSortAnimation;
