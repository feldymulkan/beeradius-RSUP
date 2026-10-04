
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model nas
 * 
 */
export type nas = $Result.DefaultSelection<Prisma.$nasPayload>
/**
 * Model nasreload
 * 
 */
export type nasreload = $Result.DefaultSelection<Prisma.$nasreloadPayload>
/**
 * Model radacct
 * 
 */
export type radacct = $Result.DefaultSelection<Prisma.$radacctPayload>
/**
 * Model radcheck
 * 
 */
export type radcheck = $Result.DefaultSelection<Prisma.$radcheckPayload>
/**
 * Model radgroupcheck
 * 
 */
export type radgroupcheck = $Result.DefaultSelection<Prisma.$radgroupcheckPayload>
/**
 * Model radgroupreply
 * 
 */
export type radgroupreply = $Result.DefaultSelection<Prisma.$radgroupreplyPayload>
/**
 * Model radpostauth
 * 
 */
export type radpostauth = $Result.DefaultSelection<Prisma.$radpostauthPayload>
/**
 * Model radreply
 * 
 */
export type radreply = $Result.DefaultSelection<Prisma.$radreplyPayload>
/**
 * Model radusergroup
 * 
 */
export type radusergroup = $Result.DefaultSelection<Prisma.$radusergroupPayload>
/**
 * Model userinfo
 * 
 */
export type userinfo = $Result.DefaultSelection<Prisma.$userinfoPayload>
/**
 * Model admin
 * 
 */
export type admin = $Result.DefaultSelection<Prisma.$adminPayload>
/**
 * Model GroupMetadata
 * 
 */
export type GroupMetadata = $Result.DefaultSelection<Prisma.$GroupMetadataPayload>
/**
 * Model RadiusPool
 * 
 */
export type RadiusPool = $Result.DefaultSelection<Prisma.$RadiusPoolPayload>
/**
 * Model radippool
 * 
 */
export type radippool = $Result.DefaultSelection<Prisma.$radippoolPayload>
/**
 * Model MikrotikConfig
 * 
 */
export type MikrotikConfig = $Result.DefaultSelection<Prisma.$MikrotikConfigPayload>
/**
 * Model WireguardPeer
 * 
 */
export type WireguardPeer = $Result.DefaultSelection<Prisma.$WireguardPeerPayload>
/**
 * Model Wifi
 * 
 */
export type Wifi = $Result.DefaultSelection<Prisma.$WifiPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Nas
 * const nas = await prisma.nas.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Nas
   * const nas = await prisma.nas.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.nas`: Exposes CRUD operations for the **nas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nas
    * const nas = await prisma.nas.findMany()
    * ```
    */
  get nas(): Prisma.nasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nasreload`: Exposes CRUD operations for the **nasreload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nasreloads
    * const nasreloads = await prisma.nasreload.findMany()
    * ```
    */
  get nasreload(): Prisma.nasreloadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radacct`: Exposes CRUD operations for the **radacct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radaccts
    * const radaccts = await prisma.radacct.findMany()
    * ```
    */
  get radacct(): Prisma.radacctDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radcheck`: Exposes CRUD operations for the **radcheck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radchecks
    * const radchecks = await prisma.radcheck.findMany()
    * ```
    */
  get radcheck(): Prisma.radcheckDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radgroupcheck`: Exposes CRUD operations for the **radgroupcheck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radgroupchecks
    * const radgroupchecks = await prisma.radgroupcheck.findMany()
    * ```
    */
  get radgroupcheck(): Prisma.radgroupcheckDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radgroupreply`: Exposes CRUD operations for the **radgroupreply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radgroupreplies
    * const radgroupreplies = await prisma.radgroupreply.findMany()
    * ```
    */
  get radgroupreply(): Prisma.radgroupreplyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radpostauth`: Exposes CRUD operations for the **radpostauth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radpostauths
    * const radpostauths = await prisma.radpostauth.findMany()
    * ```
    */
  get radpostauth(): Prisma.radpostauthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radreply`: Exposes CRUD operations for the **radreply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radreplies
    * const radreplies = await prisma.radreply.findMany()
    * ```
    */
  get radreply(): Prisma.radreplyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radusergroup`: Exposes CRUD operations for the **radusergroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radusergroups
    * const radusergroups = await prisma.radusergroup.findMany()
    * ```
    */
  get radusergroup(): Prisma.radusergroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userinfo`: Exposes CRUD operations for the **userinfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Userinfos
    * const userinfos = await prisma.userinfo.findMany()
    * ```
    */
  get userinfo(): Prisma.userinfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.adminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupMetadata`: Exposes CRUD operations for the **GroupMetadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupMetadata
    * const groupMetadata = await prisma.groupMetadata.findMany()
    * ```
    */
  get groupMetadata(): Prisma.GroupMetadataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radiusPool`: Exposes CRUD operations for the **RadiusPool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RadiusPools
    * const radiusPools = await prisma.radiusPool.findMany()
    * ```
    */
  get radiusPool(): Prisma.RadiusPoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radippool`: Exposes CRUD operations for the **radippool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Radippools
    * const radippools = await prisma.radippool.findMany()
    * ```
    */
  get radippool(): Prisma.radippoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mikrotikConfig`: Exposes CRUD operations for the **MikrotikConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MikrotikConfigs
    * const mikrotikConfigs = await prisma.mikrotikConfig.findMany()
    * ```
    */
  get mikrotikConfig(): Prisma.MikrotikConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wireguardPeer`: Exposes CRUD operations for the **WireguardPeer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WireguardPeers
    * const wireguardPeers = await prisma.wireguardPeer.findMany()
    * ```
    */
  get wireguardPeer(): Prisma.WireguardPeerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wifi`: Exposes CRUD operations for the **Wifi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wifis
    * const wifis = await prisma.wifi.findMany()
    * ```
    */
  get wifi(): Prisma.WifiDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    nas: 'nas',
    nasreload: 'nasreload',
    radacct: 'radacct',
    radcheck: 'radcheck',
    radgroupcheck: 'radgroupcheck',
    radgroupreply: 'radgroupreply',
    radpostauth: 'radpostauth',
    radreply: 'radreply',
    radusergroup: 'radusergroup',
    userinfo: 'userinfo',
    admin: 'admin',
    GroupMetadata: 'GroupMetadata',
    RadiusPool: 'RadiusPool',
    radippool: 'radippool',
    MikrotikConfig: 'MikrotikConfig',
    WireguardPeer: 'WireguardPeer',
    Wifi: 'Wifi',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "nas" | "nasreload" | "radacct" | "radcheck" | "radgroupcheck" | "radgroupreply" | "radpostauth" | "radreply" | "radusergroup" | "userinfo" | "admin" | "groupMetadata" | "radiusPool" | "radippool" | "mikrotikConfig" | "wireguardPeer" | "wifi" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      nas: {
        payload: Prisma.$nasPayload<ExtArgs>
        fields: Prisma.nasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.nasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.nasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload>
          }
          findFirst: {
            args: Prisma.nasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.nasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload>
          }
          findMany: {
            args: Prisma.nasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload>[]
          }
          create: {
            args: Prisma.nasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload>
          }
          createMany: {
            args: Prisma.nasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.nasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload>
          }
          update: {
            args: Prisma.nasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload>
          }
          deleteMany: {
            args: Prisma.nasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.nasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.nasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasPayload>
          }
          aggregate: {
            args: Prisma.NasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNas>
          }
          groupBy: {
            args: Prisma.nasGroupByArgs<ExtArgs>
            result: $Utils.Optional<NasGroupByOutputType>[]
          }
          count: {
            args: Prisma.nasCountArgs<ExtArgs>
            result: $Utils.Optional<NasCountAggregateOutputType> | number
          }
        }
      }
      nasreload: {
        payload: Prisma.$nasreloadPayload<ExtArgs>
        fields: Prisma.nasreloadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.nasreloadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.nasreloadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload>
          }
          findFirst: {
            args: Prisma.nasreloadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.nasreloadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload>
          }
          findMany: {
            args: Prisma.nasreloadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload>[]
          }
          create: {
            args: Prisma.nasreloadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload>
          }
          createMany: {
            args: Prisma.nasreloadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.nasreloadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload>
          }
          update: {
            args: Prisma.nasreloadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload>
          }
          deleteMany: {
            args: Prisma.nasreloadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.nasreloadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.nasreloadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nasreloadPayload>
          }
          aggregate: {
            args: Prisma.NasreloadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNasreload>
          }
          groupBy: {
            args: Prisma.nasreloadGroupByArgs<ExtArgs>
            result: $Utils.Optional<NasreloadGroupByOutputType>[]
          }
          count: {
            args: Prisma.nasreloadCountArgs<ExtArgs>
            result: $Utils.Optional<NasreloadCountAggregateOutputType> | number
          }
        }
      }
      radacct: {
        payload: Prisma.$radacctPayload<ExtArgs>
        fields: Prisma.radacctFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radacctFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radacctFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload>
          }
          findFirst: {
            args: Prisma.radacctFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radacctFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload>
          }
          findMany: {
            args: Prisma.radacctFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload>[]
          }
          create: {
            args: Prisma.radacctCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload>
          }
          createMany: {
            args: Prisma.radacctCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radacctDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload>
          }
          update: {
            args: Prisma.radacctUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload>
          }
          deleteMany: {
            args: Prisma.radacctDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radacctUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radacctUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radacctPayload>
          }
          aggregate: {
            args: Prisma.RadacctAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadacct>
          }
          groupBy: {
            args: Prisma.radacctGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadacctGroupByOutputType>[]
          }
          count: {
            args: Prisma.radacctCountArgs<ExtArgs>
            result: $Utils.Optional<RadacctCountAggregateOutputType> | number
          }
        }
      }
      radcheck: {
        payload: Prisma.$radcheckPayload<ExtArgs>
        fields: Prisma.radcheckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radcheckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radcheckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload>
          }
          findFirst: {
            args: Prisma.radcheckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radcheckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload>
          }
          findMany: {
            args: Prisma.radcheckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload>[]
          }
          create: {
            args: Prisma.radcheckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload>
          }
          createMany: {
            args: Prisma.radcheckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radcheckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload>
          }
          update: {
            args: Prisma.radcheckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload>
          }
          deleteMany: {
            args: Prisma.radcheckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radcheckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radcheckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radcheckPayload>
          }
          aggregate: {
            args: Prisma.RadcheckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadcheck>
          }
          groupBy: {
            args: Prisma.radcheckGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadcheckGroupByOutputType>[]
          }
          count: {
            args: Prisma.radcheckCountArgs<ExtArgs>
            result: $Utils.Optional<RadcheckCountAggregateOutputType> | number
          }
        }
      }
      radgroupcheck: {
        payload: Prisma.$radgroupcheckPayload<ExtArgs>
        fields: Prisma.radgroupcheckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radgroupcheckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radgroupcheckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload>
          }
          findFirst: {
            args: Prisma.radgroupcheckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radgroupcheckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload>
          }
          findMany: {
            args: Prisma.radgroupcheckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload>[]
          }
          create: {
            args: Prisma.radgroupcheckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload>
          }
          createMany: {
            args: Prisma.radgroupcheckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radgroupcheckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload>
          }
          update: {
            args: Prisma.radgroupcheckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload>
          }
          deleteMany: {
            args: Prisma.radgroupcheckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radgroupcheckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radgroupcheckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupcheckPayload>
          }
          aggregate: {
            args: Prisma.RadgroupcheckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadgroupcheck>
          }
          groupBy: {
            args: Prisma.radgroupcheckGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadgroupcheckGroupByOutputType>[]
          }
          count: {
            args: Prisma.radgroupcheckCountArgs<ExtArgs>
            result: $Utils.Optional<RadgroupcheckCountAggregateOutputType> | number
          }
        }
      }
      radgroupreply: {
        payload: Prisma.$radgroupreplyPayload<ExtArgs>
        fields: Prisma.radgroupreplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radgroupreplyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radgroupreplyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload>
          }
          findFirst: {
            args: Prisma.radgroupreplyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radgroupreplyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload>
          }
          findMany: {
            args: Prisma.radgroupreplyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload>[]
          }
          create: {
            args: Prisma.radgroupreplyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload>
          }
          createMany: {
            args: Prisma.radgroupreplyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radgroupreplyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload>
          }
          update: {
            args: Prisma.radgroupreplyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload>
          }
          deleteMany: {
            args: Prisma.radgroupreplyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radgroupreplyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radgroupreplyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radgroupreplyPayload>
          }
          aggregate: {
            args: Prisma.RadgroupreplyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadgroupreply>
          }
          groupBy: {
            args: Prisma.radgroupreplyGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadgroupreplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.radgroupreplyCountArgs<ExtArgs>
            result: $Utils.Optional<RadgroupreplyCountAggregateOutputType> | number
          }
        }
      }
      radpostauth: {
        payload: Prisma.$radpostauthPayload<ExtArgs>
        fields: Prisma.radpostauthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radpostauthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radpostauthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload>
          }
          findFirst: {
            args: Prisma.radpostauthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radpostauthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload>
          }
          findMany: {
            args: Prisma.radpostauthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload>[]
          }
          create: {
            args: Prisma.radpostauthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload>
          }
          createMany: {
            args: Prisma.radpostauthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radpostauthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload>
          }
          update: {
            args: Prisma.radpostauthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload>
          }
          deleteMany: {
            args: Prisma.radpostauthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radpostauthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radpostauthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radpostauthPayload>
          }
          aggregate: {
            args: Prisma.RadpostauthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadpostauth>
          }
          groupBy: {
            args: Prisma.radpostauthGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadpostauthGroupByOutputType>[]
          }
          count: {
            args: Prisma.radpostauthCountArgs<ExtArgs>
            result: $Utils.Optional<RadpostauthCountAggregateOutputType> | number
          }
        }
      }
      radreply: {
        payload: Prisma.$radreplyPayload<ExtArgs>
        fields: Prisma.radreplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radreplyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radreplyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload>
          }
          findFirst: {
            args: Prisma.radreplyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radreplyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload>
          }
          findMany: {
            args: Prisma.radreplyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload>[]
          }
          create: {
            args: Prisma.radreplyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload>
          }
          createMany: {
            args: Prisma.radreplyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radreplyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload>
          }
          update: {
            args: Prisma.radreplyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload>
          }
          deleteMany: {
            args: Prisma.radreplyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radreplyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radreplyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radreplyPayload>
          }
          aggregate: {
            args: Prisma.RadreplyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadreply>
          }
          groupBy: {
            args: Prisma.radreplyGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadreplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.radreplyCountArgs<ExtArgs>
            result: $Utils.Optional<RadreplyCountAggregateOutputType> | number
          }
        }
      }
      radusergroup: {
        payload: Prisma.$radusergroupPayload<ExtArgs>
        fields: Prisma.radusergroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radusergroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radusergroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload>
          }
          findFirst: {
            args: Prisma.radusergroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radusergroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload>
          }
          findMany: {
            args: Prisma.radusergroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload>[]
          }
          create: {
            args: Prisma.radusergroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload>
          }
          createMany: {
            args: Prisma.radusergroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radusergroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload>
          }
          update: {
            args: Prisma.radusergroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload>
          }
          deleteMany: {
            args: Prisma.radusergroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radusergroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radusergroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radusergroupPayload>
          }
          aggregate: {
            args: Prisma.RadusergroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadusergroup>
          }
          groupBy: {
            args: Prisma.radusergroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadusergroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.radusergroupCountArgs<ExtArgs>
            result: $Utils.Optional<RadusergroupCountAggregateOutputType> | number
          }
        }
      }
      userinfo: {
        payload: Prisma.$userinfoPayload<ExtArgs>
        fields: Prisma.userinfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userinfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userinfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload>
          }
          findFirst: {
            args: Prisma.userinfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userinfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload>
          }
          findMany: {
            args: Prisma.userinfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload>[]
          }
          create: {
            args: Prisma.userinfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload>
          }
          createMany: {
            args: Prisma.userinfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userinfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload>
          }
          update: {
            args: Prisma.userinfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload>
          }
          deleteMany: {
            args: Prisma.userinfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userinfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userinfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userinfoPayload>
          }
          aggregate: {
            args: Prisma.UserinfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserinfo>
          }
          groupBy: {
            args: Prisma.userinfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserinfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.userinfoCountArgs<ExtArgs>
            result: $Utils.Optional<UserinfoCountAggregateOutputType> | number
          }
        }
      }
      admin: {
        payload: Prisma.$adminPayload<ExtArgs>
        fields: Prisma.adminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.adminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.adminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findFirst: {
            args: Prisma.adminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.adminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findMany: {
            args: Prisma.adminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          create: {
            args: Prisma.adminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          createMany: {
            args: Prisma.adminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.adminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          update: {
            args: Prisma.adminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          deleteMany: {
            args: Prisma.adminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.adminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.adminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.adminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.adminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      GroupMetadata: {
        payload: Prisma.$GroupMetadataPayload<ExtArgs>
        fields: Prisma.GroupMetadataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupMetadataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupMetadataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload>
          }
          findFirst: {
            args: Prisma.GroupMetadataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupMetadataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload>
          }
          findMany: {
            args: Prisma.GroupMetadataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload>[]
          }
          create: {
            args: Prisma.GroupMetadataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload>
          }
          createMany: {
            args: Prisma.GroupMetadataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GroupMetadataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload>
          }
          update: {
            args: Prisma.GroupMetadataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload>
          }
          deleteMany: {
            args: Prisma.GroupMetadataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupMetadataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GroupMetadataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMetadataPayload>
          }
          aggregate: {
            args: Prisma.GroupMetadataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupMetadata>
          }
          groupBy: {
            args: Prisma.GroupMetadataGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupMetadataGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupMetadataCountArgs<ExtArgs>
            result: $Utils.Optional<GroupMetadataCountAggregateOutputType> | number
          }
        }
      }
      RadiusPool: {
        payload: Prisma.$RadiusPoolPayload<ExtArgs>
        fields: Prisma.RadiusPoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RadiusPoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RadiusPoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload>
          }
          findFirst: {
            args: Prisma.RadiusPoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RadiusPoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload>
          }
          findMany: {
            args: Prisma.RadiusPoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload>[]
          }
          create: {
            args: Prisma.RadiusPoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload>
          }
          createMany: {
            args: Prisma.RadiusPoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RadiusPoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload>
          }
          update: {
            args: Prisma.RadiusPoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload>
          }
          deleteMany: {
            args: Prisma.RadiusPoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RadiusPoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RadiusPoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiusPoolPayload>
          }
          aggregate: {
            args: Prisma.RadiusPoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadiusPool>
          }
          groupBy: {
            args: Prisma.RadiusPoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadiusPoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.RadiusPoolCountArgs<ExtArgs>
            result: $Utils.Optional<RadiusPoolCountAggregateOutputType> | number
          }
        }
      }
      radippool: {
        payload: Prisma.$radippoolPayload<ExtArgs>
        fields: Prisma.radippoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.radippoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.radippoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload>
          }
          findFirst: {
            args: Prisma.radippoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.radippoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload>
          }
          findMany: {
            args: Prisma.radippoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload>[]
          }
          create: {
            args: Prisma.radippoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload>
          }
          createMany: {
            args: Prisma.radippoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.radippoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload>
          }
          update: {
            args: Prisma.radippoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload>
          }
          deleteMany: {
            args: Prisma.radippoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.radippoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.radippoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$radippoolPayload>
          }
          aggregate: {
            args: Prisma.RadippoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadippool>
          }
          groupBy: {
            args: Prisma.radippoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadippoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.radippoolCountArgs<ExtArgs>
            result: $Utils.Optional<RadippoolCountAggregateOutputType> | number
          }
        }
      }
      MikrotikConfig: {
        payload: Prisma.$MikrotikConfigPayload<ExtArgs>
        fields: Prisma.MikrotikConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MikrotikConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MikrotikConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload>
          }
          findFirst: {
            args: Prisma.MikrotikConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MikrotikConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload>
          }
          findMany: {
            args: Prisma.MikrotikConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload>[]
          }
          create: {
            args: Prisma.MikrotikConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload>
          }
          createMany: {
            args: Prisma.MikrotikConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MikrotikConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload>
          }
          update: {
            args: Prisma.MikrotikConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload>
          }
          deleteMany: {
            args: Prisma.MikrotikConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MikrotikConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MikrotikConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MikrotikConfigPayload>
          }
          aggregate: {
            args: Prisma.MikrotikConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMikrotikConfig>
          }
          groupBy: {
            args: Prisma.MikrotikConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<MikrotikConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.MikrotikConfigCountArgs<ExtArgs>
            result: $Utils.Optional<MikrotikConfigCountAggregateOutputType> | number
          }
        }
      }
      WireguardPeer: {
        payload: Prisma.$WireguardPeerPayload<ExtArgs>
        fields: Prisma.WireguardPeerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WireguardPeerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WireguardPeerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload>
          }
          findFirst: {
            args: Prisma.WireguardPeerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WireguardPeerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload>
          }
          findMany: {
            args: Prisma.WireguardPeerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload>[]
          }
          create: {
            args: Prisma.WireguardPeerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload>
          }
          createMany: {
            args: Prisma.WireguardPeerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WireguardPeerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload>
          }
          update: {
            args: Prisma.WireguardPeerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload>
          }
          deleteMany: {
            args: Prisma.WireguardPeerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WireguardPeerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WireguardPeerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WireguardPeerPayload>
          }
          aggregate: {
            args: Prisma.WireguardPeerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWireguardPeer>
          }
          groupBy: {
            args: Prisma.WireguardPeerGroupByArgs<ExtArgs>
            result: $Utils.Optional<WireguardPeerGroupByOutputType>[]
          }
          count: {
            args: Prisma.WireguardPeerCountArgs<ExtArgs>
            result: $Utils.Optional<WireguardPeerCountAggregateOutputType> | number
          }
        }
      }
      Wifi: {
        payload: Prisma.$WifiPayload<ExtArgs>
        fields: Prisma.WifiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WifiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WifiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload>
          }
          findFirst: {
            args: Prisma.WifiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WifiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload>
          }
          findMany: {
            args: Prisma.WifiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload>[]
          }
          create: {
            args: Prisma.WifiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload>
          }
          createMany: {
            args: Prisma.WifiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WifiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload>
          }
          update: {
            args: Prisma.WifiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload>
          }
          deleteMany: {
            args: Prisma.WifiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WifiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WifiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WifiPayload>
          }
          aggregate: {
            args: Prisma.WifiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWifi>
          }
          groupBy: {
            args: Prisma.WifiGroupByArgs<ExtArgs>
            result: $Utils.Optional<WifiGroupByOutputType>[]
          }
          count: {
            args: Prisma.WifiCountArgs<ExtArgs>
            result: $Utils.Optional<WifiCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    nas?: nasOmit
    nasreload?: nasreloadOmit
    radacct?: radacctOmit
    radcheck?: radcheckOmit
    radgroupcheck?: radgroupcheckOmit
    radgroupreply?: radgroupreplyOmit
    radpostauth?: radpostauthOmit
    radreply?: radreplyOmit
    radusergroup?: radusergroupOmit
    userinfo?: userinfoOmit
    admin?: adminOmit
    groupMetadata?: GroupMetadataOmit
    radiusPool?: RadiusPoolOmit
    radippool?: radippoolOmit
    mikrotikConfig?: MikrotikConfigOmit
    wireguardPeer?: WireguardPeerOmit
    wifi?: WifiOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GroupMetadataCountOutputType
   */

  export type GroupMetadataCountOutputType = {
    radusergroups: number
  }

  export type GroupMetadataCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    radusergroups?: boolean | GroupMetadataCountOutputTypeCountRadusergroupsArgs
  }

  // Custom InputTypes
  /**
   * GroupMetadataCountOutputType without action
   */
  export type GroupMetadataCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadataCountOutputType
     */
    select?: GroupMetadataCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupMetadataCountOutputType without action
   */
  export type GroupMetadataCountOutputTypeCountRadusergroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radusergroupWhereInput
  }


  /**
   * Count Type MikrotikConfigCountOutputType
   */

  export type MikrotikConfigCountOutputType = {
    peers: number
  }

  export type MikrotikConfigCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peers?: boolean | MikrotikConfigCountOutputTypeCountPeersArgs
  }

  // Custom InputTypes
  /**
   * MikrotikConfigCountOutputType without action
   */
  export type MikrotikConfigCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfigCountOutputType
     */
    select?: MikrotikConfigCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MikrotikConfigCountOutputType without action
   */
  export type MikrotikConfigCountOutputTypeCountPeersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WireguardPeerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model nas
   */

  export type AggregateNas = {
    _count: NasCountAggregateOutputType | null
    _avg: NasAvgAggregateOutputType | null
    _sum: NasSumAggregateOutputType | null
    _min: NasMinAggregateOutputType | null
    _max: NasMaxAggregateOutputType | null
  }

  export type NasAvgAggregateOutputType = {
    id: number | null
    ports: number | null
  }

  export type NasSumAggregateOutputType = {
    id: number | null
    ports: number | null
  }

  export type NasMinAggregateOutputType = {
    id: number | null
    nasname: string | null
    shortname: string | null
    type: string | null
    ports: number | null
    secret: string | null
    server: string | null
    community: string | null
    description: string | null
  }

  export type NasMaxAggregateOutputType = {
    id: number | null
    nasname: string | null
    shortname: string | null
    type: string | null
    ports: number | null
    secret: string | null
    server: string | null
    community: string | null
    description: string | null
  }

  export type NasCountAggregateOutputType = {
    id: number
    nasname: number
    shortname: number
    type: number
    ports: number
    secret: number
    server: number
    community: number
    description: number
    _all: number
  }


  export type NasAvgAggregateInputType = {
    id?: true
    ports?: true
  }

  export type NasSumAggregateInputType = {
    id?: true
    ports?: true
  }

  export type NasMinAggregateInputType = {
    id?: true
    nasname?: true
    shortname?: true
    type?: true
    ports?: true
    secret?: true
    server?: true
    community?: true
    description?: true
  }

  export type NasMaxAggregateInputType = {
    id?: true
    nasname?: true
    shortname?: true
    type?: true
    ports?: true
    secret?: true
    server?: true
    community?: true
    description?: true
  }

  export type NasCountAggregateInputType = {
    id?: true
    nasname?: true
    shortname?: true
    type?: true
    ports?: true
    secret?: true
    server?: true
    community?: true
    description?: true
    _all?: true
  }

  export type NasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nas to aggregate.
     */
    where?: nasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nas to fetch.
     */
    orderBy?: nasOrderByWithRelationInput | nasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: nasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned nas
    **/
    _count?: true | NasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NasMaxAggregateInputType
  }

  export type GetNasAggregateType<T extends NasAggregateArgs> = {
        [P in keyof T & keyof AggregateNas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNas[P]>
      : GetScalarType<T[P], AggregateNas[P]>
  }




  export type nasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: nasWhereInput
    orderBy?: nasOrderByWithAggregationInput | nasOrderByWithAggregationInput[]
    by: NasScalarFieldEnum[] | NasScalarFieldEnum
    having?: nasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NasCountAggregateInputType | true
    _avg?: NasAvgAggregateInputType
    _sum?: NasSumAggregateInputType
    _min?: NasMinAggregateInputType
    _max?: NasMaxAggregateInputType
  }

  export type NasGroupByOutputType = {
    id: number
    nasname: string
    shortname: string | null
    type: string | null
    ports: number | null
    secret: string
    server: string | null
    community: string | null
    description: string | null
    _count: NasCountAggregateOutputType | null
    _avg: NasAvgAggregateOutputType | null
    _sum: NasSumAggregateOutputType | null
    _min: NasMinAggregateOutputType | null
    _max: NasMaxAggregateOutputType | null
  }

  type GetNasGroupByPayload<T extends nasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NasGroupByOutputType[P]>
            : GetScalarType<T[P], NasGroupByOutputType[P]>
        }
      >
    >


  export type nasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nasname?: boolean
    shortname?: boolean
    type?: boolean
    ports?: boolean
    secret?: boolean
    server?: boolean
    community?: boolean
    description?: boolean
  }, ExtArgs["result"]["nas"]>



  export type nasSelectScalar = {
    id?: boolean
    nasname?: boolean
    shortname?: boolean
    type?: boolean
    ports?: boolean
    secret?: boolean
    server?: boolean
    community?: boolean
    description?: boolean
  }

  export type nasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nasname" | "shortname" | "type" | "ports" | "secret" | "server" | "community" | "description", ExtArgs["result"]["nas"]>

  export type $nasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "nas"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nasname: string
      shortname: string | null
      type: string | null
      ports: number | null
      secret: string
      server: string | null
      community: string | null
      description: string | null
    }, ExtArgs["result"]["nas"]>
    composites: {}
  }

  type nasGetPayload<S extends boolean | null | undefined | nasDefaultArgs> = $Result.GetResult<Prisma.$nasPayload, S>

  type nasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<nasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NasCountAggregateInputType | true
    }

  export interface nasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['nas'], meta: { name: 'nas' } }
    /**
     * Find zero or one Nas that matches the filter.
     * @param {nasFindUniqueArgs} args - Arguments to find a Nas
     * @example
     * // Get one Nas
     * const nas = await prisma.nas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends nasFindUniqueArgs>(args: SelectSubset<T, nasFindUniqueArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Nas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {nasFindUniqueOrThrowArgs} args - Arguments to find a Nas
     * @example
     * // Get one Nas
     * const nas = await prisma.nas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends nasFindUniqueOrThrowArgs>(args: SelectSubset<T, nasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasFindFirstArgs} args - Arguments to find a Nas
     * @example
     * // Get one Nas
     * const nas = await prisma.nas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends nasFindFirstArgs>(args?: SelectSubset<T, nasFindFirstArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasFindFirstOrThrowArgs} args - Arguments to find a Nas
     * @example
     * // Get one Nas
     * const nas = await prisma.nas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends nasFindFirstOrThrowArgs>(args?: SelectSubset<T, nasFindFirstOrThrowArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Nas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nas
     * const nas = await prisma.nas.findMany()
     * 
     * // Get first 10 Nas
     * const nas = await prisma.nas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nasWithIdOnly = await prisma.nas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends nasFindManyArgs>(args?: SelectSubset<T, nasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Nas.
     * @param {nasCreateArgs} args - Arguments to create a Nas.
     * @example
     * // Create one Nas
     * const Nas = await prisma.nas.create({
     *   data: {
     *     // ... data to create a Nas
     *   }
     * })
     * 
     */
    create<T extends nasCreateArgs>(args: SelectSubset<T, nasCreateArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Nas.
     * @param {nasCreateManyArgs} args - Arguments to create many Nas.
     * @example
     * // Create many Nas
     * const nas = await prisma.nas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends nasCreateManyArgs>(args?: SelectSubset<T, nasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Nas.
     * @param {nasDeleteArgs} args - Arguments to delete one Nas.
     * @example
     * // Delete one Nas
     * const Nas = await prisma.nas.delete({
     *   where: {
     *     // ... filter to delete one Nas
     *   }
     * })
     * 
     */
    delete<T extends nasDeleteArgs>(args: SelectSubset<T, nasDeleteArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Nas.
     * @param {nasUpdateArgs} args - Arguments to update one Nas.
     * @example
     * // Update one Nas
     * const nas = await prisma.nas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends nasUpdateArgs>(args: SelectSubset<T, nasUpdateArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Nas.
     * @param {nasDeleteManyArgs} args - Arguments to filter Nas to delete.
     * @example
     * // Delete a few Nas
     * const { count } = await prisma.nas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends nasDeleteManyArgs>(args?: SelectSubset<T, nasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nas
     * const nas = await prisma.nas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends nasUpdateManyArgs>(args: SelectSubset<T, nasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Nas.
     * @param {nasUpsertArgs} args - Arguments to update or create a Nas.
     * @example
     * // Update or create a Nas
     * const nas = await prisma.nas.upsert({
     *   create: {
     *     // ... data to create a Nas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nas we want to update
     *   }
     * })
     */
    upsert<T extends nasUpsertArgs>(args: SelectSubset<T, nasUpsertArgs<ExtArgs>>): Prisma__nasClient<$Result.GetResult<Prisma.$nasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Nas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasCountArgs} args - Arguments to filter Nas to count.
     * @example
     * // Count the number of Nas
     * const count = await prisma.nas.count({
     *   where: {
     *     // ... the filter for the Nas we want to count
     *   }
     * })
    **/
    count<T extends nasCountArgs>(
      args?: Subset<T, nasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NasAggregateArgs>(args: Subset<T, NasAggregateArgs>): Prisma.PrismaPromise<GetNasAggregateType<T>>

    /**
     * Group by Nas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends nasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: nasGroupByArgs['orderBy'] }
        : { orderBy?: nasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, nasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the nas model
   */
  readonly fields: nasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for nas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__nasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the nas model
   */
  interface nasFieldRefs {
    readonly id: FieldRef<"nas", 'Int'>
    readonly nasname: FieldRef<"nas", 'String'>
    readonly shortname: FieldRef<"nas", 'String'>
    readonly type: FieldRef<"nas", 'String'>
    readonly ports: FieldRef<"nas", 'Int'>
    readonly secret: FieldRef<"nas", 'String'>
    readonly server: FieldRef<"nas", 'String'>
    readonly community: FieldRef<"nas", 'String'>
    readonly description: FieldRef<"nas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * nas findUnique
   */
  export type nasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * Filter, which nas to fetch.
     */
    where: nasWhereUniqueInput
  }

  /**
   * nas findUniqueOrThrow
   */
  export type nasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * Filter, which nas to fetch.
     */
    where: nasWhereUniqueInput
  }

  /**
   * nas findFirst
   */
  export type nasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * Filter, which nas to fetch.
     */
    where?: nasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nas to fetch.
     */
    orderBy?: nasOrderByWithRelationInput | nasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nas.
     */
    cursor?: nasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nas.
     */
    distinct?: NasScalarFieldEnum | NasScalarFieldEnum[]
  }

  /**
   * nas findFirstOrThrow
   */
  export type nasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * Filter, which nas to fetch.
     */
    where?: nasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nas to fetch.
     */
    orderBy?: nasOrderByWithRelationInput | nasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nas.
     */
    cursor?: nasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nas.
     */
    distinct?: NasScalarFieldEnum | NasScalarFieldEnum[]
  }

  /**
   * nas findMany
   */
  export type nasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * Filter, which nas to fetch.
     */
    where?: nasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nas to fetch.
     */
    orderBy?: nasOrderByWithRelationInput | nasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing nas.
     */
    cursor?: nasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nas.
     */
    skip?: number
    distinct?: NasScalarFieldEnum | NasScalarFieldEnum[]
  }

  /**
   * nas create
   */
  export type nasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * The data needed to create a nas.
     */
    data: XOR<nasCreateInput, nasUncheckedCreateInput>
  }

  /**
   * nas createMany
   */
  export type nasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many nas.
     */
    data: nasCreateManyInput | nasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * nas update
   */
  export type nasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * The data needed to update a nas.
     */
    data: XOR<nasUpdateInput, nasUncheckedUpdateInput>
    /**
     * Choose, which nas to update.
     */
    where: nasWhereUniqueInput
  }

  /**
   * nas updateMany
   */
  export type nasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update nas.
     */
    data: XOR<nasUpdateManyMutationInput, nasUncheckedUpdateManyInput>
    /**
     * Filter which nas to update
     */
    where?: nasWhereInput
    /**
     * Limit how many nas to update.
     */
    limit?: number
  }

  /**
   * nas upsert
   */
  export type nasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * The filter to search for the nas to update in case it exists.
     */
    where: nasWhereUniqueInput
    /**
     * In case the nas found by the `where` argument doesn't exist, create a new nas with this data.
     */
    create: XOR<nasCreateInput, nasUncheckedCreateInput>
    /**
     * In case the nas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<nasUpdateInput, nasUncheckedUpdateInput>
  }

  /**
   * nas delete
   */
  export type nasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
    /**
     * Filter which nas to delete.
     */
    where: nasWhereUniqueInput
  }

  /**
   * nas deleteMany
   */
  export type nasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nas to delete
     */
    where?: nasWhereInput
    /**
     * Limit how many nas to delete.
     */
    limit?: number
  }

  /**
   * nas without action
   */
  export type nasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nas
     */
    select?: nasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nas
     */
    omit?: nasOmit<ExtArgs> | null
  }


  /**
   * Model nasreload
   */

  export type AggregateNasreload = {
    _count: NasreloadCountAggregateOutputType | null
    _min: NasreloadMinAggregateOutputType | null
    _max: NasreloadMaxAggregateOutputType | null
  }

  export type NasreloadMinAggregateOutputType = {
    nasipaddress: string | null
    reloadtime: Date | null
  }

  export type NasreloadMaxAggregateOutputType = {
    nasipaddress: string | null
    reloadtime: Date | null
  }

  export type NasreloadCountAggregateOutputType = {
    nasipaddress: number
    reloadtime: number
    _all: number
  }


  export type NasreloadMinAggregateInputType = {
    nasipaddress?: true
    reloadtime?: true
  }

  export type NasreloadMaxAggregateInputType = {
    nasipaddress?: true
    reloadtime?: true
  }

  export type NasreloadCountAggregateInputType = {
    nasipaddress?: true
    reloadtime?: true
    _all?: true
  }

  export type NasreloadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nasreload to aggregate.
     */
    where?: nasreloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nasreloads to fetch.
     */
    orderBy?: nasreloadOrderByWithRelationInput | nasreloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: nasreloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nasreloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nasreloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned nasreloads
    **/
    _count?: true | NasreloadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NasreloadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NasreloadMaxAggregateInputType
  }

  export type GetNasreloadAggregateType<T extends NasreloadAggregateArgs> = {
        [P in keyof T & keyof AggregateNasreload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNasreload[P]>
      : GetScalarType<T[P], AggregateNasreload[P]>
  }




  export type nasreloadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: nasreloadWhereInput
    orderBy?: nasreloadOrderByWithAggregationInput | nasreloadOrderByWithAggregationInput[]
    by: NasreloadScalarFieldEnum[] | NasreloadScalarFieldEnum
    having?: nasreloadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NasreloadCountAggregateInputType | true
    _min?: NasreloadMinAggregateInputType
    _max?: NasreloadMaxAggregateInputType
  }

  export type NasreloadGroupByOutputType = {
    nasipaddress: string
    reloadtime: Date
    _count: NasreloadCountAggregateOutputType | null
    _min: NasreloadMinAggregateOutputType | null
    _max: NasreloadMaxAggregateOutputType | null
  }

  type GetNasreloadGroupByPayload<T extends nasreloadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NasreloadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NasreloadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NasreloadGroupByOutputType[P]>
            : GetScalarType<T[P], NasreloadGroupByOutputType[P]>
        }
      >
    >


  export type nasreloadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nasipaddress?: boolean
    reloadtime?: boolean
  }, ExtArgs["result"]["nasreload"]>



  export type nasreloadSelectScalar = {
    nasipaddress?: boolean
    reloadtime?: boolean
  }

  export type nasreloadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"nasipaddress" | "reloadtime", ExtArgs["result"]["nasreload"]>

  export type $nasreloadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "nasreload"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      nasipaddress: string
      reloadtime: Date
    }, ExtArgs["result"]["nasreload"]>
    composites: {}
  }

  type nasreloadGetPayload<S extends boolean | null | undefined | nasreloadDefaultArgs> = $Result.GetResult<Prisma.$nasreloadPayload, S>

  type nasreloadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<nasreloadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NasreloadCountAggregateInputType | true
    }

  export interface nasreloadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['nasreload'], meta: { name: 'nasreload' } }
    /**
     * Find zero or one Nasreload that matches the filter.
     * @param {nasreloadFindUniqueArgs} args - Arguments to find a Nasreload
     * @example
     * // Get one Nasreload
     * const nasreload = await prisma.nasreload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends nasreloadFindUniqueArgs>(args: SelectSubset<T, nasreloadFindUniqueArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Nasreload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {nasreloadFindUniqueOrThrowArgs} args - Arguments to find a Nasreload
     * @example
     * // Get one Nasreload
     * const nasreload = await prisma.nasreload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends nasreloadFindUniqueOrThrowArgs>(args: SelectSubset<T, nasreloadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nasreload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasreloadFindFirstArgs} args - Arguments to find a Nasreload
     * @example
     * // Get one Nasreload
     * const nasreload = await prisma.nasreload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends nasreloadFindFirstArgs>(args?: SelectSubset<T, nasreloadFindFirstArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nasreload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasreloadFindFirstOrThrowArgs} args - Arguments to find a Nasreload
     * @example
     * // Get one Nasreload
     * const nasreload = await prisma.nasreload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends nasreloadFindFirstOrThrowArgs>(args?: SelectSubset<T, nasreloadFindFirstOrThrowArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Nasreloads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasreloadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nasreloads
     * const nasreloads = await prisma.nasreload.findMany()
     * 
     * // Get first 10 Nasreloads
     * const nasreloads = await prisma.nasreload.findMany({ take: 10 })
     * 
     * // Only select the `nasipaddress`
     * const nasreloadWithNasipaddressOnly = await prisma.nasreload.findMany({ select: { nasipaddress: true } })
     * 
     */
    findMany<T extends nasreloadFindManyArgs>(args?: SelectSubset<T, nasreloadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Nasreload.
     * @param {nasreloadCreateArgs} args - Arguments to create a Nasreload.
     * @example
     * // Create one Nasreload
     * const Nasreload = await prisma.nasreload.create({
     *   data: {
     *     // ... data to create a Nasreload
     *   }
     * })
     * 
     */
    create<T extends nasreloadCreateArgs>(args: SelectSubset<T, nasreloadCreateArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Nasreloads.
     * @param {nasreloadCreateManyArgs} args - Arguments to create many Nasreloads.
     * @example
     * // Create many Nasreloads
     * const nasreload = await prisma.nasreload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends nasreloadCreateManyArgs>(args?: SelectSubset<T, nasreloadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Nasreload.
     * @param {nasreloadDeleteArgs} args - Arguments to delete one Nasreload.
     * @example
     * // Delete one Nasreload
     * const Nasreload = await prisma.nasreload.delete({
     *   where: {
     *     // ... filter to delete one Nasreload
     *   }
     * })
     * 
     */
    delete<T extends nasreloadDeleteArgs>(args: SelectSubset<T, nasreloadDeleteArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Nasreload.
     * @param {nasreloadUpdateArgs} args - Arguments to update one Nasreload.
     * @example
     * // Update one Nasreload
     * const nasreload = await prisma.nasreload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends nasreloadUpdateArgs>(args: SelectSubset<T, nasreloadUpdateArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Nasreloads.
     * @param {nasreloadDeleteManyArgs} args - Arguments to filter Nasreloads to delete.
     * @example
     * // Delete a few Nasreloads
     * const { count } = await prisma.nasreload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends nasreloadDeleteManyArgs>(args?: SelectSubset<T, nasreloadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nasreloads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasreloadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nasreloads
     * const nasreload = await prisma.nasreload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends nasreloadUpdateManyArgs>(args: SelectSubset<T, nasreloadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Nasreload.
     * @param {nasreloadUpsertArgs} args - Arguments to update or create a Nasreload.
     * @example
     * // Update or create a Nasreload
     * const nasreload = await prisma.nasreload.upsert({
     *   create: {
     *     // ... data to create a Nasreload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nasreload we want to update
     *   }
     * })
     */
    upsert<T extends nasreloadUpsertArgs>(args: SelectSubset<T, nasreloadUpsertArgs<ExtArgs>>): Prisma__nasreloadClient<$Result.GetResult<Prisma.$nasreloadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Nasreloads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasreloadCountArgs} args - Arguments to filter Nasreloads to count.
     * @example
     * // Count the number of Nasreloads
     * const count = await prisma.nasreload.count({
     *   where: {
     *     // ... the filter for the Nasreloads we want to count
     *   }
     * })
    **/
    count<T extends nasreloadCountArgs>(
      args?: Subset<T, nasreloadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NasreloadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nasreload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasreloadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NasreloadAggregateArgs>(args: Subset<T, NasreloadAggregateArgs>): Prisma.PrismaPromise<GetNasreloadAggregateType<T>>

    /**
     * Group by Nasreload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nasreloadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends nasreloadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: nasreloadGroupByArgs['orderBy'] }
        : { orderBy?: nasreloadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, nasreloadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNasreloadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the nasreload model
   */
  readonly fields: nasreloadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for nasreload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__nasreloadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the nasreload model
   */
  interface nasreloadFieldRefs {
    readonly nasipaddress: FieldRef<"nasreload", 'String'>
    readonly reloadtime: FieldRef<"nasreload", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * nasreload findUnique
   */
  export type nasreloadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * Filter, which nasreload to fetch.
     */
    where: nasreloadWhereUniqueInput
  }

  /**
   * nasreload findUniqueOrThrow
   */
  export type nasreloadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * Filter, which nasreload to fetch.
     */
    where: nasreloadWhereUniqueInput
  }

  /**
   * nasreload findFirst
   */
  export type nasreloadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * Filter, which nasreload to fetch.
     */
    where?: nasreloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nasreloads to fetch.
     */
    orderBy?: nasreloadOrderByWithRelationInput | nasreloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nasreloads.
     */
    cursor?: nasreloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nasreloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nasreloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nasreloads.
     */
    distinct?: NasreloadScalarFieldEnum | NasreloadScalarFieldEnum[]
  }

  /**
   * nasreload findFirstOrThrow
   */
  export type nasreloadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * Filter, which nasreload to fetch.
     */
    where?: nasreloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nasreloads to fetch.
     */
    orderBy?: nasreloadOrderByWithRelationInput | nasreloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nasreloads.
     */
    cursor?: nasreloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nasreloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nasreloads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nasreloads.
     */
    distinct?: NasreloadScalarFieldEnum | NasreloadScalarFieldEnum[]
  }

  /**
   * nasreload findMany
   */
  export type nasreloadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * Filter, which nasreloads to fetch.
     */
    where?: nasreloadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nasreloads to fetch.
     */
    orderBy?: nasreloadOrderByWithRelationInput | nasreloadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing nasreloads.
     */
    cursor?: nasreloadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nasreloads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nasreloads.
     */
    skip?: number
    distinct?: NasreloadScalarFieldEnum | NasreloadScalarFieldEnum[]
  }

  /**
   * nasreload create
   */
  export type nasreloadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * The data needed to create a nasreload.
     */
    data: XOR<nasreloadCreateInput, nasreloadUncheckedCreateInput>
  }

  /**
   * nasreload createMany
   */
  export type nasreloadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many nasreloads.
     */
    data: nasreloadCreateManyInput | nasreloadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * nasreload update
   */
  export type nasreloadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * The data needed to update a nasreload.
     */
    data: XOR<nasreloadUpdateInput, nasreloadUncheckedUpdateInput>
    /**
     * Choose, which nasreload to update.
     */
    where: nasreloadWhereUniqueInput
  }

  /**
   * nasreload updateMany
   */
  export type nasreloadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update nasreloads.
     */
    data: XOR<nasreloadUpdateManyMutationInput, nasreloadUncheckedUpdateManyInput>
    /**
     * Filter which nasreloads to update
     */
    where?: nasreloadWhereInput
    /**
     * Limit how many nasreloads to update.
     */
    limit?: number
  }

  /**
   * nasreload upsert
   */
  export type nasreloadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * The filter to search for the nasreload to update in case it exists.
     */
    where: nasreloadWhereUniqueInput
    /**
     * In case the nasreload found by the `where` argument doesn't exist, create a new nasreload with this data.
     */
    create: XOR<nasreloadCreateInput, nasreloadUncheckedCreateInput>
    /**
     * In case the nasreload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<nasreloadUpdateInput, nasreloadUncheckedUpdateInput>
  }

  /**
   * nasreload delete
   */
  export type nasreloadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
    /**
     * Filter which nasreload to delete.
     */
    where: nasreloadWhereUniqueInput
  }

  /**
   * nasreload deleteMany
   */
  export type nasreloadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nasreloads to delete
     */
    where?: nasreloadWhereInput
    /**
     * Limit how many nasreloads to delete.
     */
    limit?: number
  }

  /**
   * nasreload without action
   */
  export type nasreloadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nasreload
     */
    select?: nasreloadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nasreload
     */
    omit?: nasreloadOmit<ExtArgs> | null
  }


  /**
   * Model radacct
   */

  export type AggregateRadacct = {
    _count: RadacctCountAggregateOutputType | null
    _avg: RadacctAvgAggregateOutputType | null
    _sum: RadacctSumAggregateOutputType | null
    _min: RadacctMinAggregateOutputType | null
    _max: RadacctMaxAggregateOutputType | null
  }

  export type RadacctAvgAggregateOutputType = {
    radacctid: number | null
    acctinterval: number | null
    acctsessiontime: number | null
    acctinputoctets: number | null
    acctoutputoctets: number | null
  }

  export type RadacctSumAggregateOutputType = {
    radacctid: bigint | null
    acctinterval: number | null
    acctsessiontime: number | null
    acctinputoctets: bigint | null
    acctoutputoctets: bigint | null
  }

  export type RadacctMinAggregateOutputType = {
    radacctid: bigint | null
    acctsessionid: string | null
    acctuniqueid: string | null
    username: string | null
    realm: string | null
    nasipaddress: string | null
    nasportid: string | null
    nasporttype: string | null
    acctstarttime: Date | null
    acctupdatetime: Date | null
    acctstoptime: Date | null
    acctinterval: number | null
    acctsessiontime: number | null
    acctauthentic: string | null
    connectinfo_start: string | null
    connectinfo_stop: string | null
    acctinputoctets: bigint | null
    acctoutputoctets: bigint | null
    calledstationid: string | null
    callingstationid: string | null
    acctterminatecause: string | null
    servicetype: string | null
    framedprotocol: string | null
    framedipaddress: string | null
    framedipv6address: string | null
    framedipv6prefix: string | null
    framedinterfaceid: string | null
    delegatedipv6prefix: string | null
    class: string | null
  }

  export type RadacctMaxAggregateOutputType = {
    radacctid: bigint | null
    acctsessionid: string | null
    acctuniqueid: string | null
    username: string | null
    realm: string | null
    nasipaddress: string | null
    nasportid: string | null
    nasporttype: string | null
    acctstarttime: Date | null
    acctupdatetime: Date | null
    acctstoptime: Date | null
    acctinterval: number | null
    acctsessiontime: number | null
    acctauthentic: string | null
    connectinfo_start: string | null
    connectinfo_stop: string | null
    acctinputoctets: bigint | null
    acctoutputoctets: bigint | null
    calledstationid: string | null
    callingstationid: string | null
    acctterminatecause: string | null
    servicetype: string | null
    framedprotocol: string | null
    framedipaddress: string | null
    framedipv6address: string | null
    framedipv6prefix: string | null
    framedinterfaceid: string | null
    delegatedipv6prefix: string | null
    class: string | null
  }

  export type RadacctCountAggregateOutputType = {
    radacctid: number
    acctsessionid: number
    acctuniqueid: number
    username: number
    realm: number
    nasipaddress: number
    nasportid: number
    nasporttype: number
    acctstarttime: number
    acctupdatetime: number
    acctstoptime: number
    acctinterval: number
    acctsessiontime: number
    acctauthentic: number
    connectinfo_start: number
    connectinfo_stop: number
    acctinputoctets: number
    acctoutputoctets: number
    calledstationid: number
    callingstationid: number
    acctterminatecause: number
    servicetype: number
    framedprotocol: number
    framedipaddress: number
    framedipv6address: number
    framedipv6prefix: number
    framedinterfaceid: number
    delegatedipv6prefix: number
    class: number
    _all: number
  }


  export type RadacctAvgAggregateInputType = {
    radacctid?: true
    acctinterval?: true
    acctsessiontime?: true
    acctinputoctets?: true
    acctoutputoctets?: true
  }

  export type RadacctSumAggregateInputType = {
    radacctid?: true
    acctinterval?: true
    acctsessiontime?: true
    acctinputoctets?: true
    acctoutputoctets?: true
  }

  export type RadacctMinAggregateInputType = {
    radacctid?: true
    acctsessionid?: true
    acctuniqueid?: true
    username?: true
    realm?: true
    nasipaddress?: true
    nasportid?: true
    nasporttype?: true
    acctstarttime?: true
    acctupdatetime?: true
    acctstoptime?: true
    acctinterval?: true
    acctsessiontime?: true
    acctauthentic?: true
    connectinfo_start?: true
    connectinfo_stop?: true
    acctinputoctets?: true
    acctoutputoctets?: true
    calledstationid?: true
    callingstationid?: true
    acctterminatecause?: true
    servicetype?: true
    framedprotocol?: true
    framedipaddress?: true
    framedipv6address?: true
    framedipv6prefix?: true
    framedinterfaceid?: true
    delegatedipv6prefix?: true
    class?: true
  }

  export type RadacctMaxAggregateInputType = {
    radacctid?: true
    acctsessionid?: true
    acctuniqueid?: true
    username?: true
    realm?: true
    nasipaddress?: true
    nasportid?: true
    nasporttype?: true
    acctstarttime?: true
    acctupdatetime?: true
    acctstoptime?: true
    acctinterval?: true
    acctsessiontime?: true
    acctauthentic?: true
    connectinfo_start?: true
    connectinfo_stop?: true
    acctinputoctets?: true
    acctoutputoctets?: true
    calledstationid?: true
    callingstationid?: true
    acctterminatecause?: true
    servicetype?: true
    framedprotocol?: true
    framedipaddress?: true
    framedipv6address?: true
    framedipv6prefix?: true
    framedinterfaceid?: true
    delegatedipv6prefix?: true
    class?: true
  }

  export type RadacctCountAggregateInputType = {
    radacctid?: true
    acctsessionid?: true
    acctuniqueid?: true
    username?: true
    realm?: true
    nasipaddress?: true
    nasportid?: true
    nasporttype?: true
    acctstarttime?: true
    acctupdatetime?: true
    acctstoptime?: true
    acctinterval?: true
    acctsessiontime?: true
    acctauthentic?: true
    connectinfo_start?: true
    connectinfo_stop?: true
    acctinputoctets?: true
    acctoutputoctets?: true
    calledstationid?: true
    callingstationid?: true
    acctterminatecause?: true
    servicetype?: true
    framedprotocol?: true
    framedipaddress?: true
    framedipv6address?: true
    framedipv6prefix?: true
    framedinterfaceid?: true
    delegatedipv6prefix?: true
    class?: true
    _all?: true
  }

  export type RadacctAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radacct to aggregate.
     */
    where?: radacctWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radaccts to fetch.
     */
    orderBy?: radacctOrderByWithRelationInput | radacctOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radacctWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radaccts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radaccts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radaccts
    **/
    _count?: true | RadacctCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadacctAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadacctSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadacctMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadacctMaxAggregateInputType
  }

  export type GetRadacctAggregateType<T extends RadacctAggregateArgs> = {
        [P in keyof T & keyof AggregateRadacct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadacct[P]>
      : GetScalarType<T[P], AggregateRadacct[P]>
  }




  export type radacctGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radacctWhereInput
    orderBy?: radacctOrderByWithAggregationInput | radacctOrderByWithAggregationInput[]
    by: RadacctScalarFieldEnum[] | RadacctScalarFieldEnum
    having?: radacctScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadacctCountAggregateInputType | true
    _avg?: RadacctAvgAggregateInputType
    _sum?: RadacctSumAggregateInputType
    _min?: RadacctMinAggregateInputType
    _max?: RadacctMaxAggregateInputType
  }

  export type RadacctGroupByOutputType = {
    radacctid: bigint
    acctsessionid: string
    acctuniqueid: string
    username: string
    realm: string | null
    nasipaddress: string
    nasportid: string | null
    nasporttype: string | null
    acctstarttime: Date | null
    acctupdatetime: Date | null
    acctstoptime: Date | null
    acctinterval: number | null
    acctsessiontime: number | null
    acctauthentic: string | null
    connectinfo_start: string | null
    connectinfo_stop: string | null
    acctinputoctets: bigint | null
    acctoutputoctets: bigint | null
    calledstationid: string
    callingstationid: string
    acctterminatecause: string
    servicetype: string | null
    framedprotocol: string | null
    framedipaddress: string
    framedipv6address: string
    framedipv6prefix: string
    framedinterfaceid: string
    delegatedipv6prefix: string
    class: string | null
    _count: RadacctCountAggregateOutputType | null
    _avg: RadacctAvgAggregateOutputType | null
    _sum: RadacctSumAggregateOutputType | null
    _min: RadacctMinAggregateOutputType | null
    _max: RadacctMaxAggregateOutputType | null
  }

  type GetRadacctGroupByPayload<T extends radacctGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadacctGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadacctGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadacctGroupByOutputType[P]>
            : GetScalarType<T[P], RadacctGroupByOutputType[P]>
        }
      >
    >


  export type radacctSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    radacctid?: boolean
    acctsessionid?: boolean
    acctuniqueid?: boolean
    username?: boolean
    realm?: boolean
    nasipaddress?: boolean
    nasportid?: boolean
    nasporttype?: boolean
    acctstarttime?: boolean
    acctupdatetime?: boolean
    acctstoptime?: boolean
    acctinterval?: boolean
    acctsessiontime?: boolean
    acctauthentic?: boolean
    connectinfo_start?: boolean
    connectinfo_stop?: boolean
    acctinputoctets?: boolean
    acctoutputoctets?: boolean
    calledstationid?: boolean
    callingstationid?: boolean
    acctterminatecause?: boolean
    servicetype?: boolean
    framedprotocol?: boolean
    framedipaddress?: boolean
    framedipv6address?: boolean
    framedipv6prefix?: boolean
    framedinterfaceid?: boolean
    delegatedipv6prefix?: boolean
    class?: boolean
  }, ExtArgs["result"]["radacct"]>



  export type radacctSelectScalar = {
    radacctid?: boolean
    acctsessionid?: boolean
    acctuniqueid?: boolean
    username?: boolean
    realm?: boolean
    nasipaddress?: boolean
    nasportid?: boolean
    nasporttype?: boolean
    acctstarttime?: boolean
    acctupdatetime?: boolean
    acctstoptime?: boolean
    acctinterval?: boolean
    acctsessiontime?: boolean
    acctauthentic?: boolean
    connectinfo_start?: boolean
    connectinfo_stop?: boolean
    acctinputoctets?: boolean
    acctoutputoctets?: boolean
    calledstationid?: boolean
    callingstationid?: boolean
    acctterminatecause?: boolean
    servicetype?: boolean
    framedprotocol?: boolean
    framedipaddress?: boolean
    framedipv6address?: boolean
    framedipv6prefix?: boolean
    framedinterfaceid?: boolean
    delegatedipv6prefix?: boolean
    class?: boolean
  }

  export type radacctOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"radacctid" | "acctsessionid" | "acctuniqueid" | "username" | "realm" | "nasipaddress" | "nasportid" | "nasporttype" | "acctstarttime" | "acctupdatetime" | "acctstoptime" | "acctinterval" | "acctsessiontime" | "acctauthentic" | "connectinfo_start" | "connectinfo_stop" | "acctinputoctets" | "acctoutputoctets" | "calledstationid" | "callingstationid" | "acctterminatecause" | "servicetype" | "framedprotocol" | "framedipaddress" | "framedipv6address" | "framedipv6prefix" | "framedinterfaceid" | "delegatedipv6prefix" | "class", ExtArgs["result"]["radacct"]>

  export type $radacctPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radacct"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      radacctid: bigint
      acctsessionid: string
      acctuniqueid: string
      username: string
      realm: string | null
      nasipaddress: string
      nasportid: string | null
      nasporttype: string | null
      acctstarttime: Date | null
      acctupdatetime: Date | null
      acctstoptime: Date | null
      acctinterval: number | null
      acctsessiontime: number | null
      acctauthentic: string | null
      connectinfo_start: string | null
      connectinfo_stop: string | null
      acctinputoctets: bigint | null
      acctoutputoctets: bigint | null
      calledstationid: string
      callingstationid: string
      acctterminatecause: string
      servicetype: string | null
      framedprotocol: string | null
      framedipaddress: string
      framedipv6address: string
      framedipv6prefix: string
      framedinterfaceid: string
      delegatedipv6prefix: string
      class: string | null
    }, ExtArgs["result"]["radacct"]>
    composites: {}
  }

  type radacctGetPayload<S extends boolean | null | undefined | radacctDefaultArgs> = $Result.GetResult<Prisma.$radacctPayload, S>

  type radacctCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radacctFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadacctCountAggregateInputType | true
    }

  export interface radacctDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radacct'], meta: { name: 'radacct' } }
    /**
     * Find zero or one Radacct that matches the filter.
     * @param {radacctFindUniqueArgs} args - Arguments to find a Radacct
     * @example
     * // Get one Radacct
     * const radacct = await prisma.radacct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radacctFindUniqueArgs>(args: SelectSubset<T, radacctFindUniqueArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radacct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radacctFindUniqueOrThrowArgs} args - Arguments to find a Radacct
     * @example
     * // Get one Radacct
     * const radacct = await prisma.radacct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radacctFindUniqueOrThrowArgs>(args: SelectSubset<T, radacctFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radacct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radacctFindFirstArgs} args - Arguments to find a Radacct
     * @example
     * // Get one Radacct
     * const radacct = await prisma.radacct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radacctFindFirstArgs>(args?: SelectSubset<T, radacctFindFirstArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radacct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radacctFindFirstOrThrowArgs} args - Arguments to find a Radacct
     * @example
     * // Get one Radacct
     * const radacct = await prisma.radacct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radacctFindFirstOrThrowArgs>(args?: SelectSubset<T, radacctFindFirstOrThrowArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radaccts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radacctFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radaccts
     * const radaccts = await prisma.radacct.findMany()
     * 
     * // Get first 10 Radaccts
     * const radaccts = await prisma.radacct.findMany({ take: 10 })
     * 
     * // Only select the `radacctid`
     * const radacctWithRadacctidOnly = await prisma.radacct.findMany({ select: { radacctid: true } })
     * 
     */
    findMany<T extends radacctFindManyArgs>(args?: SelectSubset<T, radacctFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radacct.
     * @param {radacctCreateArgs} args - Arguments to create a Radacct.
     * @example
     * // Create one Radacct
     * const Radacct = await prisma.radacct.create({
     *   data: {
     *     // ... data to create a Radacct
     *   }
     * })
     * 
     */
    create<T extends radacctCreateArgs>(args: SelectSubset<T, radacctCreateArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radaccts.
     * @param {radacctCreateManyArgs} args - Arguments to create many Radaccts.
     * @example
     * // Create many Radaccts
     * const radacct = await prisma.radacct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radacctCreateManyArgs>(args?: SelectSubset<T, radacctCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radacct.
     * @param {radacctDeleteArgs} args - Arguments to delete one Radacct.
     * @example
     * // Delete one Radacct
     * const Radacct = await prisma.radacct.delete({
     *   where: {
     *     // ... filter to delete one Radacct
     *   }
     * })
     * 
     */
    delete<T extends radacctDeleteArgs>(args: SelectSubset<T, radacctDeleteArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radacct.
     * @param {radacctUpdateArgs} args - Arguments to update one Radacct.
     * @example
     * // Update one Radacct
     * const radacct = await prisma.radacct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radacctUpdateArgs>(args: SelectSubset<T, radacctUpdateArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radaccts.
     * @param {radacctDeleteManyArgs} args - Arguments to filter Radaccts to delete.
     * @example
     * // Delete a few Radaccts
     * const { count } = await prisma.radacct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radacctDeleteManyArgs>(args?: SelectSubset<T, radacctDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radaccts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radacctUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radaccts
     * const radacct = await prisma.radacct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radacctUpdateManyArgs>(args: SelectSubset<T, radacctUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radacct.
     * @param {radacctUpsertArgs} args - Arguments to update or create a Radacct.
     * @example
     * // Update or create a Radacct
     * const radacct = await prisma.radacct.upsert({
     *   create: {
     *     // ... data to create a Radacct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radacct we want to update
     *   }
     * })
     */
    upsert<T extends radacctUpsertArgs>(args: SelectSubset<T, radacctUpsertArgs<ExtArgs>>): Prisma__radacctClient<$Result.GetResult<Prisma.$radacctPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radaccts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radacctCountArgs} args - Arguments to filter Radaccts to count.
     * @example
     * // Count the number of Radaccts
     * const count = await prisma.radacct.count({
     *   where: {
     *     // ... the filter for the Radaccts we want to count
     *   }
     * })
    **/
    count<T extends radacctCountArgs>(
      args?: Subset<T, radacctCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadacctCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radacct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadacctAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadacctAggregateArgs>(args: Subset<T, RadacctAggregateArgs>): Prisma.PrismaPromise<GetRadacctAggregateType<T>>

    /**
     * Group by Radacct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radacctGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radacctGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radacctGroupByArgs['orderBy'] }
        : { orderBy?: radacctGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radacctGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadacctGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radacct model
   */
  readonly fields: radacctFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radacct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radacctClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radacct model
   */
  interface radacctFieldRefs {
    readonly radacctid: FieldRef<"radacct", 'BigInt'>
    readonly acctsessionid: FieldRef<"radacct", 'String'>
    readonly acctuniqueid: FieldRef<"radacct", 'String'>
    readonly username: FieldRef<"radacct", 'String'>
    readonly realm: FieldRef<"radacct", 'String'>
    readonly nasipaddress: FieldRef<"radacct", 'String'>
    readonly nasportid: FieldRef<"radacct", 'String'>
    readonly nasporttype: FieldRef<"radacct", 'String'>
    readonly acctstarttime: FieldRef<"radacct", 'DateTime'>
    readonly acctupdatetime: FieldRef<"radacct", 'DateTime'>
    readonly acctstoptime: FieldRef<"radacct", 'DateTime'>
    readonly acctinterval: FieldRef<"radacct", 'Int'>
    readonly acctsessiontime: FieldRef<"radacct", 'Int'>
    readonly acctauthentic: FieldRef<"radacct", 'String'>
    readonly connectinfo_start: FieldRef<"radacct", 'String'>
    readonly connectinfo_stop: FieldRef<"radacct", 'String'>
    readonly acctinputoctets: FieldRef<"radacct", 'BigInt'>
    readonly acctoutputoctets: FieldRef<"radacct", 'BigInt'>
    readonly calledstationid: FieldRef<"radacct", 'String'>
    readonly callingstationid: FieldRef<"radacct", 'String'>
    readonly acctterminatecause: FieldRef<"radacct", 'String'>
    readonly servicetype: FieldRef<"radacct", 'String'>
    readonly framedprotocol: FieldRef<"radacct", 'String'>
    readonly framedipaddress: FieldRef<"radacct", 'String'>
    readonly framedipv6address: FieldRef<"radacct", 'String'>
    readonly framedipv6prefix: FieldRef<"radacct", 'String'>
    readonly framedinterfaceid: FieldRef<"radacct", 'String'>
    readonly delegatedipv6prefix: FieldRef<"radacct", 'String'>
    readonly class: FieldRef<"radacct", 'String'>
  }
    

  // Custom InputTypes
  /**
   * radacct findUnique
   */
  export type radacctFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * Filter, which radacct to fetch.
     */
    where: radacctWhereUniqueInput
  }

  /**
   * radacct findUniqueOrThrow
   */
  export type radacctFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * Filter, which radacct to fetch.
     */
    where: radacctWhereUniqueInput
  }

  /**
   * radacct findFirst
   */
  export type radacctFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * Filter, which radacct to fetch.
     */
    where?: radacctWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radaccts to fetch.
     */
    orderBy?: radacctOrderByWithRelationInput | radacctOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radaccts.
     */
    cursor?: radacctWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radaccts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radaccts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radaccts.
     */
    distinct?: RadacctScalarFieldEnum | RadacctScalarFieldEnum[]
  }

  /**
   * radacct findFirstOrThrow
   */
  export type radacctFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * Filter, which radacct to fetch.
     */
    where?: radacctWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radaccts to fetch.
     */
    orderBy?: radacctOrderByWithRelationInput | radacctOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radaccts.
     */
    cursor?: radacctWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radaccts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radaccts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radaccts.
     */
    distinct?: RadacctScalarFieldEnum | RadacctScalarFieldEnum[]
  }

  /**
   * radacct findMany
   */
  export type radacctFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * Filter, which radaccts to fetch.
     */
    where?: radacctWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radaccts to fetch.
     */
    orderBy?: radacctOrderByWithRelationInput | radacctOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radaccts.
     */
    cursor?: radacctWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radaccts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radaccts.
     */
    skip?: number
    distinct?: RadacctScalarFieldEnum | RadacctScalarFieldEnum[]
  }

  /**
   * radacct create
   */
  export type radacctCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * The data needed to create a radacct.
     */
    data?: XOR<radacctCreateInput, radacctUncheckedCreateInput>
  }

  /**
   * radacct createMany
   */
  export type radacctCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radaccts.
     */
    data: radacctCreateManyInput | radacctCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radacct update
   */
  export type radacctUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * The data needed to update a radacct.
     */
    data: XOR<radacctUpdateInput, radacctUncheckedUpdateInput>
    /**
     * Choose, which radacct to update.
     */
    where: radacctWhereUniqueInput
  }

  /**
   * radacct updateMany
   */
  export type radacctUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radaccts.
     */
    data: XOR<radacctUpdateManyMutationInput, radacctUncheckedUpdateManyInput>
    /**
     * Filter which radaccts to update
     */
    where?: radacctWhereInput
    /**
     * Limit how many radaccts to update.
     */
    limit?: number
  }

  /**
   * radacct upsert
   */
  export type radacctUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * The filter to search for the radacct to update in case it exists.
     */
    where: radacctWhereUniqueInput
    /**
     * In case the radacct found by the `where` argument doesn't exist, create a new radacct with this data.
     */
    create: XOR<radacctCreateInput, radacctUncheckedCreateInput>
    /**
     * In case the radacct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radacctUpdateInput, radacctUncheckedUpdateInput>
  }

  /**
   * radacct delete
   */
  export type radacctDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
    /**
     * Filter which radacct to delete.
     */
    where: radacctWhereUniqueInput
  }

  /**
   * radacct deleteMany
   */
  export type radacctDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radaccts to delete
     */
    where?: radacctWhereInput
    /**
     * Limit how many radaccts to delete.
     */
    limit?: number
  }

  /**
   * radacct without action
   */
  export type radacctDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radacct
     */
    select?: radacctSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radacct
     */
    omit?: radacctOmit<ExtArgs> | null
  }


  /**
   * Model radcheck
   */

  export type AggregateRadcheck = {
    _count: RadcheckCountAggregateOutputType | null
    _avg: RadcheckAvgAggregateOutputType | null
    _sum: RadcheckSumAggregateOutputType | null
    _min: RadcheckMinAggregateOutputType | null
    _max: RadcheckMaxAggregateOutputType | null
  }

  export type RadcheckAvgAggregateOutputType = {
    id: number | null
  }

  export type RadcheckSumAggregateOutputType = {
    id: number | null
  }

  export type RadcheckMinAggregateOutputType = {
    id: number | null
    username: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadcheckMaxAggregateOutputType = {
    id: number | null
    username: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadcheckCountAggregateOutputType = {
    id: number
    username: number
    attribute: number
    op: number
    value: number
    _all: number
  }


  export type RadcheckAvgAggregateInputType = {
    id?: true
  }

  export type RadcheckSumAggregateInputType = {
    id?: true
  }

  export type RadcheckMinAggregateInputType = {
    id?: true
    username?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadcheckMaxAggregateInputType = {
    id?: true
    username?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadcheckCountAggregateInputType = {
    id?: true
    username?: true
    attribute?: true
    op?: true
    value?: true
    _all?: true
  }

  export type RadcheckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radcheck to aggregate.
     */
    where?: radcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radchecks to fetch.
     */
    orderBy?: radcheckOrderByWithRelationInput | radcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radchecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radchecks
    **/
    _count?: true | RadcheckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadcheckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadcheckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadcheckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadcheckMaxAggregateInputType
  }

  export type GetRadcheckAggregateType<T extends RadcheckAggregateArgs> = {
        [P in keyof T & keyof AggregateRadcheck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadcheck[P]>
      : GetScalarType<T[P], AggregateRadcheck[P]>
  }




  export type radcheckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radcheckWhereInput
    orderBy?: radcheckOrderByWithAggregationInput | radcheckOrderByWithAggregationInput[]
    by: RadcheckScalarFieldEnum[] | RadcheckScalarFieldEnum
    having?: radcheckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadcheckCountAggregateInputType | true
    _avg?: RadcheckAvgAggregateInputType
    _sum?: RadcheckSumAggregateInputType
    _min?: RadcheckMinAggregateInputType
    _max?: RadcheckMaxAggregateInputType
  }

  export type RadcheckGroupByOutputType = {
    id: number
    username: string
    attribute: string
    op: string
    value: string
    _count: RadcheckCountAggregateOutputType | null
    _avg: RadcheckAvgAggregateOutputType | null
    _sum: RadcheckSumAggregateOutputType | null
    _min: RadcheckMinAggregateOutputType | null
    _max: RadcheckMaxAggregateOutputType | null
  }

  type GetRadcheckGroupByPayload<T extends radcheckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadcheckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadcheckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadcheckGroupByOutputType[P]>
            : GetScalarType<T[P], RadcheckGroupByOutputType[P]>
        }
      >
    >


  export type radcheckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }, ExtArgs["result"]["radcheck"]>



  export type radcheckSelectScalar = {
    id?: boolean
    username?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }

  export type radcheckOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "attribute" | "op" | "value", ExtArgs["result"]["radcheck"]>

  export type $radcheckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radcheck"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      attribute: string
      op: string
      value: string
    }, ExtArgs["result"]["radcheck"]>
    composites: {}
  }

  type radcheckGetPayload<S extends boolean | null | undefined | radcheckDefaultArgs> = $Result.GetResult<Prisma.$radcheckPayload, S>

  type radcheckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radcheckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadcheckCountAggregateInputType | true
    }

  export interface radcheckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radcheck'], meta: { name: 'radcheck' } }
    /**
     * Find zero or one Radcheck that matches the filter.
     * @param {radcheckFindUniqueArgs} args - Arguments to find a Radcheck
     * @example
     * // Get one Radcheck
     * const radcheck = await prisma.radcheck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radcheckFindUniqueArgs>(args: SelectSubset<T, radcheckFindUniqueArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radcheck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radcheckFindUniqueOrThrowArgs} args - Arguments to find a Radcheck
     * @example
     * // Get one Radcheck
     * const radcheck = await prisma.radcheck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radcheckFindUniqueOrThrowArgs>(args: SelectSubset<T, radcheckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radcheck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radcheckFindFirstArgs} args - Arguments to find a Radcheck
     * @example
     * // Get one Radcheck
     * const radcheck = await prisma.radcheck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radcheckFindFirstArgs>(args?: SelectSubset<T, radcheckFindFirstArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radcheck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radcheckFindFirstOrThrowArgs} args - Arguments to find a Radcheck
     * @example
     * // Get one Radcheck
     * const radcheck = await prisma.radcheck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radcheckFindFirstOrThrowArgs>(args?: SelectSubset<T, radcheckFindFirstOrThrowArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radchecks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radcheckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radchecks
     * const radchecks = await prisma.radcheck.findMany()
     * 
     * // Get first 10 Radchecks
     * const radchecks = await prisma.radcheck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radcheckWithIdOnly = await prisma.radcheck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends radcheckFindManyArgs>(args?: SelectSubset<T, radcheckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radcheck.
     * @param {radcheckCreateArgs} args - Arguments to create a Radcheck.
     * @example
     * // Create one Radcheck
     * const Radcheck = await prisma.radcheck.create({
     *   data: {
     *     // ... data to create a Radcheck
     *   }
     * })
     * 
     */
    create<T extends radcheckCreateArgs>(args: SelectSubset<T, radcheckCreateArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radchecks.
     * @param {radcheckCreateManyArgs} args - Arguments to create many Radchecks.
     * @example
     * // Create many Radchecks
     * const radcheck = await prisma.radcheck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radcheckCreateManyArgs>(args?: SelectSubset<T, radcheckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radcheck.
     * @param {radcheckDeleteArgs} args - Arguments to delete one Radcheck.
     * @example
     * // Delete one Radcheck
     * const Radcheck = await prisma.radcheck.delete({
     *   where: {
     *     // ... filter to delete one Radcheck
     *   }
     * })
     * 
     */
    delete<T extends radcheckDeleteArgs>(args: SelectSubset<T, radcheckDeleteArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radcheck.
     * @param {radcheckUpdateArgs} args - Arguments to update one Radcheck.
     * @example
     * // Update one Radcheck
     * const radcheck = await prisma.radcheck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radcheckUpdateArgs>(args: SelectSubset<T, radcheckUpdateArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radchecks.
     * @param {radcheckDeleteManyArgs} args - Arguments to filter Radchecks to delete.
     * @example
     * // Delete a few Radchecks
     * const { count } = await prisma.radcheck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radcheckDeleteManyArgs>(args?: SelectSubset<T, radcheckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radchecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radcheckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radchecks
     * const radcheck = await prisma.radcheck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radcheckUpdateManyArgs>(args: SelectSubset<T, radcheckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radcheck.
     * @param {radcheckUpsertArgs} args - Arguments to update or create a Radcheck.
     * @example
     * // Update or create a Radcheck
     * const radcheck = await prisma.radcheck.upsert({
     *   create: {
     *     // ... data to create a Radcheck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radcheck we want to update
     *   }
     * })
     */
    upsert<T extends radcheckUpsertArgs>(args: SelectSubset<T, radcheckUpsertArgs<ExtArgs>>): Prisma__radcheckClient<$Result.GetResult<Prisma.$radcheckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radchecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radcheckCountArgs} args - Arguments to filter Radchecks to count.
     * @example
     * // Count the number of Radchecks
     * const count = await prisma.radcheck.count({
     *   where: {
     *     // ... the filter for the Radchecks we want to count
     *   }
     * })
    **/
    count<T extends radcheckCountArgs>(
      args?: Subset<T, radcheckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadcheckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radcheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadcheckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadcheckAggregateArgs>(args: Subset<T, RadcheckAggregateArgs>): Prisma.PrismaPromise<GetRadcheckAggregateType<T>>

    /**
     * Group by Radcheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radcheckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radcheckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radcheckGroupByArgs['orderBy'] }
        : { orderBy?: radcheckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radcheckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadcheckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radcheck model
   */
  readonly fields: radcheckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radcheck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radcheckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radcheck model
   */
  interface radcheckFieldRefs {
    readonly id: FieldRef<"radcheck", 'Int'>
    readonly username: FieldRef<"radcheck", 'String'>
    readonly attribute: FieldRef<"radcheck", 'String'>
    readonly op: FieldRef<"radcheck", 'String'>
    readonly value: FieldRef<"radcheck", 'String'>
  }
    

  // Custom InputTypes
  /**
   * radcheck findUnique
   */
  export type radcheckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * Filter, which radcheck to fetch.
     */
    where: radcheckWhereUniqueInput
  }

  /**
   * radcheck findUniqueOrThrow
   */
  export type radcheckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * Filter, which radcheck to fetch.
     */
    where: radcheckWhereUniqueInput
  }

  /**
   * radcheck findFirst
   */
  export type radcheckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * Filter, which radcheck to fetch.
     */
    where?: radcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radchecks to fetch.
     */
    orderBy?: radcheckOrderByWithRelationInput | radcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radchecks.
     */
    cursor?: radcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radchecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radchecks.
     */
    distinct?: RadcheckScalarFieldEnum | RadcheckScalarFieldEnum[]
  }

  /**
   * radcheck findFirstOrThrow
   */
  export type radcheckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * Filter, which radcheck to fetch.
     */
    where?: radcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radchecks to fetch.
     */
    orderBy?: radcheckOrderByWithRelationInput | radcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radchecks.
     */
    cursor?: radcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radchecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radchecks.
     */
    distinct?: RadcheckScalarFieldEnum | RadcheckScalarFieldEnum[]
  }

  /**
   * radcheck findMany
   */
  export type radcheckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * Filter, which radchecks to fetch.
     */
    where?: radcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radchecks to fetch.
     */
    orderBy?: radcheckOrderByWithRelationInput | radcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radchecks.
     */
    cursor?: radcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radchecks.
     */
    skip?: number
    distinct?: RadcheckScalarFieldEnum | RadcheckScalarFieldEnum[]
  }

  /**
   * radcheck create
   */
  export type radcheckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * The data needed to create a radcheck.
     */
    data?: XOR<radcheckCreateInput, radcheckUncheckedCreateInput>
  }

  /**
   * radcheck createMany
   */
  export type radcheckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radchecks.
     */
    data: radcheckCreateManyInput | radcheckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radcheck update
   */
  export type radcheckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * The data needed to update a radcheck.
     */
    data: XOR<radcheckUpdateInput, radcheckUncheckedUpdateInput>
    /**
     * Choose, which radcheck to update.
     */
    where: radcheckWhereUniqueInput
  }

  /**
   * radcheck updateMany
   */
  export type radcheckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radchecks.
     */
    data: XOR<radcheckUpdateManyMutationInput, radcheckUncheckedUpdateManyInput>
    /**
     * Filter which radchecks to update
     */
    where?: radcheckWhereInput
    /**
     * Limit how many radchecks to update.
     */
    limit?: number
  }

  /**
   * radcheck upsert
   */
  export type radcheckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * The filter to search for the radcheck to update in case it exists.
     */
    where: radcheckWhereUniqueInput
    /**
     * In case the radcheck found by the `where` argument doesn't exist, create a new radcheck with this data.
     */
    create: XOR<radcheckCreateInput, radcheckUncheckedCreateInput>
    /**
     * In case the radcheck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radcheckUpdateInput, radcheckUncheckedUpdateInput>
  }

  /**
   * radcheck delete
   */
  export type radcheckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
    /**
     * Filter which radcheck to delete.
     */
    where: radcheckWhereUniqueInput
  }

  /**
   * radcheck deleteMany
   */
  export type radcheckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radchecks to delete
     */
    where?: radcheckWhereInput
    /**
     * Limit how many radchecks to delete.
     */
    limit?: number
  }

  /**
   * radcheck without action
   */
  export type radcheckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radcheck
     */
    select?: radcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radcheck
     */
    omit?: radcheckOmit<ExtArgs> | null
  }


  /**
   * Model radgroupcheck
   */

  export type AggregateRadgroupcheck = {
    _count: RadgroupcheckCountAggregateOutputType | null
    _avg: RadgroupcheckAvgAggregateOutputType | null
    _sum: RadgroupcheckSumAggregateOutputType | null
    _min: RadgroupcheckMinAggregateOutputType | null
    _max: RadgroupcheckMaxAggregateOutputType | null
  }

  export type RadgroupcheckAvgAggregateOutputType = {
    id: number | null
  }

  export type RadgroupcheckSumAggregateOutputType = {
    id: number | null
  }

  export type RadgroupcheckMinAggregateOutputType = {
    id: number | null
    groupname: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadgroupcheckMaxAggregateOutputType = {
    id: number | null
    groupname: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadgroupcheckCountAggregateOutputType = {
    id: number
    groupname: number
    attribute: number
    op: number
    value: number
    _all: number
  }


  export type RadgroupcheckAvgAggregateInputType = {
    id?: true
  }

  export type RadgroupcheckSumAggregateInputType = {
    id?: true
  }

  export type RadgroupcheckMinAggregateInputType = {
    id?: true
    groupname?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadgroupcheckMaxAggregateInputType = {
    id?: true
    groupname?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadgroupcheckCountAggregateInputType = {
    id?: true
    groupname?: true
    attribute?: true
    op?: true
    value?: true
    _all?: true
  }

  export type RadgroupcheckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radgroupcheck to aggregate.
     */
    where?: radgroupcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupchecks to fetch.
     */
    orderBy?: radgroupcheckOrderByWithRelationInput | radgroupcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radgroupcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupchecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radgroupchecks
    **/
    _count?: true | RadgroupcheckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadgroupcheckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadgroupcheckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadgroupcheckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadgroupcheckMaxAggregateInputType
  }

  export type GetRadgroupcheckAggregateType<T extends RadgroupcheckAggregateArgs> = {
        [P in keyof T & keyof AggregateRadgroupcheck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadgroupcheck[P]>
      : GetScalarType<T[P], AggregateRadgroupcheck[P]>
  }




  export type radgroupcheckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radgroupcheckWhereInput
    orderBy?: radgroupcheckOrderByWithAggregationInput | radgroupcheckOrderByWithAggregationInput[]
    by: RadgroupcheckScalarFieldEnum[] | RadgroupcheckScalarFieldEnum
    having?: radgroupcheckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadgroupcheckCountAggregateInputType | true
    _avg?: RadgroupcheckAvgAggregateInputType
    _sum?: RadgroupcheckSumAggregateInputType
    _min?: RadgroupcheckMinAggregateInputType
    _max?: RadgroupcheckMaxAggregateInputType
  }

  export type RadgroupcheckGroupByOutputType = {
    id: number
    groupname: string
    attribute: string
    op: string
    value: string
    _count: RadgroupcheckCountAggregateOutputType | null
    _avg: RadgroupcheckAvgAggregateOutputType | null
    _sum: RadgroupcheckSumAggregateOutputType | null
    _min: RadgroupcheckMinAggregateOutputType | null
    _max: RadgroupcheckMaxAggregateOutputType | null
  }

  type GetRadgroupcheckGroupByPayload<T extends radgroupcheckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadgroupcheckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadgroupcheckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadgroupcheckGroupByOutputType[P]>
            : GetScalarType<T[P], RadgroupcheckGroupByOutputType[P]>
        }
      >
    >


  export type radgroupcheckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupname?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }, ExtArgs["result"]["radgroupcheck"]>



  export type radgroupcheckSelectScalar = {
    id?: boolean
    groupname?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }

  export type radgroupcheckOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "groupname" | "attribute" | "op" | "value", ExtArgs["result"]["radgroupcheck"]>

  export type $radgroupcheckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radgroupcheck"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      groupname: string
      attribute: string
      op: string
      value: string
    }, ExtArgs["result"]["radgroupcheck"]>
    composites: {}
  }

  type radgroupcheckGetPayload<S extends boolean | null | undefined | radgroupcheckDefaultArgs> = $Result.GetResult<Prisma.$radgroupcheckPayload, S>

  type radgroupcheckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radgroupcheckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadgroupcheckCountAggregateInputType | true
    }

  export interface radgroupcheckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radgroupcheck'], meta: { name: 'radgroupcheck' } }
    /**
     * Find zero or one Radgroupcheck that matches the filter.
     * @param {radgroupcheckFindUniqueArgs} args - Arguments to find a Radgroupcheck
     * @example
     * // Get one Radgroupcheck
     * const radgroupcheck = await prisma.radgroupcheck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radgroupcheckFindUniqueArgs>(args: SelectSubset<T, radgroupcheckFindUniqueArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radgroupcheck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radgroupcheckFindUniqueOrThrowArgs} args - Arguments to find a Radgroupcheck
     * @example
     * // Get one Radgroupcheck
     * const radgroupcheck = await prisma.radgroupcheck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radgroupcheckFindUniqueOrThrowArgs>(args: SelectSubset<T, radgroupcheckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radgroupcheck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupcheckFindFirstArgs} args - Arguments to find a Radgroupcheck
     * @example
     * // Get one Radgroupcheck
     * const radgroupcheck = await prisma.radgroupcheck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radgroupcheckFindFirstArgs>(args?: SelectSubset<T, radgroupcheckFindFirstArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radgroupcheck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupcheckFindFirstOrThrowArgs} args - Arguments to find a Radgroupcheck
     * @example
     * // Get one Radgroupcheck
     * const radgroupcheck = await prisma.radgroupcheck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radgroupcheckFindFirstOrThrowArgs>(args?: SelectSubset<T, radgroupcheckFindFirstOrThrowArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radgroupchecks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupcheckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radgroupchecks
     * const radgroupchecks = await prisma.radgroupcheck.findMany()
     * 
     * // Get first 10 Radgroupchecks
     * const radgroupchecks = await prisma.radgroupcheck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radgroupcheckWithIdOnly = await prisma.radgroupcheck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends radgroupcheckFindManyArgs>(args?: SelectSubset<T, radgroupcheckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radgroupcheck.
     * @param {radgroupcheckCreateArgs} args - Arguments to create a Radgroupcheck.
     * @example
     * // Create one Radgroupcheck
     * const Radgroupcheck = await prisma.radgroupcheck.create({
     *   data: {
     *     // ... data to create a Radgroupcheck
     *   }
     * })
     * 
     */
    create<T extends radgroupcheckCreateArgs>(args: SelectSubset<T, radgroupcheckCreateArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radgroupchecks.
     * @param {radgroupcheckCreateManyArgs} args - Arguments to create many Radgroupchecks.
     * @example
     * // Create many Radgroupchecks
     * const radgroupcheck = await prisma.radgroupcheck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radgroupcheckCreateManyArgs>(args?: SelectSubset<T, radgroupcheckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radgroupcheck.
     * @param {radgroupcheckDeleteArgs} args - Arguments to delete one Radgroupcheck.
     * @example
     * // Delete one Radgroupcheck
     * const Radgroupcheck = await prisma.radgroupcheck.delete({
     *   where: {
     *     // ... filter to delete one Radgroupcheck
     *   }
     * })
     * 
     */
    delete<T extends radgroupcheckDeleteArgs>(args: SelectSubset<T, radgroupcheckDeleteArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radgroupcheck.
     * @param {radgroupcheckUpdateArgs} args - Arguments to update one Radgroupcheck.
     * @example
     * // Update one Radgroupcheck
     * const radgroupcheck = await prisma.radgroupcheck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radgroupcheckUpdateArgs>(args: SelectSubset<T, radgroupcheckUpdateArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radgroupchecks.
     * @param {radgroupcheckDeleteManyArgs} args - Arguments to filter Radgroupchecks to delete.
     * @example
     * // Delete a few Radgroupchecks
     * const { count } = await prisma.radgroupcheck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radgroupcheckDeleteManyArgs>(args?: SelectSubset<T, radgroupcheckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radgroupchecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupcheckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radgroupchecks
     * const radgroupcheck = await prisma.radgroupcheck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radgroupcheckUpdateManyArgs>(args: SelectSubset<T, radgroupcheckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radgroupcheck.
     * @param {radgroupcheckUpsertArgs} args - Arguments to update or create a Radgroupcheck.
     * @example
     * // Update or create a Radgroupcheck
     * const radgroupcheck = await prisma.radgroupcheck.upsert({
     *   create: {
     *     // ... data to create a Radgroupcheck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radgroupcheck we want to update
     *   }
     * })
     */
    upsert<T extends radgroupcheckUpsertArgs>(args: SelectSubset<T, radgroupcheckUpsertArgs<ExtArgs>>): Prisma__radgroupcheckClient<$Result.GetResult<Prisma.$radgroupcheckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radgroupchecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupcheckCountArgs} args - Arguments to filter Radgroupchecks to count.
     * @example
     * // Count the number of Radgroupchecks
     * const count = await prisma.radgroupcheck.count({
     *   where: {
     *     // ... the filter for the Radgroupchecks we want to count
     *   }
     * })
    **/
    count<T extends radgroupcheckCountArgs>(
      args?: Subset<T, radgroupcheckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadgroupcheckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radgroupcheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadgroupcheckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadgroupcheckAggregateArgs>(args: Subset<T, RadgroupcheckAggregateArgs>): Prisma.PrismaPromise<GetRadgroupcheckAggregateType<T>>

    /**
     * Group by Radgroupcheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupcheckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radgroupcheckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radgroupcheckGroupByArgs['orderBy'] }
        : { orderBy?: radgroupcheckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radgroupcheckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadgroupcheckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radgroupcheck model
   */
  readonly fields: radgroupcheckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radgroupcheck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radgroupcheckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radgroupcheck model
   */
  interface radgroupcheckFieldRefs {
    readonly id: FieldRef<"radgroupcheck", 'Int'>
    readonly groupname: FieldRef<"radgroupcheck", 'String'>
    readonly attribute: FieldRef<"radgroupcheck", 'String'>
    readonly op: FieldRef<"radgroupcheck", 'String'>
    readonly value: FieldRef<"radgroupcheck", 'String'>
  }
    

  // Custom InputTypes
  /**
   * radgroupcheck findUnique
   */
  export type radgroupcheckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * Filter, which radgroupcheck to fetch.
     */
    where: radgroupcheckWhereUniqueInput
  }

  /**
   * radgroupcheck findUniqueOrThrow
   */
  export type radgroupcheckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * Filter, which radgroupcheck to fetch.
     */
    where: radgroupcheckWhereUniqueInput
  }

  /**
   * radgroupcheck findFirst
   */
  export type radgroupcheckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * Filter, which radgroupcheck to fetch.
     */
    where?: radgroupcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupchecks to fetch.
     */
    orderBy?: radgroupcheckOrderByWithRelationInput | radgroupcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radgroupchecks.
     */
    cursor?: radgroupcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupchecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radgroupchecks.
     */
    distinct?: RadgroupcheckScalarFieldEnum | RadgroupcheckScalarFieldEnum[]
  }

  /**
   * radgroupcheck findFirstOrThrow
   */
  export type radgroupcheckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * Filter, which radgroupcheck to fetch.
     */
    where?: radgroupcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupchecks to fetch.
     */
    orderBy?: radgroupcheckOrderByWithRelationInput | radgroupcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radgroupchecks.
     */
    cursor?: radgroupcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupchecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radgroupchecks.
     */
    distinct?: RadgroupcheckScalarFieldEnum | RadgroupcheckScalarFieldEnum[]
  }

  /**
   * radgroupcheck findMany
   */
  export type radgroupcheckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * Filter, which radgroupchecks to fetch.
     */
    where?: radgroupcheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupchecks to fetch.
     */
    orderBy?: radgroupcheckOrderByWithRelationInput | radgroupcheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radgroupchecks.
     */
    cursor?: radgroupcheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupchecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupchecks.
     */
    skip?: number
    distinct?: RadgroupcheckScalarFieldEnum | RadgroupcheckScalarFieldEnum[]
  }

  /**
   * radgroupcheck create
   */
  export type radgroupcheckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * The data needed to create a radgroupcheck.
     */
    data?: XOR<radgroupcheckCreateInput, radgroupcheckUncheckedCreateInput>
  }

  /**
   * radgroupcheck createMany
   */
  export type radgroupcheckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radgroupchecks.
     */
    data: radgroupcheckCreateManyInput | radgroupcheckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radgroupcheck update
   */
  export type radgroupcheckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * The data needed to update a radgroupcheck.
     */
    data: XOR<radgroupcheckUpdateInput, radgroupcheckUncheckedUpdateInput>
    /**
     * Choose, which radgroupcheck to update.
     */
    where: radgroupcheckWhereUniqueInput
  }

  /**
   * radgroupcheck updateMany
   */
  export type radgroupcheckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radgroupchecks.
     */
    data: XOR<radgroupcheckUpdateManyMutationInput, radgroupcheckUncheckedUpdateManyInput>
    /**
     * Filter which radgroupchecks to update
     */
    where?: radgroupcheckWhereInput
    /**
     * Limit how many radgroupchecks to update.
     */
    limit?: number
  }

  /**
   * radgroupcheck upsert
   */
  export type radgroupcheckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * The filter to search for the radgroupcheck to update in case it exists.
     */
    where: radgroupcheckWhereUniqueInput
    /**
     * In case the radgroupcheck found by the `where` argument doesn't exist, create a new radgroupcheck with this data.
     */
    create: XOR<radgroupcheckCreateInput, radgroupcheckUncheckedCreateInput>
    /**
     * In case the radgroupcheck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radgroupcheckUpdateInput, radgroupcheckUncheckedUpdateInput>
  }

  /**
   * radgroupcheck delete
   */
  export type radgroupcheckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
    /**
     * Filter which radgroupcheck to delete.
     */
    where: radgroupcheckWhereUniqueInput
  }

  /**
   * radgroupcheck deleteMany
   */
  export type radgroupcheckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radgroupchecks to delete
     */
    where?: radgroupcheckWhereInput
    /**
     * Limit how many radgroupchecks to delete.
     */
    limit?: number
  }

  /**
   * radgroupcheck without action
   */
  export type radgroupcheckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupcheck
     */
    select?: radgroupcheckSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupcheck
     */
    omit?: radgroupcheckOmit<ExtArgs> | null
  }


  /**
   * Model radgroupreply
   */

  export type AggregateRadgroupreply = {
    _count: RadgroupreplyCountAggregateOutputType | null
    _avg: RadgroupreplyAvgAggregateOutputType | null
    _sum: RadgroupreplySumAggregateOutputType | null
    _min: RadgroupreplyMinAggregateOutputType | null
    _max: RadgroupreplyMaxAggregateOutputType | null
  }

  export type RadgroupreplyAvgAggregateOutputType = {
    id: number | null
  }

  export type RadgroupreplySumAggregateOutputType = {
    id: number | null
  }

  export type RadgroupreplyMinAggregateOutputType = {
    id: number | null
    groupname: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadgroupreplyMaxAggregateOutputType = {
    id: number | null
    groupname: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadgroupreplyCountAggregateOutputType = {
    id: number
    groupname: number
    attribute: number
    op: number
    value: number
    _all: number
  }


  export type RadgroupreplyAvgAggregateInputType = {
    id?: true
  }

  export type RadgroupreplySumAggregateInputType = {
    id?: true
  }

  export type RadgroupreplyMinAggregateInputType = {
    id?: true
    groupname?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadgroupreplyMaxAggregateInputType = {
    id?: true
    groupname?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadgroupreplyCountAggregateInputType = {
    id?: true
    groupname?: true
    attribute?: true
    op?: true
    value?: true
    _all?: true
  }

  export type RadgroupreplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radgroupreply to aggregate.
     */
    where?: radgroupreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupreplies to fetch.
     */
    orderBy?: radgroupreplyOrderByWithRelationInput | radgroupreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radgroupreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupreplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radgroupreplies
    **/
    _count?: true | RadgroupreplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadgroupreplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadgroupreplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadgroupreplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadgroupreplyMaxAggregateInputType
  }

  export type GetRadgroupreplyAggregateType<T extends RadgroupreplyAggregateArgs> = {
        [P in keyof T & keyof AggregateRadgroupreply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadgroupreply[P]>
      : GetScalarType<T[P], AggregateRadgroupreply[P]>
  }




  export type radgroupreplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radgroupreplyWhereInput
    orderBy?: radgroupreplyOrderByWithAggregationInput | radgroupreplyOrderByWithAggregationInput[]
    by: RadgroupreplyScalarFieldEnum[] | RadgroupreplyScalarFieldEnum
    having?: radgroupreplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadgroupreplyCountAggregateInputType | true
    _avg?: RadgroupreplyAvgAggregateInputType
    _sum?: RadgroupreplySumAggregateInputType
    _min?: RadgroupreplyMinAggregateInputType
    _max?: RadgroupreplyMaxAggregateInputType
  }

  export type RadgroupreplyGroupByOutputType = {
    id: number
    groupname: string
    attribute: string
    op: string
    value: string
    _count: RadgroupreplyCountAggregateOutputType | null
    _avg: RadgroupreplyAvgAggregateOutputType | null
    _sum: RadgroupreplySumAggregateOutputType | null
    _min: RadgroupreplyMinAggregateOutputType | null
    _max: RadgroupreplyMaxAggregateOutputType | null
  }

  type GetRadgroupreplyGroupByPayload<T extends radgroupreplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadgroupreplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadgroupreplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadgroupreplyGroupByOutputType[P]>
            : GetScalarType<T[P], RadgroupreplyGroupByOutputType[P]>
        }
      >
    >


  export type radgroupreplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupname?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }, ExtArgs["result"]["radgroupreply"]>



  export type radgroupreplySelectScalar = {
    id?: boolean
    groupname?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }

  export type radgroupreplyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "groupname" | "attribute" | "op" | "value", ExtArgs["result"]["radgroupreply"]>

  export type $radgroupreplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radgroupreply"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      groupname: string
      attribute: string
      op: string
      value: string
    }, ExtArgs["result"]["radgroupreply"]>
    composites: {}
  }

  type radgroupreplyGetPayload<S extends boolean | null | undefined | radgroupreplyDefaultArgs> = $Result.GetResult<Prisma.$radgroupreplyPayload, S>

  type radgroupreplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radgroupreplyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadgroupreplyCountAggregateInputType | true
    }

  export interface radgroupreplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radgroupreply'], meta: { name: 'radgroupreply' } }
    /**
     * Find zero or one Radgroupreply that matches the filter.
     * @param {radgroupreplyFindUniqueArgs} args - Arguments to find a Radgroupreply
     * @example
     * // Get one Radgroupreply
     * const radgroupreply = await prisma.radgroupreply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radgroupreplyFindUniqueArgs>(args: SelectSubset<T, radgroupreplyFindUniqueArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radgroupreply that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radgroupreplyFindUniqueOrThrowArgs} args - Arguments to find a Radgroupreply
     * @example
     * // Get one Radgroupreply
     * const radgroupreply = await prisma.radgroupreply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radgroupreplyFindUniqueOrThrowArgs>(args: SelectSubset<T, radgroupreplyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radgroupreply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupreplyFindFirstArgs} args - Arguments to find a Radgroupreply
     * @example
     * // Get one Radgroupreply
     * const radgroupreply = await prisma.radgroupreply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radgroupreplyFindFirstArgs>(args?: SelectSubset<T, radgroupreplyFindFirstArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radgroupreply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupreplyFindFirstOrThrowArgs} args - Arguments to find a Radgroupreply
     * @example
     * // Get one Radgroupreply
     * const radgroupreply = await prisma.radgroupreply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radgroupreplyFindFirstOrThrowArgs>(args?: SelectSubset<T, radgroupreplyFindFirstOrThrowArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radgroupreplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupreplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radgroupreplies
     * const radgroupreplies = await prisma.radgroupreply.findMany()
     * 
     * // Get first 10 Radgroupreplies
     * const radgroupreplies = await prisma.radgroupreply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radgroupreplyWithIdOnly = await prisma.radgroupreply.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends radgroupreplyFindManyArgs>(args?: SelectSubset<T, radgroupreplyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radgroupreply.
     * @param {radgroupreplyCreateArgs} args - Arguments to create a Radgroupreply.
     * @example
     * // Create one Radgroupreply
     * const Radgroupreply = await prisma.radgroupreply.create({
     *   data: {
     *     // ... data to create a Radgroupreply
     *   }
     * })
     * 
     */
    create<T extends radgroupreplyCreateArgs>(args: SelectSubset<T, radgroupreplyCreateArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radgroupreplies.
     * @param {radgroupreplyCreateManyArgs} args - Arguments to create many Radgroupreplies.
     * @example
     * // Create many Radgroupreplies
     * const radgroupreply = await prisma.radgroupreply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radgroupreplyCreateManyArgs>(args?: SelectSubset<T, radgroupreplyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radgroupreply.
     * @param {radgroupreplyDeleteArgs} args - Arguments to delete one Radgroupreply.
     * @example
     * // Delete one Radgroupreply
     * const Radgroupreply = await prisma.radgroupreply.delete({
     *   where: {
     *     // ... filter to delete one Radgroupreply
     *   }
     * })
     * 
     */
    delete<T extends radgroupreplyDeleteArgs>(args: SelectSubset<T, radgroupreplyDeleteArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radgroupreply.
     * @param {radgroupreplyUpdateArgs} args - Arguments to update one Radgroupreply.
     * @example
     * // Update one Radgroupreply
     * const radgroupreply = await prisma.radgroupreply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radgroupreplyUpdateArgs>(args: SelectSubset<T, radgroupreplyUpdateArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radgroupreplies.
     * @param {radgroupreplyDeleteManyArgs} args - Arguments to filter Radgroupreplies to delete.
     * @example
     * // Delete a few Radgroupreplies
     * const { count } = await prisma.radgroupreply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radgroupreplyDeleteManyArgs>(args?: SelectSubset<T, radgroupreplyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radgroupreplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupreplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radgroupreplies
     * const radgroupreply = await prisma.radgroupreply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radgroupreplyUpdateManyArgs>(args: SelectSubset<T, radgroupreplyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radgroupreply.
     * @param {radgroupreplyUpsertArgs} args - Arguments to update or create a Radgroupreply.
     * @example
     * // Update or create a Radgroupreply
     * const radgroupreply = await prisma.radgroupreply.upsert({
     *   create: {
     *     // ... data to create a Radgroupreply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radgroupreply we want to update
     *   }
     * })
     */
    upsert<T extends radgroupreplyUpsertArgs>(args: SelectSubset<T, radgroupreplyUpsertArgs<ExtArgs>>): Prisma__radgroupreplyClient<$Result.GetResult<Prisma.$radgroupreplyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radgroupreplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupreplyCountArgs} args - Arguments to filter Radgroupreplies to count.
     * @example
     * // Count the number of Radgroupreplies
     * const count = await prisma.radgroupreply.count({
     *   where: {
     *     // ... the filter for the Radgroupreplies we want to count
     *   }
     * })
    **/
    count<T extends radgroupreplyCountArgs>(
      args?: Subset<T, radgroupreplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadgroupreplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radgroupreply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadgroupreplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadgroupreplyAggregateArgs>(args: Subset<T, RadgroupreplyAggregateArgs>): Prisma.PrismaPromise<GetRadgroupreplyAggregateType<T>>

    /**
     * Group by Radgroupreply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radgroupreplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radgroupreplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radgroupreplyGroupByArgs['orderBy'] }
        : { orderBy?: radgroupreplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radgroupreplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadgroupreplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radgroupreply model
   */
  readonly fields: radgroupreplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radgroupreply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radgroupreplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radgroupreply model
   */
  interface radgroupreplyFieldRefs {
    readonly id: FieldRef<"radgroupreply", 'Int'>
    readonly groupname: FieldRef<"radgroupreply", 'String'>
    readonly attribute: FieldRef<"radgroupreply", 'String'>
    readonly op: FieldRef<"radgroupreply", 'String'>
    readonly value: FieldRef<"radgroupreply", 'String'>
  }
    

  // Custom InputTypes
  /**
   * radgroupreply findUnique
   */
  export type radgroupreplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * Filter, which radgroupreply to fetch.
     */
    where: radgroupreplyWhereUniqueInput
  }

  /**
   * radgroupreply findUniqueOrThrow
   */
  export type radgroupreplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * Filter, which radgroupreply to fetch.
     */
    where: radgroupreplyWhereUniqueInput
  }

  /**
   * radgroupreply findFirst
   */
  export type radgroupreplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * Filter, which radgroupreply to fetch.
     */
    where?: radgroupreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupreplies to fetch.
     */
    orderBy?: radgroupreplyOrderByWithRelationInput | radgroupreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radgroupreplies.
     */
    cursor?: radgroupreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupreplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radgroupreplies.
     */
    distinct?: RadgroupreplyScalarFieldEnum | RadgroupreplyScalarFieldEnum[]
  }

  /**
   * radgroupreply findFirstOrThrow
   */
  export type radgroupreplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * Filter, which radgroupreply to fetch.
     */
    where?: radgroupreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupreplies to fetch.
     */
    orderBy?: radgroupreplyOrderByWithRelationInput | radgroupreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radgroupreplies.
     */
    cursor?: radgroupreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupreplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radgroupreplies.
     */
    distinct?: RadgroupreplyScalarFieldEnum | RadgroupreplyScalarFieldEnum[]
  }

  /**
   * radgroupreply findMany
   */
  export type radgroupreplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * Filter, which radgroupreplies to fetch.
     */
    where?: radgroupreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radgroupreplies to fetch.
     */
    orderBy?: radgroupreplyOrderByWithRelationInput | radgroupreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radgroupreplies.
     */
    cursor?: radgroupreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radgroupreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radgroupreplies.
     */
    skip?: number
    distinct?: RadgroupreplyScalarFieldEnum | RadgroupreplyScalarFieldEnum[]
  }

  /**
   * radgroupreply create
   */
  export type radgroupreplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * The data needed to create a radgroupreply.
     */
    data?: XOR<radgroupreplyCreateInput, radgroupreplyUncheckedCreateInput>
  }

  /**
   * radgroupreply createMany
   */
  export type radgroupreplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radgroupreplies.
     */
    data: radgroupreplyCreateManyInput | radgroupreplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radgroupreply update
   */
  export type radgroupreplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * The data needed to update a radgroupreply.
     */
    data: XOR<radgroupreplyUpdateInput, radgroupreplyUncheckedUpdateInput>
    /**
     * Choose, which radgroupreply to update.
     */
    where: radgroupreplyWhereUniqueInput
  }

  /**
   * radgroupreply updateMany
   */
  export type radgroupreplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radgroupreplies.
     */
    data: XOR<radgroupreplyUpdateManyMutationInput, radgroupreplyUncheckedUpdateManyInput>
    /**
     * Filter which radgroupreplies to update
     */
    where?: radgroupreplyWhereInput
    /**
     * Limit how many radgroupreplies to update.
     */
    limit?: number
  }

  /**
   * radgroupreply upsert
   */
  export type radgroupreplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * The filter to search for the radgroupreply to update in case it exists.
     */
    where: radgroupreplyWhereUniqueInput
    /**
     * In case the radgroupreply found by the `where` argument doesn't exist, create a new radgroupreply with this data.
     */
    create: XOR<radgroupreplyCreateInput, radgroupreplyUncheckedCreateInput>
    /**
     * In case the radgroupreply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radgroupreplyUpdateInput, radgroupreplyUncheckedUpdateInput>
  }

  /**
   * radgroupreply delete
   */
  export type radgroupreplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
    /**
     * Filter which radgroupreply to delete.
     */
    where: radgroupreplyWhereUniqueInput
  }

  /**
   * radgroupreply deleteMany
   */
  export type radgroupreplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radgroupreplies to delete
     */
    where?: radgroupreplyWhereInput
    /**
     * Limit how many radgroupreplies to delete.
     */
    limit?: number
  }

  /**
   * radgroupreply without action
   */
  export type radgroupreplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radgroupreply
     */
    select?: radgroupreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radgroupreply
     */
    omit?: radgroupreplyOmit<ExtArgs> | null
  }


  /**
   * Model radpostauth
   */

  export type AggregateRadpostauth = {
    _count: RadpostauthCountAggregateOutputType | null
    _avg: RadpostauthAvgAggregateOutputType | null
    _sum: RadpostauthSumAggregateOutputType | null
    _min: RadpostauthMinAggregateOutputType | null
    _max: RadpostauthMaxAggregateOutputType | null
  }

  export type RadpostauthAvgAggregateOutputType = {
    id: number | null
  }

  export type RadpostauthSumAggregateOutputType = {
    id: number | null
  }

  export type RadpostauthMinAggregateOutputType = {
    id: number | null
    username: string | null
    pass: string | null
    reply: string | null
    authdate: Date | null
    class: string | null
  }

  export type RadpostauthMaxAggregateOutputType = {
    id: number | null
    username: string | null
    pass: string | null
    reply: string | null
    authdate: Date | null
    class: string | null
  }

  export type RadpostauthCountAggregateOutputType = {
    id: number
    username: number
    pass: number
    reply: number
    authdate: number
    class: number
    _all: number
  }


  export type RadpostauthAvgAggregateInputType = {
    id?: true
  }

  export type RadpostauthSumAggregateInputType = {
    id?: true
  }

  export type RadpostauthMinAggregateInputType = {
    id?: true
    username?: true
    pass?: true
    reply?: true
    authdate?: true
    class?: true
  }

  export type RadpostauthMaxAggregateInputType = {
    id?: true
    username?: true
    pass?: true
    reply?: true
    authdate?: true
    class?: true
  }

  export type RadpostauthCountAggregateInputType = {
    id?: true
    username?: true
    pass?: true
    reply?: true
    authdate?: true
    class?: true
    _all?: true
  }

  export type RadpostauthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radpostauth to aggregate.
     */
    where?: radpostauthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radpostauths to fetch.
     */
    orderBy?: radpostauthOrderByWithRelationInput | radpostauthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radpostauthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radpostauths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radpostauths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radpostauths
    **/
    _count?: true | RadpostauthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadpostauthAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadpostauthSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadpostauthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadpostauthMaxAggregateInputType
  }

  export type GetRadpostauthAggregateType<T extends RadpostauthAggregateArgs> = {
        [P in keyof T & keyof AggregateRadpostauth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadpostauth[P]>
      : GetScalarType<T[P], AggregateRadpostauth[P]>
  }




  export type radpostauthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radpostauthWhereInput
    orderBy?: radpostauthOrderByWithAggregationInput | radpostauthOrderByWithAggregationInput[]
    by: RadpostauthScalarFieldEnum[] | RadpostauthScalarFieldEnum
    having?: radpostauthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadpostauthCountAggregateInputType | true
    _avg?: RadpostauthAvgAggregateInputType
    _sum?: RadpostauthSumAggregateInputType
    _min?: RadpostauthMinAggregateInputType
    _max?: RadpostauthMaxAggregateInputType
  }

  export type RadpostauthGroupByOutputType = {
    id: number
    username: string
    pass: string
    reply: string
    authdate: Date
    class: string | null
    _count: RadpostauthCountAggregateOutputType | null
    _avg: RadpostauthAvgAggregateOutputType | null
    _sum: RadpostauthSumAggregateOutputType | null
    _min: RadpostauthMinAggregateOutputType | null
    _max: RadpostauthMaxAggregateOutputType | null
  }

  type GetRadpostauthGroupByPayload<T extends radpostauthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadpostauthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadpostauthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadpostauthGroupByOutputType[P]>
            : GetScalarType<T[P], RadpostauthGroupByOutputType[P]>
        }
      >
    >


  export type radpostauthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    pass?: boolean
    reply?: boolean
    authdate?: boolean
    class?: boolean
  }, ExtArgs["result"]["radpostauth"]>



  export type radpostauthSelectScalar = {
    id?: boolean
    username?: boolean
    pass?: boolean
    reply?: boolean
    authdate?: boolean
    class?: boolean
  }

  export type radpostauthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "pass" | "reply" | "authdate" | "class", ExtArgs["result"]["radpostauth"]>

  export type $radpostauthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radpostauth"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      pass: string
      reply: string
      authdate: Date
      class: string | null
    }, ExtArgs["result"]["radpostauth"]>
    composites: {}
  }

  type radpostauthGetPayload<S extends boolean | null | undefined | radpostauthDefaultArgs> = $Result.GetResult<Prisma.$radpostauthPayload, S>

  type radpostauthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radpostauthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadpostauthCountAggregateInputType | true
    }

  export interface radpostauthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radpostauth'], meta: { name: 'radpostauth' } }
    /**
     * Find zero or one Radpostauth that matches the filter.
     * @param {radpostauthFindUniqueArgs} args - Arguments to find a Radpostauth
     * @example
     * // Get one Radpostauth
     * const radpostauth = await prisma.radpostauth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radpostauthFindUniqueArgs>(args: SelectSubset<T, radpostauthFindUniqueArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radpostauth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radpostauthFindUniqueOrThrowArgs} args - Arguments to find a Radpostauth
     * @example
     * // Get one Radpostauth
     * const radpostauth = await prisma.radpostauth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radpostauthFindUniqueOrThrowArgs>(args: SelectSubset<T, radpostauthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radpostauth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radpostauthFindFirstArgs} args - Arguments to find a Radpostauth
     * @example
     * // Get one Radpostauth
     * const radpostauth = await prisma.radpostauth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radpostauthFindFirstArgs>(args?: SelectSubset<T, radpostauthFindFirstArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radpostauth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radpostauthFindFirstOrThrowArgs} args - Arguments to find a Radpostauth
     * @example
     * // Get one Radpostauth
     * const radpostauth = await prisma.radpostauth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radpostauthFindFirstOrThrowArgs>(args?: SelectSubset<T, radpostauthFindFirstOrThrowArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radpostauths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radpostauthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radpostauths
     * const radpostauths = await prisma.radpostauth.findMany()
     * 
     * // Get first 10 Radpostauths
     * const radpostauths = await prisma.radpostauth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radpostauthWithIdOnly = await prisma.radpostauth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends radpostauthFindManyArgs>(args?: SelectSubset<T, radpostauthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radpostauth.
     * @param {radpostauthCreateArgs} args - Arguments to create a Radpostauth.
     * @example
     * // Create one Radpostauth
     * const Radpostauth = await prisma.radpostauth.create({
     *   data: {
     *     // ... data to create a Radpostauth
     *   }
     * })
     * 
     */
    create<T extends radpostauthCreateArgs>(args: SelectSubset<T, radpostauthCreateArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radpostauths.
     * @param {radpostauthCreateManyArgs} args - Arguments to create many Radpostauths.
     * @example
     * // Create many Radpostauths
     * const radpostauth = await prisma.radpostauth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radpostauthCreateManyArgs>(args?: SelectSubset<T, radpostauthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radpostauth.
     * @param {radpostauthDeleteArgs} args - Arguments to delete one Radpostauth.
     * @example
     * // Delete one Radpostauth
     * const Radpostauth = await prisma.radpostauth.delete({
     *   where: {
     *     // ... filter to delete one Radpostauth
     *   }
     * })
     * 
     */
    delete<T extends radpostauthDeleteArgs>(args: SelectSubset<T, radpostauthDeleteArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radpostauth.
     * @param {radpostauthUpdateArgs} args - Arguments to update one Radpostauth.
     * @example
     * // Update one Radpostauth
     * const radpostauth = await prisma.radpostauth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radpostauthUpdateArgs>(args: SelectSubset<T, radpostauthUpdateArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radpostauths.
     * @param {radpostauthDeleteManyArgs} args - Arguments to filter Radpostauths to delete.
     * @example
     * // Delete a few Radpostauths
     * const { count } = await prisma.radpostauth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radpostauthDeleteManyArgs>(args?: SelectSubset<T, radpostauthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radpostauths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radpostauthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radpostauths
     * const radpostauth = await prisma.radpostauth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radpostauthUpdateManyArgs>(args: SelectSubset<T, radpostauthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radpostauth.
     * @param {radpostauthUpsertArgs} args - Arguments to update or create a Radpostauth.
     * @example
     * // Update or create a Radpostauth
     * const radpostauth = await prisma.radpostauth.upsert({
     *   create: {
     *     // ... data to create a Radpostauth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radpostauth we want to update
     *   }
     * })
     */
    upsert<T extends radpostauthUpsertArgs>(args: SelectSubset<T, radpostauthUpsertArgs<ExtArgs>>): Prisma__radpostauthClient<$Result.GetResult<Prisma.$radpostauthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radpostauths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radpostauthCountArgs} args - Arguments to filter Radpostauths to count.
     * @example
     * // Count the number of Radpostauths
     * const count = await prisma.radpostauth.count({
     *   where: {
     *     // ... the filter for the Radpostauths we want to count
     *   }
     * })
    **/
    count<T extends radpostauthCountArgs>(
      args?: Subset<T, radpostauthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadpostauthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radpostauth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadpostauthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadpostauthAggregateArgs>(args: Subset<T, RadpostauthAggregateArgs>): Prisma.PrismaPromise<GetRadpostauthAggregateType<T>>

    /**
     * Group by Radpostauth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radpostauthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radpostauthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radpostauthGroupByArgs['orderBy'] }
        : { orderBy?: radpostauthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radpostauthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadpostauthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radpostauth model
   */
  readonly fields: radpostauthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radpostauth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radpostauthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radpostauth model
   */
  interface radpostauthFieldRefs {
    readonly id: FieldRef<"radpostauth", 'Int'>
    readonly username: FieldRef<"radpostauth", 'String'>
    readonly pass: FieldRef<"radpostauth", 'String'>
    readonly reply: FieldRef<"radpostauth", 'String'>
    readonly authdate: FieldRef<"radpostauth", 'DateTime'>
    readonly class: FieldRef<"radpostauth", 'String'>
  }
    

  // Custom InputTypes
  /**
   * radpostauth findUnique
   */
  export type radpostauthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * Filter, which radpostauth to fetch.
     */
    where: radpostauthWhereUniqueInput
  }

  /**
   * radpostauth findUniqueOrThrow
   */
  export type radpostauthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * Filter, which radpostauth to fetch.
     */
    where: radpostauthWhereUniqueInput
  }

  /**
   * radpostauth findFirst
   */
  export type radpostauthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * Filter, which radpostauth to fetch.
     */
    where?: radpostauthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radpostauths to fetch.
     */
    orderBy?: radpostauthOrderByWithRelationInput | radpostauthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radpostauths.
     */
    cursor?: radpostauthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radpostauths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radpostauths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radpostauths.
     */
    distinct?: RadpostauthScalarFieldEnum | RadpostauthScalarFieldEnum[]
  }

  /**
   * radpostauth findFirstOrThrow
   */
  export type radpostauthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * Filter, which radpostauth to fetch.
     */
    where?: radpostauthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radpostauths to fetch.
     */
    orderBy?: radpostauthOrderByWithRelationInput | radpostauthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radpostauths.
     */
    cursor?: radpostauthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radpostauths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radpostauths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radpostauths.
     */
    distinct?: RadpostauthScalarFieldEnum | RadpostauthScalarFieldEnum[]
  }

  /**
   * radpostauth findMany
   */
  export type radpostauthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * Filter, which radpostauths to fetch.
     */
    where?: radpostauthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radpostauths to fetch.
     */
    orderBy?: radpostauthOrderByWithRelationInput | radpostauthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radpostauths.
     */
    cursor?: radpostauthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radpostauths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radpostauths.
     */
    skip?: number
    distinct?: RadpostauthScalarFieldEnum | RadpostauthScalarFieldEnum[]
  }

  /**
   * radpostauth create
   */
  export type radpostauthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * The data needed to create a radpostauth.
     */
    data?: XOR<radpostauthCreateInput, radpostauthUncheckedCreateInput>
  }

  /**
   * radpostauth createMany
   */
  export type radpostauthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radpostauths.
     */
    data: radpostauthCreateManyInput | radpostauthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radpostauth update
   */
  export type radpostauthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * The data needed to update a radpostauth.
     */
    data: XOR<radpostauthUpdateInput, radpostauthUncheckedUpdateInput>
    /**
     * Choose, which radpostauth to update.
     */
    where: radpostauthWhereUniqueInput
  }

  /**
   * radpostauth updateMany
   */
  export type radpostauthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radpostauths.
     */
    data: XOR<radpostauthUpdateManyMutationInput, radpostauthUncheckedUpdateManyInput>
    /**
     * Filter which radpostauths to update
     */
    where?: radpostauthWhereInput
    /**
     * Limit how many radpostauths to update.
     */
    limit?: number
  }

  /**
   * radpostauth upsert
   */
  export type radpostauthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * The filter to search for the radpostauth to update in case it exists.
     */
    where: radpostauthWhereUniqueInput
    /**
     * In case the radpostauth found by the `where` argument doesn't exist, create a new radpostauth with this data.
     */
    create: XOR<radpostauthCreateInput, radpostauthUncheckedCreateInput>
    /**
     * In case the radpostauth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radpostauthUpdateInput, radpostauthUncheckedUpdateInput>
  }

  /**
   * radpostauth delete
   */
  export type radpostauthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
    /**
     * Filter which radpostauth to delete.
     */
    where: radpostauthWhereUniqueInput
  }

  /**
   * radpostauth deleteMany
   */
  export type radpostauthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radpostauths to delete
     */
    where?: radpostauthWhereInput
    /**
     * Limit how many radpostauths to delete.
     */
    limit?: number
  }

  /**
   * radpostauth without action
   */
  export type radpostauthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radpostauth
     */
    select?: radpostauthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radpostauth
     */
    omit?: radpostauthOmit<ExtArgs> | null
  }


  /**
   * Model radreply
   */

  export type AggregateRadreply = {
    _count: RadreplyCountAggregateOutputType | null
    _avg: RadreplyAvgAggregateOutputType | null
    _sum: RadreplySumAggregateOutputType | null
    _min: RadreplyMinAggregateOutputType | null
    _max: RadreplyMaxAggregateOutputType | null
  }

  export type RadreplyAvgAggregateOutputType = {
    id: number | null
  }

  export type RadreplySumAggregateOutputType = {
    id: number | null
  }

  export type RadreplyMinAggregateOutputType = {
    id: number | null
    username: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadreplyMaxAggregateOutputType = {
    id: number | null
    username: string | null
    attribute: string | null
    op: string | null
    value: string | null
  }

  export type RadreplyCountAggregateOutputType = {
    id: number
    username: number
    attribute: number
    op: number
    value: number
    _all: number
  }


  export type RadreplyAvgAggregateInputType = {
    id?: true
  }

  export type RadreplySumAggregateInputType = {
    id?: true
  }

  export type RadreplyMinAggregateInputType = {
    id?: true
    username?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadreplyMaxAggregateInputType = {
    id?: true
    username?: true
    attribute?: true
    op?: true
    value?: true
  }

  export type RadreplyCountAggregateInputType = {
    id?: true
    username?: true
    attribute?: true
    op?: true
    value?: true
    _all?: true
  }

  export type RadreplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radreply to aggregate.
     */
    where?: radreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radreplies to fetch.
     */
    orderBy?: radreplyOrderByWithRelationInput | radreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radreplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radreplies
    **/
    _count?: true | RadreplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadreplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadreplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadreplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadreplyMaxAggregateInputType
  }

  export type GetRadreplyAggregateType<T extends RadreplyAggregateArgs> = {
        [P in keyof T & keyof AggregateRadreply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadreply[P]>
      : GetScalarType<T[P], AggregateRadreply[P]>
  }




  export type radreplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radreplyWhereInput
    orderBy?: radreplyOrderByWithAggregationInput | radreplyOrderByWithAggregationInput[]
    by: RadreplyScalarFieldEnum[] | RadreplyScalarFieldEnum
    having?: radreplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadreplyCountAggregateInputType | true
    _avg?: RadreplyAvgAggregateInputType
    _sum?: RadreplySumAggregateInputType
    _min?: RadreplyMinAggregateInputType
    _max?: RadreplyMaxAggregateInputType
  }

  export type RadreplyGroupByOutputType = {
    id: number
    username: string
    attribute: string
    op: string
    value: string
    _count: RadreplyCountAggregateOutputType | null
    _avg: RadreplyAvgAggregateOutputType | null
    _sum: RadreplySumAggregateOutputType | null
    _min: RadreplyMinAggregateOutputType | null
    _max: RadreplyMaxAggregateOutputType | null
  }

  type GetRadreplyGroupByPayload<T extends radreplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadreplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadreplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadreplyGroupByOutputType[P]>
            : GetScalarType<T[P], RadreplyGroupByOutputType[P]>
        }
      >
    >


  export type radreplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }, ExtArgs["result"]["radreply"]>



  export type radreplySelectScalar = {
    id?: boolean
    username?: boolean
    attribute?: boolean
    op?: boolean
    value?: boolean
  }

  export type radreplyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "attribute" | "op" | "value", ExtArgs["result"]["radreply"]>

  export type $radreplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radreply"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      attribute: string
      op: string
      value: string
    }, ExtArgs["result"]["radreply"]>
    composites: {}
  }

  type radreplyGetPayload<S extends boolean | null | undefined | radreplyDefaultArgs> = $Result.GetResult<Prisma.$radreplyPayload, S>

  type radreplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radreplyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadreplyCountAggregateInputType | true
    }

  export interface radreplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radreply'], meta: { name: 'radreply' } }
    /**
     * Find zero or one Radreply that matches the filter.
     * @param {radreplyFindUniqueArgs} args - Arguments to find a Radreply
     * @example
     * // Get one Radreply
     * const radreply = await prisma.radreply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radreplyFindUniqueArgs>(args: SelectSubset<T, radreplyFindUniqueArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radreply that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radreplyFindUniqueOrThrowArgs} args - Arguments to find a Radreply
     * @example
     * // Get one Radreply
     * const radreply = await prisma.radreply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radreplyFindUniqueOrThrowArgs>(args: SelectSubset<T, radreplyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radreply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radreplyFindFirstArgs} args - Arguments to find a Radreply
     * @example
     * // Get one Radreply
     * const radreply = await prisma.radreply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radreplyFindFirstArgs>(args?: SelectSubset<T, radreplyFindFirstArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radreply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radreplyFindFirstOrThrowArgs} args - Arguments to find a Radreply
     * @example
     * // Get one Radreply
     * const radreply = await prisma.radreply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radreplyFindFirstOrThrowArgs>(args?: SelectSubset<T, radreplyFindFirstOrThrowArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radreplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radreplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radreplies
     * const radreplies = await prisma.radreply.findMany()
     * 
     * // Get first 10 Radreplies
     * const radreplies = await prisma.radreply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radreplyWithIdOnly = await prisma.radreply.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends radreplyFindManyArgs>(args?: SelectSubset<T, radreplyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radreply.
     * @param {radreplyCreateArgs} args - Arguments to create a Radreply.
     * @example
     * // Create one Radreply
     * const Radreply = await prisma.radreply.create({
     *   data: {
     *     // ... data to create a Radreply
     *   }
     * })
     * 
     */
    create<T extends radreplyCreateArgs>(args: SelectSubset<T, radreplyCreateArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radreplies.
     * @param {radreplyCreateManyArgs} args - Arguments to create many Radreplies.
     * @example
     * // Create many Radreplies
     * const radreply = await prisma.radreply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radreplyCreateManyArgs>(args?: SelectSubset<T, radreplyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radreply.
     * @param {radreplyDeleteArgs} args - Arguments to delete one Radreply.
     * @example
     * // Delete one Radreply
     * const Radreply = await prisma.radreply.delete({
     *   where: {
     *     // ... filter to delete one Radreply
     *   }
     * })
     * 
     */
    delete<T extends radreplyDeleteArgs>(args: SelectSubset<T, radreplyDeleteArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radreply.
     * @param {radreplyUpdateArgs} args - Arguments to update one Radreply.
     * @example
     * // Update one Radreply
     * const radreply = await prisma.radreply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radreplyUpdateArgs>(args: SelectSubset<T, radreplyUpdateArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radreplies.
     * @param {radreplyDeleteManyArgs} args - Arguments to filter Radreplies to delete.
     * @example
     * // Delete a few Radreplies
     * const { count } = await prisma.radreply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radreplyDeleteManyArgs>(args?: SelectSubset<T, radreplyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radreplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radreplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radreplies
     * const radreply = await prisma.radreply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radreplyUpdateManyArgs>(args: SelectSubset<T, radreplyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radreply.
     * @param {radreplyUpsertArgs} args - Arguments to update or create a Radreply.
     * @example
     * // Update or create a Radreply
     * const radreply = await prisma.radreply.upsert({
     *   create: {
     *     // ... data to create a Radreply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radreply we want to update
     *   }
     * })
     */
    upsert<T extends radreplyUpsertArgs>(args: SelectSubset<T, radreplyUpsertArgs<ExtArgs>>): Prisma__radreplyClient<$Result.GetResult<Prisma.$radreplyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radreplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radreplyCountArgs} args - Arguments to filter Radreplies to count.
     * @example
     * // Count the number of Radreplies
     * const count = await prisma.radreply.count({
     *   where: {
     *     // ... the filter for the Radreplies we want to count
     *   }
     * })
    **/
    count<T extends radreplyCountArgs>(
      args?: Subset<T, radreplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadreplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radreply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadreplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadreplyAggregateArgs>(args: Subset<T, RadreplyAggregateArgs>): Prisma.PrismaPromise<GetRadreplyAggregateType<T>>

    /**
     * Group by Radreply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radreplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radreplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radreplyGroupByArgs['orderBy'] }
        : { orderBy?: radreplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radreplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadreplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radreply model
   */
  readonly fields: radreplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radreply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radreplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radreply model
   */
  interface radreplyFieldRefs {
    readonly id: FieldRef<"radreply", 'Int'>
    readonly username: FieldRef<"radreply", 'String'>
    readonly attribute: FieldRef<"radreply", 'String'>
    readonly op: FieldRef<"radreply", 'String'>
    readonly value: FieldRef<"radreply", 'String'>
  }
    

  // Custom InputTypes
  /**
   * radreply findUnique
   */
  export type radreplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * Filter, which radreply to fetch.
     */
    where: radreplyWhereUniqueInput
  }

  /**
   * radreply findUniqueOrThrow
   */
  export type radreplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * Filter, which radreply to fetch.
     */
    where: radreplyWhereUniqueInput
  }

  /**
   * radreply findFirst
   */
  export type radreplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * Filter, which radreply to fetch.
     */
    where?: radreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radreplies to fetch.
     */
    orderBy?: radreplyOrderByWithRelationInput | radreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radreplies.
     */
    cursor?: radreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radreplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radreplies.
     */
    distinct?: RadreplyScalarFieldEnum | RadreplyScalarFieldEnum[]
  }

  /**
   * radreply findFirstOrThrow
   */
  export type radreplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * Filter, which radreply to fetch.
     */
    where?: radreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radreplies to fetch.
     */
    orderBy?: radreplyOrderByWithRelationInput | radreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radreplies.
     */
    cursor?: radreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radreplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radreplies.
     */
    distinct?: RadreplyScalarFieldEnum | RadreplyScalarFieldEnum[]
  }

  /**
   * radreply findMany
   */
  export type radreplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * Filter, which radreplies to fetch.
     */
    where?: radreplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radreplies to fetch.
     */
    orderBy?: radreplyOrderByWithRelationInput | radreplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radreplies.
     */
    cursor?: radreplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radreplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radreplies.
     */
    skip?: number
    distinct?: RadreplyScalarFieldEnum | RadreplyScalarFieldEnum[]
  }

  /**
   * radreply create
   */
  export type radreplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * The data needed to create a radreply.
     */
    data?: XOR<radreplyCreateInput, radreplyUncheckedCreateInput>
  }

  /**
   * radreply createMany
   */
  export type radreplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radreplies.
     */
    data: radreplyCreateManyInput | radreplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radreply update
   */
  export type radreplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * The data needed to update a radreply.
     */
    data: XOR<radreplyUpdateInput, radreplyUncheckedUpdateInput>
    /**
     * Choose, which radreply to update.
     */
    where: radreplyWhereUniqueInput
  }

  /**
   * radreply updateMany
   */
  export type radreplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radreplies.
     */
    data: XOR<radreplyUpdateManyMutationInput, radreplyUncheckedUpdateManyInput>
    /**
     * Filter which radreplies to update
     */
    where?: radreplyWhereInput
    /**
     * Limit how many radreplies to update.
     */
    limit?: number
  }

  /**
   * radreply upsert
   */
  export type radreplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * The filter to search for the radreply to update in case it exists.
     */
    where: radreplyWhereUniqueInput
    /**
     * In case the radreply found by the `where` argument doesn't exist, create a new radreply with this data.
     */
    create: XOR<radreplyCreateInput, radreplyUncheckedCreateInput>
    /**
     * In case the radreply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radreplyUpdateInput, radreplyUncheckedUpdateInput>
  }

  /**
   * radreply delete
   */
  export type radreplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
    /**
     * Filter which radreply to delete.
     */
    where: radreplyWhereUniqueInput
  }

  /**
   * radreply deleteMany
   */
  export type radreplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radreplies to delete
     */
    where?: radreplyWhereInput
    /**
     * Limit how many radreplies to delete.
     */
    limit?: number
  }

  /**
   * radreply without action
   */
  export type radreplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radreply
     */
    select?: radreplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the radreply
     */
    omit?: radreplyOmit<ExtArgs> | null
  }


  /**
   * Model radusergroup
   */

  export type AggregateRadusergroup = {
    _count: RadusergroupCountAggregateOutputType | null
    _avg: RadusergroupAvgAggregateOutputType | null
    _sum: RadusergroupSumAggregateOutputType | null
    _min: RadusergroupMinAggregateOutputType | null
    _max: RadusergroupMaxAggregateOutputType | null
  }

  export type RadusergroupAvgAggregateOutputType = {
    id: number | null
    priority: number | null
  }

  export type RadusergroupSumAggregateOutputType = {
    id: number | null
    priority: number | null
  }

  export type RadusergroupMinAggregateOutputType = {
    id: number | null
    username: string | null
    groupname: string | null
    priority: number | null
  }

  export type RadusergroupMaxAggregateOutputType = {
    id: number | null
    username: string | null
    groupname: string | null
    priority: number | null
  }

  export type RadusergroupCountAggregateOutputType = {
    id: number
    username: number
    groupname: number
    priority: number
    _all: number
  }


  export type RadusergroupAvgAggregateInputType = {
    id?: true
    priority?: true
  }

  export type RadusergroupSumAggregateInputType = {
    id?: true
    priority?: true
  }

  export type RadusergroupMinAggregateInputType = {
    id?: true
    username?: true
    groupname?: true
    priority?: true
  }

  export type RadusergroupMaxAggregateInputType = {
    id?: true
    username?: true
    groupname?: true
    priority?: true
  }

  export type RadusergroupCountAggregateInputType = {
    id?: true
    username?: true
    groupname?: true
    priority?: true
    _all?: true
  }

  export type RadusergroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radusergroup to aggregate.
     */
    where?: radusergroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radusergroups to fetch.
     */
    orderBy?: radusergroupOrderByWithRelationInput | radusergroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radusergroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radusergroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radusergroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radusergroups
    **/
    _count?: true | RadusergroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadusergroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadusergroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadusergroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadusergroupMaxAggregateInputType
  }

  export type GetRadusergroupAggregateType<T extends RadusergroupAggregateArgs> = {
        [P in keyof T & keyof AggregateRadusergroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadusergroup[P]>
      : GetScalarType<T[P], AggregateRadusergroup[P]>
  }




  export type radusergroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radusergroupWhereInput
    orderBy?: radusergroupOrderByWithAggregationInput | radusergroupOrderByWithAggregationInput[]
    by: RadusergroupScalarFieldEnum[] | RadusergroupScalarFieldEnum
    having?: radusergroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadusergroupCountAggregateInputType | true
    _avg?: RadusergroupAvgAggregateInputType
    _sum?: RadusergroupSumAggregateInputType
    _min?: RadusergroupMinAggregateInputType
    _max?: RadusergroupMaxAggregateInputType
  }

  export type RadusergroupGroupByOutputType = {
    id: number
    username: string
    groupname: string
    priority: number
    _count: RadusergroupCountAggregateOutputType | null
    _avg: RadusergroupAvgAggregateOutputType | null
    _sum: RadusergroupSumAggregateOutputType | null
    _min: RadusergroupMinAggregateOutputType | null
    _max: RadusergroupMaxAggregateOutputType | null
  }

  type GetRadusergroupGroupByPayload<T extends radusergroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadusergroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadusergroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadusergroupGroupByOutputType[P]>
            : GetScalarType<T[P], RadusergroupGroupByOutputType[P]>
        }
      >
    >


  export type radusergroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    groupname?: boolean
    priority?: boolean
    groupMetadata?: boolean | radusergroup$groupMetadataArgs<ExtArgs>
  }, ExtArgs["result"]["radusergroup"]>



  export type radusergroupSelectScalar = {
    id?: boolean
    username?: boolean
    groupname?: boolean
    priority?: boolean
  }

  export type radusergroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "groupname" | "priority", ExtArgs["result"]["radusergroup"]>
  export type radusergroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupMetadata?: boolean | radusergroup$groupMetadataArgs<ExtArgs>
  }

  export type $radusergroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radusergroup"
    objects: {
      groupMetadata: Prisma.$GroupMetadataPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      groupname: string
      priority: number
    }, ExtArgs["result"]["radusergroup"]>
    composites: {}
  }

  type radusergroupGetPayload<S extends boolean | null | undefined | radusergroupDefaultArgs> = $Result.GetResult<Prisma.$radusergroupPayload, S>

  type radusergroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radusergroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadusergroupCountAggregateInputType | true
    }

  export interface radusergroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radusergroup'], meta: { name: 'radusergroup' } }
    /**
     * Find zero or one Radusergroup that matches the filter.
     * @param {radusergroupFindUniqueArgs} args - Arguments to find a Radusergroup
     * @example
     * // Get one Radusergroup
     * const radusergroup = await prisma.radusergroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radusergroupFindUniqueArgs>(args: SelectSubset<T, radusergroupFindUniqueArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radusergroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radusergroupFindUniqueOrThrowArgs} args - Arguments to find a Radusergroup
     * @example
     * // Get one Radusergroup
     * const radusergroup = await prisma.radusergroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radusergroupFindUniqueOrThrowArgs>(args: SelectSubset<T, radusergroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radusergroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radusergroupFindFirstArgs} args - Arguments to find a Radusergroup
     * @example
     * // Get one Radusergroup
     * const radusergroup = await prisma.radusergroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radusergroupFindFirstArgs>(args?: SelectSubset<T, radusergroupFindFirstArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radusergroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radusergroupFindFirstOrThrowArgs} args - Arguments to find a Radusergroup
     * @example
     * // Get one Radusergroup
     * const radusergroup = await prisma.radusergroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radusergroupFindFirstOrThrowArgs>(args?: SelectSubset<T, radusergroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radusergroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radusergroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radusergroups
     * const radusergroups = await prisma.radusergroup.findMany()
     * 
     * // Get first 10 Radusergroups
     * const radusergroups = await prisma.radusergroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radusergroupWithIdOnly = await prisma.radusergroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends radusergroupFindManyArgs>(args?: SelectSubset<T, radusergroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radusergroup.
     * @param {radusergroupCreateArgs} args - Arguments to create a Radusergroup.
     * @example
     * // Create one Radusergroup
     * const Radusergroup = await prisma.radusergroup.create({
     *   data: {
     *     // ... data to create a Radusergroup
     *   }
     * })
     * 
     */
    create<T extends radusergroupCreateArgs>(args: SelectSubset<T, radusergroupCreateArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radusergroups.
     * @param {radusergroupCreateManyArgs} args - Arguments to create many Radusergroups.
     * @example
     * // Create many Radusergroups
     * const radusergroup = await prisma.radusergroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radusergroupCreateManyArgs>(args?: SelectSubset<T, radusergroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radusergroup.
     * @param {radusergroupDeleteArgs} args - Arguments to delete one Radusergroup.
     * @example
     * // Delete one Radusergroup
     * const Radusergroup = await prisma.radusergroup.delete({
     *   where: {
     *     // ... filter to delete one Radusergroup
     *   }
     * })
     * 
     */
    delete<T extends radusergroupDeleteArgs>(args: SelectSubset<T, radusergroupDeleteArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radusergroup.
     * @param {radusergroupUpdateArgs} args - Arguments to update one Radusergroup.
     * @example
     * // Update one Radusergroup
     * const radusergroup = await prisma.radusergroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radusergroupUpdateArgs>(args: SelectSubset<T, radusergroupUpdateArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radusergroups.
     * @param {radusergroupDeleteManyArgs} args - Arguments to filter Radusergroups to delete.
     * @example
     * // Delete a few Radusergroups
     * const { count } = await prisma.radusergroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radusergroupDeleteManyArgs>(args?: SelectSubset<T, radusergroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radusergroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radusergroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radusergroups
     * const radusergroup = await prisma.radusergroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radusergroupUpdateManyArgs>(args: SelectSubset<T, radusergroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radusergroup.
     * @param {radusergroupUpsertArgs} args - Arguments to update or create a Radusergroup.
     * @example
     * // Update or create a Radusergroup
     * const radusergroup = await prisma.radusergroup.upsert({
     *   create: {
     *     // ... data to create a Radusergroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radusergroup we want to update
     *   }
     * })
     */
    upsert<T extends radusergroupUpsertArgs>(args: SelectSubset<T, radusergroupUpsertArgs<ExtArgs>>): Prisma__radusergroupClient<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radusergroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radusergroupCountArgs} args - Arguments to filter Radusergroups to count.
     * @example
     * // Count the number of Radusergroups
     * const count = await prisma.radusergroup.count({
     *   where: {
     *     // ... the filter for the Radusergroups we want to count
     *   }
     * })
    **/
    count<T extends radusergroupCountArgs>(
      args?: Subset<T, radusergroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadusergroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radusergroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadusergroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadusergroupAggregateArgs>(args: Subset<T, RadusergroupAggregateArgs>): Prisma.PrismaPromise<GetRadusergroupAggregateType<T>>

    /**
     * Group by Radusergroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radusergroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radusergroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radusergroupGroupByArgs['orderBy'] }
        : { orderBy?: radusergroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radusergroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadusergroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radusergroup model
   */
  readonly fields: radusergroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radusergroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radusergroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groupMetadata<T extends radusergroup$groupMetadataArgs<ExtArgs> = {}>(args?: Subset<T, radusergroup$groupMetadataArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radusergroup model
   */
  interface radusergroupFieldRefs {
    readonly id: FieldRef<"radusergroup", 'Int'>
    readonly username: FieldRef<"radusergroup", 'String'>
    readonly groupname: FieldRef<"radusergroup", 'String'>
    readonly priority: FieldRef<"radusergroup", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * radusergroup findUnique
   */
  export type radusergroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * Filter, which radusergroup to fetch.
     */
    where: radusergroupWhereUniqueInput
  }

  /**
   * radusergroup findUniqueOrThrow
   */
  export type radusergroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * Filter, which radusergroup to fetch.
     */
    where: radusergroupWhereUniqueInput
  }

  /**
   * radusergroup findFirst
   */
  export type radusergroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * Filter, which radusergroup to fetch.
     */
    where?: radusergroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radusergroups to fetch.
     */
    orderBy?: radusergroupOrderByWithRelationInput | radusergroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radusergroups.
     */
    cursor?: radusergroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radusergroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radusergroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radusergroups.
     */
    distinct?: RadusergroupScalarFieldEnum | RadusergroupScalarFieldEnum[]
  }

  /**
   * radusergroup findFirstOrThrow
   */
  export type radusergroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * Filter, which radusergroup to fetch.
     */
    where?: radusergroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radusergroups to fetch.
     */
    orderBy?: radusergroupOrderByWithRelationInput | radusergroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radusergroups.
     */
    cursor?: radusergroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radusergroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radusergroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radusergroups.
     */
    distinct?: RadusergroupScalarFieldEnum | RadusergroupScalarFieldEnum[]
  }

  /**
   * radusergroup findMany
   */
  export type radusergroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * Filter, which radusergroups to fetch.
     */
    where?: radusergroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radusergroups to fetch.
     */
    orderBy?: radusergroupOrderByWithRelationInput | radusergroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radusergroups.
     */
    cursor?: radusergroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radusergroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radusergroups.
     */
    skip?: number
    distinct?: RadusergroupScalarFieldEnum | RadusergroupScalarFieldEnum[]
  }

  /**
   * radusergroup create
   */
  export type radusergroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * The data needed to create a radusergroup.
     */
    data?: XOR<radusergroupCreateInput, radusergroupUncheckedCreateInput>
  }

  /**
   * radusergroup createMany
   */
  export type radusergroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radusergroups.
     */
    data: radusergroupCreateManyInput | radusergroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radusergroup update
   */
  export type radusergroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * The data needed to update a radusergroup.
     */
    data: XOR<radusergroupUpdateInput, radusergroupUncheckedUpdateInput>
    /**
     * Choose, which radusergroup to update.
     */
    where: radusergroupWhereUniqueInput
  }

  /**
   * radusergroup updateMany
   */
  export type radusergroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radusergroups.
     */
    data: XOR<radusergroupUpdateManyMutationInput, radusergroupUncheckedUpdateManyInput>
    /**
     * Filter which radusergroups to update
     */
    where?: radusergroupWhereInput
    /**
     * Limit how many radusergroups to update.
     */
    limit?: number
  }

  /**
   * radusergroup upsert
   */
  export type radusergroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * The filter to search for the radusergroup to update in case it exists.
     */
    where: radusergroupWhereUniqueInput
    /**
     * In case the radusergroup found by the `where` argument doesn't exist, create a new radusergroup with this data.
     */
    create: XOR<radusergroupCreateInput, radusergroupUncheckedCreateInput>
    /**
     * In case the radusergroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radusergroupUpdateInput, radusergroupUncheckedUpdateInput>
  }

  /**
   * radusergroup delete
   */
  export type radusergroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    /**
     * Filter which radusergroup to delete.
     */
    where: radusergroupWhereUniqueInput
  }

  /**
   * radusergroup deleteMany
   */
  export type radusergroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radusergroups to delete
     */
    where?: radusergroupWhereInput
    /**
     * Limit how many radusergroups to delete.
     */
    limit?: number
  }

  /**
   * radusergroup.groupMetadata
   */
  export type radusergroup$groupMetadataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    where?: GroupMetadataWhereInput
  }

  /**
   * radusergroup without action
   */
  export type radusergroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
  }


  /**
   * Model userinfo
   */

  export type AggregateUserinfo = {
    _count: UserinfoCountAggregateOutputType | null
    _avg: UserinfoAvgAggregateOutputType | null
    _sum: UserinfoSumAggregateOutputType | null
    _min: UserinfoMinAggregateOutputType | null
    _max: UserinfoMaxAggregateOutputType | null
  }

  export type UserinfoAvgAggregateOutputType = {
    id: number | null
  }

  export type UserinfoSumAggregateOutputType = {
    id: number | null
  }

  export type UserinfoMinAggregateOutputType = {
    id: number | null
    username: string | null
    type: string | null
    fullName: string | null
    department: string | null
    createdBy: string | null
    status: string | null
  }

  export type UserinfoMaxAggregateOutputType = {
    id: number | null
    username: string | null
    type: string | null
    fullName: string | null
    department: string | null
    createdBy: string | null
    status: string | null
  }

  export type UserinfoCountAggregateOutputType = {
    id: number
    username: number
    type: number
    fullName: number
    department: number
    createdBy: number
    status: number
    _all: number
  }


  export type UserinfoAvgAggregateInputType = {
    id?: true
  }

  export type UserinfoSumAggregateInputType = {
    id?: true
  }

  export type UserinfoMinAggregateInputType = {
    id?: true
    username?: true
    type?: true
    fullName?: true
    department?: true
    createdBy?: true
    status?: true
  }

  export type UserinfoMaxAggregateInputType = {
    id?: true
    username?: true
    type?: true
    fullName?: true
    department?: true
    createdBy?: true
    status?: true
  }

  export type UserinfoCountAggregateInputType = {
    id?: true
    username?: true
    type?: true
    fullName?: true
    department?: true
    createdBy?: true
    status?: true
    _all?: true
  }

  export type UserinfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which userinfo to aggregate.
     */
    where?: userinfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userinfos to fetch.
     */
    orderBy?: userinfoOrderByWithRelationInput | userinfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userinfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userinfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userinfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned userinfos
    **/
    _count?: true | UserinfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserinfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserinfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserinfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserinfoMaxAggregateInputType
  }

  export type GetUserinfoAggregateType<T extends UserinfoAggregateArgs> = {
        [P in keyof T & keyof AggregateUserinfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserinfo[P]>
      : GetScalarType<T[P], AggregateUserinfo[P]>
  }




  export type userinfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userinfoWhereInput
    orderBy?: userinfoOrderByWithAggregationInput | userinfoOrderByWithAggregationInput[]
    by: UserinfoScalarFieldEnum[] | UserinfoScalarFieldEnum
    having?: userinfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserinfoCountAggregateInputType | true
    _avg?: UserinfoAvgAggregateInputType
    _sum?: UserinfoSumAggregateInputType
    _min?: UserinfoMinAggregateInputType
    _max?: UserinfoMaxAggregateInputType
  }

  export type UserinfoGroupByOutputType = {
    id: number
    username: string
    type: string
    fullName: string
    department: string
    createdBy: string | null
    status: string
    _count: UserinfoCountAggregateOutputType | null
    _avg: UserinfoAvgAggregateOutputType | null
    _sum: UserinfoSumAggregateOutputType | null
    _min: UserinfoMinAggregateOutputType | null
    _max: UserinfoMaxAggregateOutputType | null
  }

  type GetUserinfoGroupByPayload<T extends userinfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserinfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserinfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserinfoGroupByOutputType[P]>
            : GetScalarType<T[P], UserinfoGroupByOutputType[P]>
        }
      >
    >


  export type userinfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    type?: boolean
    fullName?: boolean
    department?: boolean
    createdBy?: boolean
    status?: boolean
  }, ExtArgs["result"]["userinfo"]>



  export type userinfoSelectScalar = {
    id?: boolean
    username?: boolean
    type?: boolean
    fullName?: boolean
    department?: boolean
    createdBy?: boolean
    status?: boolean
  }

  export type userinfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "type" | "fullName" | "department" | "createdBy" | "status", ExtArgs["result"]["userinfo"]>

  export type $userinfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "userinfo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      type: string
      fullName: string
      department: string
      createdBy: string | null
      status: string
    }, ExtArgs["result"]["userinfo"]>
    composites: {}
  }

  type userinfoGetPayload<S extends boolean | null | undefined | userinfoDefaultArgs> = $Result.GetResult<Prisma.$userinfoPayload, S>

  type userinfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userinfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserinfoCountAggregateInputType | true
    }

  export interface userinfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['userinfo'], meta: { name: 'userinfo' } }
    /**
     * Find zero or one Userinfo that matches the filter.
     * @param {userinfoFindUniqueArgs} args - Arguments to find a Userinfo
     * @example
     * // Get one Userinfo
     * const userinfo = await prisma.userinfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userinfoFindUniqueArgs>(args: SelectSubset<T, userinfoFindUniqueArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Userinfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userinfoFindUniqueOrThrowArgs} args - Arguments to find a Userinfo
     * @example
     * // Get one Userinfo
     * const userinfo = await prisma.userinfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userinfoFindUniqueOrThrowArgs>(args: SelectSubset<T, userinfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Userinfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userinfoFindFirstArgs} args - Arguments to find a Userinfo
     * @example
     * // Get one Userinfo
     * const userinfo = await prisma.userinfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userinfoFindFirstArgs>(args?: SelectSubset<T, userinfoFindFirstArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Userinfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userinfoFindFirstOrThrowArgs} args - Arguments to find a Userinfo
     * @example
     * // Get one Userinfo
     * const userinfo = await prisma.userinfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userinfoFindFirstOrThrowArgs>(args?: SelectSubset<T, userinfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Userinfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userinfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Userinfos
     * const userinfos = await prisma.userinfo.findMany()
     * 
     * // Get first 10 Userinfos
     * const userinfos = await prisma.userinfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userinfoWithIdOnly = await prisma.userinfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userinfoFindManyArgs>(args?: SelectSubset<T, userinfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Userinfo.
     * @param {userinfoCreateArgs} args - Arguments to create a Userinfo.
     * @example
     * // Create one Userinfo
     * const Userinfo = await prisma.userinfo.create({
     *   data: {
     *     // ... data to create a Userinfo
     *   }
     * })
     * 
     */
    create<T extends userinfoCreateArgs>(args: SelectSubset<T, userinfoCreateArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Userinfos.
     * @param {userinfoCreateManyArgs} args - Arguments to create many Userinfos.
     * @example
     * // Create many Userinfos
     * const userinfo = await prisma.userinfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userinfoCreateManyArgs>(args?: SelectSubset<T, userinfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Userinfo.
     * @param {userinfoDeleteArgs} args - Arguments to delete one Userinfo.
     * @example
     * // Delete one Userinfo
     * const Userinfo = await prisma.userinfo.delete({
     *   where: {
     *     // ... filter to delete one Userinfo
     *   }
     * })
     * 
     */
    delete<T extends userinfoDeleteArgs>(args: SelectSubset<T, userinfoDeleteArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Userinfo.
     * @param {userinfoUpdateArgs} args - Arguments to update one Userinfo.
     * @example
     * // Update one Userinfo
     * const userinfo = await prisma.userinfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userinfoUpdateArgs>(args: SelectSubset<T, userinfoUpdateArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Userinfos.
     * @param {userinfoDeleteManyArgs} args - Arguments to filter Userinfos to delete.
     * @example
     * // Delete a few Userinfos
     * const { count } = await prisma.userinfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userinfoDeleteManyArgs>(args?: SelectSubset<T, userinfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Userinfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userinfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Userinfos
     * const userinfo = await prisma.userinfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userinfoUpdateManyArgs>(args: SelectSubset<T, userinfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Userinfo.
     * @param {userinfoUpsertArgs} args - Arguments to update or create a Userinfo.
     * @example
     * // Update or create a Userinfo
     * const userinfo = await prisma.userinfo.upsert({
     *   create: {
     *     // ... data to create a Userinfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Userinfo we want to update
     *   }
     * })
     */
    upsert<T extends userinfoUpsertArgs>(args: SelectSubset<T, userinfoUpsertArgs<ExtArgs>>): Prisma__userinfoClient<$Result.GetResult<Prisma.$userinfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Userinfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userinfoCountArgs} args - Arguments to filter Userinfos to count.
     * @example
     * // Count the number of Userinfos
     * const count = await prisma.userinfo.count({
     *   where: {
     *     // ... the filter for the Userinfos we want to count
     *   }
     * })
    **/
    count<T extends userinfoCountArgs>(
      args?: Subset<T, userinfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserinfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Userinfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserinfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserinfoAggregateArgs>(args: Subset<T, UserinfoAggregateArgs>): Prisma.PrismaPromise<GetUserinfoAggregateType<T>>

    /**
     * Group by Userinfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userinfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userinfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userinfoGroupByArgs['orderBy'] }
        : { orderBy?: userinfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userinfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserinfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the userinfo model
   */
  readonly fields: userinfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for userinfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userinfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the userinfo model
   */
  interface userinfoFieldRefs {
    readonly id: FieldRef<"userinfo", 'Int'>
    readonly username: FieldRef<"userinfo", 'String'>
    readonly type: FieldRef<"userinfo", 'String'>
    readonly fullName: FieldRef<"userinfo", 'String'>
    readonly department: FieldRef<"userinfo", 'String'>
    readonly createdBy: FieldRef<"userinfo", 'String'>
    readonly status: FieldRef<"userinfo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * userinfo findUnique
   */
  export type userinfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * Filter, which userinfo to fetch.
     */
    where: userinfoWhereUniqueInput
  }

  /**
   * userinfo findUniqueOrThrow
   */
  export type userinfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * Filter, which userinfo to fetch.
     */
    where: userinfoWhereUniqueInput
  }

  /**
   * userinfo findFirst
   */
  export type userinfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * Filter, which userinfo to fetch.
     */
    where?: userinfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userinfos to fetch.
     */
    orderBy?: userinfoOrderByWithRelationInput | userinfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for userinfos.
     */
    cursor?: userinfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userinfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userinfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of userinfos.
     */
    distinct?: UserinfoScalarFieldEnum | UserinfoScalarFieldEnum[]
  }

  /**
   * userinfo findFirstOrThrow
   */
  export type userinfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * Filter, which userinfo to fetch.
     */
    where?: userinfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userinfos to fetch.
     */
    orderBy?: userinfoOrderByWithRelationInput | userinfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for userinfos.
     */
    cursor?: userinfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userinfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userinfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of userinfos.
     */
    distinct?: UserinfoScalarFieldEnum | UserinfoScalarFieldEnum[]
  }

  /**
   * userinfo findMany
   */
  export type userinfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * Filter, which userinfos to fetch.
     */
    where?: userinfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userinfos to fetch.
     */
    orderBy?: userinfoOrderByWithRelationInput | userinfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing userinfos.
     */
    cursor?: userinfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userinfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userinfos.
     */
    skip?: number
    distinct?: UserinfoScalarFieldEnum | UserinfoScalarFieldEnum[]
  }

  /**
   * userinfo create
   */
  export type userinfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * The data needed to create a userinfo.
     */
    data: XOR<userinfoCreateInput, userinfoUncheckedCreateInput>
  }

  /**
   * userinfo createMany
   */
  export type userinfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many userinfos.
     */
    data: userinfoCreateManyInput | userinfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * userinfo update
   */
  export type userinfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * The data needed to update a userinfo.
     */
    data: XOR<userinfoUpdateInput, userinfoUncheckedUpdateInput>
    /**
     * Choose, which userinfo to update.
     */
    where: userinfoWhereUniqueInput
  }

  /**
   * userinfo updateMany
   */
  export type userinfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update userinfos.
     */
    data: XOR<userinfoUpdateManyMutationInput, userinfoUncheckedUpdateManyInput>
    /**
     * Filter which userinfos to update
     */
    where?: userinfoWhereInput
    /**
     * Limit how many userinfos to update.
     */
    limit?: number
  }

  /**
   * userinfo upsert
   */
  export type userinfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * The filter to search for the userinfo to update in case it exists.
     */
    where: userinfoWhereUniqueInput
    /**
     * In case the userinfo found by the `where` argument doesn't exist, create a new userinfo with this data.
     */
    create: XOR<userinfoCreateInput, userinfoUncheckedCreateInput>
    /**
     * In case the userinfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userinfoUpdateInput, userinfoUncheckedUpdateInput>
  }

  /**
   * userinfo delete
   */
  export type userinfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
    /**
     * Filter which userinfo to delete.
     */
    where: userinfoWhereUniqueInput
  }

  /**
   * userinfo deleteMany
   */
  export type userinfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which userinfos to delete
     */
    where?: userinfoWhereInput
    /**
     * Limit how many userinfos to delete.
     */
    limit?: number
  }

  /**
   * userinfo without action
   */
  export type userinfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userinfo
     */
    select?: userinfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userinfo
     */
    omit?: userinfoOmit<ExtArgs> | null
  }


  /**
   * Model admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admin to aggregate.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type adminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminWhereInput
    orderBy?: adminOrderByWithAggregationInput | adminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: adminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    username: string
    password: string
    role: string
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends adminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type adminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["admin"]>



  export type adminSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
  }

  export type adminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role", ExtArgs["result"]["admin"]>

  export type $adminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      role: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type adminGetPayload<S extends boolean | null | undefined | adminDefaultArgs> = $Result.GetResult<Prisma.$adminPayload, S>

  type adminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<adminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface adminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['admin'], meta: { name: 'admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {adminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends adminFindUniqueArgs>(args: SelectSubset<T, adminFindUniqueArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {adminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends adminFindUniqueOrThrowArgs>(args: SelectSubset<T, adminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends adminFindFirstArgs>(args?: SelectSubset<T, adminFindFirstArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends adminFindFirstOrThrowArgs>(args?: SelectSubset<T, adminFindFirstOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends adminFindManyArgs>(args?: SelectSubset<T, adminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {adminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends adminCreateArgs>(args: SelectSubset<T, adminCreateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {adminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends adminCreateManyArgs>(args?: SelectSubset<T, adminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admin.
     * @param {adminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends adminDeleteArgs>(args: SelectSubset<T, adminDeleteArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {adminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends adminUpdateArgs>(args: SelectSubset<T, adminUpdateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {adminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends adminDeleteManyArgs>(args?: SelectSubset<T, adminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends adminUpdateManyArgs>(args: SelectSubset<T, adminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {adminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends adminUpsertArgs>(args: SelectSubset<T, adminUpsertArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends adminCountArgs>(
      args?: Subset<T, adminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends adminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: adminGroupByArgs['orderBy'] }
        : { orderBy?: adminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, adminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the admin model
   */
  readonly fields: adminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__adminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the admin model
   */
  interface adminFieldRefs {
    readonly id: FieldRef<"admin", 'Int'>
    readonly username: FieldRef<"admin", 'String'>
    readonly password: FieldRef<"admin", 'String'>
    readonly role: FieldRef<"admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * admin findUnique
   */
  export type adminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findUniqueOrThrow
   */
  export type adminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findFirst
   */
  export type adminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findFirstOrThrow
   */
  export type adminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findMany
   */
  export type adminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin create
   */
  export type adminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data needed to create a admin.
     */
    data: XOR<adminCreateInput, adminUncheckedCreateInput>
  }

  /**
   * admin createMany
   */
  export type adminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin update
   */
  export type adminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data needed to update a admin.
     */
    data: XOR<adminUpdateInput, adminUncheckedUpdateInput>
    /**
     * Choose, which admin to update.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin updateMany
   */
  export type adminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update admins.
     */
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to update.
     */
    limit?: number
  }

  /**
   * admin upsert
   */
  export type adminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The filter to search for the admin to update in case it exists.
     */
    where: adminWhereUniqueInput
    /**
     * In case the admin found by the `where` argument doesn't exist, create a new admin with this data.
     */
    create: XOR<adminCreateInput, adminUncheckedCreateInput>
    /**
     * In case the admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<adminUpdateInput, adminUncheckedUpdateInput>
  }

  /**
   * admin delete
   */
  export type adminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Filter which admin to delete.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin deleteMany
   */
  export type adminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admins to delete
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to delete.
     */
    limit?: number
  }

  /**
   * admin without action
   */
  export type adminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
  }


  /**
   * Model GroupMetadata
   */

  export type AggregateGroupMetadata = {
    _count: GroupMetadataCountAggregateOutputType | null
    _min: GroupMetadataMinAggregateOutputType | null
    _max: GroupMetadataMaxAggregateOutputType | null
  }

  export type GroupMetadataMinAggregateOutputType = {
    groupname: string | null
    type: string | null
    description: string | null
  }

  export type GroupMetadataMaxAggregateOutputType = {
    groupname: string | null
    type: string | null
    description: string | null
  }

  export type GroupMetadataCountAggregateOutputType = {
    groupname: number
    type: number
    description: number
    _all: number
  }


  export type GroupMetadataMinAggregateInputType = {
    groupname?: true
    type?: true
    description?: true
  }

  export type GroupMetadataMaxAggregateInputType = {
    groupname?: true
    type?: true
    description?: true
  }

  export type GroupMetadataCountAggregateInputType = {
    groupname?: true
    type?: true
    description?: true
    _all?: true
  }

  export type GroupMetadataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMetadata to aggregate.
     */
    where?: GroupMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMetadata to fetch.
     */
    orderBy?: GroupMetadataOrderByWithRelationInput | GroupMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupMetadata
    **/
    _count?: true | GroupMetadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMetadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMetadataMaxAggregateInputType
  }

  export type GetGroupMetadataAggregateType<T extends GroupMetadataAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupMetadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupMetadata[P]>
      : GetScalarType<T[P], AggregateGroupMetadata[P]>
  }




  export type GroupMetadataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMetadataWhereInput
    orderBy?: GroupMetadataOrderByWithAggregationInput | GroupMetadataOrderByWithAggregationInput[]
    by: GroupMetadataScalarFieldEnum[] | GroupMetadataScalarFieldEnum
    having?: GroupMetadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupMetadataCountAggregateInputType | true
    _min?: GroupMetadataMinAggregateInputType
    _max?: GroupMetadataMaxAggregateInputType
  }

  export type GroupMetadataGroupByOutputType = {
    groupname: string
    type: string
    description: string | null
    _count: GroupMetadataCountAggregateOutputType | null
    _min: GroupMetadataMinAggregateOutputType | null
    _max: GroupMetadataMaxAggregateOutputType | null
  }

  type GetGroupMetadataGroupByPayload<T extends GroupMetadataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupMetadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupMetadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupMetadataGroupByOutputType[P]>
            : GetScalarType<T[P], GroupMetadataGroupByOutputType[P]>
        }
      >
    >


  export type GroupMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupname?: boolean
    type?: boolean
    description?: boolean
    radusergroups?: boolean | GroupMetadata$radusergroupsArgs<ExtArgs>
    _count?: boolean | GroupMetadataCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMetadata"]>



  export type GroupMetadataSelectScalar = {
    groupname?: boolean
    type?: boolean
    description?: boolean
  }

  export type GroupMetadataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"groupname" | "type" | "description", ExtArgs["result"]["groupMetadata"]>
  export type GroupMetadataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    radusergroups?: boolean | GroupMetadata$radusergroupsArgs<ExtArgs>
    _count?: boolean | GroupMetadataCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GroupMetadataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupMetadata"
    objects: {
      radusergroups: Prisma.$radusergroupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      groupname: string
      type: string
      description: string | null
    }, ExtArgs["result"]["groupMetadata"]>
    composites: {}
  }

  type GroupMetadataGetPayload<S extends boolean | null | undefined | GroupMetadataDefaultArgs> = $Result.GetResult<Prisma.$GroupMetadataPayload, S>

  type GroupMetadataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupMetadataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupMetadataCountAggregateInputType | true
    }

  export interface GroupMetadataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupMetadata'], meta: { name: 'GroupMetadata' } }
    /**
     * Find zero or one GroupMetadata that matches the filter.
     * @param {GroupMetadataFindUniqueArgs} args - Arguments to find a GroupMetadata
     * @example
     * // Get one GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupMetadataFindUniqueArgs>(args: SelectSubset<T, GroupMetadataFindUniqueArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupMetadata that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupMetadataFindUniqueOrThrowArgs} args - Arguments to find a GroupMetadata
     * @example
     * // Get one GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupMetadataFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupMetadataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMetadataFindFirstArgs} args - Arguments to find a GroupMetadata
     * @example
     * // Get one GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupMetadataFindFirstArgs>(args?: SelectSubset<T, GroupMetadataFindFirstArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMetadata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMetadataFindFirstOrThrowArgs} args - Arguments to find a GroupMetadata
     * @example
     * // Get one GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupMetadataFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupMetadataFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMetadataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.findMany()
     * 
     * // Get first 10 GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.findMany({ take: 10 })
     * 
     * // Only select the `groupname`
     * const groupMetadataWithGroupnameOnly = await prisma.groupMetadata.findMany({ select: { groupname: true } })
     * 
     */
    findMany<T extends GroupMetadataFindManyArgs>(args?: SelectSubset<T, GroupMetadataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupMetadata.
     * @param {GroupMetadataCreateArgs} args - Arguments to create a GroupMetadata.
     * @example
     * // Create one GroupMetadata
     * const GroupMetadata = await prisma.groupMetadata.create({
     *   data: {
     *     // ... data to create a GroupMetadata
     *   }
     * })
     * 
     */
    create<T extends GroupMetadataCreateArgs>(args: SelectSubset<T, GroupMetadataCreateArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupMetadata.
     * @param {GroupMetadataCreateManyArgs} args - Arguments to create many GroupMetadata.
     * @example
     * // Create many GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupMetadataCreateManyArgs>(args?: SelectSubset<T, GroupMetadataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GroupMetadata.
     * @param {GroupMetadataDeleteArgs} args - Arguments to delete one GroupMetadata.
     * @example
     * // Delete one GroupMetadata
     * const GroupMetadata = await prisma.groupMetadata.delete({
     *   where: {
     *     // ... filter to delete one GroupMetadata
     *   }
     * })
     * 
     */
    delete<T extends GroupMetadataDeleteArgs>(args: SelectSubset<T, GroupMetadataDeleteArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupMetadata.
     * @param {GroupMetadataUpdateArgs} args - Arguments to update one GroupMetadata.
     * @example
     * // Update one GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupMetadataUpdateArgs>(args: SelectSubset<T, GroupMetadataUpdateArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupMetadata.
     * @param {GroupMetadataDeleteManyArgs} args - Arguments to filter GroupMetadata to delete.
     * @example
     * // Delete a few GroupMetadata
     * const { count } = await prisma.groupMetadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupMetadataDeleteManyArgs>(args?: SelectSubset<T, GroupMetadataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMetadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupMetadataUpdateManyArgs>(args: SelectSubset<T, GroupMetadataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GroupMetadata.
     * @param {GroupMetadataUpsertArgs} args - Arguments to update or create a GroupMetadata.
     * @example
     * // Update or create a GroupMetadata
     * const groupMetadata = await prisma.groupMetadata.upsert({
     *   create: {
     *     // ... data to create a GroupMetadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupMetadata we want to update
     *   }
     * })
     */
    upsert<T extends GroupMetadataUpsertArgs>(args: SelectSubset<T, GroupMetadataUpsertArgs<ExtArgs>>): Prisma__GroupMetadataClient<$Result.GetResult<Prisma.$GroupMetadataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMetadataCountArgs} args - Arguments to filter GroupMetadata to count.
     * @example
     * // Count the number of GroupMetadata
     * const count = await prisma.groupMetadata.count({
     *   where: {
     *     // ... the filter for the GroupMetadata we want to count
     *   }
     * })
    **/
    count<T extends GroupMetadataCountArgs>(
      args?: Subset<T, GroupMetadataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupMetadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMetadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupMetadataAggregateArgs>(args: Subset<T, GroupMetadataAggregateArgs>): Prisma.PrismaPromise<GetGroupMetadataAggregateType<T>>

    /**
     * Group by GroupMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMetadataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupMetadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupMetadataGroupByArgs['orderBy'] }
        : { orderBy?: GroupMetadataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupMetadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupMetadataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupMetadata model
   */
  readonly fields: GroupMetadataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupMetadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupMetadataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    radusergroups<T extends GroupMetadata$radusergroupsArgs<ExtArgs> = {}>(args?: Subset<T, GroupMetadata$radusergroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radusergroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupMetadata model
   */
  interface GroupMetadataFieldRefs {
    readonly groupname: FieldRef<"GroupMetadata", 'String'>
    readonly type: FieldRef<"GroupMetadata", 'String'>
    readonly description: FieldRef<"GroupMetadata", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GroupMetadata findUnique
   */
  export type GroupMetadataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * Filter, which GroupMetadata to fetch.
     */
    where: GroupMetadataWhereUniqueInput
  }

  /**
   * GroupMetadata findUniqueOrThrow
   */
  export type GroupMetadataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * Filter, which GroupMetadata to fetch.
     */
    where: GroupMetadataWhereUniqueInput
  }

  /**
   * GroupMetadata findFirst
   */
  export type GroupMetadataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * Filter, which GroupMetadata to fetch.
     */
    where?: GroupMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMetadata to fetch.
     */
    orderBy?: GroupMetadataOrderByWithRelationInput | GroupMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMetadata.
     */
    cursor?: GroupMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMetadata.
     */
    distinct?: GroupMetadataScalarFieldEnum | GroupMetadataScalarFieldEnum[]
  }

  /**
   * GroupMetadata findFirstOrThrow
   */
  export type GroupMetadataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * Filter, which GroupMetadata to fetch.
     */
    where?: GroupMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMetadata to fetch.
     */
    orderBy?: GroupMetadataOrderByWithRelationInput | GroupMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMetadata.
     */
    cursor?: GroupMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMetadata.
     */
    distinct?: GroupMetadataScalarFieldEnum | GroupMetadataScalarFieldEnum[]
  }

  /**
   * GroupMetadata findMany
   */
  export type GroupMetadataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * Filter, which GroupMetadata to fetch.
     */
    where?: GroupMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMetadata to fetch.
     */
    orderBy?: GroupMetadataOrderByWithRelationInput | GroupMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupMetadata.
     */
    cursor?: GroupMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMetadata.
     */
    skip?: number
    distinct?: GroupMetadataScalarFieldEnum | GroupMetadataScalarFieldEnum[]
  }

  /**
   * GroupMetadata create
   */
  export type GroupMetadataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupMetadata.
     */
    data: XOR<GroupMetadataCreateInput, GroupMetadataUncheckedCreateInput>
  }

  /**
   * GroupMetadata createMany
   */
  export type GroupMetadataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupMetadata.
     */
    data: GroupMetadataCreateManyInput | GroupMetadataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupMetadata update
   */
  export type GroupMetadataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupMetadata.
     */
    data: XOR<GroupMetadataUpdateInput, GroupMetadataUncheckedUpdateInput>
    /**
     * Choose, which GroupMetadata to update.
     */
    where: GroupMetadataWhereUniqueInput
  }

  /**
   * GroupMetadata updateMany
   */
  export type GroupMetadataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupMetadata.
     */
    data: XOR<GroupMetadataUpdateManyMutationInput, GroupMetadataUncheckedUpdateManyInput>
    /**
     * Filter which GroupMetadata to update
     */
    where?: GroupMetadataWhereInput
    /**
     * Limit how many GroupMetadata to update.
     */
    limit?: number
  }

  /**
   * GroupMetadata upsert
   */
  export type GroupMetadataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupMetadata to update in case it exists.
     */
    where: GroupMetadataWhereUniqueInput
    /**
     * In case the GroupMetadata found by the `where` argument doesn't exist, create a new GroupMetadata with this data.
     */
    create: XOR<GroupMetadataCreateInput, GroupMetadataUncheckedCreateInput>
    /**
     * In case the GroupMetadata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupMetadataUpdateInput, GroupMetadataUncheckedUpdateInput>
  }

  /**
   * GroupMetadata delete
   */
  export type GroupMetadataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
    /**
     * Filter which GroupMetadata to delete.
     */
    where: GroupMetadataWhereUniqueInput
  }

  /**
   * GroupMetadata deleteMany
   */
  export type GroupMetadataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMetadata to delete
     */
    where?: GroupMetadataWhereInput
    /**
     * Limit how many GroupMetadata to delete.
     */
    limit?: number
  }

  /**
   * GroupMetadata.radusergroups
   */
  export type GroupMetadata$radusergroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radusergroup
     */
    select?: radusergroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radusergroup
     */
    omit?: radusergroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: radusergroupInclude<ExtArgs> | null
    where?: radusergroupWhereInput
    orderBy?: radusergroupOrderByWithRelationInput | radusergroupOrderByWithRelationInput[]
    cursor?: radusergroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RadusergroupScalarFieldEnum | RadusergroupScalarFieldEnum[]
  }

  /**
   * GroupMetadata without action
   */
  export type GroupMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMetadata
     */
    select?: GroupMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMetadata
     */
    omit?: GroupMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMetadataInclude<ExtArgs> | null
  }


  /**
   * Model RadiusPool
   */

  export type AggregateRadiusPool = {
    _count: RadiusPoolCountAggregateOutputType | null
    _avg: RadiusPoolAvgAggregateOutputType | null
    _sum: RadiusPoolSumAggregateOutputType | null
    _min: RadiusPoolMinAggregateOutputType | null
    _max: RadiusPoolMaxAggregateOutputType | null
  }

  export type RadiusPoolAvgAggregateOutputType = {
    id: number | null
  }

  export type RadiusPoolSumAggregateOutputType = {
    id: number | null
  }

  export type RadiusPoolMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type RadiusPoolMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type RadiusPoolCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type RadiusPoolAvgAggregateInputType = {
    id?: true
  }

  export type RadiusPoolSumAggregateInputType = {
    id?: true
  }

  export type RadiusPoolMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type RadiusPoolMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type RadiusPoolCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type RadiusPoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RadiusPool to aggregate.
     */
    where?: RadiusPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiusPools to fetch.
     */
    orderBy?: RadiusPoolOrderByWithRelationInput | RadiusPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RadiusPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiusPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiusPools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RadiusPools
    **/
    _count?: true | RadiusPoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadiusPoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadiusPoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadiusPoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadiusPoolMaxAggregateInputType
  }

  export type GetRadiusPoolAggregateType<T extends RadiusPoolAggregateArgs> = {
        [P in keyof T & keyof AggregateRadiusPool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadiusPool[P]>
      : GetScalarType<T[P], AggregateRadiusPool[P]>
  }




  export type RadiusPoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RadiusPoolWhereInput
    orderBy?: RadiusPoolOrderByWithAggregationInput | RadiusPoolOrderByWithAggregationInput[]
    by: RadiusPoolScalarFieldEnum[] | RadiusPoolScalarFieldEnum
    having?: RadiusPoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadiusPoolCountAggregateInputType | true
    _avg?: RadiusPoolAvgAggregateInputType
    _sum?: RadiusPoolSumAggregateInputType
    _min?: RadiusPoolMinAggregateInputType
    _max?: RadiusPoolMaxAggregateInputType
  }

  export type RadiusPoolGroupByOutputType = {
    id: number
    name: string
    description: string | null
    _count: RadiusPoolCountAggregateOutputType | null
    _avg: RadiusPoolAvgAggregateOutputType | null
    _sum: RadiusPoolSumAggregateOutputType | null
    _min: RadiusPoolMinAggregateOutputType | null
    _max: RadiusPoolMaxAggregateOutputType | null
  }

  type GetRadiusPoolGroupByPayload<T extends RadiusPoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadiusPoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadiusPoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadiusPoolGroupByOutputType[P]>
            : GetScalarType<T[P], RadiusPoolGroupByOutputType[P]>
        }
      >
    >


  export type RadiusPoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["radiusPool"]>



  export type RadiusPoolSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type RadiusPoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description", ExtArgs["result"]["radiusPool"]>

  export type $RadiusPoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RadiusPool"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
    }, ExtArgs["result"]["radiusPool"]>
    composites: {}
  }

  type RadiusPoolGetPayload<S extends boolean | null | undefined | RadiusPoolDefaultArgs> = $Result.GetResult<Prisma.$RadiusPoolPayload, S>

  type RadiusPoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RadiusPoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadiusPoolCountAggregateInputType | true
    }

  export interface RadiusPoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RadiusPool'], meta: { name: 'RadiusPool' } }
    /**
     * Find zero or one RadiusPool that matches the filter.
     * @param {RadiusPoolFindUniqueArgs} args - Arguments to find a RadiusPool
     * @example
     * // Get one RadiusPool
     * const radiusPool = await prisma.radiusPool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RadiusPoolFindUniqueArgs>(args: SelectSubset<T, RadiusPoolFindUniqueArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RadiusPool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RadiusPoolFindUniqueOrThrowArgs} args - Arguments to find a RadiusPool
     * @example
     * // Get one RadiusPool
     * const radiusPool = await prisma.radiusPool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RadiusPoolFindUniqueOrThrowArgs>(args: SelectSubset<T, RadiusPoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RadiusPool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiusPoolFindFirstArgs} args - Arguments to find a RadiusPool
     * @example
     * // Get one RadiusPool
     * const radiusPool = await prisma.radiusPool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RadiusPoolFindFirstArgs>(args?: SelectSubset<T, RadiusPoolFindFirstArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RadiusPool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiusPoolFindFirstOrThrowArgs} args - Arguments to find a RadiusPool
     * @example
     * // Get one RadiusPool
     * const radiusPool = await prisma.radiusPool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RadiusPoolFindFirstOrThrowArgs>(args?: SelectSubset<T, RadiusPoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RadiusPools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiusPoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RadiusPools
     * const radiusPools = await prisma.radiusPool.findMany()
     * 
     * // Get first 10 RadiusPools
     * const radiusPools = await prisma.radiusPool.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radiusPoolWithIdOnly = await prisma.radiusPool.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RadiusPoolFindManyArgs>(args?: SelectSubset<T, RadiusPoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RadiusPool.
     * @param {RadiusPoolCreateArgs} args - Arguments to create a RadiusPool.
     * @example
     * // Create one RadiusPool
     * const RadiusPool = await prisma.radiusPool.create({
     *   data: {
     *     // ... data to create a RadiusPool
     *   }
     * })
     * 
     */
    create<T extends RadiusPoolCreateArgs>(args: SelectSubset<T, RadiusPoolCreateArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RadiusPools.
     * @param {RadiusPoolCreateManyArgs} args - Arguments to create many RadiusPools.
     * @example
     * // Create many RadiusPools
     * const radiusPool = await prisma.radiusPool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RadiusPoolCreateManyArgs>(args?: SelectSubset<T, RadiusPoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RadiusPool.
     * @param {RadiusPoolDeleteArgs} args - Arguments to delete one RadiusPool.
     * @example
     * // Delete one RadiusPool
     * const RadiusPool = await prisma.radiusPool.delete({
     *   where: {
     *     // ... filter to delete one RadiusPool
     *   }
     * })
     * 
     */
    delete<T extends RadiusPoolDeleteArgs>(args: SelectSubset<T, RadiusPoolDeleteArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RadiusPool.
     * @param {RadiusPoolUpdateArgs} args - Arguments to update one RadiusPool.
     * @example
     * // Update one RadiusPool
     * const radiusPool = await prisma.radiusPool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RadiusPoolUpdateArgs>(args: SelectSubset<T, RadiusPoolUpdateArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RadiusPools.
     * @param {RadiusPoolDeleteManyArgs} args - Arguments to filter RadiusPools to delete.
     * @example
     * // Delete a few RadiusPools
     * const { count } = await prisma.radiusPool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RadiusPoolDeleteManyArgs>(args?: SelectSubset<T, RadiusPoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RadiusPools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiusPoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RadiusPools
     * const radiusPool = await prisma.radiusPool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RadiusPoolUpdateManyArgs>(args: SelectSubset<T, RadiusPoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RadiusPool.
     * @param {RadiusPoolUpsertArgs} args - Arguments to update or create a RadiusPool.
     * @example
     * // Update or create a RadiusPool
     * const radiusPool = await prisma.radiusPool.upsert({
     *   create: {
     *     // ... data to create a RadiusPool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RadiusPool we want to update
     *   }
     * })
     */
    upsert<T extends RadiusPoolUpsertArgs>(args: SelectSubset<T, RadiusPoolUpsertArgs<ExtArgs>>): Prisma__RadiusPoolClient<$Result.GetResult<Prisma.$RadiusPoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RadiusPools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiusPoolCountArgs} args - Arguments to filter RadiusPools to count.
     * @example
     * // Count the number of RadiusPools
     * const count = await prisma.radiusPool.count({
     *   where: {
     *     // ... the filter for the RadiusPools we want to count
     *   }
     * })
    **/
    count<T extends RadiusPoolCountArgs>(
      args?: Subset<T, RadiusPoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadiusPoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RadiusPool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiusPoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadiusPoolAggregateArgs>(args: Subset<T, RadiusPoolAggregateArgs>): Prisma.PrismaPromise<GetRadiusPoolAggregateType<T>>

    /**
     * Group by RadiusPool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiusPoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RadiusPoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RadiusPoolGroupByArgs['orderBy'] }
        : { orderBy?: RadiusPoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RadiusPoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadiusPoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RadiusPool model
   */
  readonly fields: RadiusPoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RadiusPool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RadiusPoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RadiusPool model
   */
  interface RadiusPoolFieldRefs {
    readonly id: FieldRef<"RadiusPool", 'Int'>
    readonly name: FieldRef<"RadiusPool", 'String'>
    readonly description: FieldRef<"RadiusPool", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RadiusPool findUnique
   */
  export type RadiusPoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * Filter, which RadiusPool to fetch.
     */
    where: RadiusPoolWhereUniqueInput
  }

  /**
   * RadiusPool findUniqueOrThrow
   */
  export type RadiusPoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * Filter, which RadiusPool to fetch.
     */
    where: RadiusPoolWhereUniqueInput
  }

  /**
   * RadiusPool findFirst
   */
  export type RadiusPoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * Filter, which RadiusPool to fetch.
     */
    where?: RadiusPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiusPools to fetch.
     */
    orderBy?: RadiusPoolOrderByWithRelationInput | RadiusPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RadiusPools.
     */
    cursor?: RadiusPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiusPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiusPools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RadiusPools.
     */
    distinct?: RadiusPoolScalarFieldEnum | RadiusPoolScalarFieldEnum[]
  }

  /**
   * RadiusPool findFirstOrThrow
   */
  export type RadiusPoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * Filter, which RadiusPool to fetch.
     */
    where?: RadiusPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiusPools to fetch.
     */
    orderBy?: RadiusPoolOrderByWithRelationInput | RadiusPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RadiusPools.
     */
    cursor?: RadiusPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiusPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiusPools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RadiusPools.
     */
    distinct?: RadiusPoolScalarFieldEnum | RadiusPoolScalarFieldEnum[]
  }

  /**
   * RadiusPool findMany
   */
  export type RadiusPoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * Filter, which RadiusPools to fetch.
     */
    where?: RadiusPoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiusPools to fetch.
     */
    orderBy?: RadiusPoolOrderByWithRelationInput | RadiusPoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RadiusPools.
     */
    cursor?: RadiusPoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiusPools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiusPools.
     */
    skip?: number
    distinct?: RadiusPoolScalarFieldEnum | RadiusPoolScalarFieldEnum[]
  }

  /**
   * RadiusPool create
   */
  export type RadiusPoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * The data needed to create a RadiusPool.
     */
    data: XOR<RadiusPoolCreateInput, RadiusPoolUncheckedCreateInput>
  }

  /**
   * RadiusPool createMany
   */
  export type RadiusPoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RadiusPools.
     */
    data: RadiusPoolCreateManyInput | RadiusPoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RadiusPool update
   */
  export type RadiusPoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * The data needed to update a RadiusPool.
     */
    data: XOR<RadiusPoolUpdateInput, RadiusPoolUncheckedUpdateInput>
    /**
     * Choose, which RadiusPool to update.
     */
    where: RadiusPoolWhereUniqueInput
  }

  /**
   * RadiusPool updateMany
   */
  export type RadiusPoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RadiusPools.
     */
    data: XOR<RadiusPoolUpdateManyMutationInput, RadiusPoolUncheckedUpdateManyInput>
    /**
     * Filter which RadiusPools to update
     */
    where?: RadiusPoolWhereInput
    /**
     * Limit how many RadiusPools to update.
     */
    limit?: number
  }

  /**
   * RadiusPool upsert
   */
  export type RadiusPoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * The filter to search for the RadiusPool to update in case it exists.
     */
    where: RadiusPoolWhereUniqueInput
    /**
     * In case the RadiusPool found by the `where` argument doesn't exist, create a new RadiusPool with this data.
     */
    create: XOR<RadiusPoolCreateInput, RadiusPoolUncheckedCreateInput>
    /**
     * In case the RadiusPool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RadiusPoolUpdateInput, RadiusPoolUncheckedUpdateInput>
  }

  /**
   * RadiusPool delete
   */
  export type RadiusPoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
    /**
     * Filter which RadiusPool to delete.
     */
    where: RadiusPoolWhereUniqueInput
  }

  /**
   * RadiusPool deleteMany
   */
  export type RadiusPoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RadiusPools to delete
     */
    where?: RadiusPoolWhereInput
    /**
     * Limit how many RadiusPools to delete.
     */
    limit?: number
  }

  /**
   * RadiusPool without action
   */
  export type RadiusPoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiusPool
     */
    select?: RadiusPoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiusPool
     */
    omit?: RadiusPoolOmit<ExtArgs> | null
  }


  /**
   * Model radippool
   */

  export type AggregateRadippool = {
    _count: RadippoolCountAggregateOutputType | null
    _avg: RadippoolAvgAggregateOutputType | null
    _sum: RadippoolSumAggregateOutputType | null
    _min: RadippoolMinAggregateOutputType | null
    _max: RadippoolMaxAggregateOutputType | null
  }

  export type RadippoolAvgAggregateOutputType = {
    id: number | null
  }

  export type RadippoolSumAggregateOutputType = {
    id: number | null
  }

  export type RadippoolMinAggregateOutputType = {
    id: number | null
    pool_name: string | null
    framedipaddress: string | null
    nasipaddress: string | null
    calledstationid: string | null
    callingstationid: string | null
    expiry_time: Date | null
    username: string | null
    pool_key: string | null
  }

  export type RadippoolMaxAggregateOutputType = {
    id: number | null
    pool_name: string | null
    framedipaddress: string | null
    nasipaddress: string | null
    calledstationid: string | null
    callingstationid: string | null
    expiry_time: Date | null
    username: string | null
    pool_key: string | null
  }

  export type RadippoolCountAggregateOutputType = {
    id: number
    pool_name: number
    framedipaddress: number
    nasipaddress: number
    calledstationid: number
    callingstationid: number
    expiry_time: number
    username: number
    pool_key: number
    _all: number
  }


  export type RadippoolAvgAggregateInputType = {
    id?: true
  }

  export type RadippoolSumAggregateInputType = {
    id?: true
  }

  export type RadippoolMinAggregateInputType = {
    id?: true
    pool_name?: true
    framedipaddress?: true
    nasipaddress?: true
    calledstationid?: true
    callingstationid?: true
    expiry_time?: true
    username?: true
    pool_key?: true
  }

  export type RadippoolMaxAggregateInputType = {
    id?: true
    pool_name?: true
    framedipaddress?: true
    nasipaddress?: true
    calledstationid?: true
    callingstationid?: true
    expiry_time?: true
    username?: true
    pool_key?: true
  }

  export type RadippoolCountAggregateInputType = {
    id?: true
    pool_name?: true
    framedipaddress?: true
    nasipaddress?: true
    calledstationid?: true
    callingstationid?: true
    expiry_time?: true
    username?: true
    pool_key?: true
    _all?: true
  }

  export type RadippoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radippool to aggregate.
     */
    where?: radippoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radippools to fetch.
     */
    orderBy?: radippoolOrderByWithRelationInput | radippoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: radippoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radippools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radippools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned radippools
    **/
    _count?: true | RadippoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RadippoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RadippoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadippoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadippoolMaxAggregateInputType
  }

  export type GetRadippoolAggregateType<T extends RadippoolAggregateArgs> = {
        [P in keyof T & keyof AggregateRadippool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadippool[P]>
      : GetScalarType<T[P], AggregateRadippool[P]>
  }




  export type radippoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: radippoolWhereInput
    orderBy?: radippoolOrderByWithAggregationInput | radippoolOrderByWithAggregationInput[]
    by: RadippoolScalarFieldEnum[] | RadippoolScalarFieldEnum
    having?: radippoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadippoolCountAggregateInputType | true
    _avg?: RadippoolAvgAggregateInputType
    _sum?: RadippoolSumAggregateInputType
    _min?: RadippoolMinAggregateInputType
    _max?: RadippoolMaxAggregateInputType
  }

  export type RadippoolGroupByOutputType = {
    id: number
    pool_name: string
    framedipaddress: string
    nasipaddress: string
    calledstationid: string
    callingstationid: string
    expiry_time: Date | null
    username: string
    pool_key: string
    _count: RadippoolCountAggregateOutputType | null
    _avg: RadippoolAvgAggregateOutputType | null
    _sum: RadippoolSumAggregateOutputType | null
    _min: RadippoolMinAggregateOutputType | null
    _max: RadippoolMaxAggregateOutputType | null
  }

  type GetRadippoolGroupByPayload<T extends radippoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadippoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadippoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadippoolGroupByOutputType[P]>
            : GetScalarType<T[P], RadippoolGroupByOutputType[P]>
        }
      >
    >


  export type radippoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pool_name?: boolean
    framedipaddress?: boolean
    nasipaddress?: boolean
    calledstationid?: boolean
    callingstationid?: boolean
    expiry_time?: boolean
    username?: boolean
    pool_key?: boolean
  }, ExtArgs["result"]["radippool"]>



  export type radippoolSelectScalar = {
    id?: boolean
    pool_name?: boolean
    framedipaddress?: boolean
    nasipaddress?: boolean
    calledstationid?: boolean
    callingstationid?: boolean
    expiry_time?: boolean
    username?: boolean
    pool_key?: boolean
  }

  export type radippoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pool_name" | "framedipaddress" | "nasipaddress" | "calledstationid" | "callingstationid" | "expiry_time" | "username" | "pool_key", ExtArgs["result"]["radippool"]>

  export type $radippoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "radippool"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pool_name: string
      framedipaddress: string
      nasipaddress: string
      calledstationid: string
      callingstationid: string
      expiry_time: Date | null
      username: string
      pool_key: string
    }, ExtArgs["result"]["radippool"]>
    composites: {}
  }

  type radippoolGetPayload<S extends boolean | null | undefined | radippoolDefaultArgs> = $Result.GetResult<Prisma.$radippoolPayload, S>

  type radippoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<radippoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadippoolCountAggregateInputType | true
    }

  export interface radippoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['radippool'], meta: { name: 'radippool' } }
    /**
     * Find zero or one Radippool that matches the filter.
     * @param {radippoolFindUniqueArgs} args - Arguments to find a Radippool
     * @example
     * // Get one Radippool
     * const radippool = await prisma.radippool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends radippoolFindUniqueArgs>(args: SelectSubset<T, radippoolFindUniqueArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Radippool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {radippoolFindUniqueOrThrowArgs} args - Arguments to find a Radippool
     * @example
     * // Get one Radippool
     * const radippool = await prisma.radippool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends radippoolFindUniqueOrThrowArgs>(args: SelectSubset<T, radippoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radippool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radippoolFindFirstArgs} args - Arguments to find a Radippool
     * @example
     * // Get one Radippool
     * const radippool = await prisma.radippool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends radippoolFindFirstArgs>(args?: SelectSubset<T, radippoolFindFirstArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Radippool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radippoolFindFirstOrThrowArgs} args - Arguments to find a Radippool
     * @example
     * // Get one Radippool
     * const radippool = await prisma.radippool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends radippoolFindFirstOrThrowArgs>(args?: SelectSubset<T, radippoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Radippools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radippoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Radippools
     * const radippools = await prisma.radippool.findMany()
     * 
     * // Get first 10 Radippools
     * const radippools = await prisma.radippool.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radippoolWithIdOnly = await prisma.radippool.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends radippoolFindManyArgs>(args?: SelectSubset<T, radippoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Radippool.
     * @param {radippoolCreateArgs} args - Arguments to create a Radippool.
     * @example
     * // Create one Radippool
     * const Radippool = await prisma.radippool.create({
     *   data: {
     *     // ... data to create a Radippool
     *   }
     * })
     * 
     */
    create<T extends radippoolCreateArgs>(args: SelectSubset<T, radippoolCreateArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Radippools.
     * @param {radippoolCreateManyArgs} args - Arguments to create many Radippools.
     * @example
     * // Create many Radippools
     * const radippool = await prisma.radippool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends radippoolCreateManyArgs>(args?: SelectSubset<T, radippoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Radippool.
     * @param {radippoolDeleteArgs} args - Arguments to delete one Radippool.
     * @example
     * // Delete one Radippool
     * const Radippool = await prisma.radippool.delete({
     *   where: {
     *     // ... filter to delete one Radippool
     *   }
     * })
     * 
     */
    delete<T extends radippoolDeleteArgs>(args: SelectSubset<T, radippoolDeleteArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Radippool.
     * @param {radippoolUpdateArgs} args - Arguments to update one Radippool.
     * @example
     * // Update one Radippool
     * const radippool = await prisma.radippool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends radippoolUpdateArgs>(args: SelectSubset<T, radippoolUpdateArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Radippools.
     * @param {radippoolDeleteManyArgs} args - Arguments to filter Radippools to delete.
     * @example
     * // Delete a few Radippools
     * const { count } = await prisma.radippool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends radippoolDeleteManyArgs>(args?: SelectSubset<T, radippoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Radippools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radippoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Radippools
     * const radippool = await prisma.radippool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends radippoolUpdateManyArgs>(args: SelectSubset<T, radippoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Radippool.
     * @param {radippoolUpsertArgs} args - Arguments to update or create a Radippool.
     * @example
     * // Update or create a Radippool
     * const radippool = await prisma.radippool.upsert({
     *   create: {
     *     // ... data to create a Radippool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Radippool we want to update
     *   }
     * })
     */
    upsert<T extends radippoolUpsertArgs>(args: SelectSubset<T, radippoolUpsertArgs<ExtArgs>>): Prisma__radippoolClient<$Result.GetResult<Prisma.$radippoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Radippools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radippoolCountArgs} args - Arguments to filter Radippools to count.
     * @example
     * // Count the number of Radippools
     * const count = await prisma.radippool.count({
     *   where: {
     *     // ... the filter for the Radippools we want to count
     *   }
     * })
    **/
    count<T extends radippoolCountArgs>(
      args?: Subset<T, radippoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadippoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Radippool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadippoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadippoolAggregateArgs>(args: Subset<T, RadippoolAggregateArgs>): Prisma.PrismaPromise<GetRadippoolAggregateType<T>>

    /**
     * Group by Radippool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {radippoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends radippoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: radippoolGroupByArgs['orderBy'] }
        : { orderBy?: radippoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, radippoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadippoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the radippool model
   */
  readonly fields: radippoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for radippool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__radippoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the radippool model
   */
  interface radippoolFieldRefs {
    readonly id: FieldRef<"radippool", 'Int'>
    readonly pool_name: FieldRef<"radippool", 'String'>
    readonly framedipaddress: FieldRef<"radippool", 'String'>
    readonly nasipaddress: FieldRef<"radippool", 'String'>
    readonly calledstationid: FieldRef<"radippool", 'String'>
    readonly callingstationid: FieldRef<"radippool", 'String'>
    readonly expiry_time: FieldRef<"radippool", 'DateTime'>
    readonly username: FieldRef<"radippool", 'String'>
    readonly pool_key: FieldRef<"radippool", 'String'>
  }
    

  // Custom InputTypes
  /**
   * radippool findUnique
   */
  export type radippoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * Filter, which radippool to fetch.
     */
    where: radippoolWhereUniqueInput
  }

  /**
   * radippool findUniqueOrThrow
   */
  export type radippoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * Filter, which radippool to fetch.
     */
    where: radippoolWhereUniqueInput
  }

  /**
   * radippool findFirst
   */
  export type radippoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * Filter, which radippool to fetch.
     */
    where?: radippoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radippools to fetch.
     */
    orderBy?: radippoolOrderByWithRelationInput | radippoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radippools.
     */
    cursor?: radippoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radippools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radippools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radippools.
     */
    distinct?: RadippoolScalarFieldEnum | RadippoolScalarFieldEnum[]
  }

  /**
   * radippool findFirstOrThrow
   */
  export type radippoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * Filter, which radippool to fetch.
     */
    where?: radippoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radippools to fetch.
     */
    orderBy?: radippoolOrderByWithRelationInput | radippoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for radippools.
     */
    cursor?: radippoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radippools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radippools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of radippools.
     */
    distinct?: RadippoolScalarFieldEnum | RadippoolScalarFieldEnum[]
  }

  /**
   * radippool findMany
   */
  export type radippoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * Filter, which radippools to fetch.
     */
    where?: radippoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of radippools to fetch.
     */
    orderBy?: radippoolOrderByWithRelationInput | radippoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing radippools.
     */
    cursor?: radippoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` radippools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` radippools.
     */
    skip?: number
    distinct?: RadippoolScalarFieldEnum | RadippoolScalarFieldEnum[]
  }

  /**
   * radippool create
   */
  export type radippoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * The data needed to create a radippool.
     */
    data: XOR<radippoolCreateInput, radippoolUncheckedCreateInput>
  }

  /**
   * radippool createMany
   */
  export type radippoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many radippools.
     */
    data: radippoolCreateManyInput | radippoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * radippool update
   */
  export type radippoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * The data needed to update a radippool.
     */
    data: XOR<radippoolUpdateInput, radippoolUncheckedUpdateInput>
    /**
     * Choose, which radippool to update.
     */
    where: radippoolWhereUniqueInput
  }

  /**
   * radippool updateMany
   */
  export type radippoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update radippools.
     */
    data: XOR<radippoolUpdateManyMutationInput, radippoolUncheckedUpdateManyInput>
    /**
     * Filter which radippools to update
     */
    where?: radippoolWhereInput
    /**
     * Limit how many radippools to update.
     */
    limit?: number
  }

  /**
   * radippool upsert
   */
  export type radippoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * The filter to search for the radippool to update in case it exists.
     */
    where: radippoolWhereUniqueInput
    /**
     * In case the radippool found by the `where` argument doesn't exist, create a new radippool with this data.
     */
    create: XOR<radippoolCreateInput, radippoolUncheckedCreateInput>
    /**
     * In case the radippool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<radippoolUpdateInput, radippoolUncheckedUpdateInput>
  }

  /**
   * radippool delete
   */
  export type radippoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
    /**
     * Filter which radippool to delete.
     */
    where: radippoolWhereUniqueInput
  }

  /**
   * radippool deleteMany
   */
  export type radippoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which radippools to delete
     */
    where?: radippoolWhereInput
    /**
     * Limit how many radippools to delete.
     */
    limit?: number
  }

  /**
   * radippool without action
   */
  export type radippoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the radippool
     */
    select?: radippoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the radippool
     */
    omit?: radippoolOmit<ExtArgs> | null
  }


  /**
   * Model MikrotikConfig
   */

  export type AggregateMikrotikConfig = {
    _count: MikrotikConfigCountAggregateOutputType | null
    _avg: MikrotikConfigAvgAggregateOutputType | null
    _sum: MikrotikConfigSumAggregateOutputType | null
    _min: MikrotikConfigMinAggregateOutputType | null
    _max: MikrotikConfigMaxAggregateOutputType | null
  }

  export type MikrotikConfigAvgAggregateOutputType = {
    id: number | null
    port: number | null
  }

  export type MikrotikConfigSumAggregateOutputType = {
    id: number | null
    port: number | null
  }

  export type MikrotikConfigMinAggregateOutputType = {
    id: number | null
    name: string | null
    host: string | null
    port: number | null
    username: string | null
    password: string | null
    useSsl: boolean | null
    wgPublicHost: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MikrotikConfigMaxAggregateOutputType = {
    id: number | null
    name: string | null
    host: string | null
    port: number | null
    username: string | null
    password: string | null
    useSsl: boolean | null
    wgPublicHost: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MikrotikConfigCountAggregateOutputType = {
    id: number
    name: number
    host: number
    port: number
    username: number
    password: number
    useSsl: number
    wgPublicHost: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MikrotikConfigAvgAggregateInputType = {
    id?: true
    port?: true
  }

  export type MikrotikConfigSumAggregateInputType = {
    id?: true
    port?: true
  }

  export type MikrotikConfigMinAggregateInputType = {
    id?: true
    name?: true
    host?: true
    port?: true
    username?: true
    password?: true
    useSsl?: true
    wgPublicHost?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MikrotikConfigMaxAggregateInputType = {
    id?: true
    name?: true
    host?: true
    port?: true
    username?: true
    password?: true
    useSsl?: true
    wgPublicHost?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MikrotikConfigCountAggregateInputType = {
    id?: true
    name?: true
    host?: true
    port?: true
    username?: true
    password?: true
    useSsl?: true
    wgPublicHost?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MikrotikConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MikrotikConfig to aggregate.
     */
    where?: MikrotikConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MikrotikConfigs to fetch.
     */
    orderBy?: MikrotikConfigOrderByWithRelationInput | MikrotikConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MikrotikConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MikrotikConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MikrotikConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MikrotikConfigs
    **/
    _count?: true | MikrotikConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MikrotikConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MikrotikConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MikrotikConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MikrotikConfigMaxAggregateInputType
  }

  export type GetMikrotikConfigAggregateType<T extends MikrotikConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateMikrotikConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMikrotikConfig[P]>
      : GetScalarType<T[P], AggregateMikrotikConfig[P]>
  }




  export type MikrotikConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MikrotikConfigWhereInput
    orderBy?: MikrotikConfigOrderByWithAggregationInput | MikrotikConfigOrderByWithAggregationInput[]
    by: MikrotikConfigScalarFieldEnum[] | MikrotikConfigScalarFieldEnum
    having?: MikrotikConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MikrotikConfigCountAggregateInputType | true
    _avg?: MikrotikConfigAvgAggregateInputType
    _sum?: MikrotikConfigSumAggregateInputType
    _min?: MikrotikConfigMinAggregateInputType
    _max?: MikrotikConfigMaxAggregateInputType
  }

  export type MikrotikConfigGroupByOutputType = {
    id: number
    name: string
    host: string
    port: number
    username: string
    password: string
    useSsl: boolean
    wgPublicHost: string | null
    createdAt: Date
    updatedAt: Date
    _count: MikrotikConfigCountAggregateOutputType | null
    _avg: MikrotikConfigAvgAggregateOutputType | null
    _sum: MikrotikConfigSumAggregateOutputType | null
    _min: MikrotikConfigMinAggregateOutputType | null
    _max: MikrotikConfigMaxAggregateOutputType | null
  }

  type GetMikrotikConfigGroupByPayload<T extends MikrotikConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MikrotikConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MikrotikConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MikrotikConfigGroupByOutputType[P]>
            : GetScalarType<T[P], MikrotikConfigGroupByOutputType[P]>
        }
      >
    >


  export type MikrotikConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    host?: boolean
    port?: boolean
    username?: boolean
    password?: boolean
    useSsl?: boolean
    wgPublicHost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    peers?: boolean | MikrotikConfig$peersArgs<ExtArgs>
    _count?: boolean | MikrotikConfigCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mikrotikConfig"]>



  export type MikrotikConfigSelectScalar = {
    id?: boolean
    name?: boolean
    host?: boolean
    port?: boolean
    username?: boolean
    password?: boolean
    useSsl?: boolean
    wgPublicHost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MikrotikConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "host" | "port" | "username" | "password" | "useSsl" | "wgPublicHost" | "createdAt" | "updatedAt", ExtArgs["result"]["mikrotikConfig"]>
  export type MikrotikConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peers?: boolean | MikrotikConfig$peersArgs<ExtArgs>
    _count?: boolean | MikrotikConfigCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MikrotikConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MikrotikConfig"
    objects: {
      peers: Prisma.$WireguardPeerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      host: string
      port: number
      username: string
      password: string
      useSsl: boolean
      wgPublicHost: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mikrotikConfig"]>
    composites: {}
  }

  type MikrotikConfigGetPayload<S extends boolean | null | undefined | MikrotikConfigDefaultArgs> = $Result.GetResult<Prisma.$MikrotikConfigPayload, S>

  type MikrotikConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MikrotikConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MikrotikConfigCountAggregateInputType | true
    }

  export interface MikrotikConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MikrotikConfig'], meta: { name: 'MikrotikConfig' } }
    /**
     * Find zero or one MikrotikConfig that matches the filter.
     * @param {MikrotikConfigFindUniqueArgs} args - Arguments to find a MikrotikConfig
     * @example
     * // Get one MikrotikConfig
     * const mikrotikConfig = await prisma.mikrotikConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MikrotikConfigFindUniqueArgs>(args: SelectSubset<T, MikrotikConfigFindUniqueArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MikrotikConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MikrotikConfigFindUniqueOrThrowArgs} args - Arguments to find a MikrotikConfig
     * @example
     * // Get one MikrotikConfig
     * const mikrotikConfig = await prisma.mikrotikConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MikrotikConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, MikrotikConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MikrotikConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MikrotikConfigFindFirstArgs} args - Arguments to find a MikrotikConfig
     * @example
     * // Get one MikrotikConfig
     * const mikrotikConfig = await prisma.mikrotikConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MikrotikConfigFindFirstArgs>(args?: SelectSubset<T, MikrotikConfigFindFirstArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MikrotikConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MikrotikConfigFindFirstOrThrowArgs} args - Arguments to find a MikrotikConfig
     * @example
     * // Get one MikrotikConfig
     * const mikrotikConfig = await prisma.mikrotikConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MikrotikConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, MikrotikConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MikrotikConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MikrotikConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MikrotikConfigs
     * const mikrotikConfigs = await prisma.mikrotikConfig.findMany()
     * 
     * // Get first 10 MikrotikConfigs
     * const mikrotikConfigs = await prisma.mikrotikConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mikrotikConfigWithIdOnly = await prisma.mikrotikConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MikrotikConfigFindManyArgs>(args?: SelectSubset<T, MikrotikConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MikrotikConfig.
     * @param {MikrotikConfigCreateArgs} args - Arguments to create a MikrotikConfig.
     * @example
     * // Create one MikrotikConfig
     * const MikrotikConfig = await prisma.mikrotikConfig.create({
     *   data: {
     *     // ... data to create a MikrotikConfig
     *   }
     * })
     * 
     */
    create<T extends MikrotikConfigCreateArgs>(args: SelectSubset<T, MikrotikConfigCreateArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MikrotikConfigs.
     * @param {MikrotikConfigCreateManyArgs} args - Arguments to create many MikrotikConfigs.
     * @example
     * // Create many MikrotikConfigs
     * const mikrotikConfig = await prisma.mikrotikConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MikrotikConfigCreateManyArgs>(args?: SelectSubset<T, MikrotikConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MikrotikConfig.
     * @param {MikrotikConfigDeleteArgs} args - Arguments to delete one MikrotikConfig.
     * @example
     * // Delete one MikrotikConfig
     * const MikrotikConfig = await prisma.mikrotikConfig.delete({
     *   where: {
     *     // ... filter to delete one MikrotikConfig
     *   }
     * })
     * 
     */
    delete<T extends MikrotikConfigDeleteArgs>(args: SelectSubset<T, MikrotikConfigDeleteArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MikrotikConfig.
     * @param {MikrotikConfigUpdateArgs} args - Arguments to update one MikrotikConfig.
     * @example
     * // Update one MikrotikConfig
     * const mikrotikConfig = await prisma.mikrotikConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MikrotikConfigUpdateArgs>(args: SelectSubset<T, MikrotikConfigUpdateArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MikrotikConfigs.
     * @param {MikrotikConfigDeleteManyArgs} args - Arguments to filter MikrotikConfigs to delete.
     * @example
     * // Delete a few MikrotikConfigs
     * const { count } = await prisma.mikrotikConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MikrotikConfigDeleteManyArgs>(args?: SelectSubset<T, MikrotikConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MikrotikConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MikrotikConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MikrotikConfigs
     * const mikrotikConfig = await prisma.mikrotikConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MikrotikConfigUpdateManyArgs>(args: SelectSubset<T, MikrotikConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MikrotikConfig.
     * @param {MikrotikConfigUpsertArgs} args - Arguments to update or create a MikrotikConfig.
     * @example
     * // Update or create a MikrotikConfig
     * const mikrotikConfig = await prisma.mikrotikConfig.upsert({
     *   create: {
     *     // ... data to create a MikrotikConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MikrotikConfig we want to update
     *   }
     * })
     */
    upsert<T extends MikrotikConfigUpsertArgs>(args: SelectSubset<T, MikrotikConfigUpsertArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MikrotikConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MikrotikConfigCountArgs} args - Arguments to filter MikrotikConfigs to count.
     * @example
     * // Count the number of MikrotikConfigs
     * const count = await prisma.mikrotikConfig.count({
     *   where: {
     *     // ... the filter for the MikrotikConfigs we want to count
     *   }
     * })
    **/
    count<T extends MikrotikConfigCountArgs>(
      args?: Subset<T, MikrotikConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MikrotikConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MikrotikConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MikrotikConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MikrotikConfigAggregateArgs>(args: Subset<T, MikrotikConfigAggregateArgs>): Prisma.PrismaPromise<GetMikrotikConfigAggregateType<T>>

    /**
     * Group by MikrotikConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MikrotikConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MikrotikConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MikrotikConfigGroupByArgs['orderBy'] }
        : { orderBy?: MikrotikConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MikrotikConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMikrotikConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MikrotikConfig model
   */
  readonly fields: MikrotikConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MikrotikConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MikrotikConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    peers<T extends MikrotikConfig$peersArgs<ExtArgs> = {}>(args?: Subset<T, MikrotikConfig$peersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MikrotikConfig model
   */
  interface MikrotikConfigFieldRefs {
    readonly id: FieldRef<"MikrotikConfig", 'Int'>
    readonly name: FieldRef<"MikrotikConfig", 'String'>
    readonly host: FieldRef<"MikrotikConfig", 'String'>
    readonly port: FieldRef<"MikrotikConfig", 'Int'>
    readonly username: FieldRef<"MikrotikConfig", 'String'>
    readonly password: FieldRef<"MikrotikConfig", 'String'>
    readonly useSsl: FieldRef<"MikrotikConfig", 'Boolean'>
    readonly wgPublicHost: FieldRef<"MikrotikConfig", 'String'>
    readonly createdAt: FieldRef<"MikrotikConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"MikrotikConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MikrotikConfig findUnique
   */
  export type MikrotikConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * Filter, which MikrotikConfig to fetch.
     */
    where: MikrotikConfigWhereUniqueInput
  }

  /**
   * MikrotikConfig findUniqueOrThrow
   */
  export type MikrotikConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * Filter, which MikrotikConfig to fetch.
     */
    where: MikrotikConfigWhereUniqueInput
  }

  /**
   * MikrotikConfig findFirst
   */
  export type MikrotikConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * Filter, which MikrotikConfig to fetch.
     */
    where?: MikrotikConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MikrotikConfigs to fetch.
     */
    orderBy?: MikrotikConfigOrderByWithRelationInput | MikrotikConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MikrotikConfigs.
     */
    cursor?: MikrotikConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MikrotikConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MikrotikConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MikrotikConfigs.
     */
    distinct?: MikrotikConfigScalarFieldEnum | MikrotikConfigScalarFieldEnum[]
  }

  /**
   * MikrotikConfig findFirstOrThrow
   */
  export type MikrotikConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * Filter, which MikrotikConfig to fetch.
     */
    where?: MikrotikConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MikrotikConfigs to fetch.
     */
    orderBy?: MikrotikConfigOrderByWithRelationInput | MikrotikConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MikrotikConfigs.
     */
    cursor?: MikrotikConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MikrotikConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MikrotikConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MikrotikConfigs.
     */
    distinct?: MikrotikConfigScalarFieldEnum | MikrotikConfigScalarFieldEnum[]
  }

  /**
   * MikrotikConfig findMany
   */
  export type MikrotikConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * Filter, which MikrotikConfigs to fetch.
     */
    where?: MikrotikConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MikrotikConfigs to fetch.
     */
    orderBy?: MikrotikConfigOrderByWithRelationInput | MikrotikConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MikrotikConfigs.
     */
    cursor?: MikrotikConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MikrotikConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MikrotikConfigs.
     */
    skip?: number
    distinct?: MikrotikConfigScalarFieldEnum | MikrotikConfigScalarFieldEnum[]
  }

  /**
   * MikrotikConfig create
   */
  export type MikrotikConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a MikrotikConfig.
     */
    data: XOR<MikrotikConfigCreateInput, MikrotikConfigUncheckedCreateInput>
  }

  /**
   * MikrotikConfig createMany
   */
  export type MikrotikConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MikrotikConfigs.
     */
    data: MikrotikConfigCreateManyInput | MikrotikConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MikrotikConfig update
   */
  export type MikrotikConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a MikrotikConfig.
     */
    data: XOR<MikrotikConfigUpdateInput, MikrotikConfigUncheckedUpdateInput>
    /**
     * Choose, which MikrotikConfig to update.
     */
    where: MikrotikConfigWhereUniqueInput
  }

  /**
   * MikrotikConfig updateMany
   */
  export type MikrotikConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MikrotikConfigs.
     */
    data: XOR<MikrotikConfigUpdateManyMutationInput, MikrotikConfigUncheckedUpdateManyInput>
    /**
     * Filter which MikrotikConfigs to update
     */
    where?: MikrotikConfigWhereInput
    /**
     * Limit how many MikrotikConfigs to update.
     */
    limit?: number
  }

  /**
   * MikrotikConfig upsert
   */
  export type MikrotikConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the MikrotikConfig to update in case it exists.
     */
    where: MikrotikConfigWhereUniqueInput
    /**
     * In case the MikrotikConfig found by the `where` argument doesn't exist, create a new MikrotikConfig with this data.
     */
    create: XOR<MikrotikConfigCreateInput, MikrotikConfigUncheckedCreateInput>
    /**
     * In case the MikrotikConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MikrotikConfigUpdateInput, MikrotikConfigUncheckedUpdateInput>
  }

  /**
   * MikrotikConfig delete
   */
  export type MikrotikConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
    /**
     * Filter which MikrotikConfig to delete.
     */
    where: MikrotikConfigWhereUniqueInput
  }

  /**
   * MikrotikConfig deleteMany
   */
  export type MikrotikConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MikrotikConfigs to delete
     */
    where?: MikrotikConfigWhereInput
    /**
     * Limit how many MikrotikConfigs to delete.
     */
    limit?: number
  }

  /**
   * MikrotikConfig.peers
   */
  export type MikrotikConfig$peersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    where?: WireguardPeerWhereInput
    orderBy?: WireguardPeerOrderByWithRelationInput | WireguardPeerOrderByWithRelationInput[]
    cursor?: WireguardPeerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WireguardPeerScalarFieldEnum | WireguardPeerScalarFieldEnum[]
  }

  /**
   * MikrotikConfig without action
   */
  export type MikrotikConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MikrotikConfig
     */
    select?: MikrotikConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MikrotikConfig
     */
    omit?: MikrotikConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MikrotikConfigInclude<ExtArgs> | null
  }


  /**
   * Model WireguardPeer
   */

  export type AggregateWireguardPeer = {
    _count: WireguardPeerCountAggregateOutputType | null
    _avg: WireguardPeerAvgAggregateOutputType | null
    _sum: WireguardPeerSumAggregateOutputType | null
    _min: WireguardPeerMinAggregateOutputType | null
    _max: WireguardPeerMaxAggregateOutputType | null
  }

  export type WireguardPeerAvgAggregateOutputType = {
    id: number | null
    mikrotikId: number | null
    listenPort: number | null
  }

  export type WireguardPeerSumAggregateOutputType = {
    id: number | null
    mikrotikId: number | null
    listenPort: number | null
  }

  export type WireguardPeerMinAggregateOutputType = {
    id: number | null
    mikrotikId: number | null
    mikrotikPeerId: string | null
    name: string | null
    publicKey: string | null
    privateKey: string | null
    allowedIps: string | null
    interface: string | null
    listenPort: number | null
    endpoint: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type WireguardPeerMaxAggregateOutputType = {
    id: number | null
    mikrotikId: number | null
    mikrotikPeerId: string | null
    name: string | null
    publicKey: string | null
    privateKey: string | null
    allowedIps: string | null
    interface: string | null
    listenPort: number | null
    endpoint: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type WireguardPeerCountAggregateOutputType = {
    id: number
    mikrotikId: number
    mikrotikPeerId: number
    name: number
    publicKey: number
    privateKey: number
    allowedIps: number
    interface: number
    listenPort: number
    endpoint: number
    comment: number
    createdAt: number
    _all: number
  }


  export type WireguardPeerAvgAggregateInputType = {
    id?: true
    mikrotikId?: true
    listenPort?: true
  }

  export type WireguardPeerSumAggregateInputType = {
    id?: true
    mikrotikId?: true
    listenPort?: true
  }

  export type WireguardPeerMinAggregateInputType = {
    id?: true
    mikrotikId?: true
    mikrotikPeerId?: true
    name?: true
    publicKey?: true
    privateKey?: true
    allowedIps?: true
    interface?: true
    listenPort?: true
    endpoint?: true
    comment?: true
    createdAt?: true
  }

  export type WireguardPeerMaxAggregateInputType = {
    id?: true
    mikrotikId?: true
    mikrotikPeerId?: true
    name?: true
    publicKey?: true
    privateKey?: true
    allowedIps?: true
    interface?: true
    listenPort?: true
    endpoint?: true
    comment?: true
    createdAt?: true
  }

  export type WireguardPeerCountAggregateInputType = {
    id?: true
    mikrotikId?: true
    mikrotikPeerId?: true
    name?: true
    publicKey?: true
    privateKey?: true
    allowedIps?: true
    interface?: true
    listenPort?: true
    endpoint?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type WireguardPeerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WireguardPeer to aggregate.
     */
    where?: WireguardPeerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WireguardPeers to fetch.
     */
    orderBy?: WireguardPeerOrderByWithRelationInput | WireguardPeerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WireguardPeerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WireguardPeers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WireguardPeers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WireguardPeers
    **/
    _count?: true | WireguardPeerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WireguardPeerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WireguardPeerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WireguardPeerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WireguardPeerMaxAggregateInputType
  }

  export type GetWireguardPeerAggregateType<T extends WireguardPeerAggregateArgs> = {
        [P in keyof T & keyof AggregateWireguardPeer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWireguardPeer[P]>
      : GetScalarType<T[P], AggregateWireguardPeer[P]>
  }




  export type WireguardPeerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WireguardPeerWhereInput
    orderBy?: WireguardPeerOrderByWithAggregationInput | WireguardPeerOrderByWithAggregationInput[]
    by: WireguardPeerScalarFieldEnum[] | WireguardPeerScalarFieldEnum
    having?: WireguardPeerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WireguardPeerCountAggregateInputType | true
    _avg?: WireguardPeerAvgAggregateInputType
    _sum?: WireguardPeerSumAggregateInputType
    _min?: WireguardPeerMinAggregateInputType
    _max?: WireguardPeerMaxAggregateInputType
  }

  export type WireguardPeerGroupByOutputType = {
    id: number
    mikrotikId: number
    mikrotikPeerId: string | null
    name: string
    publicKey: string
    privateKey: string
    allowedIps: string
    interface: string
    listenPort: number | null
    endpoint: string | null
    comment: string | null
    createdAt: Date
    _count: WireguardPeerCountAggregateOutputType | null
    _avg: WireguardPeerAvgAggregateOutputType | null
    _sum: WireguardPeerSumAggregateOutputType | null
    _min: WireguardPeerMinAggregateOutputType | null
    _max: WireguardPeerMaxAggregateOutputType | null
  }

  type GetWireguardPeerGroupByPayload<T extends WireguardPeerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WireguardPeerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WireguardPeerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WireguardPeerGroupByOutputType[P]>
            : GetScalarType<T[P], WireguardPeerGroupByOutputType[P]>
        }
      >
    >


  export type WireguardPeerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mikrotikId?: boolean
    mikrotikPeerId?: boolean
    name?: boolean
    publicKey?: boolean
    privateKey?: boolean
    allowedIps?: boolean
    interface?: boolean
    listenPort?: boolean
    endpoint?: boolean
    comment?: boolean
    createdAt?: boolean
    mikrotik?: boolean | MikrotikConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wireguardPeer"]>



  export type WireguardPeerSelectScalar = {
    id?: boolean
    mikrotikId?: boolean
    mikrotikPeerId?: boolean
    name?: boolean
    publicKey?: boolean
    privateKey?: boolean
    allowedIps?: boolean
    interface?: boolean
    listenPort?: boolean
    endpoint?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type WireguardPeerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mikrotikId" | "mikrotikPeerId" | "name" | "publicKey" | "privateKey" | "allowedIps" | "interface" | "listenPort" | "endpoint" | "comment" | "createdAt", ExtArgs["result"]["wireguardPeer"]>
  export type WireguardPeerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mikrotik?: boolean | MikrotikConfigDefaultArgs<ExtArgs>
  }

  export type $WireguardPeerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WireguardPeer"
    objects: {
      mikrotik: Prisma.$MikrotikConfigPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mikrotikId: number
      mikrotikPeerId: string | null
      name: string
      publicKey: string
      privateKey: string
      allowedIps: string
      interface: string
      listenPort: number | null
      endpoint: string | null
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["wireguardPeer"]>
    composites: {}
  }

  type WireguardPeerGetPayload<S extends boolean | null | undefined | WireguardPeerDefaultArgs> = $Result.GetResult<Prisma.$WireguardPeerPayload, S>

  type WireguardPeerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WireguardPeerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WireguardPeerCountAggregateInputType | true
    }

  export interface WireguardPeerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WireguardPeer'], meta: { name: 'WireguardPeer' } }
    /**
     * Find zero or one WireguardPeer that matches the filter.
     * @param {WireguardPeerFindUniqueArgs} args - Arguments to find a WireguardPeer
     * @example
     * // Get one WireguardPeer
     * const wireguardPeer = await prisma.wireguardPeer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WireguardPeerFindUniqueArgs>(args: SelectSubset<T, WireguardPeerFindUniqueArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WireguardPeer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WireguardPeerFindUniqueOrThrowArgs} args - Arguments to find a WireguardPeer
     * @example
     * // Get one WireguardPeer
     * const wireguardPeer = await prisma.wireguardPeer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WireguardPeerFindUniqueOrThrowArgs>(args: SelectSubset<T, WireguardPeerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WireguardPeer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WireguardPeerFindFirstArgs} args - Arguments to find a WireguardPeer
     * @example
     * // Get one WireguardPeer
     * const wireguardPeer = await prisma.wireguardPeer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WireguardPeerFindFirstArgs>(args?: SelectSubset<T, WireguardPeerFindFirstArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WireguardPeer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WireguardPeerFindFirstOrThrowArgs} args - Arguments to find a WireguardPeer
     * @example
     * // Get one WireguardPeer
     * const wireguardPeer = await prisma.wireguardPeer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WireguardPeerFindFirstOrThrowArgs>(args?: SelectSubset<T, WireguardPeerFindFirstOrThrowArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WireguardPeers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WireguardPeerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WireguardPeers
     * const wireguardPeers = await prisma.wireguardPeer.findMany()
     * 
     * // Get first 10 WireguardPeers
     * const wireguardPeers = await prisma.wireguardPeer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wireguardPeerWithIdOnly = await prisma.wireguardPeer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WireguardPeerFindManyArgs>(args?: SelectSubset<T, WireguardPeerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WireguardPeer.
     * @param {WireguardPeerCreateArgs} args - Arguments to create a WireguardPeer.
     * @example
     * // Create one WireguardPeer
     * const WireguardPeer = await prisma.wireguardPeer.create({
     *   data: {
     *     // ... data to create a WireguardPeer
     *   }
     * })
     * 
     */
    create<T extends WireguardPeerCreateArgs>(args: SelectSubset<T, WireguardPeerCreateArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WireguardPeers.
     * @param {WireguardPeerCreateManyArgs} args - Arguments to create many WireguardPeers.
     * @example
     * // Create many WireguardPeers
     * const wireguardPeer = await prisma.wireguardPeer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WireguardPeerCreateManyArgs>(args?: SelectSubset<T, WireguardPeerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WireguardPeer.
     * @param {WireguardPeerDeleteArgs} args - Arguments to delete one WireguardPeer.
     * @example
     * // Delete one WireguardPeer
     * const WireguardPeer = await prisma.wireguardPeer.delete({
     *   where: {
     *     // ... filter to delete one WireguardPeer
     *   }
     * })
     * 
     */
    delete<T extends WireguardPeerDeleteArgs>(args: SelectSubset<T, WireguardPeerDeleteArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WireguardPeer.
     * @param {WireguardPeerUpdateArgs} args - Arguments to update one WireguardPeer.
     * @example
     * // Update one WireguardPeer
     * const wireguardPeer = await prisma.wireguardPeer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WireguardPeerUpdateArgs>(args: SelectSubset<T, WireguardPeerUpdateArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WireguardPeers.
     * @param {WireguardPeerDeleteManyArgs} args - Arguments to filter WireguardPeers to delete.
     * @example
     * // Delete a few WireguardPeers
     * const { count } = await prisma.wireguardPeer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WireguardPeerDeleteManyArgs>(args?: SelectSubset<T, WireguardPeerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WireguardPeers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WireguardPeerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WireguardPeers
     * const wireguardPeer = await prisma.wireguardPeer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WireguardPeerUpdateManyArgs>(args: SelectSubset<T, WireguardPeerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WireguardPeer.
     * @param {WireguardPeerUpsertArgs} args - Arguments to update or create a WireguardPeer.
     * @example
     * // Update or create a WireguardPeer
     * const wireguardPeer = await prisma.wireguardPeer.upsert({
     *   create: {
     *     // ... data to create a WireguardPeer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WireguardPeer we want to update
     *   }
     * })
     */
    upsert<T extends WireguardPeerUpsertArgs>(args: SelectSubset<T, WireguardPeerUpsertArgs<ExtArgs>>): Prisma__WireguardPeerClient<$Result.GetResult<Prisma.$WireguardPeerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WireguardPeers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WireguardPeerCountArgs} args - Arguments to filter WireguardPeers to count.
     * @example
     * // Count the number of WireguardPeers
     * const count = await prisma.wireguardPeer.count({
     *   where: {
     *     // ... the filter for the WireguardPeers we want to count
     *   }
     * })
    **/
    count<T extends WireguardPeerCountArgs>(
      args?: Subset<T, WireguardPeerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WireguardPeerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WireguardPeer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WireguardPeerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WireguardPeerAggregateArgs>(args: Subset<T, WireguardPeerAggregateArgs>): Prisma.PrismaPromise<GetWireguardPeerAggregateType<T>>

    /**
     * Group by WireguardPeer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WireguardPeerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WireguardPeerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WireguardPeerGroupByArgs['orderBy'] }
        : { orderBy?: WireguardPeerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WireguardPeerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWireguardPeerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WireguardPeer model
   */
  readonly fields: WireguardPeerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WireguardPeer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WireguardPeerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mikrotik<T extends MikrotikConfigDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MikrotikConfigDefaultArgs<ExtArgs>>): Prisma__MikrotikConfigClient<$Result.GetResult<Prisma.$MikrotikConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WireguardPeer model
   */
  interface WireguardPeerFieldRefs {
    readonly id: FieldRef<"WireguardPeer", 'Int'>
    readonly mikrotikId: FieldRef<"WireguardPeer", 'Int'>
    readonly mikrotikPeerId: FieldRef<"WireguardPeer", 'String'>
    readonly name: FieldRef<"WireguardPeer", 'String'>
    readonly publicKey: FieldRef<"WireguardPeer", 'String'>
    readonly privateKey: FieldRef<"WireguardPeer", 'String'>
    readonly allowedIps: FieldRef<"WireguardPeer", 'String'>
    readonly interface: FieldRef<"WireguardPeer", 'String'>
    readonly listenPort: FieldRef<"WireguardPeer", 'Int'>
    readonly endpoint: FieldRef<"WireguardPeer", 'String'>
    readonly comment: FieldRef<"WireguardPeer", 'String'>
    readonly createdAt: FieldRef<"WireguardPeer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WireguardPeer findUnique
   */
  export type WireguardPeerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * Filter, which WireguardPeer to fetch.
     */
    where: WireguardPeerWhereUniqueInput
  }

  /**
   * WireguardPeer findUniqueOrThrow
   */
  export type WireguardPeerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * Filter, which WireguardPeer to fetch.
     */
    where: WireguardPeerWhereUniqueInput
  }

  /**
   * WireguardPeer findFirst
   */
  export type WireguardPeerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * Filter, which WireguardPeer to fetch.
     */
    where?: WireguardPeerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WireguardPeers to fetch.
     */
    orderBy?: WireguardPeerOrderByWithRelationInput | WireguardPeerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WireguardPeers.
     */
    cursor?: WireguardPeerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WireguardPeers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WireguardPeers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WireguardPeers.
     */
    distinct?: WireguardPeerScalarFieldEnum | WireguardPeerScalarFieldEnum[]
  }

  /**
   * WireguardPeer findFirstOrThrow
   */
  export type WireguardPeerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * Filter, which WireguardPeer to fetch.
     */
    where?: WireguardPeerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WireguardPeers to fetch.
     */
    orderBy?: WireguardPeerOrderByWithRelationInput | WireguardPeerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WireguardPeers.
     */
    cursor?: WireguardPeerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WireguardPeers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WireguardPeers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WireguardPeers.
     */
    distinct?: WireguardPeerScalarFieldEnum | WireguardPeerScalarFieldEnum[]
  }

  /**
   * WireguardPeer findMany
   */
  export type WireguardPeerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * Filter, which WireguardPeers to fetch.
     */
    where?: WireguardPeerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WireguardPeers to fetch.
     */
    orderBy?: WireguardPeerOrderByWithRelationInput | WireguardPeerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WireguardPeers.
     */
    cursor?: WireguardPeerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WireguardPeers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WireguardPeers.
     */
    skip?: number
    distinct?: WireguardPeerScalarFieldEnum | WireguardPeerScalarFieldEnum[]
  }

  /**
   * WireguardPeer create
   */
  export type WireguardPeerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * The data needed to create a WireguardPeer.
     */
    data: XOR<WireguardPeerCreateInput, WireguardPeerUncheckedCreateInput>
  }

  /**
   * WireguardPeer createMany
   */
  export type WireguardPeerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WireguardPeers.
     */
    data: WireguardPeerCreateManyInput | WireguardPeerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WireguardPeer update
   */
  export type WireguardPeerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * The data needed to update a WireguardPeer.
     */
    data: XOR<WireguardPeerUpdateInput, WireguardPeerUncheckedUpdateInput>
    /**
     * Choose, which WireguardPeer to update.
     */
    where: WireguardPeerWhereUniqueInput
  }

  /**
   * WireguardPeer updateMany
   */
  export type WireguardPeerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WireguardPeers.
     */
    data: XOR<WireguardPeerUpdateManyMutationInput, WireguardPeerUncheckedUpdateManyInput>
    /**
     * Filter which WireguardPeers to update
     */
    where?: WireguardPeerWhereInput
    /**
     * Limit how many WireguardPeers to update.
     */
    limit?: number
  }

  /**
   * WireguardPeer upsert
   */
  export type WireguardPeerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * The filter to search for the WireguardPeer to update in case it exists.
     */
    where: WireguardPeerWhereUniqueInput
    /**
     * In case the WireguardPeer found by the `where` argument doesn't exist, create a new WireguardPeer with this data.
     */
    create: XOR<WireguardPeerCreateInput, WireguardPeerUncheckedCreateInput>
    /**
     * In case the WireguardPeer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WireguardPeerUpdateInput, WireguardPeerUncheckedUpdateInput>
  }

  /**
   * WireguardPeer delete
   */
  export type WireguardPeerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
    /**
     * Filter which WireguardPeer to delete.
     */
    where: WireguardPeerWhereUniqueInput
  }

  /**
   * WireguardPeer deleteMany
   */
  export type WireguardPeerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WireguardPeers to delete
     */
    where?: WireguardPeerWhereInput
    /**
     * Limit how many WireguardPeers to delete.
     */
    limit?: number
  }

  /**
   * WireguardPeer without action
   */
  export type WireguardPeerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WireguardPeer
     */
    select?: WireguardPeerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WireguardPeer
     */
    omit?: WireguardPeerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WireguardPeerInclude<ExtArgs> | null
  }


  /**
   * Model Wifi
   */

  export type AggregateWifi = {
    _count: WifiCountAggregateOutputType | null
    _avg: WifiAvgAggregateOutputType | null
    _sum: WifiSumAggregateOutputType | null
    _min: WifiMinAggregateOutputType | null
    _max: WifiMaxAggregateOutputType | null
  }

  export type WifiAvgAggregateOutputType = {
    id: number | null
  }

  export type WifiSumAggregateOutputType = {
    id: number | null
  }

  export type WifiMinAggregateOutputType = {
    id: number | null
    ssid: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WifiMaxAggregateOutputType = {
    id: number | null
    ssid: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WifiCountAggregateOutputType = {
    id: number
    ssid: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WifiAvgAggregateInputType = {
    id?: true
  }

  export type WifiSumAggregateInputType = {
    id?: true
  }

  export type WifiMinAggregateInputType = {
    id?: true
    ssid?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WifiMaxAggregateInputType = {
    id?: true
    ssid?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WifiCountAggregateInputType = {
    id?: true
    ssid?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WifiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wifi to aggregate.
     */
    where?: WifiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wifis to fetch.
     */
    orderBy?: WifiOrderByWithRelationInput | WifiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WifiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wifis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wifis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wifis
    **/
    _count?: true | WifiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WifiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WifiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WifiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WifiMaxAggregateInputType
  }

  export type GetWifiAggregateType<T extends WifiAggregateArgs> = {
        [P in keyof T & keyof AggregateWifi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWifi[P]>
      : GetScalarType<T[P], AggregateWifi[P]>
  }




  export type WifiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WifiWhereInput
    orderBy?: WifiOrderByWithAggregationInput | WifiOrderByWithAggregationInput[]
    by: WifiScalarFieldEnum[] | WifiScalarFieldEnum
    having?: WifiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WifiCountAggregateInputType | true
    _avg?: WifiAvgAggregateInputType
    _sum?: WifiSumAggregateInputType
    _min?: WifiMinAggregateInputType
    _max?: WifiMaxAggregateInputType
  }

  export type WifiGroupByOutputType = {
    id: number
    ssid: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: WifiCountAggregateOutputType | null
    _avg: WifiAvgAggregateOutputType | null
    _sum: WifiSumAggregateOutputType | null
    _min: WifiMinAggregateOutputType | null
    _max: WifiMaxAggregateOutputType | null
  }

  type GetWifiGroupByPayload<T extends WifiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WifiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WifiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WifiGroupByOutputType[P]>
            : GetScalarType<T[P], WifiGroupByOutputType[P]>
        }
      >
    >


  export type WifiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ssid?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wifi"]>



  export type WifiSelectScalar = {
    id?: boolean
    ssid?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WifiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ssid" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["wifi"]>

  export type $WifiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wifi"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ssid: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wifi"]>
    composites: {}
  }

  type WifiGetPayload<S extends boolean | null | undefined | WifiDefaultArgs> = $Result.GetResult<Prisma.$WifiPayload, S>

  type WifiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WifiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WifiCountAggregateInputType | true
    }

  export interface WifiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wifi'], meta: { name: 'Wifi' } }
    /**
     * Find zero or one Wifi that matches the filter.
     * @param {WifiFindUniqueArgs} args - Arguments to find a Wifi
     * @example
     * // Get one Wifi
     * const wifi = await prisma.wifi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WifiFindUniqueArgs>(args: SelectSubset<T, WifiFindUniqueArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wifi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WifiFindUniqueOrThrowArgs} args - Arguments to find a Wifi
     * @example
     * // Get one Wifi
     * const wifi = await prisma.wifi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WifiFindUniqueOrThrowArgs>(args: SelectSubset<T, WifiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wifi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WifiFindFirstArgs} args - Arguments to find a Wifi
     * @example
     * // Get one Wifi
     * const wifi = await prisma.wifi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WifiFindFirstArgs>(args?: SelectSubset<T, WifiFindFirstArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wifi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WifiFindFirstOrThrowArgs} args - Arguments to find a Wifi
     * @example
     * // Get one Wifi
     * const wifi = await prisma.wifi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WifiFindFirstOrThrowArgs>(args?: SelectSubset<T, WifiFindFirstOrThrowArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wifis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WifiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wifis
     * const wifis = await prisma.wifi.findMany()
     * 
     * // Get first 10 Wifis
     * const wifis = await prisma.wifi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wifiWithIdOnly = await prisma.wifi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WifiFindManyArgs>(args?: SelectSubset<T, WifiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wifi.
     * @param {WifiCreateArgs} args - Arguments to create a Wifi.
     * @example
     * // Create one Wifi
     * const Wifi = await prisma.wifi.create({
     *   data: {
     *     // ... data to create a Wifi
     *   }
     * })
     * 
     */
    create<T extends WifiCreateArgs>(args: SelectSubset<T, WifiCreateArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wifis.
     * @param {WifiCreateManyArgs} args - Arguments to create many Wifis.
     * @example
     * // Create many Wifis
     * const wifi = await prisma.wifi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WifiCreateManyArgs>(args?: SelectSubset<T, WifiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Wifi.
     * @param {WifiDeleteArgs} args - Arguments to delete one Wifi.
     * @example
     * // Delete one Wifi
     * const Wifi = await prisma.wifi.delete({
     *   where: {
     *     // ... filter to delete one Wifi
     *   }
     * })
     * 
     */
    delete<T extends WifiDeleteArgs>(args: SelectSubset<T, WifiDeleteArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wifi.
     * @param {WifiUpdateArgs} args - Arguments to update one Wifi.
     * @example
     * // Update one Wifi
     * const wifi = await prisma.wifi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WifiUpdateArgs>(args: SelectSubset<T, WifiUpdateArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wifis.
     * @param {WifiDeleteManyArgs} args - Arguments to filter Wifis to delete.
     * @example
     * // Delete a few Wifis
     * const { count } = await prisma.wifi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WifiDeleteManyArgs>(args?: SelectSubset<T, WifiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wifis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WifiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wifis
     * const wifi = await prisma.wifi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WifiUpdateManyArgs>(args: SelectSubset<T, WifiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Wifi.
     * @param {WifiUpsertArgs} args - Arguments to update or create a Wifi.
     * @example
     * // Update or create a Wifi
     * const wifi = await prisma.wifi.upsert({
     *   create: {
     *     // ... data to create a Wifi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wifi we want to update
     *   }
     * })
     */
    upsert<T extends WifiUpsertArgs>(args: SelectSubset<T, WifiUpsertArgs<ExtArgs>>): Prisma__WifiClient<$Result.GetResult<Prisma.$WifiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wifis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WifiCountArgs} args - Arguments to filter Wifis to count.
     * @example
     * // Count the number of Wifis
     * const count = await prisma.wifi.count({
     *   where: {
     *     // ... the filter for the Wifis we want to count
     *   }
     * })
    **/
    count<T extends WifiCountArgs>(
      args?: Subset<T, WifiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WifiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wifi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WifiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WifiAggregateArgs>(args: Subset<T, WifiAggregateArgs>): Prisma.PrismaPromise<GetWifiAggregateType<T>>

    /**
     * Group by Wifi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WifiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WifiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WifiGroupByArgs['orderBy'] }
        : { orderBy?: WifiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WifiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWifiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wifi model
   */
  readonly fields: WifiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wifi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WifiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wifi model
   */
  interface WifiFieldRefs {
    readonly id: FieldRef<"Wifi", 'Int'>
    readonly ssid: FieldRef<"Wifi", 'String'>
    readonly password: FieldRef<"Wifi", 'String'>
    readonly createdAt: FieldRef<"Wifi", 'DateTime'>
    readonly updatedAt: FieldRef<"Wifi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wifi findUnique
   */
  export type WifiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * Filter, which Wifi to fetch.
     */
    where: WifiWhereUniqueInput
  }

  /**
   * Wifi findUniqueOrThrow
   */
  export type WifiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * Filter, which Wifi to fetch.
     */
    where: WifiWhereUniqueInput
  }

  /**
   * Wifi findFirst
   */
  export type WifiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * Filter, which Wifi to fetch.
     */
    where?: WifiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wifis to fetch.
     */
    orderBy?: WifiOrderByWithRelationInput | WifiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wifis.
     */
    cursor?: WifiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wifis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wifis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wifis.
     */
    distinct?: WifiScalarFieldEnum | WifiScalarFieldEnum[]
  }

  /**
   * Wifi findFirstOrThrow
   */
  export type WifiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * Filter, which Wifi to fetch.
     */
    where?: WifiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wifis to fetch.
     */
    orderBy?: WifiOrderByWithRelationInput | WifiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wifis.
     */
    cursor?: WifiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wifis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wifis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wifis.
     */
    distinct?: WifiScalarFieldEnum | WifiScalarFieldEnum[]
  }

  /**
   * Wifi findMany
   */
  export type WifiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * Filter, which Wifis to fetch.
     */
    where?: WifiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wifis to fetch.
     */
    orderBy?: WifiOrderByWithRelationInput | WifiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wifis.
     */
    cursor?: WifiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wifis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wifis.
     */
    skip?: number
    distinct?: WifiScalarFieldEnum | WifiScalarFieldEnum[]
  }

  /**
   * Wifi create
   */
  export type WifiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * The data needed to create a Wifi.
     */
    data: XOR<WifiCreateInput, WifiUncheckedCreateInput>
  }

  /**
   * Wifi createMany
   */
  export type WifiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wifis.
     */
    data: WifiCreateManyInput | WifiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wifi update
   */
  export type WifiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * The data needed to update a Wifi.
     */
    data: XOR<WifiUpdateInput, WifiUncheckedUpdateInput>
    /**
     * Choose, which Wifi to update.
     */
    where: WifiWhereUniqueInput
  }

  /**
   * Wifi updateMany
   */
  export type WifiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wifis.
     */
    data: XOR<WifiUpdateManyMutationInput, WifiUncheckedUpdateManyInput>
    /**
     * Filter which Wifis to update
     */
    where?: WifiWhereInput
    /**
     * Limit how many Wifis to update.
     */
    limit?: number
  }

  /**
   * Wifi upsert
   */
  export type WifiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * The filter to search for the Wifi to update in case it exists.
     */
    where: WifiWhereUniqueInput
    /**
     * In case the Wifi found by the `where` argument doesn't exist, create a new Wifi with this data.
     */
    create: XOR<WifiCreateInput, WifiUncheckedCreateInput>
    /**
     * In case the Wifi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WifiUpdateInput, WifiUncheckedUpdateInput>
  }

  /**
   * Wifi delete
   */
  export type WifiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
    /**
     * Filter which Wifi to delete.
     */
    where: WifiWhereUniqueInput
  }

  /**
   * Wifi deleteMany
   */
  export type WifiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wifis to delete
     */
    where?: WifiWhereInput
    /**
     * Limit how many Wifis to delete.
     */
    limit?: number
  }

  /**
   * Wifi without action
   */
  export type WifiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wifi
     */
    select?: WifiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wifi
     */
    omit?: WifiOmit<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    timestamp: Date | null
    adminUser: string | null
    action: string | null
    targetType: string | null
    targetName: string | null
    details: string | null
    ipAddress: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    timestamp: Date | null
    adminUser: string | null
    action: string | null
    targetType: string | null
    targetName: string | null
    details: string | null
    ipAddress: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    timestamp: number
    adminUser: number
    action: number
    targetType: number
    targetName: number
    details: number
    ipAddress: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    timestamp?: true
    adminUser?: true
    action?: true
    targetType?: true
    targetName?: true
    details?: true
    ipAddress?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    timestamp?: true
    adminUser?: true
    action?: true
    targetType?: true
    targetName?: true
    details?: true
    ipAddress?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    timestamp?: true
    adminUser?: true
    action?: true
    targetType?: true
    targetName?: true
    details?: true
    ipAddress?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    timestamp: Date
    adminUser: string
    action: string
    targetType: string
    targetName: string | null
    details: string | null
    ipAddress: string | null
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    adminUser?: boolean
    action?: boolean
    targetType?: boolean
    targetName?: boolean
    details?: boolean
    ipAddress?: boolean
  }, ExtArgs["result"]["auditLog"]>



  export type AuditLogSelectScalar = {
    id?: boolean
    timestamp?: boolean
    adminUser?: boolean
    action?: boolean
    targetType?: boolean
    targetName?: boolean
    details?: boolean
    ipAddress?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timestamp" | "adminUser" | "action" | "targetType" | "targetName" | "details" | "ipAddress", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      timestamp: Date
      adminUser: string
      action: string
      targetType: string
      targetName: string | null
      details: string | null
      ipAddress: string | null
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
    readonly adminUser: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly targetType: FieldRef<"AuditLog", 'String'>
    readonly targetName: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const NasScalarFieldEnum: {
    id: 'id',
    nasname: 'nasname',
    shortname: 'shortname',
    type: 'type',
    ports: 'ports',
    secret: 'secret',
    server: 'server',
    community: 'community',
    description: 'description'
  };

  export type NasScalarFieldEnum = (typeof NasScalarFieldEnum)[keyof typeof NasScalarFieldEnum]


  export const NasreloadScalarFieldEnum: {
    nasipaddress: 'nasipaddress',
    reloadtime: 'reloadtime'
  };

  export type NasreloadScalarFieldEnum = (typeof NasreloadScalarFieldEnum)[keyof typeof NasreloadScalarFieldEnum]


  export const RadacctScalarFieldEnum: {
    radacctid: 'radacctid',
    acctsessionid: 'acctsessionid',
    acctuniqueid: 'acctuniqueid',
    username: 'username',
    realm: 'realm',
    nasipaddress: 'nasipaddress',
    nasportid: 'nasportid',
    nasporttype: 'nasporttype',
    acctstarttime: 'acctstarttime',
    acctupdatetime: 'acctupdatetime',
    acctstoptime: 'acctstoptime',
    acctinterval: 'acctinterval',
    acctsessiontime: 'acctsessiontime',
    acctauthentic: 'acctauthentic',
    connectinfo_start: 'connectinfo_start',
    connectinfo_stop: 'connectinfo_stop',
    acctinputoctets: 'acctinputoctets',
    acctoutputoctets: 'acctoutputoctets',
    calledstationid: 'calledstationid',
    callingstationid: 'callingstationid',
    acctterminatecause: 'acctterminatecause',
    servicetype: 'servicetype',
    framedprotocol: 'framedprotocol',
    framedipaddress: 'framedipaddress',
    framedipv6address: 'framedipv6address',
    framedipv6prefix: 'framedipv6prefix',
    framedinterfaceid: 'framedinterfaceid',
    delegatedipv6prefix: 'delegatedipv6prefix',
    class: 'class'
  };

  export type RadacctScalarFieldEnum = (typeof RadacctScalarFieldEnum)[keyof typeof RadacctScalarFieldEnum]


  export const RadcheckScalarFieldEnum: {
    id: 'id',
    username: 'username',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type RadcheckScalarFieldEnum = (typeof RadcheckScalarFieldEnum)[keyof typeof RadcheckScalarFieldEnum]


  export const RadgroupcheckScalarFieldEnum: {
    id: 'id',
    groupname: 'groupname',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type RadgroupcheckScalarFieldEnum = (typeof RadgroupcheckScalarFieldEnum)[keyof typeof RadgroupcheckScalarFieldEnum]


  export const RadgroupreplyScalarFieldEnum: {
    id: 'id',
    groupname: 'groupname',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type RadgroupreplyScalarFieldEnum = (typeof RadgroupreplyScalarFieldEnum)[keyof typeof RadgroupreplyScalarFieldEnum]


  export const RadpostauthScalarFieldEnum: {
    id: 'id',
    username: 'username',
    pass: 'pass',
    reply: 'reply',
    authdate: 'authdate',
    class: 'class'
  };

  export type RadpostauthScalarFieldEnum = (typeof RadpostauthScalarFieldEnum)[keyof typeof RadpostauthScalarFieldEnum]


  export const RadreplyScalarFieldEnum: {
    id: 'id',
    username: 'username',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type RadreplyScalarFieldEnum = (typeof RadreplyScalarFieldEnum)[keyof typeof RadreplyScalarFieldEnum]


  export const RadusergroupScalarFieldEnum: {
    id: 'id',
    username: 'username',
    groupname: 'groupname',
    priority: 'priority'
  };

  export type RadusergroupScalarFieldEnum = (typeof RadusergroupScalarFieldEnum)[keyof typeof RadusergroupScalarFieldEnum]


  export const UserinfoScalarFieldEnum: {
    id: 'id',
    username: 'username',
    type: 'type',
    fullName: 'fullName',
    department: 'department',
    createdBy: 'createdBy',
    status: 'status'
  };

  export type UserinfoScalarFieldEnum = (typeof UserinfoScalarFieldEnum)[keyof typeof UserinfoScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const GroupMetadataScalarFieldEnum: {
    groupname: 'groupname',
    type: 'type',
    description: 'description'
  };

  export type GroupMetadataScalarFieldEnum = (typeof GroupMetadataScalarFieldEnum)[keyof typeof GroupMetadataScalarFieldEnum]


  export const RadiusPoolScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type RadiusPoolScalarFieldEnum = (typeof RadiusPoolScalarFieldEnum)[keyof typeof RadiusPoolScalarFieldEnum]


  export const RadippoolScalarFieldEnum: {
    id: 'id',
    pool_name: 'pool_name',
    framedipaddress: 'framedipaddress',
    nasipaddress: 'nasipaddress',
    calledstationid: 'calledstationid',
    callingstationid: 'callingstationid',
    expiry_time: 'expiry_time',
    username: 'username',
    pool_key: 'pool_key'
  };

  export type RadippoolScalarFieldEnum = (typeof RadippoolScalarFieldEnum)[keyof typeof RadippoolScalarFieldEnum]


  export const MikrotikConfigScalarFieldEnum: {
    id: 'id',
    name: 'name',
    host: 'host',
    port: 'port',
    username: 'username',
    password: 'password',
    useSsl: 'useSsl',
    wgPublicHost: 'wgPublicHost',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MikrotikConfigScalarFieldEnum = (typeof MikrotikConfigScalarFieldEnum)[keyof typeof MikrotikConfigScalarFieldEnum]


  export const WireguardPeerScalarFieldEnum: {
    id: 'id',
    mikrotikId: 'mikrotikId',
    mikrotikPeerId: 'mikrotikPeerId',
    name: 'name',
    publicKey: 'publicKey',
    privateKey: 'privateKey',
    allowedIps: 'allowedIps',
    interface: 'interface',
    listenPort: 'listenPort',
    endpoint: 'endpoint',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type WireguardPeerScalarFieldEnum = (typeof WireguardPeerScalarFieldEnum)[keyof typeof WireguardPeerScalarFieldEnum]


  export const WifiScalarFieldEnum: {
    id: 'id',
    ssid: 'ssid',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WifiScalarFieldEnum = (typeof WifiScalarFieldEnum)[keyof typeof WifiScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    timestamp: 'timestamp',
    adminUser: 'adminUser',
    action: 'action',
    targetType: 'targetType',
    targetName: 'targetName',
    details: 'details',
    ipAddress: 'ipAddress'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const nasOrderByRelevanceFieldEnum: {
    nasname: 'nasname',
    shortname: 'shortname',
    type: 'type',
    secret: 'secret',
    server: 'server',
    community: 'community',
    description: 'description'
  };

  export type nasOrderByRelevanceFieldEnum = (typeof nasOrderByRelevanceFieldEnum)[keyof typeof nasOrderByRelevanceFieldEnum]


  export const nasreloadOrderByRelevanceFieldEnum: {
    nasipaddress: 'nasipaddress'
  };

  export type nasreloadOrderByRelevanceFieldEnum = (typeof nasreloadOrderByRelevanceFieldEnum)[keyof typeof nasreloadOrderByRelevanceFieldEnum]


  export const radacctOrderByRelevanceFieldEnum: {
    acctsessionid: 'acctsessionid',
    acctuniqueid: 'acctuniqueid',
    username: 'username',
    realm: 'realm',
    nasipaddress: 'nasipaddress',
    nasportid: 'nasportid',
    nasporttype: 'nasporttype',
    acctauthentic: 'acctauthentic',
    connectinfo_start: 'connectinfo_start',
    connectinfo_stop: 'connectinfo_stop',
    calledstationid: 'calledstationid',
    callingstationid: 'callingstationid',
    acctterminatecause: 'acctterminatecause',
    servicetype: 'servicetype',
    framedprotocol: 'framedprotocol',
    framedipaddress: 'framedipaddress',
    framedipv6address: 'framedipv6address',
    framedipv6prefix: 'framedipv6prefix',
    framedinterfaceid: 'framedinterfaceid',
    delegatedipv6prefix: 'delegatedipv6prefix',
    class: 'class'
  };

  export type radacctOrderByRelevanceFieldEnum = (typeof radacctOrderByRelevanceFieldEnum)[keyof typeof radacctOrderByRelevanceFieldEnum]


  export const radcheckOrderByRelevanceFieldEnum: {
    username: 'username',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type radcheckOrderByRelevanceFieldEnum = (typeof radcheckOrderByRelevanceFieldEnum)[keyof typeof radcheckOrderByRelevanceFieldEnum]


  export const radgroupcheckOrderByRelevanceFieldEnum: {
    groupname: 'groupname',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type radgroupcheckOrderByRelevanceFieldEnum = (typeof radgroupcheckOrderByRelevanceFieldEnum)[keyof typeof radgroupcheckOrderByRelevanceFieldEnum]


  export const radgroupreplyOrderByRelevanceFieldEnum: {
    groupname: 'groupname',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type radgroupreplyOrderByRelevanceFieldEnum = (typeof radgroupreplyOrderByRelevanceFieldEnum)[keyof typeof radgroupreplyOrderByRelevanceFieldEnum]


  export const radpostauthOrderByRelevanceFieldEnum: {
    username: 'username',
    pass: 'pass',
    reply: 'reply',
    class: 'class'
  };

  export type radpostauthOrderByRelevanceFieldEnum = (typeof radpostauthOrderByRelevanceFieldEnum)[keyof typeof radpostauthOrderByRelevanceFieldEnum]


  export const radreplyOrderByRelevanceFieldEnum: {
    username: 'username',
    attribute: 'attribute',
    op: 'op',
    value: 'value'
  };

  export type radreplyOrderByRelevanceFieldEnum = (typeof radreplyOrderByRelevanceFieldEnum)[keyof typeof radreplyOrderByRelevanceFieldEnum]


  export const radusergroupOrderByRelevanceFieldEnum: {
    username: 'username',
    groupname: 'groupname'
  };

  export type radusergroupOrderByRelevanceFieldEnum = (typeof radusergroupOrderByRelevanceFieldEnum)[keyof typeof radusergroupOrderByRelevanceFieldEnum]


  export const userinfoOrderByRelevanceFieldEnum: {
    username: 'username',
    type: 'type',
    fullName: 'fullName',
    department: 'department',
    createdBy: 'createdBy',
    status: 'status'
  };

  export type userinfoOrderByRelevanceFieldEnum = (typeof userinfoOrderByRelevanceFieldEnum)[keyof typeof userinfoOrderByRelevanceFieldEnum]


  export const adminOrderByRelevanceFieldEnum: {
    username: 'username',
    password: 'password',
    role: 'role'
  };

  export type adminOrderByRelevanceFieldEnum = (typeof adminOrderByRelevanceFieldEnum)[keyof typeof adminOrderByRelevanceFieldEnum]


  export const GroupMetadataOrderByRelevanceFieldEnum: {
    groupname: 'groupname',
    type: 'type',
    description: 'description'
  };

  export type GroupMetadataOrderByRelevanceFieldEnum = (typeof GroupMetadataOrderByRelevanceFieldEnum)[keyof typeof GroupMetadataOrderByRelevanceFieldEnum]


  export const RadiusPoolOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type RadiusPoolOrderByRelevanceFieldEnum = (typeof RadiusPoolOrderByRelevanceFieldEnum)[keyof typeof RadiusPoolOrderByRelevanceFieldEnum]


  export const radippoolOrderByRelevanceFieldEnum: {
    pool_name: 'pool_name',
    framedipaddress: 'framedipaddress',
    nasipaddress: 'nasipaddress',
    calledstationid: 'calledstationid',
    callingstationid: 'callingstationid',
    username: 'username',
    pool_key: 'pool_key'
  };

  export type radippoolOrderByRelevanceFieldEnum = (typeof radippoolOrderByRelevanceFieldEnum)[keyof typeof radippoolOrderByRelevanceFieldEnum]


  export const MikrotikConfigOrderByRelevanceFieldEnum: {
    name: 'name',
    host: 'host',
    username: 'username',
    password: 'password',
    wgPublicHost: 'wgPublicHost'
  };

  export type MikrotikConfigOrderByRelevanceFieldEnum = (typeof MikrotikConfigOrderByRelevanceFieldEnum)[keyof typeof MikrotikConfigOrderByRelevanceFieldEnum]


  export const WireguardPeerOrderByRelevanceFieldEnum: {
    mikrotikPeerId: 'mikrotikPeerId',
    name: 'name',
    publicKey: 'publicKey',
    privateKey: 'privateKey',
    allowedIps: 'allowedIps',
    interface: 'interface',
    endpoint: 'endpoint',
    comment: 'comment'
  };

  export type WireguardPeerOrderByRelevanceFieldEnum = (typeof WireguardPeerOrderByRelevanceFieldEnum)[keyof typeof WireguardPeerOrderByRelevanceFieldEnum]


  export const WifiOrderByRelevanceFieldEnum: {
    ssid: 'ssid',
    password: 'password'
  };

  export type WifiOrderByRelevanceFieldEnum = (typeof WifiOrderByRelevanceFieldEnum)[keyof typeof WifiOrderByRelevanceFieldEnum]


  export const AuditLogOrderByRelevanceFieldEnum: {
    adminUser: 'adminUser',
    action: 'action',
    targetType: 'targetType',
    targetName: 'targetName',
    details: 'details',
    ipAddress: 'ipAddress'
  };

  export type AuditLogOrderByRelevanceFieldEnum = (typeof AuditLogOrderByRelevanceFieldEnum)[keyof typeof AuditLogOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type nasWhereInput = {
    AND?: nasWhereInput | nasWhereInput[]
    OR?: nasWhereInput[]
    NOT?: nasWhereInput | nasWhereInput[]
    id?: IntFilter<"nas"> | number
    nasname?: StringFilter<"nas"> | string
    shortname?: StringNullableFilter<"nas"> | string | null
    type?: StringNullableFilter<"nas"> | string | null
    ports?: IntNullableFilter<"nas"> | number | null
    secret?: StringFilter<"nas"> | string
    server?: StringNullableFilter<"nas"> | string | null
    community?: StringNullableFilter<"nas"> | string | null
    description?: StringNullableFilter<"nas"> | string | null
  }

  export type nasOrderByWithRelationInput = {
    id?: SortOrder
    nasname?: SortOrder
    shortname?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    ports?: SortOrderInput | SortOrder
    secret?: SortOrder
    server?: SortOrderInput | SortOrder
    community?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _relevance?: nasOrderByRelevanceInput
  }

  export type nasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: nasWhereInput | nasWhereInput[]
    OR?: nasWhereInput[]
    NOT?: nasWhereInput | nasWhereInput[]
    nasname?: StringFilter<"nas"> | string
    shortname?: StringNullableFilter<"nas"> | string | null
    type?: StringNullableFilter<"nas"> | string | null
    ports?: IntNullableFilter<"nas"> | number | null
    secret?: StringFilter<"nas"> | string
    server?: StringNullableFilter<"nas"> | string | null
    community?: StringNullableFilter<"nas"> | string | null
    description?: StringNullableFilter<"nas"> | string | null
  }, "id">

  export type nasOrderByWithAggregationInput = {
    id?: SortOrder
    nasname?: SortOrder
    shortname?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    ports?: SortOrderInput | SortOrder
    secret?: SortOrder
    server?: SortOrderInput | SortOrder
    community?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: nasCountOrderByAggregateInput
    _avg?: nasAvgOrderByAggregateInput
    _max?: nasMaxOrderByAggregateInput
    _min?: nasMinOrderByAggregateInput
    _sum?: nasSumOrderByAggregateInput
  }

  export type nasScalarWhereWithAggregatesInput = {
    AND?: nasScalarWhereWithAggregatesInput | nasScalarWhereWithAggregatesInput[]
    OR?: nasScalarWhereWithAggregatesInput[]
    NOT?: nasScalarWhereWithAggregatesInput | nasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"nas"> | number
    nasname?: StringWithAggregatesFilter<"nas"> | string
    shortname?: StringNullableWithAggregatesFilter<"nas"> | string | null
    type?: StringNullableWithAggregatesFilter<"nas"> | string | null
    ports?: IntNullableWithAggregatesFilter<"nas"> | number | null
    secret?: StringWithAggregatesFilter<"nas"> | string
    server?: StringNullableWithAggregatesFilter<"nas"> | string | null
    community?: StringNullableWithAggregatesFilter<"nas"> | string | null
    description?: StringNullableWithAggregatesFilter<"nas"> | string | null
  }

  export type nasreloadWhereInput = {
    AND?: nasreloadWhereInput | nasreloadWhereInput[]
    OR?: nasreloadWhereInput[]
    NOT?: nasreloadWhereInput | nasreloadWhereInput[]
    nasipaddress?: StringFilter<"nasreload"> | string
    reloadtime?: DateTimeFilter<"nasreload"> | Date | string
  }

  export type nasreloadOrderByWithRelationInput = {
    nasipaddress?: SortOrder
    reloadtime?: SortOrder
    _relevance?: nasreloadOrderByRelevanceInput
  }

  export type nasreloadWhereUniqueInput = Prisma.AtLeast<{
    nasipaddress?: string
    AND?: nasreloadWhereInput | nasreloadWhereInput[]
    OR?: nasreloadWhereInput[]
    NOT?: nasreloadWhereInput | nasreloadWhereInput[]
    reloadtime?: DateTimeFilter<"nasreload"> | Date | string
  }, "nasipaddress">

  export type nasreloadOrderByWithAggregationInput = {
    nasipaddress?: SortOrder
    reloadtime?: SortOrder
    _count?: nasreloadCountOrderByAggregateInput
    _max?: nasreloadMaxOrderByAggregateInput
    _min?: nasreloadMinOrderByAggregateInput
  }

  export type nasreloadScalarWhereWithAggregatesInput = {
    AND?: nasreloadScalarWhereWithAggregatesInput | nasreloadScalarWhereWithAggregatesInput[]
    OR?: nasreloadScalarWhereWithAggregatesInput[]
    NOT?: nasreloadScalarWhereWithAggregatesInput | nasreloadScalarWhereWithAggregatesInput[]
    nasipaddress?: StringWithAggregatesFilter<"nasreload"> | string
    reloadtime?: DateTimeWithAggregatesFilter<"nasreload"> | Date | string
  }

  export type radacctWhereInput = {
    AND?: radacctWhereInput | radacctWhereInput[]
    OR?: radacctWhereInput[]
    NOT?: radacctWhereInput | radacctWhereInput[]
    radacctid?: BigIntFilter<"radacct"> | bigint | number
    acctsessionid?: StringFilter<"radacct"> | string
    acctuniqueid?: StringFilter<"radacct"> | string
    username?: StringFilter<"radacct"> | string
    realm?: StringNullableFilter<"radacct"> | string | null
    nasipaddress?: StringFilter<"radacct"> | string
    nasportid?: StringNullableFilter<"radacct"> | string | null
    nasporttype?: StringNullableFilter<"radacct"> | string | null
    acctstarttime?: DateTimeNullableFilter<"radacct"> | Date | string | null
    acctupdatetime?: DateTimeNullableFilter<"radacct"> | Date | string | null
    acctstoptime?: DateTimeNullableFilter<"radacct"> | Date | string | null
    acctinterval?: IntNullableFilter<"radacct"> | number | null
    acctsessiontime?: IntNullableFilter<"radacct"> | number | null
    acctauthentic?: StringNullableFilter<"radacct"> | string | null
    connectinfo_start?: StringNullableFilter<"radacct"> | string | null
    connectinfo_stop?: StringNullableFilter<"radacct"> | string | null
    acctinputoctets?: BigIntNullableFilter<"radacct"> | bigint | number | null
    acctoutputoctets?: BigIntNullableFilter<"radacct"> | bigint | number | null
    calledstationid?: StringFilter<"radacct"> | string
    callingstationid?: StringFilter<"radacct"> | string
    acctterminatecause?: StringFilter<"radacct"> | string
    servicetype?: StringNullableFilter<"radacct"> | string | null
    framedprotocol?: StringNullableFilter<"radacct"> | string | null
    framedipaddress?: StringFilter<"radacct"> | string
    framedipv6address?: StringFilter<"radacct"> | string
    framedipv6prefix?: StringFilter<"radacct"> | string
    framedinterfaceid?: StringFilter<"radacct"> | string
    delegatedipv6prefix?: StringFilter<"radacct"> | string
    class?: StringNullableFilter<"radacct"> | string | null
  }

  export type radacctOrderByWithRelationInput = {
    radacctid?: SortOrder
    acctsessionid?: SortOrder
    acctuniqueid?: SortOrder
    username?: SortOrder
    realm?: SortOrderInput | SortOrder
    nasipaddress?: SortOrder
    nasportid?: SortOrderInput | SortOrder
    nasporttype?: SortOrderInput | SortOrder
    acctstarttime?: SortOrderInput | SortOrder
    acctupdatetime?: SortOrderInput | SortOrder
    acctstoptime?: SortOrderInput | SortOrder
    acctinterval?: SortOrderInput | SortOrder
    acctsessiontime?: SortOrderInput | SortOrder
    acctauthentic?: SortOrderInput | SortOrder
    connectinfo_start?: SortOrderInput | SortOrder
    connectinfo_stop?: SortOrderInput | SortOrder
    acctinputoctets?: SortOrderInput | SortOrder
    acctoutputoctets?: SortOrderInput | SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    acctterminatecause?: SortOrder
    servicetype?: SortOrderInput | SortOrder
    framedprotocol?: SortOrderInput | SortOrder
    framedipaddress?: SortOrder
    framedipv6address?: SortOrder
    framedipv6prefix?: SortOrder
    framedinterfaceid?: SortOrder
    delegatedipv6prefix?: SortOrder
    class?: SortOrderInput | SortOrder
    _relevance?: radacctOrderByRelevanceInput
  }

  export type radacctWhereUniqueInput = Prisma.AtLeast<{
    radacctid?: bigint | number
    acctuniqueid?: string
    AND?: radacctWhereInput | radacctWhereInput[]
    OR?: radacctWhereInput[]
    NOT?: radacctWhereInput | radacctWhereInput[]
    acctsessionid?: StringFilter<"radacct"> | string
    username?: StringFilter<"radacct"> | string
    realm?: StringNullableFilter<"radacct"> | string | null
    nasipaddress?: StringFilter<"radacct"> | string
    nasportid?: StringNullableFilter<"radacct"> | string | null
    nasporttype?: StringNullableFilter<"radacct"> | string | null
    acctstarttime?: DateTimeNullableFilter<"radacct"> | Date | string | null
    acctupdatetime?: DateTimeNullableFilter<"radacct"> | Date | string | null
    acctstoptime?: DateTimeNullableFilter<"radacct"> | Date | string | null
    acctinterval?: IntNullableFilter<"radacct"> | number | null
    acctsessiontime?: IntNullableFilter<"radacct"> | number | null
    acctauthentic?: StringNullableFilter<"radacct"> | string | null
    connectinfo_start?: StringNullableFilter<"radacct"> | string | null
    connectinfo_stop?: StringNullableFilter<"radacct"> | string | null
    acctinputoctets?: BigIntNullableFilter<"radacct"> | bigint | number | null
    acctoutputoctets?: BigIntNullableFilter<"radacct"> | bigint | number | null
    calledstationid?: StringFilter<"radacct"> | string
    callingstationid?: StringFilter<"radacct"> | string
    acctterminatecause?: StringFilter<"radacct"> | string
    servicetype?: StringNullableFilter<"radacct"> | string | null
    framedprotocol?: StringNullableFilter<"radacct"> | string | null
    framedipaddress?: StringFilter<"radacct"> | string
    framedipv6address?: StringFilter<"radacct"> | string
    framedipv6prefix?: StringFilter<"radacct"> | string
    framedinterfaceid?: StringFilter<"radacct"> | string
    delegatedipv6prefix?: StringFilter<"radacct"> | string
    class?: StringNullableFilter<"radacct"> | string | null
  }, "radacctid" | "acctuniqueid">

  export type radacctOrderByWithAggregationInput = {
    radacctid?: SortOrder
    acctsessionid?: SortOrder
    acctuniqueid?: SortOrder
    username?: SortOrder
    realm?: SortOrderInput | SortOrder
    nasipaddress?: SortOrder
    nasportid?: SortOrderInput | SortOrder
    nasporttype?: SortOrderInput | SortOrder
    acctstarttime?: SortOrderInput | SortOrder
    acctupdatetime?: SortOrderInput | SortOrder
    acctstoptime?: SortOrderInput | SortOrder
    acctinterval?: SortOrderInput | SortOrder
    acctsessiontime?: SortOrderInput | SortOrder
    acctauthentic?: SortOrderInput | SortOrder
    connectinfo_start?: SortOrderInput | SortOrder
    connectinfo_stop?: SortOrderInput | SortOrder
    acctinputoctets?: SortOrderInput | SortOrder
    acctoutputoctets?: SortOrderInput | SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    acctterminatecause?: SortOrder
    servicetype?: SortOrderInput | SortOrder
    framedprotocol?: SortOrderInput | SortOrder
    framedipaddress?: SortOrder
    framedipv6address?: SortOrder
    framedipv6prefix?: SortOrder
    framedinterfaceid?: SortOrder
    delegatedipv6prefix?: SortOrder
    class?: SortOrderInput | SortOrder
    _count?: radacctCountOrderByAggregateInput
    _avg?: radacctAvgOrderByAggregateInput
    _max?: radacctMaxOrderByAggregateInput
    _min?: radacctMinOrderByAggregateInput
    _sum?: radacctSumOrderByAggregateInput
  }

  export type radacctScalarWhereWithAggregatesInput = {
    AND?: radacctScalarWhereWithAggregatesInput | radacctScalarWhereWithAggregatesInput[]
    OR?: radacctScalarWhereWithAggregatesInput[]
    NOT?: radacctScalarWhereWithAggregatesInput | radacctScalarWhereWithAggregatesInput[]
    radacctid?: BigIntWithAggregatesFilter<"radacct"> | bigint | number
    acctsessionid?: StringWithAggregatesFilter<"radacct"> | string
    acctuniqueid?: StringWithAggregatesFilter<"radacct"> | string
    username?: StringWithAggregatesFilter<"radacct"> | string
    realm?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    nasipaddress?: StringWithAggregatesFilter<"radacct"> | string
    nasportid?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    nasporttype?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    acctstarttime?: DateTimeNullableWithAggregatesFilter<"radacct"> | Date | string | null
    acctupdatetime?: DateTimeNullableWithAggregatesFilter<"radacct"> | Date | string | null
    acctstoptime?: DateTimeNullableWithAggregatesFilter<"radacct"> | Date | string | null
    acctinterval?: IntNullableWithAggregatesFilter<"radacct"> | number | null
    acctsessiontime?: IntNullableWithAggregatesFilter<"radacct"> | number | null
    acctauthentic?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    connectinfo_start?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    connectinfo_stop?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    acctinputoctets?: BigIntNullableWithAggregatesFilter<"radacct"> | bigint | number | null
    acctoutputoctets?: BigIntNullableWithAggregatesFilter<"radacct"> | bigint | number | null
    calledstationid?: StringWithAggregatesFilter<"radacct"> | string
    callingstationid?: StringWithAggregatesFilter<"radacct"> | string
    acctterminatecause?: StringWithAggregatesFilter<"radacct"> | string
    servicetype?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    framedprotocol?: StringNullableWithAggregatesFilter<"radacct"> | string | null
    framedipaddress?: StringWithAggregatesFilter<"radacct"> | string
    framedipv6address?: StringWithAggregatesFilter<"radacct"> | string
    framedipv6prefix?: StringWithAggregatesFilter<"radacct"> | string
    framedinterfaceid?: StringWithAggregatesFilter<"radacct"> | string
    delegatedipv6prefix?: StringWithAggregatesFilter<"radacct"> | string
    class?: StringNullableWithAggregatesFilter<"radacct"> | string | null
  }

  export type radcheckWhereInput = {
    AND?: radcheckWhereInput | radcheckWhereInput[]
    OR?: radcheckWhereInput[]
    NOT?: radcheckWhereInput | radcheckWhereInput[]
    id?: IntFilter<"radcheck"> | number
    username?: StringFilter<"radcheck"> | string
    attribute?: StringFilter<"radcheck"> | string
    op?: StringFilter<"radcheck"> | string
    value?: StringFilter<"radcheck"> | string
  }

  export type radcheckOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _relevance?: radcheckOrderByRelevanceInput
  }

  export type radcheckWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: radcheckWhereInput | radcheckWhereInput[]
    OR?: radcheckWhereInput[]
    NOT?: radcheckWhereInput | radcheckWhereInput[]
    username?: StringFilter<"radcheck"> | string
    attribute?: StringFilter<"radcheck"> | string
    op?: StringFilter<"radcheck"> | string
    value?: StringFilter<"radcheck"> | string
  }, "id">

  export type radcheckOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _count?: radcheckCountOrderByAggregateInput
    _avg?: radcheckAvgOrderByAggregateInput
    _max?: radcheckMaxOrderByAggregateInput
    _min?: radcheckMinOrderByAggregateInput
    _sum?: radcheckSumOrderByAggregateInput
  }

  export type radcheckScalarWhereWithAggregatesInput = {
    AND?: radcheckScalarWhereWithAggregatesInput | radcheckScalarWhereWithAggregatesInput[]
    OR?: radcheckScalarWhereWithAggregatesInput[]
    NOT?: radcheckScalarWhereWithAggregatesInput | radcheckScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"radcheck"> | number
    username?: StringWithAggregatesFilter<"radcheck"> | string
    attribute?: StringWithAggregatesFilter<"radcheck"> | string
    op?: StringWithAggregatesFilter<"radcheck"> | string
    value?: StringWithAggregatesFilter<"radcheck"> | string
  }

  export type radgroupcheckWhereInput = {
    AND?: radgroupcheckWhereInput | radgroupcheckWhereInput[]
    OR?: radgroupcheckWhereInput[]
    NOT?: radgroupcheckWhereInput | radgroupcheckWhereInput[]
    id?: IntFilter<"radgroupcheck"> | number
    groupname?: StringFilter<"radgroupcheck"> | string
    attribute?: StringFilter<"radgroupcheck"> | string
    op?: StringFilter<"radgroupcheck"> | string
    value?: StringFilter<"radgroupcheck"> | string
  }

  export type radgroupcheckOrderByWithRelationInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _relevance?: radgroupcheckOrderByRelevanceInput
  }

  export type radgroupcheckWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: radgroupcheckWhereInput | radgroupcheckWhereInput[]
    OR?: radgroupcheckWhereInput[]
    NOT?: radgroupcheckWhereInput | radgroupcheckWhereInput[]
    groupname?: StringFilter<"radgroupcheck"> | string
    attribute?: StringFilter<"radgroupcheck"> | string
    op?: StringFilter<"radgroupcheck"> | string
    value?: StringFilter<"radgroupcheck"> | string
  }, "id">

  export type radgroupcheckOrderByWithAggregationInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _count?: radgroupcheckCountOrderByAggregateInput
    _avg?: radgroupcheckAvgOrderByAggregateInput
    _max?: radgroupcheckMaxOrderByAggregateInput
    _min?: radgroupcheckMinOrderByAggregateInput
    _sum?: radgroupcheckSumOrderByAggregateInput
  }

  export type radgroupcheckScalarWhereWithAggregatesInput = {
    AND?: radgroupcheckScalarWhereWithAggregatesInput | radgroupcheckScalarWhereWithAggregatesInput[]
    OR?: radgroupcheckScalarWhereWithAggregatesInput[]
    NOT?: radgroupcheckScalarWhereWithAggregatesInput | radgroupcheckScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"radgroupcheck"> | number
    groupname?: StringWithAggregatesFilter<"radgroupcheck"> | string
    attribute?: StringWithAggregatesFilter<"radgroupcheck"> | string
    op?: StringWithAggregatesFilter<"radgroupcheck"> | string
    value?: StringWithAggregatesFilter<"radgroupcheck"> | string
  }

  export type radgroupreplyWhereInput = {
    AND?: radgroupreplyWhereInput | radgroupreplyWhereInput[]
    OR?: radgroupreplyWhereInput[]
    NOT?: radgroupreplyWhereInput | radgroupreplyWhereInput[]
    id?: IntFilter<"radgroupreply"> | number
    groupname?: StringFilter<"radgroupreply"> | string
    attribute?: StringFilter<"radgroupreply"> | string
    op?: StringFilter<"radgroupreply"> | string
    value?: StringFilter<"radgroupreply"> | string
  }

  export type radgroupreplyOrderByWithRelationInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _relevance?: radgroupreplyOrderByRelevanceInput
  }

  export type radgroupreplyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: radgroupreplyWhereInput | radgroupreplyWhereInput[]
    OR?: radgroupreplyWhereInput[]
    NOT?: radgroupreplyWhereInput | radgroupreplyWhereInput[]
    groupname?: StringFilter<"radgroupreply"> | string
    attribute?: StringFilter<"radgroupreply"> | string
    op?: StringFilter<"radgroupreply"> | string
    value?: StringFilter<"radgroupreply"> | string
  }, "id">

  export type radgroupreplyOrderByWithAggregationInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _count?: radgroupreplyCountOrderByAggregateInput
    _avg?: radgroupreplyAvgOrderByAggregateInput
    _max?: radgroupreplyMaxOrderByAggregateInput
    _min?: radgroupreplyMinOrderByAggregateInput
    _sum?: radgroupreplySumOrderByAggregateInput
  }

  export type radgroupreplyScalarWhereWithAggregatesInput = {
    AND?: radgroupreplyScalarWhereWithAggregatesInput | radgroupreplyScalarWhereWithAggregatesInput[]
    OR?: radgroupreplyScalarWhereWithAggregatesInput[]
    NOT?: radgroupreplyScalarWhereWithAggregatesInput | radgroupreplyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"radgroupreply"> | number
    groupname?: StringWithAggregatesFilter<"radgroupreply"> | string
    attribute?: StringWithAggregatesFilter<"radgroupreply"> | string
    op?: StringWithAggregatesFilter<"radgroupreply"> | string
    value?: StringWithAggregatesFilter<"radgroupreply"> | string
  }

  export type radpostauthWhereInput = {
    AND?: radpostauthWhereInput | radpostauthWhereInput[]
    OR?: radpostauthWhereInput[]
    NOT?: radpostauthWhereInput | radpostauthWhereInput[]
    id?: IntFilter<"radpostauth"> | number
    username?: StringFilter<"radpostauth"> | string
    pass?: StringFilter<"radpostauth"> | string
    reply?: StringFilter<"radpostauth"> | string
    authdate?: DateTimeFilter<"radpostauth"> | Date | string
    class?: StringNullableFilter<"radpostauth"> | string | null
  }

  export type radpostauthOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
    reply?: SortOrder
    authdate?: SortOrder
    class?: SortOrderInput | SortOrder
    _relevance?: radpostauthOrderByRelevanceInput
  }

  export type radpostauthWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: radpostauthWhereInput | radpostauthWhereInput[]
    OR?: radpostauthWhereInput[]
    NOT?: radpostauthWhereInput | radpostauthWhereInput[]
    username?: StringFilter<"radpostauth"> | string
    pass?: StringFilter<"radpostauth"> | string
    reply?: StringFilter<"radpostauth"> | string
    authdate?: DateTimeFilter<"radpostauth"> | Date | string
    class?: StringNullableFilter<"radpostauth"> | string | null
  }, "id">

  export type radpostauthOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
    reply?: SortOrder
    authdate?: SortOrder
    class?: SortOrderInput | SortOrder
    _count?: radpostauthCountOrderByAggregateInput
    _avg?: radpostauthAvgOrderByAggregateInput
    _max?: radpostauthMaxOrderByAggregateInput
    _min?: radpostauthMinOrderByAggregateInput
    _sum?: radpostauthSumOrderByAggregateInput
  }

  export type radpostauthScalarWhereWithAggregatesInput = {
    AND?: radpostauthScalarWhereWithAggregatesInput | radpostauthScalarWhereWithAggregatesInput[]
    OR?: radpostauthScalarWhereWithAggregatesInput[]
    NOT?: radpostauthScalarWhereWithAggregatesInput | radpostauthScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"radpostauth"> | number
    username?: StringWithAggregatesFilter<"radpostauth"> | string
    pass?: StringWithAggregatesFilter<"radpostauth"> | string
    reply?: StringWithAggregatesFilter<"radpostauth"> | string
    authdate?: DateTimeWithAggregatesFilter<"radpostauth"> | Date | string
    class?: StringNullableWithAggregatesFilter<"radpostauth"> | string | null
  }

  export type radreplyWhereInput = {
    AND?: radreplyWhereInput | radreplyWhereInput[]
    OR?: radreplyWhereInput[]
    NOT?: radreplyWhereInput | radreplyWhereInput[]
    id?: IntFilter<"radreply"> | number
    username?: StringFilter<"radreply"> | string
    attribute?: StringFilter<"radreply"> | string
    op?: StringFilter<"radreply"> | string
    value?: StringFilter<"radreply"> | string
  }

  export type radreplyOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _relevance?: radreplyOrderByRelevanceInput
  }

  export type radreplyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: radreplyWhereInput | radreplyWhereInput[]
    OR?: radreplyWhereInput[]
    NOT?: radreplyWhereInput | radreplyWhereInput[]
    username?: StringFilter<"radreply"> | string
    attribute?: StringFilter<"radreply"> | string
    op?: StringFilter<"radreply"> | string
    value?: StringFilter<"radreply"> | string
  }, "id">

  export type radreplyOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
    _count?: radreplyCountOrderByAggregateInput
    _avg?: radreplyAvgOrderByAggregateInput
    _max?: radreplyMaxOrderByAggregateInput
    _min?: radreplyMinOrderByAggregateInput
    _sum?: radreplySumOrderByAggregateInput
  }

  export type radreplyScalarWhereWithAggregatesInput = {
    AND?: radreplyScalarWhereWithAggregatesInput | radreplyScalarWhereWithAggregatesInput[]
    OR?: radreplyScalarWhereWithAggregatesInput[]
    NOT?: radreplyScalarWhereWithAggregatesInput | radreplyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"radreply"> | number
    username?: StringWithAggregatesFilter<"radreply"> | string
    attribute?: StringWithAggregatesFilter<"radreply"> | string
    op?: StringWithAggregatesFilter<"radreply"> | string
    value?: StringWithAggregatesFilter<"radreply"> | string
  }

  export type radusergroupWhereInput = {
    AND?: radusergroupWhereInput | radusergroupWhereInput[]
    OR?: radusergroupWhereInput[]
    NOT?: radusergroupWhereInput | radusergroupWhereInput[]
    id?: IntFilter<"radusergroup"> | number
    username?: StringFilter<"radusergroup"> | string
    groupname?: StringFilter<"radusergroup"> | string
    priority?: IntFilter<"radusergroup"> | number
    groupMetadata?: XOR<GroupMetadataNullableScalarRelationFilter, GroupMetadataWhereInput> | null
  }

  export type radusergroupOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    groupname?: SortOrder
    priority?: SortOrder
    groupMetadata?: GroupMetadataOrderByWithRelationInput
    _relevance?: radusergroupOrderByRelevanceInput
  }

  export type radusergroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: radusergroupWhereInput | radusergroupWhereInput[]
    OR?: radusergroupWhereInput[]
    NOT?: radusergroupWhereInput | radusergroupWhereInput[]
    username?: StringFilter<"radusergroup"> | string
    groupname?: StringFilter<"radusergroup"> | string
    priority?: IntFilter<"radusergroup"> | number
    groupMetadata?: XOR<GroupMetadataNullableScalarRelationFilter, GroupMetadataWhereInput> | null
  }, "id">

  export type radusergroupOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    groupname?: SortOrder
    priority?: SortOrder
    _count?: radusergroupCountOrderByAggregateInput
    _avg?: radusergroupAvgOrderByAggregateInput
    _max?: radusergroupMaxOrderByAggregateInput
    _min?: radusergroupMinOrderByAggregateInput
    _sum?: radusergroupSumOrderByAggregateInput
  }

  export type radusergroupScalarWhereWithAggregatesInput = {
    AND?: radusergroupScalarWhereWithAggregatesInput | radusergroupScalarWhereWithAggregatesInput[]
    OR?: radusergroupScalarWhereWithAggregatesInput[]
    NOT?: radusergroupScalarWhereWithAggregatesInput | radusergroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"radusergroup"> | number
    username?: StringWithAggregatesFilter<"radusergroup"> | string
    groupname?: StringWithAggregatesFilter<"radusergroup"> | string
    priority?: IntWithAggregatesFilter<"radusergroup"> | number
  }

  export type userinfoWhereInput = {
    AND?: userinfoWhereInput | userinfoWhereInput[]
    OR?: userinfoWhereInput[]
    NOT?: userinfoWhereInput | userinfoWhereInput[]
    id?: IntFilter<"userinfo"> | number
    username?: StringFilter<"userinfo"> | string
    type?: StringFilter<"userinfo"> | string
    fullName?: StringFilter<"userinfo"> | string
    department?: StringFilter<"userinfo"> | string
    createdBy?: StringNullableFilter<"userinfo"> | string | null
    status?: StringFilter<"userinfo"> | string
  }

  export type userinfoOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    type?: SortOrder
    fullName?: SortOrder
    department?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    status?: SortOrder
    _relevance?: userinfoOrderByRelevanceInput
  }

  export type userinfoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username_type?: userinfoUsername_typeCompoundUniqueInput
    AND?: userinfoWhereInput | userinfoWhereInput[]
    OR?: userinfoWhereInput[]
    NOT?: userinfoWhereInput | userinfoWhereInput[]
    username?: StringFilter<"userinfo"> | string
    type?: StringFilter<"userinfo"> | string
    fullName?: StringFilter<"userinfo"> | string
    department?: StringFilter<"userinfo"> | string
    createdBy?: StringNullableFilter<"userinfo"> | string | null
    status?: StringFilter<"userinfo"> | string
  }, "id" | "username_type">

  export type userinfoOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    type?: SortOrder
    fullName?: SortOrder
    department?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: userinfoCountOrderByAggregateInput
    _avg?: userinfoAvgOrderByAggregateInput
    _max?: userinfoMaxOrderByAggregateInput
    _min?: userinfoMinOrderByAggregateInput
    _sum?: userinfoSumOrderByAggregateInput
  }

  export type userinfoScalarWhereWithAggregatesInput = {
    AND?: userinfoScalarWhereWithAggregatesInput | userinfoScalarWhereWithAggregatesInput[]
    OR?: userinfoScalarWhereWithAggregatesInput[]
    NOT?: userinfoScalarWhereWithAggregatesInput | userinfoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"userinfo"> | number
    username?: StringWithAggregatesFilter<"userinfo"> | string
    type?: StringWithAggregatesFilter<"userinfo"> | string
    fullName?: StringWithAggregatesFilter<"userinfo"> | string
    department?: StringWithAggregatesFilter<"userinfo"> | string
    createdBy?: StringNullableWithAggregatesFilter<"userinfo"> | string | null
    status?: StringWithAggregatesFilter<"userinfo"> | string
  }

  export type adminWhereInput = {
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    id?: IntFilter<"admin"> | number
    username?: StringFilter<"admin"> | string
    password?: StringFilter<"admin"> | string
    role?: StringFilter<"admin"> | string
  }

  export type adminOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _relevance?: adminOrderByRelevanceInput
  }

  export type adminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    password?: StringFilter<"admin"> | string
    role?: StringFilter<"admin"> | string
  }, "id" | "username">

  export type adminOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: adminCountOrderByAggregateInput
    _avg?: adminAvgOrderByAggregateInput
    _max?: adminMaxOrderByAggregateInput
    _min?: adminMinOrderByAggregateInput
    _sum?: adminSumOrderByAggregateInput
  }

  export type adminScalarWhereWithAggregatesInput = {
    AND?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    OR?: adminScalarWhereWithAggregatesInput[]
    NOT?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"admin"> | number
    username?: StringWithAggregatesFilter<"admin"> | string
    password?: StringWithAggregatesFilter<"admin"> | string
    role?: StringWithAggregatesFilter<"admin"> | string
  }

  export type GroupMetadataWhereInput = {
    AND?: GroupMetadataWhereInput | GroupMetadataWhereInput[]
    OR?: GroupMetadataWhereInput[]
    NOT?: GroupMetadataWhereInput | GroupMetadataWhereInput[]
    groupname?: StringFilter<"GroupMetadata"> | string
    type?: StringFilter<"GroupMetadata"> | string
    description?: StringNullableFilter<"GroupMetadata"> | string | null
    radusergroups?: RadusergroupListRelationFilter
  }

  export type GroupMetadataOrderByWithRelationInput = {
    groupname?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    radusergroups?: radusergroupOrderByRelationAggregateInput
    _relevance?: GroupMetadataOrderByRelevanceInput
  }

  export type GroupMetadataWhereUniqueInput = Prisma.AtLeast<{
    groupname?: string
    AND?: GroupMetadataWhereInput | GroupMetadataWhereInput[]
    OR?: GroupMetadataWhereInput[]
    NOT?: GroupMetadataWhereInput | GroupMetadataWhereInput[]
    type?: StringFilter<"GroupMetadata"> | string
    description?: StringNullableFilter<"GroupMetadata"> | string | null
    radusergroups?: RadusergroupListRelationFilter
  }, "groupname">

  export type GroupMetadataOrderByWithAggregationInput = {
    groupname?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: GroupMetadataCountOrderByAggregateInput
    _max?: GroupMetadataMaxOrderByAggregateInput
    _min?: GroupMetadataMinOrderByAggregateInput
  }

  export type GroupMetadataScalarWhereWithAggregatesInput = {
    AND?: GroupMetadataScalarWhereWithAggregatesInput | GroupMetadataScalarWhereWithAggregatesInput[]
    OR?: GroupMetadataScalarWhereWithAggregatesInput[]
    NOT?: GroupMetadataScalarWhereWithAggregatesInput | GroupMetadataScalarWhereWithAggregatesInput[]
    groupname?: StringWithAggregatesFilter<"GroupMetadata"> | string
    type?: StringWithAggregatesFilter<"GroupMetadata"> | string
    description?: StringNullableWithAggregatesFilter<"GroupMetadata"> | string | null
  }

  export type RadiusPoolWhereInput = {
    AND?: RadiusPoolWhereInput | RadiusPoolWhereInput[]
    OR?: RadiusPoolWhereInput[]
    NOT?: RadiusPoolWhereInput | RadiusPoolWhereInput[]
    id?: IntFilter<"RadiusPool"> | number
    name?: StringFilter<"RadiusPool"> | string
    description?: StringNullableFilter<"RadiusPool"> | string | null
  }

  export type RadiusPoolOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    _relevance?: RadiusPoolOrderByRelevanceInput
  }

  export type RadiusPoolWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RadiusPoolWhereInput | RadiusPoolWhereInput[]
    OR?: RadiusPoolWhereInput[]
    NOT?: RadiusPoolWhereInput | RadiusPoolWhereInput[]
    description?: StringNullableFilter<"RadiusPool"> | string | null
  }, "id" | "name">

  export type RadiusPoolOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: RadiusPoolCountOrderByAggregateInput
    _avg?: RadiusPoolAvgOrderByAggregateInput
    _max?: RadiusPoolMaxOrderByAggregateInput
    _min?: RadiusPoolMinOrderByAggregateInput
    _sum?: RadiusPoolSumOrderByAggregateInput
  }

  export type RadiusPoolScalarWhereWithAggregatesInput = {
    AND?: RadiusPoolScalarWhereWithAggregatesInput | RadiusPoolScalarWhereWithAggregatesInput[]
    OR?: RadiusPoolScalarWhereWithAggregatesInput[]
    NOT?: RadiusPoolScalarWhereWithAggregatesInput | RadiusPoolScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RadiusPool"> | number
    name?: StringWithAggregatesFilter<"RadiusPool"> | string
    description?: StringNullableWithAggregatesFilter<"RadiusPool"> | string | null
  }

  export type radippoolWhereInput = {
    AND?: radippoolWhereInput | radippoolWhereInput[]
    OR?: radippoolWhereInput[]
    NOT?: radippoolWhereInput | radippoolWhereInput[]
    id?: IntFilter<"radippool"> | number
    pool_name?: StringFilter<"radippool"> | string
    framedipaddress?: StringFilter<"radippool"> | string
    nasipaddress?: StringFilter<"radippool"> | string
    calledstationid?: StringFilter<"radippool"> | string
    callingstationid?: StringFilter<"radippool"> | string
    expiry_time?: DateTimeNullableFilter<"radippool"> | Date | string | null
    username?: StringFilter<"radippool"> | string
    pool_key?: StringFilter<"radippool"> | string
  }

  export type radippoolOrderByWithRelationInput = {
    id?: SortOrder
    pool_name?: SortOrder
    framedipaddress?: SortOrder
    nasipaddress?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    expiry_time?: SortOrderInput | SortOrder
    username?: SortOrder
    pool_key?: SortOrder
    _relevance?: radippoolOrderByRelevanceInput
  }

  export type radippoolWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: radippoolWhereInput | radippoolWhereInput[]
    OR?: radippoolWhereInput[]
    NOT?: radippoolWhereInput | radippoolWhereInput[]
    pool_name?: StringFilter<"radippool"> | string
    framedipaddress?: StringFilter<"radippool"> | string
    nasipaddress?: StringFilter<"radippool"> | string
    calledstationid?: StringFilter<"radippool"> | string
    callingstationid?: StringFilter<"radippool"> | string
    expiry_time?: DateTimeNullableFilter<"radippool"> | Date | string | null
    username?: StringFilter<"radippool"> | string
    pool_key?: StringFilter<"radippool"> | string
  }, "id">

  export type radippoolOrderByWithAggregationInput = {
    id?: SortOrder
    pool_name?: SortOrder
    framedipaddress?: SortOrder
    nasipaddress?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    expiry_time?: SortOrderInput | SortOrder
    username?: SortOrder
    pool_key?: SortOrder
    _count?: radippoolCountOrderByAggregateInput
    _avg?: radippoolAvgOrderByAggregateInput
    _max?: radippoolMaxOrderByAggregateInput
    _min?: radippoolMinOrderByAggregateInput
    _sum?: radippoolSumOrderByAggregateInput
  }

  export type radippoolScalarWhereWithAggregatesInput = {
    AND?: radippoolScalarWhereWithAggregatesInput | radippoolScalarWhereWithAggregatesInput[]
    OR?: radippoolScalarWhereWithAggregatesInput[]
    NOT?: radippoolScalarWhereWithAggregatesInput | radippoolScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"radippool"> | number
    pool_name?: StringWithAggregatesFilter<"radippool"> | string
    framedipaddress?: StringWithAggregatesFilter<"radippool"> | string
    nasipaddress?: StringWithAggregatesFilter<"radippool"> | string
    calledstationid?: StringWithAggregatesFilter<"radippool"> | string
    callingstationid?: StringWithAggregatesFilter<"radippool"> | string
    expiry_time?: DateTimeNullableWithAggregatesFilter<"radippool"> | Date | string | null
    username?: StringWithAggregatesFilter<"radippool"> | string
    pool_key?: StringWithAggregatesFilter<"radippool"> | string
  }

  export type MikrotikConfigWhereInput = {
    AND?: MikrotikConfigWhereInput | MikrotikConfigWhereInput[]
    OR?: MikrotikConfigWhereInput[]
    NOT?: MikrotikConfigWhereInput | MikrotikConfigWhereInput[]
    id?: IntFilter<"MikrotikConfig"> | number
    name?: StringFilter<"MikrotikConfig"> | string
    host?: StringFilter<"MikrotikConfig"> | string
    port?: IntFilter<"MikrotikConfig"> | number
    username?: StringFilter<"MikrotikConfig"> | string
    password?: StringFilter<"MikrotikConfig"> | string
    useSsl?: BoolFilter<"MikrotikConfig"> | boolean
    wgPublicHost?: StringNullableFilter<"MikrotikConfig"> | string | null
    createdAt?: DateTimeFilter<"MikrotikConfig"> | Date | string
    updatedAt?: DateTimeFilter<"MikrotikConfig"> | Date | string
    peers?: WireguardPeerListRelationFilter
  }

  export type MikrotikConfigOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    host?: SortOrder
    port?: SortOrder
    username?: SortOrder
    password?: SortOrder
    useSsl?: SortOrder
    wgPublicHost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    peers?: WireguardPeerOrderByRelationAggregateInput
    _relevance?: MikrotikConfigOrderByRelevanceInput
  }

  export type MikrotikConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: MikrotikConfigWhereInput | MikrotikConfigWhereInput[]
    OR?: MikrotikConfigWhereInput[]
    NOT?: MikrotikConfigWhereInput | MikrotikConfigWhereInput[]
    host?: StringFilter<"MikrotikConfig"> | string
    port?: IntFilter<"MikrotikConfig"> | number
    username?: StringFilter<"MikrotikConfig"> | string
    password?: StringFilter<"MikrotikConfig"> | string
    useSsl?: BoolFilter<"MikrotikConfig"> | boolean
    wgPublicHost?: StringNullableFilter<"MikrotikConfig"> | string | null
    createdAt?: DateTimeFilter<"MikrotikConfig"> | Date | string
    updatedAt?: DateTimeFilter<"MikrotikConfig"> | Date | string
    peers?: WireguardPeerListRelationFilter
  }, "id" | "name">

  export type MikrotikConfigOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    host?: SortOrder
    port?: SortOrder
    username?: SortOrder
    password?: SortOrder
    useSsl?: SortOrder
    wgPublicHost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MikrotikConfigCountOrderByAggregateInput
    _avg?: MikrotikConfigAvgOrderByAggregateInput
    _max?: MikrotikConfigMaxOrderByAggregateInput
    _min?: MikrotikConfigMinOrderByAggregateInput
    _sum?: MikrotikConfigSumOrderByAggregateInput
  }

  export type MikrotikConfigScalarWhereWithAggregatesInput = {
    AND?: MikrotikConfigScalarWhereWithAggregatesInput | MikrotikConfigScalarWhereWithAggregatesInput[]
    OR?: MikrotikConfigScalarWhereWithAggregatesInput[]
    NOT?: MikrotikConfigScalarWhereWithAggregatesInput | MikrotikConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MikrotikConfig"> | number
    name?: StringWithAggregatesFilter<"MikrotikConfig"> | string
    host?: StringWithAggregatesFilter<"MikrotikConfig"> | string
    port?: IntWithAggregatesFilter<"MikrotikConfig"> | number
    username?: StringWithAggregatesFilter<"MikrotikConfig"> | string
    password?: StringWithAggregatesFilter<"MikrotikConfig"> | string
    useSsl?: BoolWithAggregatesFilter<"MikrotikConfig"> | boolean
    wgPublicHost?: StringNullableWithAggregatesFilter<"MikrotikConfig"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MikrotikConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MikrotikConfig"> | Date | string
  }

  export type WireguardPeerWhereInput = {
    AND?: WireguardPeerWhereInput | WireguardPeerWhereInput[]
    OR?: WireguardPeerWhereInput[]
    NOT?: WireguardPeerWhereInput | WireguardPeerWhereInput[]
    id?: IntFilter<"WireguardPeer"> | number
    mikrotikId?: IntFilter<"WireguardPeer"> | number
    mikrotikPeerId?: StringNullableFilter<"WireguardPeer"> | string | null
    name?: StringFilter<"WireguardPeer"> | string
    publicKey?: StringFilter<"WireguardPeer"> | string
    privateKey?: StringFilter<"WireguardPeer"> | string
    allowedIps?: StringFilter<"WireguardPeer"> | string
    interface?: StringFilter<"WireguardPeer"> | string
    listenPort?: IntNullableFilter<"WireguardPeer"> | number | null
    endpoint?: StringNullableFilter<"WireguardPeer"> | string | null
    comment?: StringNullableFilter<"WireguardPeer"> | string | null
    createdAt?: DateTimeFilter<"WireguardPeer"> | Date | string
    mikrotik?: XOR<MikrotikConfigScalarRelationFilter, MikrotikConfigWhereInput>
  }

  export type WireguardPeerOrderByWithRelationInput = {
    id?: SortOrder
    mikrotikId?: SortOrder
    mikrotikPeerId?: SortOrderInput | SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    allowedIps?: SortOrder
    interface?: SortOrder
    listenPort?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    mikrotik?: MikrotikConfigOrderByWithRelationInput
    _relevance?: WireguardPeerOrderByRelevanceInput
  }

  export type WireguardPeerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WireguardPeerWhereInput | WireguardPeerWhereInput[]
    OR?: WireguardPeerWhereInput[]
    NOT?: WireguardPeerWhereInput | WireguardPeerWhereInput[]
    mikrotikId?: IntFilter<"WireguardPeer"> | number
    mikrotikPeerId?: StringNullableFilter<"WireguardPeer"> | string | null
    name?: StringFilter<"WireguardPeer"> | string
    publicKey?: StringFilter<"WireguardPeer"> | string
    privateKey?: StringFilter<"WireguardPeer"> | string
    allowedIps?: StringFilter<"WireguardPeer"> | string
    interface?: StringFilter<"WireguardPeer"> | string
    listenPort?: IntNullableFilter<"WireguardPeer"> | number | null
    endpoint?: StringNullableFilter<"WireguardPeer"> | string | null
    comment?: StringNullableFilter<"WireguardPeer"> | string | null
    createdAt?: DateTimeFilter<"WireguardPeer"> | Date | string
    mikrotik?: XOR<MikrotikConfigScalarRelationFilter, MikrotikConfigWhereInput>
  }, "id">

  export type WireguardPeerOrderByWithAggregationInput = {
    id?: SortOrder
    mikrotikId?: SortOrder
    mikrotikPeerId?: SortOrderInput | SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    allowedIps?: SortOrder
    interface?: SortOrder
    listenPort?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WireguardPeerCountOrderByAggregateInput
    _avg?: WireguardPeerAvgOrderByAggregateInput
    _max?: WireguardPeerMaxOrderByAggregateInput
    _min?: WireguardPeerMinOrderByAggregateInput
    _sum?: WireguardPeerSumOrderByAggregateInput
  }

  export type WireguardPeerScalarWhereWithAggregatesInput = {
    AND?: WireguardPeerScalarWhereWithAggregatesInput | WireguardPeerScalarWhereWithAggregatesInput[]
    OR?: WireguardPeerScalarWhereWithAggregatesInput[]
    NOT?: WireguardPeerScalarWhereWithAggregatesInput | WireguardPeerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WireguardPeer"> | number
    mikrotikId?: IntWithAggregatesFilter<"WireguardPeer"> | number
    mikrotikPeerId?: StringNullableWithAggregatesFilter<"WireguardPeer"> | string | null
    name?: StringWithAggregatesFilter<"WireguardPeer"> | string
    publicKey?: StringWithAggregatesFilter<"WireguardPeer"> | string
    privateKey?: StringWithAggregatesFilter<"WireguardPeer"> | string
    allowedIps?: StringWithAggregatesFilter<"WireguardPeer"> | string
    interface?: StringWithAggregatesFilter<"WireguardPeer"> | string
    listenPort?: IntNullableWithAggregatesFilter<"WireguardPeer"> | number | null
    endpoint?: StringNullableWithAggregatesFilter<"WireguardPeer"> | string | null
    comment?: StringNullableWithAggregatesFilter<"WireguardPeer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WireguardPeer"> | Date | string
  }

  export type WifiWhereInput = {
    AND?: WifiWhereInput | WifiWhereInput[]
    OR?: WifiWhereInput[]
    NOT?: WifiWhereInput | WifiWhereInput[]
    id?: IntFilter<"Wifi"> | number
    ssid?: StringFilter<"Wifi"> | string
    password?: StringFilter<"Wifi"> | string
    createdAt?: DateTimeFilter<"Wifi"> | Date | string
    updatedAt?: DateTimeFilter<"Wifi"> | Date | string
  }

  export type WifiOrderByWithRelationInput = {
    id?: SortOrder
    ssid?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: WifiOrderByRelevanceInput
  }

  export type WifiWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    ssid?: string
    AND?: WifiWhereInput | WifiWhereInput[]
    OR?: WifiWhereInput[]
    NOT?: WifiWhereInput | WifiWhereInput[]
    password?: StringFilter<"Wifi"> | string
    createdAt?: DateTimeFilter<"Wifi"> | Date | string
    updatedAt?: DateTimeFilter<"Wifi"> | Date | string
  }, "id" | "ssid">

  export type WifiOrderByWithAggregationInput = {
    id?: SortOrder
    ssid?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WifiCountOrderByAggregateInput
    _avg?: WifiAvgOrderByAggregateInput
    _max?: WifiMaxOrderByAggregateInput
    _min?: WifiMinOrderByAggregateInput
    _sum?: WifiSumOrderByAggregateInput
  }

  export type WifiScalarWhereWithAggregatesInput = {
    AND?: WifiScalarWhereWithAggregatesInput | WifiScalarWhereWithAggregatesInput[]
    OR?: WifiScalarWhereWithAggregatesInput[]
    NOT?: WifiScalarWhereWithAggregatesInput | WifiScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Wifi"> | number
    ssid?: StringWithAggregatesFilter<"Wifi"> | string
    password?: StringWithAggregatesFilter<"Wifi"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Wifi"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wifi"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    adminUser?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    targetType?: StringFilter<"AuditLog"> | string
    targetName?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    adminUser?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetName?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    _relevance?: AuditLogOrderByRelevanceInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    adminUser?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    targetType?: StringFilter<"AuditLog"> | string
    targetName?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    adminUser?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetName?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    adminUser?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    targetType?: StringWithAggregatesFilter<"AuditLog"> | string
    targetName?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
  }

  export type nasCreateInput = {
    nasname: string
    shortname?: string | null
    type?: string | null
    ports?: number | null
    secret?: string
    server?: string | null
    community?: string | null
    description?: string | null
  }

  export type nasUncheckedCreateInput = {
    id?: number
    nasname: string
    shortname?: string | null
    type?: string | null
    ports?: number | null
    secret?: string
    server?: string | null
    community?: string | null
    description?: string | null
  }

  export type nasUpdateInput = {
    nasname?: StringFieldUpdateOperationsInput | string
    shortname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ports?: NullableIntFieldUpdateOperationsInput | number | null
    secret?: StringFieldUpdateOperationsInput | string
    server?: NullableStringFieldUpdateOperationsInput | string | null
    community?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type nasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nasname?: StringFieldUpdateOperationsInput | string
    shortname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ports?: NullableIntFieldUpdateOperationsInput | number | null
    secret?: StringFieldUpdateOperationsInput | string
    server?: NullableStringFieldUpdateOperationsInput | string | null
    community?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type nasCreateManyInput = {
    id?: number
    nasname: string
    shortname?: string | null
    type?: string | null
    ports?: number | null
    secret?: string
    server?: string | null
    community?: string | null
    description?: string | null
  }

  export type nasUpdateManyMutationInput = {
    nasname?: StringFieldUpdateOperationsInput | string
    shortname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ports?: NullableIntFieldUpdateOperationsInput | number | null
    secret?: StringFieldUpdateOperationsInput | string
    server?: NullableStringFieldUpdateOperationsInput | string | null
    community?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type nasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nasname?: StringFieldUpdateOperationsInput | string
    shortname?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    ports?: NullableIntFieldUpdateOperationsInput | number | null
    secret?: StringFieldUpdateOperationsInput | string
    server?: NullableStringFieldUpdateOperationsInput | string | null
    community?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type nasreloadCreateInput = {
    nasipaddress: string
    reloadtime: Date | string
  }

  export type nasreloadUncheckedCreateInput = {
    nasipaddress: string
    reloadtime: Date | string
  }

  export type nasreloadUpdateInput = {
    nasipaddress?: StringFieldUpdateOperationsInput | string
    reloadtime?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nasreloadUncheckedUpdateInput = {
    nasipaddress?: StringFieldUpdateOperationsInput | string
    reloadtime?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nasreloadCreateManyInput = {
    nasipaddress: string
    reloadtime: Date | string
  }

  export type nasreloadUpdateManyMutationInput = {
    nasipaddress?: StringFieldUpdateOperationsInput | string
    reloadtime?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nasreloadUncheckedUpdateManyInput = {
    nasipaddress?: StringFieldUpdateOperationsInput | string
    reloadtime?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type radacctCreateInput = {
    radacctid?: bigint | number
    acctsessionid?: string
    acctuniqueid?: string
    username?: string
    realm?: string | null
    nasipaddress?: string
    nasportid?: string | null
    nasporttype?: string | null
    acctstarttime?: Date | string | null
    acctupdatetime?: Date | string | null
    acctstoptime?: Date | string | null
    acctinterval?: number | null
    acctsessiontime?: number | null
    acctauthentic?: string | null
    connectinfo_start?: string | null
    connectinfo_stop?: string | null
    acctinputoctets?: bigint | number | null
    acctoutputoctets?: bigint | number | null
    calledstationid?: string
    callingstationid?: string
    acctterminatecause?: string
    servicetype?: string | null
    framedprotocol?: string | null
    framedipaddress?: string
    framedipv6address?: string
    framedipv6prefix?: string
    framedinterfaceid?: string
    delegatedipv6prefix?: string
    class?: string | null
  }

  export type radacctUncheckedCreateInput = {
    radacctid?: bigint | number
    acctsessionid?: string
    acctuniqueid?: string
    username?: string
    realm?: string | null
    nasipaddress?: string
    nasportid?: string | null
    nasporttype?: string | null
    acctstarttime?: Date | string | null
    acctupdatetime?: Date | string | null
    acctstoptime?: Date | string | null
    acctinterval?: number | null
    acctsessiontime?: number | null
    acctauthentic?: string | null
    connectinfo_start?: string | null
    connectinfo_stop?: string | null
    acctinputoctets?: bigint | number | null
    acctoutputoctets?: bigint | number | null
    calledstationid?: string
    callingstationid?: string
    acctterminatecause?: string
    servicetype?: string | null
    framedprotocol?: string | null
    framedipaddress?: string
    framedipv6address?: string
    framedipv6prefix?: string
    framedinterfaceid?: string
    delegatedipv6prefix?: string
    class?: string | null
  }

  export type radacctUpdateInput = {
    radacctid?: BigIntFieldUpdateOperationsInput | bigint | number
    acctsessionid?: StringFieldUpdateOperationsInput | string
    acctuniqueid?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    realm?: NullableStringFieldUpdateOperationsInput | string | null
    nasipaddress?: StringFieldUpdateOperationsInput | string
    nasportid?: NullableStringFieldUpdateOperationsInput | string | null
    nasporttype?: NullableStringFieldUpdateOperationsInput | string | null
    acctstarttime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctupdatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctstoptime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctinterval?: NullableIntFieldUpdateOperationsInput | number | null
    acctsessiontime?: NullableIntFieldUpdateOperationsInput | number | null
    acctauthentic?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_start?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_stop?: NullableStringFieldUpdateOperationsInput | string | null
    acctinputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    acctoutputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    acctterminatecause?: StringFieldUpdateOperationsInput | string
    servicetype?: NullableStringFieldUpdateOperationsInput | string | null
    framedprotocol?: NullableStringFieldUpdateOperationsInput | string | null
    framedipaddress?: StringFieldUpdateOperationsInput | string
    framedipv6address?: StringFieldUpdateOperationsInput | string
    framedipv6prefix?: StringFieldUpdateOperationsInput | string
    framedinterfaceid?: StringFieldUpdateOperationsInput | string
    delegatedipv6prefix?: StringFieldUpdateOperationsInput | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radacctUncheckedUpdateInput = {
    radacctid?: BigIntFieldUpdateOperationsInput | bigint | number
    acctsessionid?: StringFieldUpdateOperationsInput | string
    acctuniqueid?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    realm?: NullableStringFieldUpdateOperationsInput | string | null
    nasipaddress?: StringFieldUpdateOperationsInput | string
    nasportid?: NullableStringFieldUpdateOperationsInput | string | null
    nasporttype?: NullableStringFieldUpdateOperationsInput | string | null
    acctstarttime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctupdatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctstoptime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctinterval?: NullableIntFieldUpdateOperationsInput | number | null
    acctsessiontime?: NullableIntFieldUpdateOperationsInput | number | null
    acctauthentic?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_start?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_stop?: NullableStringFieldUpdateOperationsInput | string | null
    acctinputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    acctoutputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    acctterminatecause?: StringFieldUpdateOperationsInput | string
    servicetype?: NullableStringFieldUpdateOperationsInput | string | null
    framedprotocol?: NullableStringFieldUpdateOperationsInput | string | null
    framedipaddress?: StringFieldUpdateOperationsInput | string
    framedipv6address?: StringFieldUpdateOperationsInput | string
    framedipv6prefix?: StringFieldUpdateOperationsInput | string
    framedinterfaceid?: StringFieldUpdateOperationsInput | string
    delegatedipv6prefix?: StringFieldUpdateOperationsInput | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radacctCreateManyInput = {
    radacctid?: bigint | number
    acctsessionid?: string
    acctuniqueid?: string
    username?: string
    realm?: string | null
    nasipaddress?: string
    nasportid?: string | null
    nasporttype?: string | null
    acctstarttime?: Date | string | null
    acctupdatetime?: Date | string | null
    acctstoptime?: Date | string | null
    acctinterval?: number | null
    acctsessiontime?: number | null
    acctauthentic?: string | null
    connectinfo_start?: string | null
    connectinfo_stop?: string | null
    acctinputoctets?: bigint | number | null
    acctoutputoctets?: bigint | number | null
    calledstationid?: string
    callingstationid?: string
    acctterminatecause?: string
    servicetype?: string | null
    framedprotocol?: string | null
    framedipaddress?: string
    framedipv6address?: string
    framedipv6prefix?: string
    framedinterfaceid?: string
    delegatedipv6prefix?: string
    class?: string | null
  }

  export type radacctUpdateManyMutationInput = {
    radacctid?: BigIntFieldUpdateOperationsInput | bigint | number
    acctsessionid?: StringFieldUpdateOperationsInput | string
    acctuniqueid?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    realm?: NullableStringFieldUpdateOperationsInput | string | null
    nasipaddress?: StringFieldUpdateOperationsInput | string
    nasportid?: NullableStringFieldUpdateOperationsInput | string | null
    nasporttype?: NullableStringFieldUpdateOperationsInput | string | null
    acctstarttime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctupdatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctstoptime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctinterval?: NullableIntFieldUpdateOperationsInput | number | null
    acctsessiontime?: NullableIntFieldUpdateOperationsInput | number | null
    acctauthentic?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_start?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_stop?: NullableStringFieldUpdateOperationsInput | string | null
    acctinputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    acctoutputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    acctterminatecause?: StringFieldUpdateOperationsInput | string
    servicetype?: NullableStringFieldUpdateOperationsInput | string | null
    framedprotocol?: NullableStringFieldUpdateOperationsInput | string | null
    framedipaddress?: StringFieldUpdateOperationsInput | string
    framedipv6address?: StringFieldUpdateOperationsInput | string
    framedipv6prefix?: StringFieldUpdateOperationsInput | string
    framedinterfaceid?: StringFieldUpdateOperationsInput | string
    delegatedipv6prefix?: StringFieldUpdateOperationsInput | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radacctUncheckedUpdateManyInput = {
    radacctid?: BigIntFieldUpdateOperationsInput | bigint | number
    acctsessionid?: StringFieldUpdateOperationsInput | string
    acctuniqueid?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    realm?: NullableStringFieldUpdateOperationsInput | string | null
    nasipaddress?: StringFieldUpdateOperationsInput | string
    nasportid?: NullableStringFieldUpdateOperationsInput | string | null
    nasporttype?: NullableStringFieldUpdateOperationsInput | string | null
    acctstarttime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctupdatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctstoptime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acctinterval?: NullableIntFieldUpdateOperationsInput | number | null
    acctsessiontime?: NullableIntFieldUpdateOperationsInput | number | null
    acctauthentic?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_start?: NullableStringFieldUpdateOperationsInput | string | null
    connectinfo_stop?: NullableStringFieldUpdateOperationsInput | string | null
    acctinputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    acctoutputoctets?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    acctterminatecause?: StringFieldUpdateOperationsInput | string
    servicetype?: NullableStringFieldUpdateOperationsInput | string | null
    framedprotocol?: NullableStringFieldUpdateOperationsInput | string | null
    framedipaddress?: StringFieldUpdateOperationsInput | string
    framedipv6address?: StringFieldUpdateOperationsInput | string
    framedipv6prefix?: StringFieldUpdateOperationsInput | string
    framedinterfaceid?: StringFieldUpdateOperationsInput | string
    delegatedipv6prefix?: StringFieldUpdateOperationsInput | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radcheckCreateInput = {
    username?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radcheckUncheckedCreateInput = {
    id?: number
    username?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radcheckUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radcheckUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radcheckCreateManyInput = {
    id?: number
    username?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radcheckUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radcheckUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupcheckCreateInput = {
    groupname?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radgroupcheckUncheckedCreateInput = {
    id?: number
    groupname?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radgroupcheckUpdateInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupcheckUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupcheckCreateManyInput = {
    id?: number
    groupname?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radgroupcheckUpdateManyMutationInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupcheckUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupreplyCreateInput = {
    groupname?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radgroupreplyUncheckedCreateInput = {
    id?: number
    groupname?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radgroupreplyUpdateInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupreplyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupreplyCreateManyInput = {
    id?: number
    groupname?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radgroupreplyUpdateManyMutationInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radgroupreplyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    groupname?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radpostauthCreateInput = {
    username?: string
    pass?: string
    reply?: string
    authdate?: Date | string
    class?: string | null
  }

  export type radpostauthUncheckedCreateInput = {
    id?: number
    username?: string
    pass?: string
    reply?: string
    authdate?: Date | string
    class?: string | null
  }

  export type radpostauthUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    authdate?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radpostauthUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    authdate?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radpostauthCreateManyInput = {
    id?: number
    username?: string
    pass?: string
    reply?: string
    authdate?: Date | string
    class?: string | null
  }

  export type radpostauthUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    authdate?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radpostauthUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    authdate?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radreplyCreateInput = {
    username?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radreplyUncheckedCreateInput = {
    id?: number
    username?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radreplyUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radreplyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radreplyCreateManyInput = {
    id?: number
    username?: string
    attribute?: string
    op?: string
    value?: string
  }

  export type radreplyUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radreplyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    op?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type radusergroupCreateInput = {
    username?: string
    priority?: number
    groupMetadata?: GroupMetadataCreateNestedOneWithoutRadusergroupsInput
  }

  export type radusergroupUncheckedCreateInput = {
    id?: number
    username?: string
    groupname?: string
    priority?: number
  }

  export type radusergroupUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    groupMetadata?: GroupMetadataUpdateOneWithoutRadusergroupsNestedInput
  }

  export type radusergroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    groupname?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type radusergroupCreateManyInput = {
    id?: number
    username?: string
    groupname?: string
    priority?: number
  }

  export type radusergroupUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type radusergroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    groupname?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type userinfoCreateInput = {
    username: string
    type?: string
    fullName?: string
    department?: string
    createdBy?: string | null
    status?: string
  }

  export type userinfoUncheckedCreateInput = {
    id?: number
    username: string
    type?: string
    fullName?: string
    department?: string
    createdBy?: string | null
    status?: string
  }

  export type userinfoUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type userinfoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type userinfoCreateManyInput = {
    id?: number
    username: string
    type?: string
    fullName?: string
    department?: string
    createdBy?: string | null
    status?: string
  }

  export type userinfoUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type userinfoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type adminCreateInput = {
    username: string
    password: string
    role?: string
  }

  export type adminUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    role?: string
  }

  export type adminUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type adminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type adminCreateManyInput = {
    id?: number
    username: string
    password: string
    role?: string
  }

  export type adminUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type adminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMetadataCreateInput = {
    groupname: string
    type: string
    description?: string | null
    radusergroups?: radusergroupCreateNestedManyWithoutGroupMetadataInput
  }

  export type GroupMetadataUncheckedCreateInput = {
    groupname: string
    type: string
    description?: string | null
    radusergroups?: radusergroupUncheckedCreateNestedManyWithoutGroupMetadataInput
  }

  export type GroupMetadataUpdateInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    radusergroups?: radusergroupUpdateManyWithoutGroupMetadataNestedInput
  }

  export type GroupMetadataUncheckedUpdateInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    radusergroups?: radusergroupUncheckedUpdateManyWithoutGroupMetadataNestedInput
  }

  export type GroupMetadataCreateManyInput = {
    groupname: string
    type: string
    description?: string | null
  }

  export type GroupMetadataUpdateManyMutationInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GroupMetadataUncheckedUpdateManyInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiusPoolCreateInput = {
    name: string
    description?: string | null
  }

  export type RadiusPoolUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
  }

  export type RadiusPoolUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiusPoolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiusPoolCreateManyInput = {
    id?: number
    name: string
    description?: string | null
  }

  export type RadiusPoolUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiusPoolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radippoolCreateInput = {
    pool_name: string
    framedipaddress?: string
    nasipaddress?: string
    calledstationid: string
    callingstationid: string
    expiry_time?: Date | string | null
    username?: string
    pool_key: string
  }

  export type radippoolUncheckedCreateInput = {
    id?: number
    pool_name: string
    framedipaddress?: string
    nasipaddress?: string
    calledstationid: string
    callingstationid: string
    expiry_time?: Date | string | null
    username?: string
    pool_key: string
  }

  export type radippoolUpdateInput = {
    pool_name?: StringFieldUpdateOperationsInput | string
    framedipaddress?: StringFieldUpdateOperationsInput | string
    nasipaddress?: StringFieldUpdateOperationsInput | string
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    expiry_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: StringFieldUpdateOperationsInput | string
    pool_key?: StringFieldUpdateOperationsInput | string
  }

  export type radippoolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pool_name?: StringFieldUpdateOperationsInput | string
    framedipaddress?: StringFieldUpdateOperationsInput | string
    nasipaddress?: StringFieldUpdateOperationsInput | string
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    expiry_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: StringFieldUpdateOperationsInput | string
    pool_key?: StringFieldUpdateOperationsInput | string
  }

  export type radippoolCreateManyInput = {
    id?: number
    pool_name: string
    framedipaddress?: string
    nasipaddress?: string
    calledstationid: string
    callingstationid: string
    expiry_time?: Date | string | null
    username?: string
    pool_key: string
  }

  export type radippoolUpdateManyMutationInput = {
    pool_name?: StringFieldUpdateOperationsInput | string
    framedipaddress?: StringFieldUpdateOperationsInput | string
    nasipaddress?: StringFieldUpdateOperationsInput | string
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    expiry_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: StringFieldUpdateOperationsInput | string
    pool_key?: StringFieldUpdateOperationsInput | string
  }

  export type radippoolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pool_name?: StringFieldUpdateOperationsInput | string
    framedipaddress?: StringFieldUpdateOperationsInput | string
    nasipaddress?: StringFieldUpdateOperationsInput | string
    calledstationid?: StringFieldUpdateOperationsInput | string
    callingstationid?: StringFieldUpdateOperationsInput | string
    expiry_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: StringFieldUpdateOperationsInput | string
    pool_key?: StringFieldUpdateOperationsInput | string
  }

  export type MikrotikConfigCreateInput = {
    name: string
    host: string
    port?: number
    username: string
    password: string
    useSsl?: boolean
    wgPublicHost?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    peers?: WireguardPeerCreateNestedManyWithoutMikrotikInput
  }

  export type MikrotikConfigUncheckedCreateInput = {
    id?: number
    name: string
    host: string
    port?: number
    username: string
    password: string
    useSsl?: boolean
    wgPublicHost?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    peers?: WireguardPeerUncheckedCreateNestedManyWithoutMikrotikInput
  }

  export type MikrotikConfigUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    useSsl?: BoolFieldUpdateOperationsInput | boolean
    wgPublicHost?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    peers?: WireguardPeerUpdateManyWithoutMikrotikNestedInput
  }

  export type MikrotikConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    useSsl?: BoolFieldUpdateOperationsInput | boolean
    wgPublicHost?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    peers?: WireguardPeerUncheckedUpdateManyWithoutMikrotikNestedInput
  }

  export type MikrotikConfigCreateManyInput = {
    id?: number
    name: string
    host: string
    port?: number
    username: string
    password: string
    useSsl?: boolean
    wgPublicHost?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MikrotikConfigUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    useSsl?: BoolFieldUpdateOperationsInput | boolean
    wgPublicHost?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MikrotikConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    useSsl?: BoolFieldUpdateOperationsInput | boolean
    wgPublicHost?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WireguardPeerCreateInput = {
    mikrotikPeerId?: string | null
    name: string
    publicKey: string
    privateKey: string
    allowedIps: string
    interface?: string
    listenPort?: number | null
    endpoint?: string | null
    comment?: string | null
    createdAt?: Date | string
    mikrotik: MikrotikConfigCreateNestedOneWithoutPeersInput
  }

  export type WireguardPeerUncheckedCreateInput = {
    id?: number
    mikrotikId: number
    mikrotikPeerId?: string | null
    name: string
    publicKey: string
    privateKey: string
    allowedIps: string
    interface?: string
    listenPort?: number | null
    endpoint?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type WireguardPeerUpdateInput = {
    mikrotikPeerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    allowedIps?: StringFieldUpdateOperationsInput | string
    interface?: StringFieldUpdateOperationsInput | string
    listenPort?: NullableIntFieldUpdateOperationsInput | number | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mikrotik?: MikrotikConfigUpdateOneRequiredWithoutPeersNestedInput
  }

  export type WireguardPeerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mikrotikId?: IntFieldUpdateOperationsInput | number
    mikrotikPeerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    allowedIps?: StringFieldUpdateOperationsInput | string
    interface?: StringFieldUpdateOperationsInput | string
    listenPort?: NullableIntFieldUpdateOperationsInput | number | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WireguardPeerCreateManyInput = {
    id?: number
    mikrotikId: number
    mikrotikPeerId?: string | null
    name: string
    publicKey: string
    privateKey: string
    allowedIps: string
    interface?: string
    listenPort?: number | null
    endpoint?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type WireguardPeerUpdateManyMutationInput = {
    mikrotikPeerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    allowedIps?: StringFieldUpdateOperationsInput | string
    interface?: StringFieldUpdateOperationsInput | string
    listenPort?: NullableIntFieldUpdateOperationsInput | number | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WireguardPeerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mikrotikId?: IntFieldUpdateOperationsInput | number
    mikrotikPeerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    allowedIps?: StringFieldUpdateOperationsInput | string
    interface?: StringFieldUpdateOperationsInput | string
    listenPort?: NullableIntFieldUpdateOperationsInput | number | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WifiCreateInput = {
    ssid: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WifiUncheckedCreateInput = {
    id?: number
    ssid: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WifiUpdateInput = {
    ssid?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WifiUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ssid?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WifiCreateManyInput = {
    id?: number
    ssid: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WifiUpdateManyMutationInput = {
    ssid?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WifiUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ssid?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    timestamp?: Date | string
    adminUser: string
    action: string
    targetType: string
    targetName?: string | null
    details?: string | null
    ipAddress?: string | null
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    timestamp?: Date | string
    adminUser: string
    action: string
    targetType: string
    targetName?: string | null
    details?: string | null
    ipAddress?: string | null
  }

  export type AuditLogUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyInput = {
    id?: number
    timestamp?: Date | string
    adminUser: string
    action: string
    targetType: string
    targetName?: string | null
    details?: string | null
    ipAddress?: string | null
  }

  export type AuditLogUpdateManyMutationInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type nasOrderByRelevanceInput = {
    fields: nasOrderByRelevanceFieldEnum | nasOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type nasCountOrderByAggregateInput = {
    id?: SortOrder
    nasname?: SortOrder
    shortname?: SortOrder
    type?: SortOrder
    ports?: SortOrder
    secret?: SortOrder
    server?: SortOrder
    community?: SortOrder
    description?: SortOrder
  }

  export type nasAvgOrderByAggregateInput = {
    id?: SortOrder
    ports?: SortOrder
  }

  export type nasMaxOrderByAggregateInput = {
    id?: SortOrder
    nasname?: SortOrder
    shortname?: SortOrder
    type?: SortOrder
    ports?: SortOrder
    secret?: SortOrder
    server?: SortOrder
    community?: SortOrder
    description?: SortOrder
  }

  export type nasMinOrderByAggregateInput = {
    id?: SortOrder
    nasname?: SortOrder
    shortname?: SortOrder
    type?: SortOrder
    ports?: SortOrder
    secret?: SortOrder
    server?: SortOrder
    community?: SortOrder
    description?: SortOrder
  }

  export type nasSumOrderByAggregateInput = {
    id?: SortOrder
    ports?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type nasreloadOrderByRelevanceInput = {
    fields: nasreloadOrderByRelevanceFieldEnum | nasreloadOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type nasreloadCountOrderByAggregateInput = {
    nasipaddress?: SortOrder
    reloadtime?: SortOrder
  }

  export type nasreloadMaxOrderByAggregateInput = {
    nasipaddress?: SortOrder
    reloadtime?: SortOrder
  }

  export type nasreloadMinOrderByAggregateInput = {
    nasipaddress?: SortOrder
    reloadtime?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type radacctOrderByRelevanceInput = {
    fields: radacctOrderByRelevanceFieldEnum | radacctOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radacctCountOrderByAggregateInput = {
    radacctid?: SortOrder
    acctsessionid?: SortOrder
    acctuniqueid?: SortOrder
    username?: SortOrder
    realm?: SortOrder
    nasipaddress?: SortOrder
    nasportid?: SortOrder
    nasporttype?: SortOrder
    acctstarttime?: SortOrder
    acctupdatetime?: SortOrder
    acctstoptime?: SortOrder
    acctinterval?: SortOrder
    acctsessiontime?: SortOrder
    acctauthentic?: SortOrder
    connectinfo_start?: SortOrder
    connectinfo_stop?: SortOrder
    acctinputoctets?: SortOrder
    acctoutputoctets?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    acctterminatecause?: SortOrder
    servicetype?: SortOrder
    framedprotocol?: SortOrder
    framedipaddress?: SortOrder
    framedipv6address?: SortOrder
    framedipv6prefix?: SortOrder
    framedinterfaceid?: SortOrder
    delegatedipv6prefix?: SortOrder
    class?: SortOrder
  }

  export type radacctAvgOrderByAggregateInput = {
    radacctid?: SortOrder
    acctinterval?: SortOrder
    acctsessiontime?: SortOrder
    acctinputoctets?: SortOrder
    acctoutputoctets?: SortOrder
  }

  export type radacctMaxOrderByAggregateInput = {
    radacctid?: SortOrder
    acctsessionid?: SortOrder
    acctuniqueid?: SortOrder
    username?: SortOrder
    realm?: SortOrder
    nasipaddress?: SortOrder
    nasportid?: SortOrder
    nasporttype?: SortOrder
    acctstarttime?: SortOrder
    acctupdatetime?: SortOrder
    acctstoptime?: SortOrder
    acctinterval?: SortOrder
    acctsessiontime?: SortOrder
    acctauthentic?: SortOrder
    connectinfo_start?: SortOrder
    connectinfo_stop?: SortOrder
    acctinputoctets?: SortOrder
    acctoutputoctets?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    acctterminatecause?: SortOrder
    servicetype?: SortOrder
    framedprotocol?: SortOrder
    framedipaddress?: SortOrder
    framedipv6address?: SortOrder
    framedipv6prefix?: SortOrder
    framedinterfaceid?: SortOrder
    delegatedipv6prefix?: SortOrder
    class?: SortOrder
  }

  export type radacctMinOrderByAggregateInput = {
    radacctid?: SortOrder
    acctsessionid?: SortOrder
    acctuniqueid?: SortOrder
    username?: SortOrder
    realm?: SortOrder
    nasipaddress?: SortOrder
    nasportid?: SortOrder
    nasporttype?: SortOrder
    acctstarttime?: SortOrder
    acctupdatetime?: SortOrder
    acctstoptime?: SortOrder
    acctinterval?: SortOrder
    acctsessiontime?: SortOrder
    acctauthentic?: SortOrder
    connectinfo_start?: SortOrder
    connectinfo_stop?: SortOrder
    acctinputoctets?: SortOrder
    acctoutputoctets?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    acctterminatecause?: SortOrder
    servicetype?: SortOrder
    framedprotocol?: SortOrder
    framedipaddress?: SortOrder
    framedipv6address?: SortOrder
    framedipv6prefix?: SortOrder
    framedinterfaceid?: SortOrder
    delegatedipv6prefix?: SortOrder
    class?: SortOrder
  }

  export type radacctSumOrderByAggregateInput = {
    radacctid?: SortOrder
    acctinterval?: SortOrder
    acctsessiontime?: SortOrder
    acctinputoctets?: SortOrder
    acctoutputoctets?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type radcheckOrderByRelevanceInput = {
    fields: radcheckOrderByRelevanceFieldEnum | radcheckOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radcheckCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radcheckAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radcheckMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radcheckMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radcheckSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radgroupcheckOrderByRelevanceInput = {
    fields: radgroupcheckOrderByRelevanceFieldEnum | radgroupcheckOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radgroupcheckCountOrderByAggregateInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radgroupcheckAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radgroupcheckMaxOrderByAggregateInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radgroupcheckMinOrderByAggregateInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radgroupcheckSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radgroupreplyOrderByRelevanceInput = {
    fields: radgroupreplyOrderByRelevanceFieldEnum | radgroupreplyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radgroupreplyCountOrderByAggregateInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radgroupreplyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radgroupreplyMaxOrderByAggregateInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radgroupreplyMinOrderByAggregateInput = {
    id?: SortOrder
    groupname?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radgroupreplySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radpostauthOrderByRelevanceInput = {
    fields: radpostauthOrderByRelevanceFieldEnum | radpostauthOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radpostauthCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
    reply?: SortOrder
    authdate?: SortOrder
    class?: SortOrder
  }

  export type radpostauthAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radpostauthMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
    reply?: SortOrder
    authdate?: SortOrder
    class?: SortOrder
  }

  export type radpostauthMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pass?: SortOrder
    reply?: SortOrder
    authdate?: SortOrder
    class?: SortOrder
  }

  export type radpostauthSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radreplyOrderByRelevanceInput = {
    fields: radreplyOrderByRelevanceFieldEnum | radreplyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radreplyCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radreplyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radreplyMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radreplyMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    attribute?: SortOrder
    op?: SortOrder
    value?: SortOrder
  }

  export type radreplySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GroupMetadataNullableScalarRelationFilter = {
    is?: GroupMetadataWhereInput | null
    isNot?: GroupMetadataWhereInput | null
  }

  export type radusergroupOrderByRelevanceInput = {
    fields: radusergroupOrderByRelevanceFieldEnum | radusergroupOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radusergroupCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    groupname?: SortOrder
    priority?: SortOrder
  }

  export type radusergroupAvgOrderByAggregateInput = {
    id?: SortOrder
    priority?: SortOrder
  }

  export type radusergroupMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    groupname?: SortOrder
    priority?: SortOrder
  }

  export type radusergroupMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    groupname?: SortOrder
    priority?: SortOrder
  }

  export type radusergroupSumOrderByAggregateInput = {
    id?: SortOrder
    priority?: SortOrder
  }

  export type userinfoOrderByRelevanceInput = {
    fields: userinfoOrderByRelevanceFieldEnum | userinfoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type userinfoUsername_typeCompoundUniqueInput = {
    username: string
    type: string
  }

  export type userinfoCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    type?: SortOrder
    fullName?: SortOrder
    department?: SortOrder
    createdBy?: SortOrder
    status?: SortOrder
  }

  export type userinfoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type userinfoMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    type?: SortOrder
    fullName?: SortOrder
    department?: SortOrder
    createdBy?: SortOrder
    status?: SortOrder
  }

  export type userinfoMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    type?: SortOrder
    fullName?: SortOrder
    department?: SortOrder
    createdBy?: SortOrder
    status?: SortOrder
  }

  export type userinfoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type adminOrderByRelevanceInput = {
    fields: adminOrderByRelevanceFieldEnum | adminOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type adminCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type adminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type adminMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type adminMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type adminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RadusergroupListRelationFilter = {
    every?: radusergroupWhereInput
    some?: radusergroupWhereInput
    none?: radusergroupWhereInput
  }

  export type radusergroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupMetadataOrderByRelevanceInput = {
    fields: GroupMetadataOrderByRelevanceFieldEnum | GroupMetadataOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GroupMetadataCountOrderByAggregateInput = {
    groupname?: SortOrder
    type?: SortOrder
    description?: SortOrder
  }

  export type GroupMetadataMaxOrderByAggregateInput = {
    groupname?: SortOrder
    type?: SortOrder
    description?: SortOrder
  }

  export type GroupMetadataMinOrderByAggregateInput = {
    groupname?: SortOrder
    type?: SortOrder
    description?: SortOrder
  }

  export type RadiusPoolOrderByRelevanceInput = {
    fields: RadiusPoolOrderByRelevanceFieldEnum | RadiusPoolOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RadiusPoolCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type RadiusPoolAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RadiusPoolMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type RadiusPoolMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type RadiusPoolSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radippoolOrderByRelevanceInput = {
    fields: radippoolOrderByRelevanceFieldEnum | radippoolOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type radippoolCountOrderByAggregateInput = {
    id?: SortOrder
    pool_name?: SortOrder
    framedipaddress?: SortOrder
    nasipaddress?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    expiry_time?: SortOrder
    username?: SortOrder
    pool_key?: SortOrder
  }

  export type radippoolAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type radippoolMaxOrderByAggregateInput = {
    id?: SortOrder
    pool_name?: SortOrder
    framedipaddress?: SortOrder
    nasipaddress?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    expiry_time?: SortOrder
    username?: SortOrder
    pool_key?: SortOrder
  }

  export type radippoolMinOrderByAggregateInput = {
    id?: SortOrder
    pool_name?: SortOrder
    framedipaddress?: SortOrder
    nasipaddress?: SortOrder
    calledstationid?: SortOrder
    callingstationid?: SortOrder
    expiry_time?: SortOrder
    username?: SortOrder
    pool_key?: SortOrder
  }

  export type radippoolSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type WireguardPeerListRelationFilter = {
    every?: WireguardPeerWhereInput
    some?: WireguardPeerWhereInput
    none?: WireguardPeerWhereInput
  }

  export type WireguardPeerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MikrotikConfigOrderByRelevanceInput = {
    fields: MikrotikConfigOrderByRelevanceFieldEnum | MikrotikConfigOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MikrotikConfigCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    host?: SortOrder
    port?: SortOrder
    username?: SortOrder
    password?: SortOrder
    useSsl?: SortOrder
    wgPublicHost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MikrotikConfigAvgOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
  }

  export type MikrotikConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    host?: SortOrder
    port?: SortOrder
    username?: SortOrder
    password?: SortOrder
    useSsl?: SortOrder
    wgPublicHost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MikrotikConfigMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    host?: SortOrder
    port?: SortOrder
    username?: SortOrder
    password?: SortOrder
    useSsl?: SortOrder
    wgPublicHost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MikrotikConfigSumOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MikrotikConfigScalarRelationFilter = {
    is?: MikrotikConfigWhereInput
    isNot?: MikrotikConfigWhereInput
  }

  export type WireguardPeerOrderByRelevanceInput = {
    fields: WireguardPeerOrderByRelevanceFieldEnum | WireguardPeerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WireguardPeerCountOrderByAggregateInput = {
    id?: SortOrder
    mikrotikId?: SortOrder
    mikrotikPeerId?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    allowedIps?: SortOrder
    interface?: SortOrder
    listenPort?: SortOrder
    endpoint?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type WireguardPeerAvgOrderByAggregateInput = {
    id?: SortOrder
    mikrotikId?: SortOrder
    listenPort?: SortOrder
  }

  export type WireguardPeerMaxOrderByAggregateInput = {
    id?: SortOrder
    mikrotikId?: SortOrder
    mikrotikPeerId?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    allowedIps?: SortOrder
    interface?: SortOrder
    listenPort?: SortOrder
    endpoint?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type WireguardPeerMinOrderByAggregateInput = {
    id?: SortOrder
    mikrotikId?: SortOrder
    mikrotikPeerId?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    allowedIps?: SortOrder
    interface?: SortOrder
    listenPort?: SortOrder
    endpoint?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type WireguardPeerSumOrderByAggregateInput = {
    id?: SortOrder
    mikrotikId?: SortOrder
    listenPort?: SortOrder
  }

  export type WifiOrderByRelevanceInput = {
    fields: WifiOrderByRelevanceFieldEnum | WifiOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WifiCountOrderByAggregateInput = {
    id?: SortOrder
    ssid?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WifiAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WifiMaxOrderByAggregateInput = {
    id?: SortOrder
    ssid?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WifiMinOrderByAggregateInput = {
    id?: SortOrder
    ssid?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WifiSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditLogOrderByRelevanceInput = {
    fields: AuditLogOrderByRelevanceFieldEnum | AuditLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    adminUser?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetName?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    adminUser?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetName?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    adminUser?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetName?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type GroupMetadataCreateNestedOneWithoutRadusergroupsInput = {
    create?: XOR<GroupMetadataCreateWithoutRadusergroupsInput, GroupMetadataUncheckedCreateWithoutRadusergroupsInput>
    connectOrCreate?: GroupMetadataCreateOrConnectWithoutRadusergroupsInput
    connect?: GroupMetadataWhereUniqueInput
  }

  export type GroupMetadataUpdateOneWithoutRadusergroupsNestedInput = {
    create?: XOR<GroupMetadataCreateWithoutRadusergroupsInput, GroupMetadataUncheckedCreateWithoutRadusergroupsInput>
    connectOrCreate?: GroupMetadataCreateOrConnectWithoutRadusergroupsInput
    upsert?: GroupMetadataUpsertWithoutRadusergroupsInput
    disconnect?: GroupMetadataWhereInput | boolean
    delete?: GroupMetadataWhereInput | boolean
    connect?: GroupMetadataWhereUniqueInput
    update?: XOR<XOR<GroupMetadataUpdateToOneWithWhereWithoutRadusergroupsInput, GroupMetadataUpdateWithoutRadusergroupsInput>, GroupMetadataUncheckedUpdateWithoutRadusergroupsInput>
  }

  export type radusergroupCreateNestedManyWithoutGroupMetadataInput = {
    create?: XOR<radusergroupCreateWithoutGroupMetadataInput, radusergroupUncheckedCreateWithoutGroupMetadataInput> | radusergroupCreateWithoutGroupMetadataInput[] | radusergroupUncheckedCreateWithoutGroupMetadataInput[]
    connectOrCreate?: radusergroupCreateOrConnectWithoutGroupMetadataInput | radusergroupCreateOrConnectWithoutGroupMetadataInput[]
    createMany?: radusergroupCreateManyGroupMetadataInputEnvelope
    connect?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
  }

  export type radusergroupUncheckedCreateNestedManyWithoutGroupMetadataInput = {
    create?: XOR<radusergroupCreateWithoutGroupMetadataInput, radusergroupUncheckedCreateWithoutGroupMetadataInput> | radusergroupCreateWithoutGroupMetadataInput[] | radusergroupUncheckedCreateWithoutGroupMetadataInput[]
    connectOrCreate?: radusergroupCreateOrConnectWithoutGroupMetadataInput | radusergroupCreateOrConnectWithoutGroupMetadataInput[]
    createMany?: radusergroupCreateManyGroupMetadataInputEnvelope
    connect?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
  }

  export type radusergroupUpdateManyWithoutGroupMetadataNestedInput = {
    create?: XOR<radusergroupCreateWithoutGroupMetadataInput, radusergroupUncheckedCreateWithoutGroupMetadataInput> | radusergroupCreateWithoutGroupMetadataInput[] | radusergroupUncheckedCreateWithoutGroupMetadataInput[]
    connectOrCreate?: radusergroupCreateOrConnectWithoutGroupMetadataInput | radusergroupCreateOrConnectWithoutGroupMetadataInput[]
    upsert?: radusergroupUpsertWithWhereUniqueWithoutGroupMetadataInput | radusergroupUpsertWithWhereUniqueWithoutGroupMetadataInput[]
    createMany?: radusergroupCreateManyGroupMetadataInputEnvelope
    set?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    disconnect?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    delete?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    connect?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    update?: radusergroupUpdateWithWhereUniqueWithoutGroupMetadataInput | radusergroupUpdateWithWhereUniqueWithoutGroupMetadataInput[]
    updateMany?: radusergroupUpdateManyWithWhereWithoutGroupMetadataInput | radusergroupUpdateManyWithWhereWithoutGroupMetadataInput[]
    deleteMany?: radusergroupScalarWhereInput | radusergroupScalarWhereInput[]
  }

  export type radusergroupUncheckedUpdateManyWithoutGroupMetadataNestedInput = {
    create?: XOR<radusergroupCreateWithoutGroupMetadataInput, radusergroupUncheckedCreateWithoutGroupMetadataInput> | radusergroupCreateWithoutGroupMetadataInput[] | radusergroupUncheckedCreateWithoutGroupMetadataInput[]
    connectOrCreate?: radusergroupCreateOrConnectWithoutGroupMetadataInput | radusergroupCreateOrConnectWithoutGroupMetadataInput[]
    upsert?: radusergroupUpsertWithWhereUniqueWithoutGroupMetadataInput | radusergroupUpsertWithWhereUniqueWithoutGroupMetadataInput[]
    createMany?: radusergroupCreateManyGroupMetadataInputEnvelope
    set?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    disconnect?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    delete?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    connect?: radusergroupWhereUniqueInput | radusergroupWhereUniqueInput[]
    update?: radusergroupUpdateWithWhereUniqueWithoutGroupMetadataInput | radusergroupUpdateWithWhereUniqueWithoutGroupMetadataInput[]
    updateMany?: radusergroupUpdateManyWithWhereWithoutGroupMetadataInput | radusergroupUpdateManyWithWhereWithoutGroupMetadataInput[]
    deleteMany?: radusergroupScalarWhereInput | radusergroupScalarWhereInput[]
  }

  export type WireguardPeerCreateNestedManyWithoutMikrotikInput = {
    create?: XOR<WireguardPeerCreateWithoutMikrotikInput, WireguardPeerUncheckedCreateWithoutMikrotikInput> | WireguardPeerCreateWithoutMikrotikInput[] | WireguardPeerUncheckedCreateWithoutMikrotikInput[]
    connectOrCreate?: WireguardPeerCreateOrConnectWithoutMikrotikInput | WireguardPeerCreateOrConnectWithoutMikrotikInput[]
    createMany?: WireguardPeerCreateManyMikrotikInputEnvelope
    connect?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
  }

  export type WireguardPeerUncheckedCreateNestedManyWithoutMikrotikInput = {
    create?: XOR<WireguardPeerCreateWithoutMikrotikInput, WireguardPeerUncheckedCreateWithoutMikrotikInput> | WireguardPeerCreateWithoutMikrotikInput[] | WireguardPeerUncheckedCreateWithoutMikrotikInput[]
    connectOrCreate?: WireguardPeerCreateOrConnectWithoutMikrotikInput | WireguardPeerCreateOrConnectWithoutMikrotikInput[]
    createMany?: WireguardPeerCreateManyMikrotikInputEnvelope
    connect?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type WireguardPeerUpdateManyWithoutMikrotikNestedInput = {
    create?: XOR<WireguardPeerCreateWithoutMikrotikInput, WireguardPeerUncheckedCreateWithoutMikrotikInput> | WireguardPeerCreateWithoutMikrotikInput[] | WireguardPeerUncheckedCreateWithoutMikrotikInput[]
    connectOrCreate?: WireguardPeerCreateOrConnectWithoutMikrotikInput | WireguardPeerCreateOrConnectWithoutMikrotikInput[]
    upsert?: WireguardPeerUpsertWithWhereUniqueWithoutMikrotikInput | WireguardPeerUpsertWithWhereUniqueWithoutMikrotikInput[]
    createMany?: WireguardPeerCreateManyMikrotikInputEnvelope
    set?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    disconnect?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    delete?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    connect?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    update?: WireguardPeerUpdateWithWhereUniqueWithoutMikrotikInput | WireguardPeerUpdateWithWhereUniqueWithoutMikrotikInput[]
    updateMany?: WireguardPeerUpdateManyWithWhereWithoutMikrotikInput | WireguardPeerUpdateManyWithWhereWithoutMikrotikInput[]
    deleteMany?: WireguardPeerScalarWhereInput | WireguardPeerScalarWhereInput[]
  }

  export type WireguardPeerUncheckedUpdateManyWithoutMikrotikNestedInput = {
    create?: XOR<WireguardPeerCreateWithoutMikrotikInput, WireguardPeerUncheckedCreateWithoutMikrotikInput> | WireguardPeerCreateWithoutMikrotikInput[] | WireguardPeerUncheckedCreateWithoutMikrotikInput[]
    connectOrCreate?: WireguardPeerCreateOrConnectWithoutMikrotikInput | WireguardPeerCreateOrConnectWithoutMikrotikInput[]
    upsert?: WireguardPeerUpsertWithWhereUniqueWithoutMikrotikInput | WireguardPeerUpsertWithWhereUniqueWithoutMikrotikInput[]
    createMany?: WireguardPeerCreateManyMikrotikInputEnvelope
    set?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    disconnect?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    delete?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    connect?: WireguardPeerWhereUniqueInput | WireguardPeerWhereUniqueInput[]
    update?: WireguardPeerUpdateWithWhereUniqueWithoutMikrotikInput | WireguardPeerUpdateWithWhereUniqueWithoutMikrotikInput[]
    updateMany?: WireguardPeerUpdateManyWithWhereWithoutMikrotikInput | WireguardPeerUpdateManyWithWhereWithoutMikrotikInput[]
    deleteMany?: WireguardPeerScalarWhereInput | WireguardPeerScalarWhereInput[]
  }

  export type MikrotikConfigCreateNestedOneWithoutPeersInput = {
    create?: XOR<MikrotikConfigCreateWithoutPeersInput, MikrotikConfigUncheckedCreateWithoutPeersInput>
    connectOrCreate?: MikrotikConfigCreateOrConnectWithoutPeersInput
    connect?: MikrotikConfigWhereUniqueInput
  }

  export type MikrotikConfigUpdateOneRequiredWithoutPeersNestedInput = {
    create?: XOR<MikrotikConfigCreateWithoutPeersInput, MikrotikConfigUncheckedCreateWithoutPeersInput>
    connectOrCreate?: MikrotikConfigCreateOrConnectWithoutPeersInput
    upsert?: MikrotikConfigUpsertWithoutPeersInput
    connect?: MikrotikConfigWhereUniqueInput
    update?: XOR<XOR<MikrotikConfigUpdateToOneWithWhereWithoutPeersInput, MikrotikConfigUpdateWithoutPeersInput>, MikrotikConfigUncheckedUpdateWithoutPeersInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GroupMetadataCreateWithoutRadusergroupsInput = {
    groupname: string
    type: string
    description?: string | null
  }

  export type GroupMetadataUncheckedCreateWithoutRadusergroupsInput = {
    groupname: string
    type: string
    description?: string | null
  }

  export type GroupMetadataCreateOrConnectWithoutRadusergroupsInput = {
    where: GroupMetadataWhereUniqueInput
    create: XOR<GroupMetadataCreateWithoutRadusergroupsInput, GroupMetadataUncheckedCreateWithoutRadusergroupsInput>
  }

  export type GroupMetadataUpsertWithoutRadusergroupsInput = {
    update: XOR<GroupMetadataUpdateWithoutRadusergroupsInput, GroupMetadataUncheckedUpdateWithoutRadusergroupsInput>
    create: XOR<GroupMetadataCreateWithoutRadusergroupsInput, GroupMetadataUncheckedCreateWithoutRadusergroupsInput>
    where?: GroupMetadataWhereInput
  }

  export type GroupMetadataUpdateToOneWithWhereWithoutRadusergroupsInput = {
    where?: GroupMetadataWhereInput
    data: XOR<GroupMetadataUpdateWithoutRadusergroupsInput, GroupMetadataUncheckedUpdateWithoutRadusergroupsInput>
  }

  export type GroupMetadataUpdateWithoutRadusergroupsInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GroupMetadataUncheckedUpdateWithoutRadusergroupsInput = {
    groupname?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type radusergroupCreateWithoutGroupMetadataInput = {
    username?: string
    priority?: number
  }

  export type radusergroupUncheckedCreateWithoutGroupMetadataInput = {
    id?: number
    username?: string
    priority?: number
  }

  export type radusergroupCreateOrConnectWithoutGroupMetadataInput = {
    where: radusergroupWhereUniqueInput
    create: XOR<radusergroupCreateWithoutGroupMetadataInput, radusergroupUncheckedCreateWithoutGroupMetadataInput>
  }

  export type radusergroupCreateManyGroupMetadataInputEnvelope = {
    data: radusergroupCreateManyGroupMetadataInput | radusergroupCreateManyGroupMetadataInput[]
    skipDuplicates?: boolean
  }

  export type radusergroupUpsertWithWhereUniqueWithoutGroupMetadataInput = {
    where: radusergroupWhereUniqueInput
    update: XOR<radusergroupUpdateWithoutGroupMetadataInput, radusergroupUncheckedUpdateWithoutGroupMetadataInput>
    create: XOR<radusergroupCreateWithoutGroupMetadataInput, radusergroupUncheckedCreateWithoutGroupMetadataInput>
  }

  export type radusergroupUpdateWithWhereUniqueWithoutGroupMetadataInput = {
    where: radusergroupWhereUniqueInput
    data: XOR<radusergroupUpdateWithoutGroupMetadataInput, radusergroupUncheckedUpdateWithoutGroupMetadataInput>
  }

  export type radusergroupUpdateManyWithWhereWithoutGroupMetadataInput = {
    where: radusergroupScalarWhereInput
    data: XOR<radusergroupUpdateManyMutationInput, radusergroupUncheckedUpdateManyWithoutGroupMetadataInput>
  }

  export type radusergroupScalarWhereInput = {
    AND?: radusergroupScalarWhereInput | radusergroupScalarWhereInput[]
    OR?: radusergroupScalarWhereInput[]
    NOT?: radusergroupScalarWhereInput | radusergroupScalarWhereInput[]
    id?: IntFilter<"radusergroup"> | number
    username?: StringFilter<"radusergroup"> | string
    groupname?: StringFilter<"radusergroup"> | string
    priority?: IntFilter<"radusergroup"> | number
  }

  export type WireguardPeerCreateWithoutMikrotikInput = {
    mikrotikPeerId?: string | null
    name: string
    publicKey: string
    privateKey: string
    allowedIps: string
    interface?: string
    listenPort?: number | null
    endpoint?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type WireguardPeerUncheckedCreateWithoutMikrotikInput = {
    id?: number
    mikrotikPeerId?: string | null
    name: string
    publicKey: string
    privateKey: string
    allowedIps: string
    interface?: string
    listenPort?: number | null
    endpoint?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type WireguardPeerCreateOrConnectWithoutMikrotikInput = {
    where: WireguardPeerWhereUniqueInput
    create: XOR<WireguardPeerCreateWithoutMikrotikInput, WireguardPeerUncheckedCreateWithoutMikrotikInput>
  }

  export type WireguardPeerCreateManyMikrotikInputEnvelope = {
    data: WireguardPeerCreateManyMikrotikInput | WireguardPeerCreateManyMikrotikInput[]
    skipDuplicates?: boolean
  }

  export type WireguardPeerUpsertWithWhereUniqueWithoutMikrotikInput = {
    where: WireguardPeerWhereUniqueInput
    update: XOR<WireguardPeerUpdateWithoutMikrotikInput, WireguardPeerUncheckedUpdateWithoutMikrotikInput>
    create: XOR<WireguardPeerCreateWithoutMikrotikInput, WireguardPeerUncheckedCreateWithoutMikrotikInput>
  }

  export type WireguardPeerUpdateWithWhereUniqueWithoutMikrotikInput = {
    where: WireguardPeerWhereUniqueInput
    data: XOR<WireguardPeerUpdateWithoutMikrotikInput, WireguardPeerUncheckedUpdateWithoutMikrotikInput>
  }

  export type WireguardPeerUpdateManyWithWhereWithoutMikrotikInput = {
    where: WireguardPeerScalarWhereInput
    data: XOR<WireguardPeerUpdateManyMutationInput, WireguardPeerUncheckedUpdateManyWithoutMikrotikInput>
  }

  export type WireguardPeerScalarWhereInput = {
    AND?: WireguardPeerScalarWhereInput | WireguardPeerScalarWhereInput[]
    OR?: WireguardPeerScalarWhereInput[]
    NOT?: WireguardPeerScalarWhereInput | WireguardPeerScalarWhereInput[]
    id?: IntFilter<"WireguardPeer"> | number
    mikrotikId?: IntFilter<"WireguardPeer"> | number
    mikrotikPeerId?: StringNullableFilter<"WireguardPeer"> | string | null
    name?: StringFilter<"WireguardPeer"> | string
    publicKey?: StringFilter<"WireguardPeer"> | string
    privateKey?: StringFilter<"WireguardPeer"> | string
    allowedIps?: StringFilter<"WireguardPeer"> | string
    interface?: StringFilter<"WireguardPeer"> | string
    listenPort?: IntNullableFilter<"WireguardPeer"> | number | null
    endpoint?: StringNullableFilter<"WireguardPeer"> | string | null
    comment?: StringNullableFilter<"WireguardPeer"> | string | null
    createdAt?: DateTimeFilter<"WireguardPeer"> | Date | string
  }

  export type MikrotikConfigCreateWithoutPeersInput = {
    name: string
    host: string
    port?: number
    username: string
    password: string
    useSsl?: boolean
    wgPublicHost?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MikrotikConfigUncheckedCreateWithoutPeersInput = {
    id?: number
    name: string
    host: string
    port?: number
    username: string
    password: string
    useSsl?: boolean
    wgPublicHost?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MikrotikConfigCreateOrConnectWithoutPeersInput = {
    where: MikrotikConfigWhereUniqueInput
    create: XOR<MikrotikConfigCreateWithoutPeersInput, MikrotikConfigUncheckedCreateWithoutPeersInput>
  }

  export type MikrotikConfigUpsertWithoutPeersInput = {
    update: XOR<MikrotikConfigUpdateWithoutPeersInput, MikrotikConfigUncheckedUpdateWithoutPeersInput>
    create: XOR<MikrotikConfigCreateWithoutPeersInput, MikrotikConfigUncheckedCreateWithoutPeersInput>
    where?: MikrotikConfigWhereInput
  }

  export type MikrotikConfigUpdateToOneWithWhereWithoutPeersInput = {
    where?: MikrotikConfigWhereInput
    data: XOR<MikrotikConfigUpdateWithoutPeersInput, MikrotikConfigUncheckedUpdateWithoutPeersInput>
  }

  export type MikrotikConfigUpdateWithoutPeersInput = {
    name?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    useSsl?: BoolFieldUpdateOperationsInput | boolean
    wgPublicHost?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MikrotikConfigUncheckedUpdateWithoutPeersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    useSsl?: BoolFieldUpdateOperationsInput | boolean
    wgPublicHost?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type radusergroupCreateManyGroupMetadataInput = {
    id?: number
    username?: string
    priority?: number
  }

  export type radusergroupUpdateWithoutGroupMetadataInput = {
    username?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type radusergroupUncheckedUpdateWithoutGroupMetadataInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type radusergroupUncheckedUpdateManyWithoutGroupMetadataInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type WireguardPeerCreateManyMikrotikInput = {
    id?: number
    mikrotikPeerId?: string | null
    name: string
    publicKey: string
    privateKey: string
    allowedIps: string
    interface?: string
    listenPort?: number | null
    endpoint?: string | null
    comment?: string | null
    createdAt?: Date | string
  }

  export type WireguardPeerUpdateWithoutMikrotikInput = {
    mikrotikPeerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    allowedIps?: StringFieldUpdateOperationsInput | string
    interface?: StringFieldUpdateOperationsInput | string
    listenPort?: NullableIntFieldUpdateOperationsInput | number | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WireguardPeerUncheckedUpdateWithoutMikrotikInput = {
    id?: IntFieldUpdateOperationsInput | number
    mikrotikPeerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    allowedIps?: StringFieldUpdateOperationsInput | string
    interface?: StringFieldUpdateOperationsInput | string
    listenPort?: NullableIntFieldUpdateOperationsInput | number | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WireguardPeerUncheckedUpdateManyWithoutMikrotikInput = {
    id?: IntFieldUpdateOperationsInput | number
    mikrotikPeerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    allowedIps?: StringFieldUpdateOperationsInput | string
    interface?: StringFieldUpdateOperationsInput | string
    listenPort?: NullableIntFieldUpdateOperationsInput | number | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}