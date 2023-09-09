import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUser } from "../context/UserContext";
import CountdownStamina from "./CountdownStamina";

interface headerProps {
    currentTime: Date;
    setCurrentTime: React.Dispatch<React.SetStateAction<Date>>;
}

export default function Header(props: headerProps) {
    const { user } = useUser();
    const [activateCountdown, setActivateCountdown] = useState<boolean>(
        user?.stamina ? user.stamina < 50 : false
    );

    useEffect(() => {
        if (user) setActivateCountdown(user.stamina < 50);
    }, [user]);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerElementContainer}>
                <Text style={styles.headerText}>{user?.name}</Text>
            </View>
            <View style={styles.headerElementContainer}>
                <Text style={styles.headerText}>
                    Estamina: {user?.stamina}/50
                </Text>
            </View>
            <CountdownStamina
                currentTime={props.currentTime}
                setCurrentTime={props.setCurrentTime}
                activate={activateCountdown}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        minHeight: 50,
        backgroundColor: "#670000",
        marginTop: "8%",
        borderWidth: 3,
    },
    headerElementContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    headerText: {
        textAlign: "center",
        color: "gold",
        fontSize: 14,
    },
});
