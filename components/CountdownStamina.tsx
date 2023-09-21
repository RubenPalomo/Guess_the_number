import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

interface countdownStaminaProps {
    currentTime: Date;
    activate: boolean;
    deactivateCountdown: () => void;
    getNewDate: () => Date;
}

export default function CountdownStamina(props: countdownStaminaProps) {
    const { user, setUserAndStore } = useUser();
    const [countdownIntervalId, setCountdownIntervalId] =
        useState<NodeJS.Timeout | null>();
    const [futureDateTime, setFutureDateTime] = useState<number>(
        props.currentTime.getTime() + 1 * 60 * 1000
    );
    const [timeRemaining, setTimeRemaining] = useState<number>(
        futureDateTime - props.currentTime.getTime()
    );
    const minutes: number = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds: number = Math.floor((timeRemaining / 1000) % 60);
    const [timeIcon, setTimeIcon] = useState<React.JSX.Element>(
        <MaterialCommunityIcons name="timer-sand" size={10} color="white" />
    );

    const handleCountdownCompletion = () => {
        console.log(user);
        if (user && user.stamina < 50)
            setUserAndStore({ ...user, stamina: user.stamina + 1 });
    };

    const createTimer = (): NodeJS.Timeout | null => {
        if (!props.activate) return null;

        setFutureDateTime(props.getNewDate().getTime() + 1 * 60 * 1000);

        const intervalId = setInterval(() => {
            const timeDifference: number =
                futureDateTime - new Date().getTime();

            setTimeRemaining(timeDifference);

            Math.floor((timeDifference / 1000) % 60) % 2 === 0
                ? setTimeIcon(
                      <MaterialCommunityIcons
                          name="timer-sand"
                          size={12}
                          color="white"
                      />
                  )
                : setTimeIcon(
                      <MaterialCommunityIcons
                          name="timer-sand-complete"
                          size={12}
                          color="white"
                      />
                  );

            if (timeDifference <= 0) {
                clearInterval(intervalId);
                handleCountdownCompletion();
                setCountdownIntervalId(null);
                props.deactivateCountdown();
                return null;
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

    return props.activate === false || minutes === 10 || minutes < 0 ? (
        <View style={styles.counterContainer} />
    ) : (
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
