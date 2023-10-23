import { Audio, AVPlaybackSource } from "expo-av";
import SendAlert from "./SendAlert";

let isSoundEnabled: boolean = true;

export function setEnabledSound(soundEnabled: boolean) {
    isSoundEnabled = soundEnabled;
}

export async function PlaySound(
    audioSource: AVPlaybackSource,
    playInLoop: boolean
) {
    if (!isSoundEnabled) return;

    try {
        const soundObject = new Audio.Sound();

        await soundObject.loadAsync(audioSource);
        await soundObject.playAsync();
        soundObject.setIsLoopingAsync(playInLoop);
    } catch (error) {
        SendAlert("Error", `Error while playing sound: ${error}`);
    }
}
