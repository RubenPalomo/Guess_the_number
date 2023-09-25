import React, { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet } from "react-native";
import AppButton from "./AppButton";
import SendAlert from "../app-functions/SendAlert";
import { colors } from "../constants/colors";

interface ChangeNameModalProps {
    isModalVisible: boolean;
    changeModalVisibility: () => void;
    changeNameFunction: (newName: string) => void;
}

export default function ChangeNameModal(props: ChangeNameModalProps) {
    const [textInputValue, setTextInputValue] = useState<string>("");

    const handleChangeName = () => {
        const textToSave = textInputValue.trim();

        if (textToSave.length > 10)
            SendAlert(
                "Demasiado largo",
                "El nombre debe de contener 10 caracteres como máximo"
            );
        else if (textToSave !== "") {
            props.changeModalVisibility();
            props.changeNameFunction(textToSave);
            setTextInputValue("");
        }
    };

    const handleCancel = () => {
        props.changeModalVisibility();
        setTextInputValue("");
    };

    return (
        <Modal
            visible={props.isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.instructions}>Nuevo nombre:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={textInputValue}
                        onChangeText={(text) => setTextInputValue(text)}
                        onSubmitEditing={handleChangeName}
                        autoFocus={true}
                    />
                    <AppButton
                        textButton="Guardar"
                        functionButton={handleChangeName}
                    />
                    <AppButton
                        textButton="Cancelar"
                        functionButton={handleCancel}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.mainColor,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: "center",
        width: "90%",
        marginVertical: "62%",
        minHeight: 310,
    },
    textInput: {
        width: "90%",
        borderWidth: 1,
        borderColor: "gold",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        fontSize: 20,
        color: "gold",
        minHeight: 50,
    },
    instructions: {
        fontSize: 20,
        textAlign: "left",
        width: "100%",
        color: "gold",
    },
});
