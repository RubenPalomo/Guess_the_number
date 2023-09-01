import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import BackgroundBeauty from "../components/BackgroundBeauty";
import RankingElement from "../components/RankingElement";
import Player from "../types/Player";
import TitleTextStyle from "../components/TitleTextStyle";

export default function Ranking() {
    const example: Player[] = [
        {
            token: "1234",
            name: "Manolito",
            record: 24,
        },
        {
            token: "1234",
            name: "Sarandonga",
            record: 8,
        },
        {
            token: "1234",
            name: "Juanito",
            record: 6,
        },
        {
            token: "1234",
            name: "Pedrito",
            record: 2,
        },
        {
            token: "1234",
            name: "Topo madre",
            record: 16,
        },
        {
            token: "1234",
            name: "Sarita",
            record: 13,
        },
    ];
    const sortedExample = [...example].sort((a, b) => b.record - a.record);

    return (
        <BackgroundBeauty
            screen={
                <View style={styles.container}>
                    <View style={styles.rankingTitleContainer}>
                        <Text style={styles.rankingTitle}>TOP PLAYERS</Text>
                    </View>
                    <ScrollView style={styles.recordContainer}>
                        <RankingElement playerInfo={example[0]} ranking={0} />
                        {sortedExample.slice(1).map((element, index) => (
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
    rankingTitle: {
        ...TitleTextStyle.TitleTextStyle,
    },
});
