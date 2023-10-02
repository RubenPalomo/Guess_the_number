import AsyncStorage from "@react-native-async-storage/async-storage";
import SendAlert from "../util/SendAlert";
import IUser from "../types/IUser";

export const _retrieveUserData = async (): Promise<IUser> => {
    try {
        const storedData = await AsyncStorage.getItem("UserGuessTheNumber");
        let user: IUser;

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

export const _storeUserData = async (dataToStore: IUser) => {
    try {
        await AsyncStorage.setItem(
            "UserGuessTheNumber",
            JSON.stringify(dataToStore)
        );
    } catch (error: any) {
        SendAlert("Error", error.toString());
    }
};

export const _updateUserData = async (updatedUser: Partial<IUser>) => {
    try {
        const storedData = await AsyncStorage.getItem("UserGuessTheNumber");

        if (storedData !== null) {
            const storedUser: IUser = JSON.parse(storedData);
            const updatedData: IUser = { ...storedUser, ...updatedUser };

            await AsyncStorage.setItem(
                "UserGuessTheNumber",
                JSON.stringify(updatedData)
            );
        }
    } catch (error: any) {
        SendAlert("Error", error.toString());
    }
};
