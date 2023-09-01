import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { PlaySound } from "../app-functions/PlaySound";

export default function ProfileBubble(props: {
    tag: string;
    text: string;
    functionChangeModalVisibility?: () => void;
    functionChangeSound?: (isSoundOn: boolean) => void;
}) {
    const isSound = props.tag === "Sonido";
    const [isSoundOn, setIsSoundOn] = useState<boolean>(props.text === "true");

    const handlePressNameOption = (): void => {
        if (props.functionChangeModalVisibility)
            props.functionChangeModalVisibility();
    };

    const handlePressSoundOption = (): void => {
        if (props.functionChangeSound) {
            props.functionChangeSound(!isSoundOn);
            setIsSoundOn(!isSoundOn);
        }
    };

    const handlePress = (): void => {
        isSound ? handlePressSoundOption() : handlePressNameOption();
    };

    return (
        <View style={styles.bubbleContainer}>
            <Pressable
                style={styles.bubbleTextContainer}
                onPress={handlePress}
                onPressIn={() => {
                    PlaySound(require("../assets/sounds/press-in.mp3"), false);
                }}
            >
                <Text style={styles.bubbleText}>{props.tag}: </Text>
                {isSound ? (
                    isSoundOn ? (
                        <Text
                            style={[styles.bubbleText, { color: "lightgreen" }]}
                        >
                            On
                        </Text>
                    ) : (
                        <Text style={[styles.bubbleText, { color: "red" }]}>
                            Off
                        </Text>
                    )
                ) : (
                    <Text style={styles.bubbleText}>{props.text}</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bubbleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: "10%",
    },
    bubbleTextContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: "#670000",
        padding: 20,
        width: "80%",
    },
    bubbleText: {
        flex: 1,
        color: "gold",
        width: "80%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        margin: "auto",
    },
});
