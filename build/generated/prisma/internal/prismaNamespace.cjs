"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull,
  DbNull: () => DbNull,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TaskScalarFieldEnum: () => TaskScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
module.exports = __toCommonJS(prismaNamespace_exports);
var runtime = __toESM(require("@prisma/client/runtime/library"), 1);
var PrismaClientKnownRequestError2 = runtime.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime.PrismaClientValidationError;
var sql = runtime.sqltag;
var empty2 = runtime.empty;
var join2 = runtime.join;
var raw2 = runtime.raw;
var Sql2 = runtime.Sql;
var Decimal2 = runtime.Decimal;
var getExtensionContext = runtime.Extensions.getExtensionContext;
var prismaVersion = {
  client: "6.19.0",
  engine: "2ba551f319ab1df4bc874a89965d8b3641056773"
};
var NullTypes = {
  DbNull: runtime.objectEnumValues.classes.DbNull,
  JsonNull: runtime.objectEnumValues.classes.JsonNull,
  AnyNull: runtime.objectEnumValues.classes.AnyNull
};
var DbNull = runtime.objectEnumValues.instances.DbNull;
var JsonNull = runtime.objectEnumValues.instances.JsonNull;
var AnyNull = runtime.objectEnumValues.instances.AnyNull;
var ModelName = {
  User: "User",
  Task: "Task"
};
var TransactionIsolationLevel = runtime.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  created_at: "created_at"
};
var TaskScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  status: "status",
  created_at: "created_at",
  user_id: "user_id"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var defineExtension = runtime.Extensions.defineExtension;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnyNull,
  DbNull,
  Decimal,
  JsonNull,
  ModelName,
  NullTypes,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  QueryMode,
  SortOrder,
  Sql,
  TaskScalarFieldEnum,
  TransactionIsolationLevel,
  UserScalarFieldEnum,
  defineExtension,
  empty,
  getExtensionContext,
  join,
  prismaVersion,
  raw,
  sql
});
