import axios from "axios";
import { TELEGRAM_TOKEN, TELEGRAM_ID } from "@env";
import { getToken } from "./getToken";
import SendAlert from "./SendAlert";
import IUser from "../types/IUser";
import IPlayer from "../types/IPlayer";

export const sendToTelegram = async (user: IUser): Promise<void> => {
    const token: string | undefined = await getToken();

    if (token !== undefined) {
        const player: IPlayer = {
            token: token,
            name: user.name,
            record: user.record,
        };

        axios
            .post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                chat_id: TELEGRAM_ID,
                text: player,
            })
            .catch((error: any) => {
                SendAlert("Error al enviar el mensaje", error);
            });
    }
};
