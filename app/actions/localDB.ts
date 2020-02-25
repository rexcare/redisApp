import { Dispatch } from 'redux';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileAsync';
import { RedisConnection } from '../types';

const adapter = new FileSync('db.json');
const db = low(adapter);

export const SET_LOCALDB_INIT_STATUS = 'SET_LOCALDB_INIT_STATUS';

const INITIAL_DB_STATE = {
  connections: [],
  connectionCount: 0
};

export const initDB = () => (dispatch: Dispatch) => {
  db.read()
    .then(() => {
      console.log('loaded db');
      return null;
    })
    .catch(() => {
      console.log('creating db');
      db.defaults(INITIAL_DB_STATE).write();
    });

  dispatch({
    type: SET_LOCALDB_INIT_STATUS,
    payload: true
  });
};

export const addConnection = (connection: RedisConnection) => (
  dispatch: Dispatch
) => {
  db.get('connections')
    .push(connection)
    .write();
};

export const editConnection = (connection: RedisConnection) => (
  dispatch: Dispatch
) => {
  const { id, ...fieldsForUpdate } = connection;

  db.get('connections')
    .find({ id })
    .assign({ fieldsForUpdate })
    .write();
};

export const removeConnection = (id: string) => (dispatch: Dispatch) => {
  db.get('connections')
    .remove({ id })
    .write();
};
