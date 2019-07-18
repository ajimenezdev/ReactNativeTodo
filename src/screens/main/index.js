import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import TodoList from "todoList/src/components/TodoList";
import AddTodo from "todoList/src/components/AddTodo";
import FAB from "todoList/src/components/FAB";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} from "todoList/src/data/todos";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  loading: {
    flex: 1
  }
});

class MainScreen extends Component {
  static navigationOptions = {
    title: "ToDo List App"
  };

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      newTodo: null,
      loading: true,
      addModalVisible: false
    };
  }

  componentDidMount = async () => {
    const todos = await getTodos();
    this.setState({ todos: todos, loading: false });
  };

  handleAdd = newTodo => {
    const { todos } = this.state;
    const newList = addTodo(todos, newTodo);
    this.setState({ todos: newList, newTodo: null });
  };

  handleUpdate = todo => {
    const { todos } = this.state;
    const newList = updateTodo(todos, todo);
    this.setState({ todos: newList });
  };

  handleDelete = todo => {
    Alert.alert("Quieres eliminar la tarea?", todo.text, [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          const { todos } = this.state;
          const newList = deleteTodo(todos, todo);
          this.setState({ todos: newList });
        }
      }
    ]);
  };

  toggleModal = () => {
    this.setState({ addModalVisible: !this.state.addModalVisible });
  };

  openEditTodo = todo => {
    this.props.navigation.navigate("Edit", {
      todo,
      onSave: this.handleUpdate
    });
  };

  render() {
    const { todos, newTodo, loading, addModalVisible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {loading && (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#0066ff"
          />
        )}
        {!loading && (
          <TodoList
            todos={todos}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            onEdit={this.openEditTodo}
          />
        )}
        <FAB
          text="+"
          fabStyle={{ backgroundColor: "#0066ff" }}
          textStyle={{ color: "#fff" }}
          onPress={this.toggleModal}
        />
        <AddTodo
          visible={addModalVisible}
          onCloseModal={this.toggleModal}
          onAddTodo={this.handleAdd}
        />
      </SafeAreaView>
    );
  }
}

export default MainScreen;
