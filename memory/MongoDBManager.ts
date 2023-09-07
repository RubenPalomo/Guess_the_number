import mongoose, { Model, Schema } from "mongoose";
import IPlayer from "../types/IPlayer";

mongoose.connect("YOUR-MONGODB-TOKEN");

const db = mongoose.connection;
db.on("error", (err) => {
    console.error(`Error with the MongoDB connection: ${err}`);
});
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

const playerSchema = new Schema<IPlayer>({
    token: String,
    name: String,
    record: Number,
});

const MPlayer: Model<IPlayer> = mongoose.model("Player", playerSchema);

async function getTopPlayers(): Promise<IPlayer[]> {
    try {
        const players = await MPlayer.find().sort({ record: -1 }).limit(20);
        return players;
    } catch (error) {
        throw new Error(`Error getting the data: ${error}`);
    }
}

async function savePlayerData(player: IPlayer): Promise<void> {
    const token: string = player.token;
    const playerName: string = player.name;
    const playerRecord: number = player.record;
    try {
        const existingPlayer = await MPlayer.findOne({ token });

        if (existingPlayer) {
            existingPlayer.name = playerName;
            existingPlayer.record = playerRecord;
            await existingPlayer.save();
        } else {
            const newPlayer = new MPlayer(player);

            await newPlayer.save();
        }
    } catch (error) {
        throw new Error(`Error al almacenar los datos del jugador: ${error}`);
    }
}

export { getTopPlayers, savePlayerData };
