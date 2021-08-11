import React from "react";
import { Text, View, StyleSheet, Image, Animated,Easing, Button, Alert, TouchableHighlight, TouchableOpacity } from "react-native";
import image from "./assets/react-logo.png";

this._spinValue= new Animated.Value(0)
Animated.loop(
// First set up animation 
Animated.timing(
    this._spinValue,
  {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true  // To make use of native driver for performance
  }
	)
	)
.start()

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = this._spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})

const App = () => {
  return (
    <View  style={styles.container}>
      <Text style={styles.title}>Hello, world!!</Text>
			<Animated.Image 
				source={image}
				style={styles.image}/>
      <Button
        title="Button"
        color="#f194ff"
        onPress={() => Alert.alert('Simple Button pressed')}
        type="outline"
      />
      <TouchableHighlight onPress={() => Alert.alert('Simple Button pressed')}
        style={styles.button}
      >
        <View>
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Simple Button pressed')}
      >
        <Text style={styles.buttonText}>TouchableOpacity</Text>
      </TouchableOpacity>
  </View>
  );
};

// Esto es como tener el css aca nomas
const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(150, 255, 255)"},
	title: { fontSize: 30 },
	image: {height: 300, width: 300, transform: [{rotate: spin}]},
  button: {
    alignItems: "center",
    backgroundColor: "#f194ff",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: { color: "white",
  fontSize: 20,
  paddingTop: 2},
})

export default App;
