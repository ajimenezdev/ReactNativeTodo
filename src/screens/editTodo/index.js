import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Platform,
  Button
} from "react-native";
import BasicAddItems from "todoList/src/components/BasicAddItems";
import { Permissions, ImagePicker, Location } from "expo";
import saveImage from "todoList/assets/save.png";
import Lightbox from "react-native-lightbox";

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
    marginRight: 20
  },
  blockRow: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  rowContent: {
    flex: 3,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imgContainer: {
    height: 50,
    width: 50
  },
  img: {
    height: "100%",
    width: "100%"
  }
});

export default class EditTodo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Editar",
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.getParam("onSave")(navigation.getParam("updatedTodo"));
          navigation.goBack();
        }}
      >
        <Image style={styles.icon} source={saveImage} />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      todo: props.navigation.getParam("todo"),
      hasCameraPermission: false,
      hasLocationPermission: false
    };
  }

  componentDidMount = async () => {
    this.props.navigation.setParams({
      updatedTodo: this.state.todo
    });

    const { status: cameraStatus } = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );

    const { status: locationStatus } = await Permissions.getAsync(
      Permissions.LOCATION
    );

    this.setState({
      hasCameraPermission: cameraStatus === "granted",
      hasLocationPermission: locationStatus === "granted"
    });
  };

  updateLocalTodo = property => {
    const newTodo = { ...this.state.todo, ...property };
    this.setState({ todo: newTodo });
    this.props.navigation.setParams({
      updatedTodo: newTodo
    });
  };

  getPicture = async () => {
    // Solicitar permiso
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (!result.cancelled) {
      this.updateLocalTodo({ img: result.uri });
    }
  };

  getLocation = async () => {
    await Location.requestPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    const { longitude, latitude } = location.coords;
    this.updateLocalTodo({ location: { longitude, latitude } });
  };

  openMap = location => {
    const { longitude, latitude } = location;
    Linking.openURL(
      Platform.select({
        ios: () => `http://maps.apple.com/?ll=${latitude},${longitude}`,
        android: () => `geo:${latitude},${longitude}`
      })()
    );
  };

  render() {
    const { todo } = this.state;
    const { text, description, priority, location, img } = todo;
    return (
      <View>
        <BasicAddItems
          text={text}
          description={description}
          priority={priority}
          onChange={property => this.updateLocalTodo(property)}
        />
        <View style={styles.blockRow}>
          <Text style={styles.rowLabel}>Posicion</Text>
          {!location && (
            <View style={styles.rowContent}>
              <Button
                style={styles.rowContent}
                title="Añadir Posicion"
                onPress={this.getLocation}
              />
            </View>
          )}
          {location && (
            <View style={styles.rowContent}>
              <TouchableOpacity onPress={() => this.openMap(location)}>
                <Text>
                  [{location.latitude},{location.longitude}]
                </Text>
              </TouchableOpacity>
              <Button
                title="Borrar"
                onPress={() => this.updateLocalTodo({ location: null })}
              />
            </View>
          )}
        </View>
        <View style={styles.blockRow}>
          <Text style={styles.rowLabel}>Foto</Text>
          {!img && (
            <View style={styles.rowContent}>
              <Button title="Añadir foto" onPress={this.getPicture} />
            </View>
          )}
          {img && (
            <View style={styles.rowContent}>
              <View style={styles.imgContainer}>
                <Lightbox>
                  <Image
                    style={styles.img}
                    resizeMode="contain"
                    source={{ uri: img }}
                  />
                </Lightbox>
              </View>
              <Button
                title="Borrar"
                onPress={() => this.updateLocalTodo({ img: null })}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
