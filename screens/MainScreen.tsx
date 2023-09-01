import React, { useState } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import * as Animatable from "react-native-animatable";
import GameScreen from "./GameScreen";
import BackgroundBeauty from "../components/BackgroundBeauty";
import TitleTextStyle from "../components/TitleTextStyle";
import AppButton from "../components/AppButton";
import User from "../types/User";
import SendAlert from "../app-functions/SendAlert";

export default function MainScreen() {
    const [stamina, setStamina] = useState<number>(1);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    const [user, setUser] = useState<User>({
        name: "Sarandonga",
        record: 5,
        soundsOn: true,
        stamina: 3,
    });

    const handleStart = (): void => {
        if (stamina > 0) {
            setIsGameStarted(true);
            setStamina(stamina - 1);
        } else SendAlert("¡Sin estamina!", "No tienes suficiente estamina");
    };

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
                    <Text style={styles.recordText}>Record: {user.record}</Text>
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
