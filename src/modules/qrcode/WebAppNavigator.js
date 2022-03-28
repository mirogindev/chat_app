import { ThemeProvider } from "@material-ui/core/styles";
import { themeConfig } from "../../utils/ThemeUtils";
import { Switch, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import WebHomeScreen from "../home/WebHomeScreen";
import React from "react";

const WebAppNavigator = ({ params }) => {
  return (
    <ThemeProvider theme={themeConfig}>
      <HashRouter>
        <Switch> 
          <Route path="/"  component={WebHomeScreen} />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
};

export default WebAppNavigator;
