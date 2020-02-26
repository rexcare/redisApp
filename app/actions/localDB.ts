import { Dispatch } from 'redux';
import { RedisConnection } from '../types';
import { setConnections } from './connection';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const lowDB = low(adapter);

export const SET_LOCALDB_INIT_STATUS = 'SET_LOCALDB_INIT_STATUS';

const INITIAL_DB_STATE = {
  connections: [],
  connectionCount: 0
};

export const initDB = () => (dispatch: Dispatch) => {
  const result = lowDB.read().getState();

  if (!Object.keys(result).length) {
    lowDB.defaults(INITIAL_DB_STATE).write();
  }

  dispatch({ type: SET_LOCALDB_INIT_STATUS, payload: true });
};

export const getConnections = () => (dispatch: Dispatch) => {
  const connections = lowDB.get('connections').value();
  setConnections(connections)(dispatch);
};

export const addConnection = (connection: RedisConnection) => (
  dispatch: Dispatch
) => {
  lowDB
    .get('connections')
    .push(connection)
    .write();

  lowDB.update('connectionCount', count => count + 1);
};

export const updateConnection = (connection: RedisConnection) => (
  dispatch: Dispatch
) => {
  const { id, ...fieldsForUpdate } = connection;

  lowDB
    .get('connections')
    .find({ id })
    .assign({ ...fieldsForUpdate })
    .write();
};

export const removeConnection = (id: string) => (dispatch: Dispatch) => {
  lowDB
    .get('connections')
    .remove({ id })
    .write();

  lowDB.update('connectionCount', count => count - 1);
};
