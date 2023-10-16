import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CountdownIcon from "./CountdownIcon";
import { useUser } from "../context/UserContext";

interface countdownStaminaProps {
    deadlineDate: number;
    activate: boolean;
    deactivateCountdown: () => void;
}

export default function CountdownStamina(props: countdownStaminaProps) {
    const { regenerateStamina } = useUser();
    const [isCounterFinalized, setIsCounterFinalized] = useState<boolean>(false);
    const [countdownIntervalId, setCountdownIntervalId] =
        useState<NodeJS.Timeout | null>();
    const [timeRemaining, setTimeRemaining] = useState<number>(
        props.deadlineDate - new Date().getTime()
    );
    const minutes: number = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds: number = Math.floor((timeRemaining / 1000) % 60);
    const [timeIcon, setTimeIcon] = useState<React.JSX.Element>(
        <CountdownIcon />
    );

    const createTimer = (): NodeJS.Timeout | null => {
        const intervalId = setInterval(() => {
            setIsCounterFinalized(false);
            const timeDifference: number =
                props.deadlineDate - new Date().getTime();

            setTimeRemaining(timeDifference);

            setTimeIcon(
                <CountdownIcon
                    isComplete={
                        Math.floor((timeDifference / 1000) % 60) % 2 !== 0
                    }
                />
            );

            if (Math.floor(timeDifference / 1000) <= 0) {
                clearInterval(intervalId);
                setCountdownIntervalId(null);
                props.deactivateCountdown();
                setIsCounterFinalized(true);
            }
        }, 1000);

        return intervalId;
    };

    useEffect(() => {
        if (!countdownIntervalId && props.activate)
            setCountdownIntervalId(createTimer());

        return () => {
            if (countdownIntervalId) {
                clearInterval(countdownIntervalId);
                setCountdownIntervalId(null);
            }
        };
    }, [props.activate]);

    useEffect(() => {
        if (isCounterFinalized === true) regenerateStamina();
    }, [isCounterFinalized]);

    return props.activate && minutes < 10 && seconds > 0 ? (
        <View style={styles.counterContainer}>
            <View style={styles.counterElementContainer}>{timeIcon}</View>
            <View style={styles.counterElementContainer}>
                {seconds >= 10 ? (
                    <Text style={styles.counterText}>
                        0{minutes}:{seconds}
                    </Text>
                ) : (
                    <Text style={styles.counterText}>
                        0{minutes}:0{seconds}
                    </Text>
                )}
            </View>
        </View>
    ) : (
        <View style={styles.counterContainer} />
    );
}

const styles = StyleSheet.create({
    counterContainer: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        bottom: "5%",
        right: "8%",
    },
    counterElementContainer: {
        justifyContent: "center",
        alignContent: "center",
        margin: 1,
    },
    counterText: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
});
