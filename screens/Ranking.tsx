import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import BackgroundBeauty from "../components/BackgroundBeauty";
import RankingElement from "../components/RankingElement";
import IPlayer from "../types/IPlayer";
import TitleTextStyle from "../components/TitleTextStyle";
import { getTopPlayers } from "../memory/MongoDBManager";

export default function Ranking() {
    const [topPlayers, setTopPlayers] = useState<IPlayer[]>([]);

    // useEffect(() => {
    //     getTopPlayers()
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             setTopPlayers([]);
    //             console.log(`Error getting data from MongoDB: ${error}`);
    //         });
    // }, []);

    return (
        <BackgroundBeauty
            screen={
                <View style={styles.rankingContainer}>
                    <View style={styles.rankingTitleContainer}>
                        <Text style={styles.rankingTitle}>TOP PLAYERS</Text>
                    </View>
                    <ScrollView style={styles.recordContainer}>
                        <RankingElement playerInfo={null} ranking={0} />
                        {topPlayers.map((element, index) => (
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
    rankingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "5%",
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
