import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text>Mi perfil uwu</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});
