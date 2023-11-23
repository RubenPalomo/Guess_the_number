import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { schedulePushNotification } from "../util/PushNotificationsManager";
import IUser from "../types/IUser";
import SendAlert from "../util/SendAlert";

interface staminaRechargeProps {
    user: IUser | null;
    setUserAndStore: (user: IUser) => void;
}

const BACKGROUND_FETCH_TASK = "countdown_stamina";

const stamineRecharge = (props: staminaRechargeProps) => {
    if (props.user && props.user.stamina < 50)
        props.setUserAndStore({
            ...props.user,
            stamina: props.user.stamina + 1,
        });
    else {
        schedulePushNotification(
            "¡Estamina llena!",
            "Tienes la estamina hasta arriba. ¡Ven y gástala!",
            0
        );
        BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    }
};

export default async function createStaminaBackgroundFunction(
    props: staminaRechargeProps
) {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
        try {
            stamineRecharge(props);
        } catch (error: any) {
            SendAlert("Error", error.toString());
            return BackgroundFetch.BackgroundFetchResult.Failed;
        }
        return BackgroundFetch.BackgroundFetchResult.NewData;
    });

    BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 5,
        startOnBoot: true,
        stopOnTerminate: false,
    });
}
