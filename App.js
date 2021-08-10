import { StatusBar } from "expo-status-bar";
import { divide } from "lodash";
import React from "react";
import { Text, View, StyleSheet, Image, Animated,Easing} from "react-native";
import image from "./assets/react-logo.png";

spinValue= new Animated.Value(0)
Animated.loop(
// First set up animation 
Animated.timing(
    this.spinValue,
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
const spin = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, world!!</Text>
			<Animated.Image 
				source={image}
				style={styles.image}/>
	  </View>
  );
};

// Esto es como tener el css aca nomas
const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(150, 255, 255)"},
	title: { fontSize: 30 },
	image: {height: 300, width: 300, transform: [{rotate: spin}]}
})

export default App;
