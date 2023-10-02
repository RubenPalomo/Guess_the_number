import axios, { AxiosResponse } from "axios";
import IPlayer from "../types/IPlayer";

const URL = "https://reac-native-example.firebaseio.com";

export function storeRecord(data: IPlayer): void {
    axios.post(URL + "/records.json", data);
}

export async function getPlayersInfo() {
    const response: AxiosResponse<any, any> = await axios.get(
        URL + "/records.json"
    );
    const players: IPlayer[] = [];

    for (const key in response.data) {
        const player: IPlayer = {
            token: response.data[key].token,
            name: response.data[key].name,
            record: response.data[key].record,
        };
        players.push(player);
    }

    return players;
}
