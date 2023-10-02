import { Audio, AVPlaybackSource } from "expo-av";

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
        console.error("Error while playing sound:", error);
    }
}
