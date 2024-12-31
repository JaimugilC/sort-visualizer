import { Box, Grid2 } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import // CONSTANT_a_forBarWidth,
// CONSTANT_b_forBarWidth,
// CONSTANT_a_forBarGap,
// CONSTANT_b_forBarGap,
"../constants/UIConstants";
import BarType from "../interface/BarType";
import { Flipped, Flipper } from "react-flip-toolkit";

interface ArrayBarProps {
  barObj: BarType;
  arraySize: number;
}

const ArrayBar: React.FC<ArrayBarProps> = ({ barObj, arraySize }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const [elementWidth, setElementWidth] = useState<number>(0);

  useEffect(() => {
    const measureWidth = () => {
      if (elementRef.current) {
        const width = elementRef.current.getBoundingClientRect().width;
        setElementWidth(width);
      }
    };
    measureWidth();

    window.addEventListener("resize", measureWidth);

    return () => {
      window.removeEventListener("resize", measureWidth);
    };
  }, []);

  return (
    <Flipped
      key={`${barObj.id}-${barObj.value}`}
      flipId={`${barObj.id}-${barObj.value}`}
    >
      <div
        ref={elementRef}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "5px",
          height: `${barObj.value}px`,
          width: `calc(100%/${arraySize})`,
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          background: barObj.color,
          color: "white",
        }}
      >
        {elementWidth > 35 ? barObj.value : null}
      </div>
    </Flipped>
  );
};

interface SorterViewProps {
  array: BarType[];
  sortingSpeed: number;
}

const SorterView: React.FC<SorterViewProps> = ({ array, sortingSpeed }) => {
  const flipKey: string =
    sortingSpeed <= 3 ? `${array.map((bar) => bar.id).join(",")}` : "";

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        p: 2,
        height: "85vh",
        minHeight: "600px",
        width: "100vw",
      }}
    >
      <Flipper flipKey={flipKey}>
        <Grid2
          container
          alignItems="flex-end" // Vertical alignment (cross-axis)
          sx={{ height: "600px", width: "80vw" }}
        >
          {array.map((ele) => {
            return (
              <ArrayBar
                key={`${ele.id}-${ele.value}`}
                barObj={ele}
                arraySize={array.length}
              />
            );
          })}
        </Grid2>
      </Flipper>
    </Box>
  );
};

export default SorterView;
