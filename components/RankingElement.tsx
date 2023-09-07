import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import IPlayer from "../types/IPlayer";

export default function RankingElement(props: {
    playerInfo: IPlayer | null;
    ranking: number;
}) {
    if (props.ranking === 0)
        return (
            <View
                style={[
                    styles.rankingElementContainer,
                    { backgroundColor: "black" },
                ]}
            >
                <Text style={styles.rankingTitle}>Rango</Text>

                <Text style={[styles.rankingTitle, { flex: 3 }]}>Nombre</Text>
                <Text style={styles.rankingTitle}>Puntos</Text>
            </View>
        );

    return (
        <View style={styles.rankingElementContainer}>
            {props.ranking === 1 ? (
                <Text style={styles.rankingText}>
                    <FontAwesome5 name="crown" size={20} color="gold" />
                </Text>
            ) : (
                <Text style={styles.rankingText}>{props.ranking}</Text>
            )}

            <Text style={[styles.rankingText, { flex: 3 }]}>
                {props.playerInfo?.name}
            </Text>
            <Text style={styles.rankingText}>{props.playerInfo?.record}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    rankingElementContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "indigo",
    },
    rankingText: {
        flex: 1,
        borderWidth: 1,
        color: "gold",
        textAlign: "center",
        padding: 5,
        fontSize: 18,
    },
    rankingTitle: {
        flex: 1,
        borderWidth: 1,
        color: "gold",
        textAlign: "center",
        padding: 5,
        fontSize: 12,
    },
});
