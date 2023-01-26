import { ListItemText as MuiListItemText, ListItemTextProps as MuiListItemTextProps } from "@mui/material";
import React, { FC, ReactNode, useMemo } from "react";

type FallbackListItemTextProps = MuiListItemTextProps & {
  fallback?: ReactNode;
};

export const FallbackListItemText: FC<FallbackListItemTextProps> = ({ fallback = "---", secondary, ...props }) => {
  const isBoolean = useMemo(() => typeof secondary === "boolean", [secondary]);

  if (isBoolean) {
    return <MuiListItemText {...props} secondary={JSON.stringify(secondary)} />;
  }

  return <MuiListItemText {...props} secondary={secondary || fallback} />;
};
