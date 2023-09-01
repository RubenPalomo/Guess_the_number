import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import User from "../types/User";
import BackgroundBeauty from "../components/BackgroundBeauty";
import ProfileBubble from "../components/ProfileBubble";
import TitleTextStyle from "../components/TitleTextStyle";
import ChangeNameModal from "../components/ChangeNameModal";
import AppButton from "../components/AppButton";

export default function Profile() {
    const [user, setUser] = useState<User>({
        name: "Sarandonga",
        record: 0,
        soundsOn: true,
        stamina: 3,
    });

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(user.name);
    const [sound, setSound] = useState<boolean>(user.soundsOn);

    const handleSave = (): void => {
        setUser({
            name: username,
            record: user.record,
            soundsOn: sound,
            stamina: user.stamina,
        });
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
                            text={username}
                            functionChangeModalVisibility={() => {
                                setIsModalVisible(!isModalVisible);
                            }}
                        />
                        <ProfileBubble
                            tag="Sonido"
                            text={sound.toString()}
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
                        oldName={username}
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
