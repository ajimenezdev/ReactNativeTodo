import React, { Fragment } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SectionList,
  Image
} from "react-native";
import CheckBox from "react-native-check-box";
import deleteImage from "todoList/assets/delete.png";

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  contentContainer: {
    flexGrow: 1
  },
  listItem: {
    margin: 5,
    padding: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  bullet: {
    width: "10%"
  },
  text: {
    flex: 1,
    marginLeft: 5,
    fontWeight: "bold"
  },
  textDone: {
    color: "#aaa",
    textDecorationLine: "line-through",
    fontWeight: "normal"
  },
  delete: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  separator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  sectionHeader: {
    backgroundColor: "#ddd",
    padding: 10
  },
  emptyImage: {
    width: 50,
    height: 50,
    tintColor: "#005500"
  },
  icon: {
    width: 20,
    height: 20
  }
});

const TodoList = ({ todos, onUpdate, onDelete, onEdit }) => {
  renderItem = todo => (
    <TouchableOpacity
      style={styles.listItem}
      key={todo.id}
      onPress={() => onEdit(todo)}
    >
      <CheckBox
        checkedCheckBoxColor="#aaa"
        onClick={() => {
          onUpdate({ ...todo, done: !todo.done });
        }}
        isChecked={todo.done}
      />
      <Text style={[styles.text, todo.done && styles.textDone]}>
        {todo.text}
      </Text>
      <TouchableOpacity style={styles.delete} onPress={() => onDelete(todo)}>
        <Image style={styles.icon} source={deleteImage} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderEmptyComponent = () => (
    <View style={styles.emptyList}>
      <Image
        style={styles.emptyImage}
        source={require("todoList/assets/check.png")}
      />
      <Text>Lista Vacia</Text>
    </View>
  );

  renderSectionHeader = ({ section: { title, data } }) => (
    <View style={styles.sectionHeader}>
      <Text>
        {title} ({data.length})
      </Text>
    </View>
  );

  getSectionData = () => {
    if (todos && todos.length) {
      return [
        {
          title: "ToDo",
          data: todos
            .filter(todo => !todo.done)
            .sort((a, b) => (a.priority < b.priority ? -1 : 1))
        },
        {
          title: "Terminadas",
          data: todos
            .filter(todo => todo.done)
            .sort((a, b) => (a.priority < b.priority ? -1 : 1))
        }
      ];
    }
    return [];
  };

  return (
    <SectionList
      style={styles.container}
      sections={getSectionData()}
      keyExtractor={todo => todo.id}
      renderItem={({ item }) => renderItem(item)}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmptyComponent}
      stickySectionHeadersEnabled={true}
    />
  );
};

export default TodoList;
