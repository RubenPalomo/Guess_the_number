import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function schedulePushNotification(
    title: string,
    body: string,
    time: number
) {
    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            // data: { data: 'goes here' },
        },
        trigger: { seconds: time },
    });

    return notificationId;
}

export async function cancelScheduledNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
}
