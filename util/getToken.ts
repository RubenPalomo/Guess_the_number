import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import SendAlert from "./SendAlert";

export const getToken = async () => {
    let token: string = "";

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            SendAlert("Error", "Failed to get token!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        SendAlert("Error", "Must use physical device for Push Notifications");
    }

    return token;
};
