import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUser } from '../context/UserContext';

export default function Header() {
    const { user, setUser, fetchUser } = useUser();

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{user?.name}</Text>
            <Text style={styles.headerText}>Estamina: {user?.stamina}/50</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        height: 80,
        backgroundColor: "#670000",
    },
    headerText: {
        flex: 1,
        textAlign: "center",
        color: "gold",
        margin: 10,
    },
});
