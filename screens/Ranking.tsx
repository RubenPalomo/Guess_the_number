import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { getTopPlayers } from "../util/http";
import { colors } from "../constants/colors";
import BackgroundBeauty from "../components/BackgroundBeauty";
import RankingElement from "../components/RankingElement";
import IPlayer from "../types/IPlayer";
import TitleTextStyle from "../components/TitleTextStyle";
import AppButton from "../components/AppButton";

export default function Ranking() {
    const [topPlayers, setTopPlayers] = useState<IPlayer[]>([]);
    const [refreshEnabled, setRefreshEnabled] = useState<boolean>(false);

    const refreshScore = async (): Promise<void> => {
        setRefreshEnabled(false);
        setTopPlayers([]);
        setTopPlayers(await getTopPlayers());
        setRefreshEnabled(true);
    };

    useEffect(() => {
        refreshScore();
    }, []);

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
                        {topPlayers.length === 0 && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                style={styles.waiting}
                            />
                        )}
                    </ScrollView>
                    <View style={styles.refreshButtonContainer}>
                        <AppButton
                            textButton="Refresh"
                            functionButton={refreshScore}
                            disabled={!refreshEnabled}
                        />
                    </View>
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
        backgroundColor: colors.mainColor,
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
    waiting: {
        marginTop: "50%",
    },
    refreshButtonContainer: {
        marginTop: "-18%",
        marginBottom: "2%",
    },
});
