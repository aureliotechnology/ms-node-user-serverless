// types.ts

const TYPES = {
    IUserSaveUC: Symbol.for("IUserSaveUC"),
    IUserUpdateUC: Symbol.for("IUserUpdateUC",),
    IUserViewUC: Symbol.for("IUserViewUC"),
    LambdaHandler: Symbol.for("LambdaHandler",),
    DatabaseAdapter: Symbol.for("DatabaseAdapter",),
    MongoConnectionService: Symbol.for("MongoConnectionService",),
};

export { TYPES };
