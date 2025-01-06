import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Grid2 } from "@mui/material";

const DialogContent1 = () => {
  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>
          Sorting algorithms are used to sort a data structure according to a
          specific order relationship, such as numerical order or
          lexicographical order. Use this application to visualize how different
          soring algorithm works
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: 330,
            maxHeight: { xs: 167, md: 167 },
            maxWidth: { xs: 250, md: 250 },
          }}
          alt="sort image"
          src="src/assets/sort.png"
        />
      </Grid2>
    </Grid2>
  );
};
const DialogContent2 = () => {
  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>
          Use the Sliders in the side Drawer to Adjust the size of the array or
          the speed of the animation
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: 330,
            maxHeight: { xs: 167, md: 167 },
            maxWidth: { xs: 250, md: 250 },
          }}
          alt="controls"
          src="src/assets/controls.png"
        />
      </Grid2>
    </Grid2>
  );
};
const DialogContent3 = () => {
  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>
          Select the Sorting Algorithm from the list that is available in the
          side drawer
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: 167,
            maxHeight: { xs: 200, md: 200 },
            maxWidth: { xs: 250, md: 250 },
          }}
          alt="algorithms"
          src="src/assets/algorithms.png"
        />
      </Grid2>
    </Grid2>
  );
};
const DialogContent4 = () => {
  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>
          Use these Buttons on the Top right corner to generate New array
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 160,
          }}
          alt="newarray"
          src="src/assets/newarray.png"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>or Play the sorting</Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 160,
          }}
          alt="play"
          src="src/assets/play.png"
        />
      </Grid2>
    </Grid2>
  );
};
const DialogContent5 = () => {
  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>
          While the Sorting is being perfomed you can pause the Animation
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 160,
          }}
          alt="pause"
          src="src/assets/pause.png"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>
          or Cancel the currently running sort
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 160,
          }}
          alt="cancel"
          src="src/assets/cancel.png"
        />
      </Grid2>
    </Grid2>
  );
};
const DialogContent6 = () => {
  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography gutterBottom>
          While the Sorting is paused you can navigate the current sort by
          moving forward or stepping backward and Resume from the current state
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 160,
          }}
          alt="navigate"
          src="src/assets/navigate.png"
        />
      </Grid2>
    </Grid2>
  );
};

const DialogData = [
  {
    title: "Sorting Visualizer",
    content: <DialogContent1 />,
  },
  {
    title: "Adjust Size and Speed",
    content: <DialogContent2 />,
  },
  {
    title: "Select Sorting Algorithm",
    content: <DialogContent3 />,
  },
  {
    title: "New Array and Play Sort",
    content: <DialogContent4 />,
  },
  {
    title: "Pause or Cancel",
    content: <DialogContent5 />,
  },
  {
    title: "Navigate",
    content: <DialogContent6 />,
  },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function TutorialDialog() {
  const [open, setOpen] = useState<boolean>(true);
  const [dialogNumber, setDialogNumber] = useState<number>(0);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const handleClose = () => {
    setOpen(false);
  };

  const nextDialog = () => {
    setDialogNumber((cur) => cur + 1);
  };

  const prevDialog = () => {
    setDialogNumber((cur) => cur - 1);
  };

  return (
    <React.Fragment>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {DialogData[dialogNumber].title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent

        //   sx={{
        //     width: { xs: "70vw", sm: "50vw", md: "40vw", lg: "30vw" },
        //     height: { xs: "45vh" },
        //   }}
        >
          <Typography gutterBottom>
            {DialogData[dialogNumber].content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <IconButton
            onClick={prevDialog}
            color="inherit"
            edge="start"
            sx={{ ml: 1, mr: 1 }}
            disabled={dialogNumber == 0}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            onClick={nextDialog}
            color="inherit"
            edge="start"
            sx={{ ml: 1, mr: 1 }}
            disabled={dialogNumber == DialogData.length - 1}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
