import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import IUser from "../types/IUser";

interface staminaRechargeProps {
    user: IUser | null;
    setUserAndStore: (user: IUser) => void;
}

const BACKGROUND_FETCH_TASK = "countdown_stamina";
const stamineRecharge = (props: staminaRechargeProps) => {
    props.user && props.user.stamina < 50
        ? props.setUserAndStore({
              ...props.user,
              stamina: props.user.stamina + 1,
          })
        : BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
};

export default async function createStaminaBackgroundFunction(
    props: staminaRechargeProps
) {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
        try {
            stamineRecharge(props);
        } catch (error) {
            console.log(error);
            return BackgroundFetch.BackgroundFetchResult.Failed;
        }
        return BackgroundFetch.BackgroundFetchResult.NewData;
    });

    BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 10,
        startOnBoot: true,
        stopOnTerminate: false,
    });
}
