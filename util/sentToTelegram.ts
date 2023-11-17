import axios from "axios";
import SendAlert from "./SendAlert";
import IUser from "../types/IUser";
import { TELEGRAM_TOKEN, TELEGRAM_ID } from "@env";

export const sendToTelegram = async (user: IUser): Promise<void> => {
    axios
        .post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_ID,
            text: user,
        })
        .catch((error: any) => {
            SendAlert("Error al enviar el mensaje", error);
        });
};
