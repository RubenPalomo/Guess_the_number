import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { useUser } from "../context/UserContext";
import { sendToTelegram } from "../util/sentToTelegram";
import BackgroundBeauty from "../components/BackgroundBeauty";
import GameScreenButton from "../components/GameScreenButton";
import SendAlert from "../util/SendAlert";
import { colors } from "../constants/colors";
import { PlaySound } from "../util/PlaySound";

interface GameScreenProps {
    functionFinishGame: () => void;
}

export default function GameScreen(props: GameScreenProps) {
    const { user, setUserAndStore } = useUser();
    const [counter, setCounter] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const generateRandom = () => Math.floor(Math.random() * 100) + 1;
    const [number, setNumber] = useState<number>(generateRandom());

    const gameOver = (record: number) => {
        if (user && user.record < record) {
            setUserAndStore({ ...user, record: record });
            sendToTelegram({ ...user, record: record });
            SendAlert(
                "Es un nuevo récord!",
                `Has tenido ${record} aciertos.\n¡Sigue así!`
            );

            if (user.soundsOn)
                PlaySound(require("../assets/sounds/kirby-victory.mp3"), false);
        } else
            SendAlert(
                "¡Has perdido!",
                `Has fallado con ${record} aciertos.\n¡Vuelve a intentarlo!`
            );

        setCounter(0);
        props.functionFinishGame();
    };

    const handlePress = (symbol: string): void => {
        const newNumber: number = Math.floor(generateRandom());
        const record: number = counter;
        let newCounter: number;

        symbol === "+"
            ? newNumber > number
                ? (newCounter = counter + 1)
                : (newCounter = 0)
            : newNumber < number
            ? (newCounter = counter + 1)
            : (newCounter = 0);

        if (newCounter === 0) {
            if (lives === 0) gameOver(record);
            setLives(lives - 1);
        } else {
            setCounter(newCounter);
            if (user && user.soundsOn)
                PlaySound(require("../assets/sounds/correct.mp3"), false);
        }

        setNumber(newNumber);
    };

    return (
        <BackgroundBeauty
            screen={
                <View style={styles.gameScreenContainer}>
                    <View style={styles.counterContainer}>
                        <Text style={styles.counterText}>Rounds</Text>
                        <Text style={styles.counterText}>{counter}</Text>
                    </View>
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.mainText}>
                            ¡Adivina si el siguiente número es mayor o menor!
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.buttonContainer}>
                            <GameScreenButton
                                text="-"
                                function={() => {
                                    handlePress("-");
                                }}
                            />
                        </View>
                        <View style={styles.elementContainer}>
                            <Text style={styles.mainText}>{number}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <GameScreenButton
                                text="+"
                                function={() => {
                                    handlePress("+");
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.livesContainer}>
                        <Text style={styles.livesText}>Lives:</Text>
                        <View style={styles.heartsContainer}>
                            {[...Array(lives)].map((_, index) => (
                                <Image
                                    key={index}
                                    source={require("../assets/heart.png")}
                                    style={styles.heartImage}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    gameScreenContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        backgroundColor: colors.mainColor,
        marginVertical: "40%",
        width: "90%",
        borderRadius: 20,
        marginTop: "80%",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    instructionsContainer: {
        margin: 10,
    },
    elementContainer: {
        flex: 2,
        width: "100%",
        margin: 5,
        borderWidth: 2,
        borderColor: "gold",
        borderRadius: 10,
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        margin: 5,
    },
    mainText: {
        height: 80,
        textAlign: "center",
        textAlignVertical: "center",
        color: "gold",
        fontSize: 20,
    },
    counterContainer: {
        position: "absolute",
        top: -180,
        right: 0,
        backgroundColor: colors.mainColor,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    counterText: {
        textAlign: "center",
        textAlignVertical: "center",
        color: "gold",
        fontSize: 15,
        margin: 5,
    },
    livesContainer: {
        flex: 1,
        position: "absolute",
        top: -170,
        left: 0,
        backgroundColor: colors.mainColor,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    heartsContainer: {
        flexDirection: "row",
        margin: 5,
        minWidth: "22%",
        minHeight: 25,
    },
    heartImage: {
        width: 25,
        height: 25,
    },
    livesText: {
        color: "gold",
    },
});
