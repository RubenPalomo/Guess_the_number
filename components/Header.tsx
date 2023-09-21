import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import CountdownStamina from "./CountdownStamina";

interface headerProps {
    currentTime: Date;
    getNewDate: () => Date;
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
                <Entypo
                    name="user"
                    size={15}
                    color="gold"
                    style={{ marginTop: "8%", marginRight: 8 }}
                />
                <Text style={styles.headerText}>{user?.name}</Text>
            </View>
            <View style={styles.headerElementContainer}>
                <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={20}
                    color="gold"
                    style={{ marginTop: "7%", marginRight: 5 }}
                />
                <Text style={styles.headerText}>
                    Estamina: {user?.stamina}/50
                </Text>
            </View>
            <CountdownStamina
                currentTime={props.currentTime}
                getNewDate={props.getNewDate}
                activate={activateCountdown}
                deactivateCountdown={() => setActivateCountdown(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        minHeight: 75,
        backgroundColor: "#670000",
        marginTop: "9%",
        borderWidth: 3,
    },
    headerElementContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        paddingTop: "2%",
        margin: "auto",
    },
    headerText: {
        textAlign: "center",
        color: "gold",
        fontSize: 18,
        marginTop: "4%",
    },
});
