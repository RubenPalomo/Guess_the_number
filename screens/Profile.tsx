import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import User from "../types/User";
import BackgroundBeauty from "../components/BackgroundBeauty";
import ProfileBubble from "../components/ProfileBubble";
import TitleTextStyle from "../components/TitleTextStyle";
import ChangeNameModal from "../components/ChangeNameModal";
import AppButton from "../components/AppButton";
import {
    _retrieveUserData,
    _updateUserData,
} from "../memory/InternalDataManager";
import SendAlert from "../app-functions/SendAlert";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(user?.name ?? "???");
    const [sound, setSound] = useState<boolean>(user?.soundsOn ?? true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = await _retrieveUserData();
                setUser(storedUser);
                if (storedUser) {
                    setUsername(storedUser.name);
                    setSound(storedUser.soundsOn);
                }
            } catch (error: any) {
                SendAlert("Error", error.toString());
            }
        };
        fetchData();
    }, []);

    const handleSave = (): void => {
        if (user) {
            const updatedUser: User = {
                ...user,
                name: username,
                soundsOn: sound,
            };
            _updateUserData(updatedUser);
            setUser(updatedUser);
        }
    };

    return (
        <BackgroundBeauty
            screen={
                <View style={styles.profileContainer}>
                    <View style={styles.profileTitleContainer}>
                        <Text style={styles.profileTitle}>
                            Opciones de perfil
                        </Text>
                    </View>
                    <View style={styles.profileBubbleContainer}>
                        <ProfileBubble
                            tag="Nombre"
                            name={username}
                            functionChangeModalVisibility={() => {
                                setIsModalVisible(!isModalVisible);
                            }}
                        />
                        <ProfileBubble
                            tag="Sonido"
                            sound={sound}
                            functionChangeSound={(isSoundOn: boolean) => {
                                setSound(isSoundOn);
                            }}
                        />
                    </View>
                    <View style={styles.profileTitleContainer}>
                        <AppButton
                            textButton="Guardar cambios"
                            functionButton={handleSave}
                        />
                    </View>
                    <ChangeNameModal
                        isModalVisible={isModalVisible}
                        changeModalVisibility={() =>
                            setIsModalVisible(!isModalVisible)
                        }
                        changeNameFunction={(newName: string) => {
                            setUsername(newName);
                        }}
                    />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    profileTitleContainer: {
        flex: 1,
    },
    profileTitle: {
        ...TitleTextStyle.TitleTextStyle,
        marginTop: "6%",
    },
    profileBubbleContainer: {
        flex: 2,
        width: "100%",
        marginBottom: "20%",
    },
});
