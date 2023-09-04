import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useUser } from "../context/UserContext";
import BackgroundBeauty from "../components/BackgroundBeauty";
import GameScreenButton from "../components/GameScreenButton";
import SendAlert from "../app-functions/SendAlert";

interface GameScreenProps {
    functionFinishGame: () => void;
}

export default function GameScreen(props: GameScreenProps) {
    const { user, setUser } = useUser();
    const [counter, setCounter] = useState<number>(0);
    const generateRandom = () => Math.floor(Math.random() * 100) + 1;
    const [number, setNumber] = useState<number>(generateRandom());

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
            SendAlert(
                "¡Has perdido!",
                `Has fallado con ${record} aciertos.\n¡Vuelve a intentarlo!`
            );
            if (user && user.record < record) {
                setUser({ ...user, record: record });
            }

            props.functionFinishGame();
        }

        setCounter(newCounter);
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
        backgroundColor: "#670000",
        marginVertical: "50%",
        width: "90%",
        borderRadius: 20,
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
        backgroundColor: "#670000",
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
});
