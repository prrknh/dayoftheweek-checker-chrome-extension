import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export const Header = () => {
  return (
    <AppBar color="primary">
      <Toolbar>
        <Typography variant="h6">曜日チェッカー</Typography>
      </Toolbar>
    </AppBar>
  );
};
