import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { PlaySound } from "../util/PlaySound";

export default function AppButton(props: {
    textButton: string;
    functionButton: () => void;
}) {
    return (
        <View style={styles.appButtonContainer}>
            <Pressable
                style={styles.appButton}
                android_ripple={{ color: "grey" }}
                onPress={props.functionButton}
                onPressIn={() => {
                    PlaySound(require("../assets/sounds/press-in.mp3"), false);
                }}
            >
                <Text style={styles.appButtonText}>{props.textButton}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        overflow: "hidden",
        borderRadius: 15,
        width: "90%",
        marginVertical: 5,
        marginHorizontal: "auto",
    },
    appButton: {
        padding: 20,
        backgroundColor: "indigo",
        borderRadius: 15,
        borderWidth: 2,
    },
    appButtonText: {
        color: "gold",
        textAlign: "center",
        fontSize: 15,
    },
});
