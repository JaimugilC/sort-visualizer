interface BarType {
  id: number;
  value: number;
  color: string;
}

export const BarTypeConstructor = (
  id: number,
  value: number,
  color: string
): BarType => {
  return {
    id: id,
    value: value,
    color: color,
  };
};

export default BarType;
