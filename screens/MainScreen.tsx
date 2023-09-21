import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import * as Animatable from "react-native-animatable";
import { useUser } from "../context/UserContext";
import GameScreen from "./GameScreen";
import BackgroundBeauty from "../components/BackgroundBeauty";
import TitleTextStyle from "../components/TitleTextStyle";
import AppButton from "../components/AppButton";
import SendAlert from "../app-functions/SendAlert";
import StaminaRecharge from "../background/StaminaRecharge";

export default function MainScreen() {
    const { user, setUserAndStore } = useUser();
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    const handleStart = (): void => {
        if (user === null) return;
        if (user.stamina > 0) {
            setIsGameStarted(true);
            setUserAndStore({ ...user, stamina: user.stamina - 1 });
        } else SendAlert("¡Sin estamina!", "No tienes suficiente estamina");
    };

    useEffect(() => {
        StaminaRecharge({ user, setUserAndStore });
    }, []);

    return isGameStarted ? (
        <GameScreen functionFinishGame={() => setIsGameStarted(false)} />
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
                    <Text style={styles.recordText}>
                        Record: {user?.record}
                    </Text>
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
        marginTop: "20%",
    },
    mainTitleContainer: {
        flex: 1,
        padding: 10,
        width: "100%",
        marginTop: "5%",
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
