import React from "react";
import {
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BackgroundBeauty(props: { screen: JSX.Element }) {
    return (
        <LinearGradient colors={["#8E0000", "coral"]} style={styles.container}>
            <ImageBackground
                source={require("../assets/background.png")}
                resizeMode="repeat"
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.1 }}
            >
                <KeyboardAvoidingView style={styles.container}>{props.screen}</KeyboardAvoidingView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
    },
});
