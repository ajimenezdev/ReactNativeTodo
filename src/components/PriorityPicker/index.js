import React from "react";
import {
  Picker,
  Platform,
  ActionSheetIOS,
  View,
  Button,
  StyleSheet
} from "react-native";

const priorities = ["Urgente", "Importante", "Normal", "No Importante"];

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5
  }
});

const PriorityPicker = ({ priority, onChange }) => {
  showIosPicker = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...priorities, "Cancel"],
        cancelButtonIndex: priorities.length
      },
      buttonIndex => {
        onChange(buttonIndex);
      }
    );
  };

  renderIos = () => (
    <Button title={priorities[priority]} onPress={this.showIosPicker} />
  );

  renderAndroid = () => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={itemValue => onChange(itemValue)}
          style={{ borderWidth: 2, borderColor: "red", elevation: 2 }}
        >
          {priorities.map((item, idx) => (
            <Picker.Item label={item} value={idx} />
          ))}
        </Picker>
      </View>
    );
  };

  return Platform.select({
    ios: () => this.renderIos(),
    android: () => this.renderAndroid()
  })();
};

export default PriorityPicker;
