import React, { createContext, useContext, useState, useEffect } from "react";
import { _retrieveUserData } from "../memory/InternalDataManager";
import IUser from "../types/IUser";
import SendAlert from "../app-functions/SendAlert";

type UserContextType = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    fetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [user, setUser] = useState<IUser | null>(null);

    const fetchUser = async () => {
        try {
            const storedUser = await _retrieveUserData();
            setUser(storedUser);
        } catch (error: any) {
            SendAlert("Error fetching user:", error.toString());
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser }}>
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
