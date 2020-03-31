import { openDatabase } from 'expo-sqlite';

const db = openDatabase('places.db');

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const insertPlace = ({ title, imageUri, address, lat, lng }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
        [title, imageUri, address, lat, lng],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};
