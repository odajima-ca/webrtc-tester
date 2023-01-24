import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { SpeedDialAction, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { FC } from "react";
import { use100vh } from "react-div-100vh";
import { Link, useOutlet } from "react-router-dom";

export const AppLayout: FC = () => {
  const theme = useTheme();
  const outlet = useOutlet();
  const height = use100vh();

  return (
    <Box sx={{ height, width: "100vw" }}>
      {outlet}

      <SpeedDial
        ariaLabel="Menu"
        icon={<SpeedDialIcon />}
        sx={{
          "& svg": {
            display: "block",
          },
          "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
            left: theme.spacing(2),
            top: theme.spacing(2),
          },
          "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
          },
          bottom: 16,
          position: "absolute",
          right: 16,
        }}
      >
        <SpeedDialAction
          aria-label="Home"
          icon={
            <Link to="/">
              <HomeIcon />
            </Link>
          }
          tooltipTitle="Home"
        />
        <SpeedDialAction
          aria-label="Camera"
          icon={
            <Link to="/camera">
              <CameraAltIcon />
            </Link>
          }
          tooltipTitle="Camera"
        />
      </SpeedDial>
    </Box>
  );
};
