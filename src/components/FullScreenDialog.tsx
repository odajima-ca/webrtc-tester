import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC, forwardRef, ReactNode, Ref } from "react";

const Transition = forwardRef<
  Ref<unknown>,
  TransitionProps & {
    children: React.ReactElement;
  }
>(({ children, ...props }, ref) => <Slide direction="up" ref={ref} {...props} children={children} />);

export type FullScreenDialogProps = DialogProps & {
  title: ReactNode;
};

export const FullScreenDialog: FC<FullScreenDialogProps> = ({ title, onClose, children, ...props }) => (
  <Dialog {...props} TransitionComponent={Transition} fullScreen={true}>
    <AppBar sx={{ position: "relative" }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={(event) => onClose?.(event, "backdropClick")}>
          <CloseIcon />
        </IconButton>
        <Typography component="div" sx={{ flex: 1, ml: 2 }} variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <DialogContent dividers={true}>{children}</DialogContent>
  </Dialog>
);
