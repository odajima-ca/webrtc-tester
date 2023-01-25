import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

type ExpandMoreButtonProps = IconButtonProps & {
  expand: boolean;
};

export const ExpandMoreButton = styled((props: ExpandMoreButtonProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
