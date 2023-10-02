import React, { createContext, useContext, useState, useEffect } from "react";
import {
    _retrieveUserData,
    _storeUserData,
} from "../memory/InternalDataManager";
import { setEnabledSound } from "../util/PlaySound";
import IUser from "../types/IUser";
import SendAlert from "../util/SendAlert";

type UserContextType = {
    user: IUser | null;
    setUserAndStore: (user: IUser | null) => void;
    regenerateStamina: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<IUser | null>(null);

    const fetchUser = async (): Promise<void> => {
        try {
            const storedUser = await _retrieveUserData();
            setUser(storedUser);
            setEnabledSound(storedUser.soundsOn);
        } catch (error: any) {
            SendAlert("Error fetching user:", error.toString());
        }
    };

    const setUserAndStore = (newUser: IUser | null): void => {
        setUser(newUser);

        if (newUser) {
            _storeUserData(newUser);
        }
    };

    const regenerateStamina = (): void => {
        if (user) {
            const updatedUser = { ...user, stamina: user.stamina + 1 };
            console.log(updatedUser);
            setUserAndStore(updatedUser);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUserAndStore, regenerateStamina }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser debe utilizarse dentro de un UserProvider");
    }

    return context;
};
