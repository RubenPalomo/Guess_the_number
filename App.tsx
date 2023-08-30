import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./screens/Mains";
import Ranking from "./screens/Ranking";
import Profile from "./screens/Profile";
import Header from "./components/Header";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function App() {
    const BottomTab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <BottomTab.Navigator
                initialRouteName="Main"
                screenOptions={{
                    tabBarShowLabel: true,
                    tabBarLabelStyle: { marginBottom: 15 },
                    tabBarAllowFontScaling: true,
                    tabBarStyle: {
                        height: 100,
                        backgroundColor: "#404040",
                        shadowRadius: 5,
                    },
                    headerTitleStyle: { fontSize: 25 },
                    headerStyle: { backgroundColor: "#404040" },
                    headerTintColor: "gold",
                    tabBarInactiveTintColor: "#B99C00",
                    tabBarActiveTintColor: "gold",
                }}
            >
                <BottomTab.Screen
                    name={"Ranking"}
                    component={Ranking}
                    options={{
                        title: "Ranking",
                        // header: Header,
                        tabBarActiveTintColor: "#404040",
                        tabBarIcon: (props) => (
                            <FontAwesome5
                                name="crown"
                                size={props.focused ? 50 : 40}
                                color={props.focused ? "gold" : "#B99C00"}
                                style={
                                    props.focused && { elevation: 28, marginBottom: -20 }
                                }
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={"Main"}
                    component={Main}
                    options={{
                        title: "Jugar",
                        headerTitle:"Guess the number!",
                        tabBarActiveTintColor: "#404040",
                        tabBarIcon: (props) => (
                            <Entypo
                                name="game-controller"
                                size={props.focused ? 90 : 80}
                                color={props.focused ? "gold" : "#B99C00"}
                                style={props.focused && { elevation: 28, marginBottom: -20 }}
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={"Profile"}
                    component={Profile}
                    options={{
                        title: "Mi perfil",
                        tabBarActiveTintColor: "#404040",
                        tabBarIcon: (props) => (
                            <Ionicons
                                name="person"
                                size={props.focused ? 50 : 40}
                                color={props.focused ? "gold" : "#B99C00"}
                                style={props.focused && { elevation: 28, marginBottom: -20 }}
                            />
                        ),
                    }}
                />
            </BottomTab.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
