import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useUser } from "../context/UserContext";
import IUser from "../types/IUser";
import BackgroundBeauty from "../components/BackgroundBeauty";
import ProfileBubble from "../components/ProfileBubble";
import TitleTextStyle from "../components/TitleTextStyle";
import ChangeNameModal from "../components/ChangeNameModal";
import AppButton from "../components/AppButton";

export default function Profile() {
    const { user, setUserAndStore } = useUser();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(user?.name ?? "???");
    const [sound, setSound] = useState<boolean>(user?.soundsOn ?? true);

    const handleSave = (): void => {
        if (user) {
            const updatedUser: IUser = {
                ...user,
                name: username,
                soundsOn: sound,
            };
            setUserAndStore(updatedUser);
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
        marginTop: "10%",
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
