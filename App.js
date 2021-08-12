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
import uploadToAnonymousFilesAsync from "anonymous-files";

const App = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    let openShareDialog = async () => {
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
        console.log(permisionResult);
        if (!permisionResult.granted) {
            alert("Los permisos son requeridos para acceder a las imagenes");
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled) return;

        if (Platform.OS === "web") {
            const remoteUri = await uploadToAnonymousFilesAsync(
                pickerResult.uri
            );
            console.log(remoteUri);
            setSelectedImage({
                localUri: pickerResult.uri,
                remoteUri: remoteUri,
            });
            return;
        } else {
            setSelectedImage({ localUri: pickerResult.uri });
        }
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
            <TouchableOpacity
                onPress={async () => {
                    await openImagePickerAsync();
                    console.log(selectedImage);
                }}
            >
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
                        onPress={async () => {
                            await openShareDialog();
                            console.log(selectedImage);
                        }}
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
