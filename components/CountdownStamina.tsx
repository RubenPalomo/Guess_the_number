import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

interface countdownStaminaProps {
    currentTime: Date;
    setCurrentTime: React.Dispatch<React.SetStateAction<Date>>;
    activate: boolean;
}

export default function CountdownStamina(props: countdownStaminaProps) {
    const { user, setUserAndStore } = useUser();
    const getFutureDate = () =>
        new Date(props.currentTime.getTime() + 10 * 60 * 1000);
    const [timeRemaining, setTimeRemaining] = useState<number>(
        getFutureDate().getTime() - props.currentTime.getTime()
    );
    const minutes: number = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds: number = Math.floor((timeRemaining / 1000) % 60);
    const [timeIcon, setTimeIcon] = useState<React.JSX.Element>(
        <MaterialCommunityIcons name="timer-sand" size={18} color="white" />
    );
    let intervalId: NodeJS.Timeout | null;

    const createTimer = (): NodeJS.Timeout | null => {
        if (props.activate === false) return null;

        const intervalId = setInterval(() => {
            const timeDifference: number =
                getFutureDate().getTime() - new Date().getTime();

            setTimeRemaining(timeDifference);

            Math.floor((timeDifference / 1000) % 60) % 2 === 0
                ? setTimeIcon(
                      <MaterialCommunityIcons
                          name="timer-sand"
                          size={10}
                          color="white"
                      />
                  )
                : setTimeIcon(
                      <MaterialCommunityIcons
                          name="timer-sand-complete"
                          size={10}
                          color="white"
                      />
                  );

            if (timeDifference <= 0) {
                if (user) {
                    if (user.stamina < 50) props.setCurrentTime(new Date());
                    setUserAndStore({ ...user, stamina: user.stamina + 1 });
                }

                clearInterval(intervalId);
                return null;
            }
        }, 1000);

        return intervalId;
    };

    useEffect(() => {
        if (intervalId !== null) intervalId = createTimer();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };
    }, [props.activate]);

    return props.activate === false || minutes === 10 ? (
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
        bottom: -2,
        right: 0,
    },
    counterElementContainer: {
        justifyContent: "center",
        alignContent: "center",
        margin: 1,
    },
    counterText: {
        color: "white",
        textAlign: "center",
        fontSize: 10,
    },
});
