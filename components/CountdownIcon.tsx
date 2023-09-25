import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CountdownIcon(props: { isComplete?: boolean }) {
    return props.isComplete ? (
        <MaterialCommunityIcons
            name="timer-sand-complete"
            size={12}
            color="white"
        />
    ) : (
        <MaterialCommunityIcons name="timer-sand" size={12} color="white" />
    );
}
