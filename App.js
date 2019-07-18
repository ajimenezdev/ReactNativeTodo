import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </React.Fragment>
    );
  }
}
