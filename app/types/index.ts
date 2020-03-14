export interface RedisConnection {
  id: string;
  name: string;
  host: string;
  port: string;
  password: string;
  db: string;
}

export interface ResultType {
  key: string;
  type: string;
  value: any;
}

export const REDIS_DATATYPE = {
  STRING: 'string',
  LIST: 'list',
  SET: 'set',
  ZSET: 'zset',
  HASH: 'hash',
  STREAM: 'stream'
};
