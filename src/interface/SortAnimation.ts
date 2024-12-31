interface SortAnimation {
  i: number;
  j: number;
  swap: boolean;
  pivot?: boolean;
}

export const AnimationConstructor = (
  i: number,
  j: number,
  swap: boolean,
  pivot: boolean = false
): SortAnimation => {
  return {
    i: i,
    j: j,
    swap: swap,
    pivot: pivot,
  };
};

export default SortAnimation;
