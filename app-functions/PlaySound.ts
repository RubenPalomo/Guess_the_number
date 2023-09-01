import { Audio, AVPlaybackSource } from "expo-av";

export async function PlaySound(
    audioSource: AVPlaybackSource,
    playInLoop: boolean
) {
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(audioSource);
        await soundObject.playAsync();
        soundObject.setIsLoopingAsync(playInLoop);
    } catch (error) {
        console.error("Error while playing sound:", error);
    }
}
