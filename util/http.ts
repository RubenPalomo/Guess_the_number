import axios from "axios";
import base64 from "base-64";
import { GITHUB_TOKEN, USERNAME, REPO, FILEPATH } from "@env";
import IPlayer from "../types/IPlayer";
import SendAlert from "./SendAlert";

const API_URL: string = `https://api.github.com/repos/${USERNAME}/${REPO}/contents/${FILEPATH}`;

const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
};

export async function getTopPlayers(): Promise<IPlayer[]> {
    const players: IPlayer[] = [];

    await axios
        .get(API_URL, {
            headers: headers,
        })
        .then((response) => {
            const data = response.data;
            const content = JSON.parse(base64.decode(data.content));

            content.players.forEach((element: any) => {
                const player: IPlayer = {
                    token: element.token,
                    name: element.name,
                    record: element.record,
                };
                players.push(player);
            });
        })
        .catch((error) => SendAlert("Error", error));

    return players
        .sort(
            (a: { record: number }, b: { record: number }) =>
                b.record - a.record
        )
        .slice(0, 20);
}
