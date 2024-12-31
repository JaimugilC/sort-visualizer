import generateNewArray from "../utils/generateNewArray";
import HeapSort from "./HeapSort";

const sortValidation = () => {
  for (let i = 0; i < 1000; i++) {
    const actualArr = generateNewArray(1000);
    const tmpArr = [...actualArr];
    actualArr.sort((a, b) => a.value - b.value);
    HeapSort(tmpArr);
    // console.log(tmpArr.map((a) => a.value).join(","));
    // console.log(actualArr.map((a) => a.value).join(","));
    if (
      tmpArr.map((a) => a.value).join(",") ===
      actualArr.map((a) => a.value).join(",")
    ) {
      console.log("Test: ", true);
    } else console.log("Test: ", false);
  }
};

export default sortValidation;
