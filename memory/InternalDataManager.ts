import AsyncStorage from "@react-native-async-storage/async-storage";
import SendAlert from "../app-functions/SendAlert";
import User from "../types/User";

export const _retrieveUserData = async (): Promise<User> => {
    try {
        const storedData = await AsyncStorage.getItem("UserGuessTheNumber");
        let user: User;

        if (storedData !== null) user = JSON.parse(storedData);
        else {
            user = {
                name: "User",
                record: 0,
                soundsOn: true,
                stamina: 50,
            };
            await _storeUserData(user);
        }

        return user;
    } catch (error: any) {
        SendAlert("Error", error.toString());
        throw error;
    }
};

export const _storeUserData = async (dataToStore: User) => {
    try {
        await AsyncStorage.setItem(
            "UserGuessTheNumber",
            JSON.stringify(dataToStore)
        );
    } catch (error: any) {
        SendAlert("Error", error.toString());
    }
};

export const _updateUserData = async (updatedUser: Partial<User>) => {
    try {
        const storedData = await AsyncStorage.getItem("UserGuessTheNumber");

        if (storedData !== null) {
            const storedUser: User = JSON.parse(storedData);
            const updatedData: User = { ...storedUser, ...updatedUser };

            await AsyncStorage.setItem(
                "UserGuessTheNumber",
                JSON.stringify(updatedData)
            );
        }
    } catch (error: any) {
        SendAlert("Error", error.toString());
    }
};