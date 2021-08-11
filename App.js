import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Button,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import image from "./assets/react-logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

this._spinValue = new Animated.Value(0);
Animated.loop(
  // First set up animation
  Animated.timing(this._spinValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  })
).start();

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = this._spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Su dispositivos no es compatible con esta opción");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
    return;
  };

  let openImagePickerAsync = async () => {
    let permisionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permisionResult.granted) {
      alert("Los permisos son requeridos para acceder a las imagenes");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) return;
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, world!!</Text>
      <Animated.Image source={image} style={styles.image} />
      <Button
        title="Button"
        color="#f194ff"
        onPress={() => Alert.alert("Simple Button pressed")}
        type="outline"
      />
      <TouchableHighlight
        onPress={() => Alert.alert("Simple Button pressed")}
        style={styles.button}
      >
        <View>
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Simple Button pressed")}
      >
        <Text style={styles.buttonText}>TouchableOpacity</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://picsum.photos/200/200",
          }}
          style={styles.imagenFija}
        />
      </TouchableOpacity>
      {selectedImage ? (
        <TouchableOpacity style={styles.button} onPress={openShareDialog}>
          <Text style={styles.buttonText}>Compartir imagen</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

// Esto es como tener el css aca nomas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(150, 255, 255)",
  },
  title: { fontSize: 30 },
  image: { height: 200, width: 200, transform: [{ rotate: spin }] },
  imagenFija: { height: 200, width: 200 },
  button: {
    alignItems: "center",
    backgroundColor: "#f194ff",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontSize: 20, paddingTop: 2 },
});

export default App;
