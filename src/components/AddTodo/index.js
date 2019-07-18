import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import BasicAddItems from "todoList/src/components/BasicAddItems";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row"
  },
  content: {
    padding: 20,
    paddingBottom: 30,
    flex: 1,
    backgroundColor: "#ffffff",
    shadowOffset: { width: 0, height: -3 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 30
    // width: 200
  },
  text: {
    borderBottomWidth: 1,
    padding: 5
  },
  closeIcon: {
    color: "#fff"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20
  },
  block: {
    margin: 10
  }
});
const initialState = {
  text: "",
  description: "",
  priority: 0
};
export default class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  addTodo = () => {
    const { onAddTodo, onCloseModal } = this.props;
    const { text, description, priority } = this.state;
    onAddTodo({ text, description, priority });
    // reset initialState for next Add
    this.setState(initialState);
    onCloseModal();
  };

  render() {
    const { visible, onCloseModal } = this.props;
    const { text, priority, description } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onCloseModal}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.content}
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <BasicAddItems
              text={text}
              description={description}
              priority={priority}
              onChange={newState => this.setState(newState)}
            />
            <View style={styles.buttonRow}>
              <Button title="Cerrar" onPress={onCloseModal} color="#ff0000" />
              <Button title="Añadir" onPress={this.addTodo} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}
