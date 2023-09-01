import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Hola caracola</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: "center",
        alignContent: "center",
        height: 100,
        marginTop: "8%",
    },
    headerText: {
        textAlign: "center",
    },
});
