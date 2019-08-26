/*
 * Type definitions for ioredis-mock 4.16
 *
 * Project: https://github.com/stipsan/ioredis-mock
 *
 * This definitions are based on the definitions found on @types/ioredis
 * (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/ioredis/index.d.ts)
 */

type KeyType = string | Buffer;

interface IMultiOptions {
  pipeline: boolean;
}

interface IPartialIORedis {
  append(key: KeyType, value: any, callback: (err: Error, res: number) => void): void;
  append(key: KeyType, value: any): Promise<number>;

  auth(password: string, callback: (err: Error, res: string) => void): void;
  auth(password: string): Promise<string>;

  bgrewriteaof(callback: (err: Error, res: string) => void): void;
  bgrewriteaof(): Promise<string>;

  bgsave(callback: (err: Error, res: string) => void): void;
  bgsave(): Promise<string>;

  brpoplpush(source: string, destination: string, timeout: number, callback: (err: Error, res: any) => void): void;
  brpoplpush(source: string, destination: string, timeout: number): Promise<any>;

  dbsize(callback: (err: Error, res: number) => void): void;
  dbsize(): Promise<number>;

  decr(key: KeyType, callback: (err: Error, res: number) => void): void;
  decr(key: KeyType): Promise<number>;

  decrby(key: KeyType, decrement: number, callback: (err: Error, res: number) => void): void;
  decrby(key: KeyType, decrement: number): Promise<number>;

  del(...keys: KeyType[]): Promise<number>;

  discard(callback: (err: Error, res: any) => void): void;
  discard(): Promise<any>;

  echo(message: string, callback: (err: Error, res: string) => void): void;
  echo(message: string): Promise<string>;

  eval(...args: any[]): any;

  exec(callback: (err: Error, res: any) => void): void;
  exec(): Promise<any>;

  exists(...keys: KeyType[]): Promise<number>;
  exists(key: KeyType, callback: (err: Error, res: number) => void): void;

  expire(key: KeyType, seconds: number, callback: (err: Error, res: 0 | 1) => void): void;
  expire(key: KeyType, seconds: number): Promise<0 | 1>;

  expireat(key: KeyType, timestamp: number, callback: (err: Error, res: 0 | 1) => void): void;
  expireat(key: KeyType, timestamp: number): Promise<0 | 1>;

  flushall(callback: (err: Error, res: string) => void): void;
  flushall(): Promise<string>;

  flushdb(callback: (err: Error, res: string) => void): void;
  flushdb(): Promise<string>;

  get(key: KeyType, callback: (err: Error, res: string | null) => void): void;
  get(key: KeyType): Promise<string | null>;

  getbit(key: KeyType, offset: number, callback: (err: Error, res: number) => void): void;
  getbit(key: KeyType, offset: number): Promise<number>;

  getrange(key: KeyType, start: number, end: number, callback: (err: Error, res: string) => void): void;
  getrange(key: KeyType, start: number, end: number): Promise<string>;

  getset(key: KeyType, value: any, callback: (err: Error, res: string | null) => void): void;
  getset(key: KeyType, value: any): Promise<string | null>;

  hdel(key: KeyType, ...fields: string[]): any;

  hexists(key: KeyType, field: string, callback: (err: Error, res: 0 | 1) => void): void;
  hexists(key: KeyType, field: string): Promise<0 | 1>;

  hget(key: KeyType, field: string, callback: (err: Error, res: string | null) => void): void;
  hget(key: KeyType, field: string): Promise<string | null>;

  hgetall(key: KeyType, callback: (err: Error, res: any) => void): void;
  hgetall(key: KeyType): Promise<any>;

  hincrby(key: KeyType, field: string, increment: number, callback: (err: Error, res: number) => void): void;
  hincrby(key: KeyType, field: string, increment: number): Promise<number>;

  hincrbyfloat(key: KeyType, field: string, increment: number, callback: (err: Error, res: number) => void): void;
  hincrbyfloat(key: KeyType, field: string, increment: number): Promise<number>;

  hkeys(key: KeyType, callback: (err: Error, res: any) => void): void;
  hkeys(key: KeyType): Promise<any>;

  hlen(key: KeyType, callback: (err: Error, res: number) => void): void;
  hlen(key: KeyType): Promise<number>;

  hmget(key: KeyType, ...fields: string[]): any;

  hmset(key: KeyType, ...args: any[]): Promise<0 | 1>;
  hmset(key: KeyType, data: any, callback: (err: Error, res: 0 | 1) => void): void;
  hmset(key: KeyType, data: any): Promise<0 | 1>;

  hscan(key: KeyType, cursor: number, ...args: any[]): any;

  hset(key: KeyType, field: string, value: any, callback: (err: Error, res: 0 | 1) => void): void;
  hset(key: KeyType, field: string, value: any): Promise<0 | 1>;

  hsetnx(key: KeyType, field: string, value: any, callback: (err: Error, res: 0 | 1) => void): void;
  hsetnx(key: KeyType, field: string, value: any): Promise<0 | 1>;

  hstrlen(key: KeyType, field: string, callback?: (err: Error, res: number) => void): void;
  hstrlen(key: KeyType, field: string): Promise<number>;

  hvals(key: KeyType, callback: (err: Error, res: any) => void): void;
  hvals(key: KeyType): Promise<any>;

  incr(key: KeyType, callback: (err: Error, res: number) => void): void;
  incr(key: KeyType): Promise<number>;

  incrby(key: KeyType, increment: number, callback: (err: Error, res: number) => void): void;
  incrby(key: KeyType, increment: number): Promise<number>;

  incrbyfloat(key: KeyType, increment: number, callback: (err: Error, res: number) => void): void;
  incrbyfloat(key: KeyType, increment: number): Promise<number>;

  keys(pattern: string, callback: (err: Error, res: string[]) => void): void;
  keys(pattern: string): Promise<string[]>;

  lastsave(callback: (err: Error, res: number) => void): void;
  lastsave(): Promise<number>;

  lindex(key: KeyType, index: number, callback: (err: Error, res: string) => void): void;
  lindex(key: KeyType, index: number): Promise<string>;

  llen(key: KeyType, callback: (err: Error, res: number) => void): void;
  llen(key: KeyType): Promise<number>;

  lpop(key: KeyType, callback: (err: Error, res: string) => void): void;
  lpop(key: KeyType): Promise<string>;

  lpush(key: KeyType, ...values: any[]): any;

  lpushx(key: KeyType, value: any, callback: (err: Error, res: number) => void): void;
  lpushx(key: KeyType, value: any): Promise<number>;

  lrange(key: KeyType, start: number, stop: number, callback: (err: Error, res: any) => void): void;
  lrange(key: KeyType, start: number, stop: number): Promise<any>;

  lrem(key: KeyType, count: number, value: any, callback: (err: Error, res: number) => void): void;
  lrem(key: KeyType, count: number, value: any): Promise<number>;

  lset(key: KeyType, index: number, value: any, callback: (err: Error, res: any) => void): void;
  lset(key: KeyType, index: number, value: any): Promise<any>;

  ltrim(key: KeyType, start: number, stop: number, callback: (err: Error, res: any) => void): void;
  ltrim(key: KeyType, start: number, stop: number): Promise<any>;

  mget(...keys: KeyType[]): any;

  mset(...args: any[]): any;
  mset(data: any, callback: (err: Error, res: string) => void): void;
  mset(data: any): Promise<string>;

  msetnx(...args: any[]): any;
  msetnx(data: any, callback: (err: Error, res: 0 | 1) => void): void;
  msetnx(data: any): Promise<0 | 1>;

  multi(commands?: string[][], options?: IMultiOptions): IPipeline;
  multi(options: { pipeline: false }): Promise<string>;

  persist(key: KeyType, callback: (err: Error, res: 0 | 1) => void): void;
  persist(key: KeyType): Promise<0 | 1>;

  pexpire(key: KeyType, milliseconds: number, callback: (err: Error, res: 0 | 1) => void): void;
  pexpire(key: KeyType, milliseconds: number): Promise<0 | 1>;

  pexpireat(key: KeyType, millisecondsTimestamp: number, callback: (err: Error, res: 0 | 1) => void): void;
  pexpireat(key: KeyType, millisecondsTimestamp: number): Promise<0 | 1>;

  ping(callback: (err: Error, res: string) => void): void;
  ping(message: string, callback: (err: Error, res: string) => void): void;
  ping(message?: string): Promise<string>;

  psetex(key: KeyType, milliseconds: number, value: any, callback: (err: Error, res: any) => void): void;
  psetex(key: KeyType, milliseconds: number, value: any): Promise<any>;

  psubscribe(...patterns: string[]): any;

  pttl(key: KeyType, callback: (err: Error, res: number) => void): void;
  pttl(key: KeyType): Promise<number>;

  publish(channel: string, message: string, callback: (err: Error, res: number) => void): void;
  publish(channel: string, message: string): Promise<number>;

  punsubscribe(...patterns: string[]): any;

  quit(callback: (err: Error, res: string) => void): void;
  quit(): Promise<string>;

  randomkey(callback: (err: Error, res: string) => void): void;
  randomkey(): Promise<string>;

  rename(key: KeyType, newkey: KeyType, callback: (err: Error, res: string) => void): void;
  rename(key: KeyType, newkey: KeyType): Promise<string>;

  renamenx(key: KeyType, newkey: KeyType, callback: (err: Error, res: 0 | 1) => void): void;
  renamenx(key: KeyType, newkey: KeyType): Promise<0 | 1>;

  role(): any;

  rpop(key: KeyType, callback: (err: Error, res: string) => void): void;
  rpop(key: KeyType): Promise<string>;

  rpoplpush(source: string, destination: string, callback: (err: Error, res: string) => void): void;
  rpoplpush(source: string, destination: string): Promise<string>;

  rpush(key: KeyType, ...values: any[]): any;

  rpushx(key: KeyType, value: any, callback: (err: Error, res: number) => void): void;
  rpushx(key: KeyType, value: any): Promise<number>;

  sadd(key: KeyType, ...members: any[]): any;

  save(callback: (err: Error, res: string) => void): void;
  save(): Promise<string>;

  scan(cursor: number): Promise<[string, string[]]>;
  scan(cursor: number, matchOption: 'match' | 'MATCH', pattern: string): Promise<[string, string[]]>;
  scan(cursor: number, countOption: 'count' | 'COUNT', count: number): Promise<[string, string[]]>;
  scan(cursor: number, matchOption: 'match' | 'MATCH', pattern: string, countOption: 'count' | 'COUNT', count: number): Promise<[string, string[]]>;
  scan(cursor: number, countOption: 'count' | 'COUNT', count: number, matchOption: 'match' | 'MATCH', pattern: string): Promise<[string, string[]]>;

  scard(key: KeyType, callback: (err: Error, res: number) => void): void;
  scard(key: KeyType): Promise<number>;

  sdiff(...keys: KeyType[]): any;

  set(key: KeyType, value: any, expiryMode?: string | any[], time?: number | string, setMode?: number | string): Promise<string>;
  set(key: KeyType, value: any, callback: (err: Error, res: string) => void): void;
  set(key: KeyType, value: any, setMode: string | any[], callback: (err: Error, res: string) => void): void;
  set(key: KeyType, value: any, expiryMode: string, time: number | string, callback: (err: Error, res: string) => void): void;
  set(key: KeyType, value: any, expiryMode: string, time: number | string, setMode: number | string, callback: (err: Error, res: string) => void): void;

  setbit(key: KeyType, offset: number, value: any, callback: (err: Error, res: number) => void): void;
  setbit(key: KeyType, offset: number, value: any): Promise<number>;

  setex(key: KeyType, seconds: number, value: any, callback: (err: Error, res: any) => void): void;
  setex(key: KeyType, seconds: number, value: any): Promise<any>;

  setnx(key: KeyType, value: any, callback: (err: Error, res: any) => void): void;
  setnx(key: KeyType, value: any): Promise<any>;

  sinter(...keys: KeyType[]): any;

  sismember(key: KeyType, member: string, callback: (err: Error, res: 1 | 0) => void): void;
  sismember(key: KeyType, member: string): Promise<1 | 0>;

  smembers(key: KeyType, callback: (err: Error, res: any) => void): void;
  smembers(key: KeyType): Promise<any>;

  smove(source: string, destination: string, member: string, callback: (err: Error, res: string) => void): void;
  smove(source: string, destination: string, member: string): Promise<string>;

  spop(key: KeyType, callback: (err: Error, res: any) => void): void;
  spop(key: KeyType, count: number, callback: (err: Error, res: any) => void): void;
  spop(key: KeyType, count?: number): Promise<any>;

  srandmember(key: KeyType, callback: (err: Error, res: any) => void): void;
  srandmember(key: KeyType, count: number, callback: (err: Error, res: any) => void): void;
  srandmember(key: KeyType, count?: number): Promise<any>;

  srem(key: KeyType, ...members: any[]): any;

  sscan(key: KeyType, cursor: number, ...args: any[]): any;

  subscribe(...channels: any[]): any;

  sunion(...keys: KeyType[]): any;

  time(callback: (err: Error, res: any) => void): void;
  time(): Promise<any>;

  ttl(key: KeyType, callback: (err: Error, res: number) => void): void;
  ttl(key: KeyType): Promise<number>;

  type(key: KeyType, callback: (err: Error, res: string) => void): void;
  type(key: KeyType): Promise<string>;

  unsubscribe(...channels: string[]): any;

  xadd(key: KeyType, id: string, ...args: string[]): any;
  xadd(key: KeyType, maxLenOption: 'MAXLEN' | 'maxlen', count: number, ...args: string[]): any;
  xadd(key: KeyType, maxLenOption: 'MAXLEN' | 'maxlen', approximate: '~', count: number, ...args: string[]): any;

  xlen(key: KeyType): any;

  xrange(key: KeyType, start: string, end: string, ...args: any[]): any;

  xread(...args: any[]): any;

  xrevrange(key: KeyType, end: string, start: string, ...args: any[]): any;

  zadd(key: KeyType, ...args: string[]): Promise<number | string>;

  zcard(key: KeyType, callback: (err: Error, res: number) => void): void;
  zcard(key: KeyType): Promise<number>;

  zcount(key: KeyType, min: number | string, max: number | string, callback: (err: Error, res: number) => void): void;
  zcount(key: KeyType, min: number | string, max: number | string): Promise<number>;

  zincrby(key: KeyType, increment: number, member: string, callback: (err: Error, res: any) => void): void;
  zincrby(key: KeyType, increment: number, member: string): Promise<any>;

  zrange(key: KeyType, start: number, stop: number, callback: (err: Error, res: any) => void): void;
  zrange(key: KeyType, start: number, stop: number, withScores: "WITHSCORES", callback: (err: Error, res: any) => void): void;
  zrange(key: KeyType, start: number, stop: number, withScores?: "WITHSCORES"): Promise<any>;

  zrangebyscore(key: KeyType, min: number | string, max: number | string, ...args: string[]): any;

  zrem(key: KeyType, ...members: any[]): any;

  zremrangebyrank(key: KeyType, start: number, stop: number, callback: (err: Error, res: any) => void): void;
  zremrangebyrank(key: KeyType, start: number, stop: number): Promise<any>;

  zremrangebyscore(key: KeyType, min: number | string, max: number | string, callback: (err: Error, res: any) => void): void;
  zremrangebyscore(key: KeyType, min: number | string, max: number | string): Promise<any>;

  zrevrangebyscore(key: KeyType, max: number | string, min: number | string, ...args: string[]): any;

  zscan(key: KeyType, cursor: number, ...args: any[]): any;

  zscore(key: KeyType, member: string, callback: (err: Error, res: string) => void): void;
  zscore(key: KeyType, member: string): Promise<string>;
}

interface IPipeline {
  append(key: KeyType, value: any, callback?: (err: Error, res: number) => void): IPipeline;

  auth(password: string, callback?: (err: Error, res: string) => void): IPipeline;

  bgrewriteaof(callback?: (err: Error, res: string) => void): IPipeline;

  bgsave(callback?: (err: Error, res: string) => void): IPipeline;

  brpoplpush(
    source: string, destination: string, timeout: number, callback?: (err: Error, res: any) => void,
  ): IPipeline;

  dbsize(callback?: (err: Error, res: number) => void): IPipeline;

  decr(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  decrby(key: KeyType, decrement: number, callback?: (err: Error, res: number) => void): IPipeline;

  del(...keys: KeyType[]): IPipeline;

  discard(callback?: (err: Error, res: any) => void): IPipeline;

  echo(message: string, callback?: (err: Error, res: string) => void): IPipeline;

  eval(...args: any[]): IPipeline;

  exec(callback?: (err: Error, res: any) => void): Promise<any>;

  exists(...keys: KeyType[]): IPipeline;

  expire(key: KeyType, seconds: number, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  expireat(key: KeyType, timestamp: number, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  flushall(callback?: (err: Error, res: string) => void): IPipeline;

  flushdb(callback?: (err: Error, res: string) => void): IPipeline;

  get(key: KeyType, callback?: (err: Error, res: string) => void): IPipeline;

  getbit(key: KeyType, offset: number, callback?: (err: Error, res: number) => void): IPipeline;

  getrange(key: KeyType, start: number, end: number, callback?: (err: Error, res: string) => void): IPipeline;

  getset(key: KeyType, value: any, callback?: (err: Error, res: string) => void): IPipeline;

  hdel(key: KeyType, ...fields: string[]): IPipeline;

  hexists(key: KeyType, field: string, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  hget(key: KeyType, field: string, callback?: (err: Error, res: string | string) => void): IPipeline;

  hgetall(key: KeyType, callback?: (err: Error, res: any) => void): IPipeline;

  hincrby(key: KeyType, field: string, increment: number, callback?: (err: Error, res: number) => void): IPipeline;

  hincrbyfloat(key: KeyType, field: string, increment: number, callback?: (err: Error, res: number) => void): IPipeline;

  hkeys(key: KeyType, callback?: (err: Error, res: any) => void): IPipeline;

  hlen(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  hmget(key: KeyType, ...fields: string[]): IPipeline;

  hmset(key: KeyType, ...args: any[]): IPipeline;
  hmset(key: KeyType, data: any, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  hscan(key: KeyType, cursor: number, ...args: any[]): IPipeline;

  hset(key: KeyType, field: string, value: any, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  hsetnx(key: KeyType, field: string, value: any, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  hstrlen(key: KeyType, field: string, callback?: (err: Error, res: number) => void): IPipeline;

  hvals(key: KeyType, callback?: (err: Error, res: any) => void): IPipeline;

  incr(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  incrby(key: KeyType, increment: number, callback?: (err: Error, res: number) => void): IPipeline;

  incrbyfloat(key: KeyType, increment: number, callback?: (err: Error, res: number) => void): IPipeline;

  keys(pattern: string, callback?: (err: Error, res: string[]) => void): IPipeline;

  lastsave(callback?: (err: Error, res: number) => void): IPipeline;

  lindex(key: KeyType, index: number, callback?: (err: Error, res: string) => void): IPipeline;

  llen(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  lpop(key: KeyType, callback?: (err: Error, res: string) => void): IPipeline;

  lpush(key: KeyType, ...values: any[]): IPipeline;

  lpushx(key: KeyType, value: any, callback?: (err: Error, res: number) => void): IPipeline;

  lrange(key: KeyType, start: number, stop: number, callback?: (err: Error, res: any) => void): IPipeline;

  lrem(key: KeyType, count: number, value: any, callback?: (err: Error, res: number) => void): IPipeline;

  lset(key: KeyType, index: number, value: any, callback?: (err: Error, res: any) => void): IPipeline;

  ltrim(key: KeyType, start: number, stop: number, callback?: (err: Error, res: any) => void): IPipeline;

  mget(...keys: KeyType[]): IPipeline;

  mset(...args: any[]): IPipeline;
  mset(data: any, callback?: (err: Error, res: string) => void): IPipeline;

  msetnx(...args: any[]): IPipeline;
  msetnx(data: any, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  multi(callback?: (err: Error, res: string) => void): IPipeline;

  persist(key: KeyType, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  pexpire(key: KeyType, milliseconds: number, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  pexpireat(key: KeyType, millisecondsTimestamp: number, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  ping(callback?: (err: Error, res: string) => void): IPipeline;
  ping(message: string, callback?: (err: Error, res: string) => void): IPipeline;

  psetex(key: KeyType, milliseconds: number, value: any, callback?: (err: Error, res: any) => void): IPipeline;

  psubscribe(...patterns: string[]): IPipeline;

  pttl(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  publish(channel: string, message: string, callback?: (err: Error, res: number) => void): IPipeline;

  punsubscribe(...patterns: string[]): IPipeline;

  quit(callback?: (err: Error, res: string) => void): IPipeline;

  randomkey(callback?: (err: Error, res: string) => void): IPipeline;

  rename(key: KeyType, newkey: KeyType, callback?: (err: Error, res: string) => void): IPipeline;

  renamenx(key: KeyType, newkey: KeyType, callback?: (err: Error, res: 0 | 1) => void): IPipeline;

  role(callback?: (err: Error, res: any) => void): IPipeline;

  rpop(key: KeyType, callback?: (err: Error, res: string) => void): IPipeline;

  rpoplpush(source: string, destination: string, callback?: (err: Error, res: string) => void): IPipeline;

  rpush(key: KeyType, ...values: any[]): IPipeline;

  rpushx(key: KeyType, value: any, callback?: (err: Error, res: number) => void): IPipeline;

  sadd(key: KeyType, ...members: any[]): IPipeline;

  save(callback?: (err: Error, res: string) => void): IPipeline;

  scan(cursor: number): IPipeline;
  scan(cursor: number, matchOption: 'match' | 'MATCH', pattern: string): IPipeline;
  scan(cursor: number, countOption: 'count' | 'COUNT', count: number): IPipeline;
  scan(cursor: number, matchOption: 'match' | 'MATCH', pattern: string, countOption: 'count' | 'COUNT', count: number): IPipeline;
  scan(cursor: number, countOption: 'count' | 'COUNT', count: number, matchOption: 'match' | 'MATCH', pattern: string): IPipeline;

  scard(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  sdiff(...keys: KeyType[]): IPipeline;

  set(key: KeyType, value: any, callback?: (err: Error, res: string) => void): IPipeline;
  set(key: KeyType, value: any, setMode: string, callback?: (err: Error, res: string) => void): IPipeline;
  set(key: KeyType, value: any, expiryMode: string, time: number, callback?: (err: Error, res: string) => void): IPipeline;
  set(key: KeyType, value: any, expiryMode: string, time: number, setMode: string, callback?: (err: Error, res: string) => void): IPipeline;

  setbit(key: KeyType, offset: number, value: any, callback?: (err: Error, res: number) => void): IPipeline;

  setex(key: KeyType, seconds: number, value: any, callback?: (err: Error, res: any) => void): IPipeline;

  setnx(key: KeyType, value: any, callback?: (err: Error, res: any) => void): IPipeline;

  sinter(...keys: KeyType[]): IPipeline;

  sismember(key: KeyType, member: string, callback?: (err: Error, res: 1 | 0) => void): IPipeline;

  smembers(key: KeyType, callback?: (err: Error, res: any) => void): IPipeline;

  smove(source: string, destination: string, member: string, callback?: (err: Error, res: string) => void): IPipeline;

  spop(key: KeyType, callback?: (err: Error, res: any) => void): IPipeline;
  spop(key: KeyType, count: number, callback?: (err: Error, res: any) => void): IPipeline;

  srandmember(key: KeyType, callback?: (err: Error, res: any) => void): IPipeline;
  srandmember(key: KeyType, count: number, callback?: (err: Error, res: any) => void): IPipeline;

  srem(key: KeyType, ...members: any[]): IPipeline;

  sscan(key: KeyType, cursor: number, ...args: any[]): IPipeline;

  subscribe(...channels: any[]): IPipeline;

  sunion(...keys: KeyType[]): IPipeline;

  time(callback?: (err: Error, res: any) => void): IPipeline;

  ttl(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  type(key: KeyType, callback?: (err: Error, res: string) => void): IPipeline;

  unsubscribe(...channels: string[]): IPipeline;

  xadd(key: KeyType, id: string, ...args: string[]): IPipeline;

  xlen(key: KeyType): IPipeline;

  xrange(key: KeyType, start: string, end: string, ...args: any[]): IPipeline;

  xread(...args: any[]): IPipeline;

  xrevrange(key: KeyType, end: string, start: string, ...args: any[]): IPipeline;

  zadd(key: KeyType, ...args: string[]): IPipeline;

  zcard(key: KeyType, callback?: (err: Error, res: number) => void): IPipeline;

  zcount(key: KeyType, min: number | string, max: number | string, callback?: (err: Error, res: number) => void): IPipeline;

  zincrby(key: KeyType, increment: number, member: string, callback?: (err: Error, res: any) => void): IPipeline;

  zrange(key: KeyType, start: number, stop: number, callback?: (err: Error, res: any) => void): IPipeline;
  zrange(key: KeyType, start: number, stop: number, withScores: "WITHSCORES", callback?: (err: Error, res: any) => void): IPipeline;

  zrangebyscore(key: KeyType, min: number | string, max: number | string, ...args: string[]): IPipeline;

  zrem(key: KeyType, ...members: any[]): IPipeline;

  zremrangebyrank(key: KeyType, start: number, stop: number, callback?: (err: Error, res: any) => void): IPipeline;

  zremrangebyscore(key: KeyType, min: number | string, max: number | string, callback?: (err: Error, res: any) => void): IPipeline;

  zrevrange(key: KeyType, start: number, stop: number, callback?: (err: Error, res: any) => void): IPipeline;
  zrevrange(key: KeyType, start: number, stop: number, withScores: "WITHSCORES", callback?: (err: Error, res: any) => void): IPipeline;

  zrevrangebyscore(key: KeyType, max: number | string, min: number | string, ...args: string[]): IPipeline;

  zscan(key: KeyType, cursor: number, ...args: any[]): IPipeline;

  zscore(key: KeyType, member: string, callback?: (err: Error, res: number) => void): IPipeline;
}

interface IRedisMockOptions {
  data?: any;
  keyPrefix?: string;
  lazyConnect?: boolean;
  notifyKeyspaceEvents?: string;
}

/*
 * Merging type definitions is the only way we can achieve our goals.
 *
 * 1. We need a declared class.
 * 2. We need a class which implements an interface (IPartialIORedis).
 * 3. We need to avoid the TS compiler error:
 *
 * "This module can only be referenced with ECMAScript imports/exports
 * by turning on the 'esModuleInterop' flag and referencing its default
 * export."
 *
 * Although is possible to turn on the 'esModuleInterop' flag, this could
 * be problematic. It could enter in conflict with importing some
 * CommonJS modules using a sentence like this one:
 *
 * import * as IORedis from 'ioredis';
 *
 * In order to "hack" TS Compiler, we need to merge our definition with a
 * namespace (https://github.com/Microsoft/TypeScript/issues/5073#issuecomment-349478488)
 */

declare namespace RedisMock {}
interface RedisMock extends IPartialIORedis {}
declare class RedisMock {
  constructor(options?: IRedisMockOptions);
}

export = RedisMock
