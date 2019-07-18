import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

const size = 50;

const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    position: "absolute",
    bottom: 50,
    right: 20
  },
  text: {
    fontWeight: "bold"
  }
});

const FAB = props => {
  const { fabStyle, textStyle, text, ...otherProps } = props;
  return (
    <TouchableOpacity style={[styles.container, fabStyle]} {...otherProps}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FAB;
