import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./screens/Mains";

export default function App() {
    const BottomTab = createBottomTabNavigator();

    return (
        <LinearGradient colors={["purple", "coral"]} style={styles.container}>
            <KeyboardAvoidingView>
                <NavigationContainer>
                    <BottomTab.Screen name={"Main Screen"} component={Main} />
                </NavigationContainer>
                <StatusBar style="auto" />
            </KeyboardAvoidingView>
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
});
