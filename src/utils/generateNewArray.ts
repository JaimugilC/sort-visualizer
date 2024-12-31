import {
  BARCOLOR_PRESORT,
  MAXIMUM_BAR_VALUE,
  MINIMUM_BAR_VALUE,
} from "../constants/UIConstants";
import BarType, { BarTypeConstructor } from "../interface/BarType";

const generateNewArray = (size: number): BarType[] => {
  const resultArray: BarType[] = [];

  for (let i = 0; i < size; i++) {
    // Generate a random number between min and max (inclusive)

    const randomNumber =
      Math.floor(Math.random() * (MAXIMUM_BAR_VALUE - MINIMUM_BAR_VALUE + 1)) +
      MINIMUM_BAR_VALUE;

    resultArray.push(BarTypeConstructor(i, randomNumber, BARCOLOR_PRESORT));
  }

  return resultArray;
};

export default generateNewArray;
