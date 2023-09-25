import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { UserProvider } from "./context/UserContext";
import MainScreen from "./screens/MainScreen";
import Ranking from "./screens/Ranking";
import Profile from "./screens/Profile";
import Header from "./components/Header";
import { colors } from "./constants/colors";

export default function App() {
    const BottomTab = createBottomTabNavigator();

    useEffect(() => {
        const notificationListener =
            Notifications.addNotificationReceivedListener((notification) => {
                //console.log("Notification received:", notification);
            });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
        };
    }, []);

    return (
        <UserProvider>
            <NavigationContainer>
                <BottomTab.Navigator
                    initialRouteName="Main"
                    backBehavior="initialRoute"
                    screenOptions={{
                        tabBarShowLabel: true,
                        tabBarLabelStyle: { marginBottom: 15 },
                        tabBarAllowFontScaling: true,
                        tabBarStyle: {
                            height: 100,
                            backgroundColor: colors.darkgrey,
                            shadowRadius: 5,
                        },
                        tabBarInactiveTintColor: colors.fadedGold,
                        tabBarActiveTintColor: colors.darkgrey,
                    }}
                >
                    <BottomTab.Screen
                        name={"Ranking"}
                        component={Ranking}
                        options={{
                            title: "Ranking",
                            headerShown: false,
                            tabBarIcon: (props) => (
                                <FontAwesome5
                                    name="crown"
                                    size={props.focused ? 50 : 40}
                                    color={props.focused ? "gold" : colors.fadedGold}
                                    style={
                                        props.focused && {
                                            elevation: 28,
                                            marginBottom: -20,
                                        }
                                    }
                                />
                            ),
                        }}
                    />
                    <BottomTab.Screen
                        name={"Main"}
                        component={MainScreen}
                        options={{
                            title: "Jugar",
                            header: () => <Header />,
                            tabBarIcon: (props) => (
                                <Entypo
                                    name="game-controller"
                                    size={props.focused ? 90 : 80}
                                    color={props.focused ? "gold" : colors.fadedGold}
                                    style={
                                        props.focused && {
                                            elevation: 28,
                                            marginBottom: -20,
                                        }
                                    }
                                />
                            ),
                        }}
                    />
                    <BottomTab.Screen
                        name={"Profile"}
                        component={Profile}
                        options={{
                            title: "Mi perfil",
                            headerShown: false,
                            tabBarIcon: (props) => (
                                <Ionicons
                                    name="person"
                                    size={props.focused ? 50 : 40}
                                    color={props.focused ? "gold" : colors.fadedGold}
                                    style={
                                        props.focused && {
                                            elevation: 28,
                                            marginBottom: -20,
                                        }
                                    }
                                />
                            ),
                        }}
                    />
                </BottomTab.Navigator>
                <StatusBar backgroundColor={colors.mainColor} style="light" />
            </NavigationContainer>
        </UserProvider>
    );
}
