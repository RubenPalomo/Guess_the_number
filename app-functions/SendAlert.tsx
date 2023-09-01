import { Alert } from "react-native";

export default function SendAlert(title: string, message: string) {
    Alert.alert(title, message);
}
