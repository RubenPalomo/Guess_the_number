import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import BackgroundBeauty from "../components/BackgroundBeauty";
import RankingElement from "../components/RankingElement";
import Player from "../types/Player";

export default function Ranking() {
    const rankingElements: Player = {
        name: "",
        record: 0,
    };
    const example: Player[] = [
        {
            name: "Manolito",
            record: 24,
        },
        {
            name: "Sarandonga",
            record: 8,
        },
        {
            name: "Juanito",
            record: 6,
        },
        {
            name: "Pedrito",
            record: 2,
        },
        {
            name: "Topo madre",
            record: 16,
        },
        {
            name: "Sarita",
            record: 13,
        },
    ];
    example.sort((a, b) => b.record - a.record);

    return (
        <BackgroundBeauty
            screen={
                <View style={styles.container}>
                    <View style={styles.rankingTitleContainer}>
                        <Text style={styles.rankingTitleText}>TOP PLAYERS</Text>
                    </View>
                    <ScrollView style={styles.recordContainer}>
                        <RankingElement
                            playerInfo={rankingElements}
                            ranking={0}
                        />
                        {example.map((element, index) => (
                            <RankingElement
                                playerInfo={element}
                                ranking={index + 1}
                                key={index}
                            />
                        ))}
                    </ScrollView>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    recordContainer: {
        flex: 5 / 6,
        backgroundColor: "#670000",
        borderWidth: 5,
        borderColor: "gold",
        width: "80%",
        marginTop: "10%",
        marginBottom: "20%",
        tintColor: "gold",
        color: "gold",
    },
    rankingTitleContainer: {
        flex: 1 / 6,
        width: "100%",
        marginTop: "10%",
    },
    rankingTitleText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "gold",
        textAlignVertical: "center",
        textAlign: "center",
        textShadowColor: "black",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
});
