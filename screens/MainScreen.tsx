import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import * as Animatable from "react-native-animatable";
import GameScreen from "./GameScreen";
import BackgroundBeauty from "../components/BackgroundBeauty";
import TitleTextStyle from "../components/TitleTextStyle";
import AppButton from "../components/AppButton";
import User from "../types/User";
import SendAlert from "../app-functions/SendAlert";
import {
    _updateUserData,
    _retrieveUserData,
} from "../memory/InternalDataManager";

export default function MainScreen(props: { user: User }) {
    const [user, setUser] = useState<User | null>(null);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = await _retrieveUserData();
                setUser(storedUser);
                setRecord(storedUser.record);
            } catch (error: any) {
                SendAlert("Error", error.toString());
            }
        };
        fetchData();
    }, []);

    const [record, setRecord] = useState<number>(user?.record ?? 0);

    const handleStart = (): void => {
        if (user === null) return;
        if (user.stamina > 0) {
            setIsGameStarted(true);
            const updatedUser = { ...user, stamina: user.stamina - 1 };
            _updateUserData(updatedUser);
            setUser(updatedUser);
        } else SendAlert("¡Sin estamina!", "No tienes suficiente estamina");
    };

    return isGameStarted ? (
        <GameScreen
            user={user}
            functionSetNewRecord={(newRecord: number) => setRecord(newRecord)}
            functionFinishGame={() => setIsGameStarted(false)}
        />
    ) : (
        <BackgroundBeauty
            screen={
                <View style={styles.mainContainer}>
                    <View style={styles.mainTitleContainer}>
                        <Text style={styles.mainTitle}>Guess the number!</Text>
                    </View>
                    <View style={styles.mainSubtitleContainer}>
                        <Animatable.Text
                            animation="pulse"
                            iterationCount="infinite"
                            duration={2000}
                            style={styles.mainSubtitle}
                        >
                            Play now!
                        </Animatable.Text>
                    </View>
                    <Text style={styles.recordText}>Record: {record}</Text>
                    <View style={styles.mainButtonsContainer}>
                        <AppButton
                            textButton="Empezar nuevo juego"
                            functionButton={handleStart}
                        />
                        <AppButton
                            textButton="Salir"
                            functionButton={() => {
                                BackHandler.exitApp();
                            }}
                        />
                    </View>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    mainTitleContainer: {
        flex: 1,
        padding: 10,
        width: "100%",
        marginTop: "15%",
    },
    mainTitle: {
        ...TitleTextStyle.TitleTextStyle,
    },
    mainSubtitleContainer: {
        position: "absolute",
        bottom: "10%",
        right: 0,
        transform: [{ rotate: "-40deg" }],
    },
    mainSubtitle: {
        fontSize: 30,
        color: "gold",
    },
    recordText: {
        flex: 1,
        fontSize: 25,
        fontWeight: "bold",
        color: "gold",
        textAlign: "left",
        marginVertical: "10%",
    },
    mainButtonsContainer: {
        flex: 3,
        alignItems: "center",
        width: "80%",
    },
});
