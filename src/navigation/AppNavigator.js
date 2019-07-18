import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import MainScreen from "todoList/src/screens/main";
import EditTodo from "todoList/src/screens/editTodo";
export default createAppContainer(
  createStackNavigator(
    {
      Main: { screen: MainScreen },
      Edit: { screen: EditTodo }
    },
    {
      initialRouteName: "Main",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#0066ff"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }
    }
  )
);
