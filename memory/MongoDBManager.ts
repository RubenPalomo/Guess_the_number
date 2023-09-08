import Realm from 'realm';
import IPlayer from '../types/IPlayer';

const playerSchema = {
  name: 'Player',
  properties: {
    token: 'string',
    name: 'string',
    record: 'int',
  },
  primaryKey: 'token',
};

const app = new Realm.App({ id: 'your-realm-app-id' });

const config = {
  schema: [playerSchema],
  sync: {
    user: app.currentUser,
    partitionValue: 'YOUR_PARTITION_KEY',
    newRealmFileBehavior: {
      type: 'openImmediately',
    },
  },
};

const getTopPlayers = async () => {
  const realm = await Realm.open(config);

  const players = realm
    .objects('Player')
    .sorted('record', true)
    .slice(0, 20);

  return players.map((player) => ({
    token: player.token,
    name: player.name,
    record: player.record,
  }));
};

const savePlayerData = async (player: IPlayer) => {
  const realm = await Realm.open(config);

  try {
    realm.write(() => {
      realm.create('Player', player, Realm.UpdateMode.Modified);
    });
  } catch (error) {
    console.error('Error saving player data: ', error);
  }
};

export { getTopPlayers, savePlayerData };
