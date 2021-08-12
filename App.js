<script src="http://localhost:8097"></script>;
import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
} from "react-native";
import image from "./assets/react-logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadAnonymousFilesAsync from "anonymous-files";

const App = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    let openImagePickerAsync = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to camara roll is required");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        // console.log(pickerResult)

        if (pickerResult.cancelled === true) {
            return;
        }

        if (Platform.OS === "web") {
            let remoteUri = await uploadAnonymousFilesAsync(pickerResult.uri);
            setSelectedImage({ localUri: pickerResult.uri, remoteUri });
        } else {
            setSelectedImage({ localUri: pickerResult.uri });
        }
    };

    let openShareDialog = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            // alert("Sharing, is not available on your platform");
            alert(
                `The image share is available for sharing at: ${selectedImage.remoteUri}`
            );
            return;
        }

        await Sharing.shareAsync(selectedImage.localUri);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, world!!</Text>
            <Image style={styles.imagenFija} source={image} />
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
            {!selectedImage ? (
                <View />
            ) : (
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openShareDialog}
                    >
                        <Text style={styles.buttonText}>Compartir</Text>
                    </TouchableOpacity>

                    {selectedImage.remoteUri ? (
                        <Text
                            sryle={styles.buttonText}
                        >{`Hola ${selectedImage.remoteUri}`}</Text>
                    ) : (
                        <View />
                    )}
                </View>
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
