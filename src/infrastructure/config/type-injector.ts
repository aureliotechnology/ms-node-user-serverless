// types.ts

const TYPES = {
    IUserUC: Symbol.for("IUserUC"),
    LambdaHandler: Symbol.for("LambdaHandler",),
    DatabaseAdapter: Symbol.for("DatabaseAdapter",),
    MongoConnectionService: Symbol.for("MongoConnectionService",),
    PostgresAdapter: Symbol.for("PostgresAdapter",),
};

export { TYPES };
