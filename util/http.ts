import axios, { AxiosResponse } from "axios";
import { getToken } from "./getToken";
import IPlayer from "../types/IPlayer";
import IUser from "../types/IUser";
import { API_URL } from "@env";

const getPlayer = (token: string, user: IUser): IPlayer => {
    return {
        token: token,
        name: user.name,
        record: user.record,
    };
};

async function createPlayer(player: IPlayer) {
    axios
        .post(API_URL + "/add/player", player)
        .then((response: any) => console.log(response))
        .catch((err) => console.error(err));
}

export async function updatePlayer(user: IUser): Promise<void> {
    const token = await getToken();

    if (token) {
        const player: IPlayer = getPlayer(token, user);

        axios.put(API_URL + `/edit/player/${token}`, player).catch((err) => {
            if (err.response.status === 404) createPlayer(player);
        });
    }
}

export async function getTopPlayers(): Promise<IPlayer[]> {
    const response: AxiosResponse<any, any> = await axios.get(
        API_URL + "/players"
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
