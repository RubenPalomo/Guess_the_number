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

export default function App() {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const BottomTab = createBottomTabNavigator();
    const getNewDate = () => {
        const newDate = new Date();
        setCurrentTime(newDate);
        return newDate;
    };

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
                            backgroundColor: "#404040",
                            shadowRadius: 5,
                        },
                        tabBarInactiveTintColor: "#B99C00",
                        tabBarActiveTintColor: "gold",
                    }}
                >
                    <BottomTab.Screen
                        name={"Ranking"}
                        component={Ranking}
                        options={{
                            title: "Ranking",
                            tabBarActiveTintColor: "#404040",
                            headerShown: false,
                            tabBarIcon: (props) => (
                                <FontAwesome5
                                    name="crown"
                                    size={props.focused ? 50 : 40}
                                    color={props.focused ? "gold" : "#B99C00"}
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
                            tabBarActiveTintColor: "#404040",
                            header: () => (
                                <Header
                                    currentTime={currentTime}
                                    getNewDate={getNewDate}
                                />
                            ),
                            tabBarIcon: (props) => (
                                <Entypo
                                    name="game-controller"
                                    size={props.focused ? 90 : 80}
                                    color={props.focused ? "gold" : "#B99C00"}
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
                            tabBarActiveTintColor: "#404040",
                            headerShown: false,
                            tabBarIcon: (props) => (
                                <Ionicons
                                    name="person"
                                    size={props.focused ? 50 : 40}
                                    color={props.focused ? "gold" : "#B99C00"}
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
                <StatusBar backgroundColor="#670000" style="light" />
            </NavigationContainer>
        </UserProvider>
    );
}
