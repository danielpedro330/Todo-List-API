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

// src/generated/prisma/browser.ts
var browser_exports = {};
__export(browser_exports, {
  $Enums: () => enums_exports,
  Prisma: () => prismaNamespaceBrowser_exports
});
module.exports = __toCommonJS(browser_exports);

// src/generated/prisma/internal/prismaNamespaceBrowser.ts
var prismaNamespaceBrowser_exports = {};
__export(prismaNamespaceBrowser_exports, {
  AnyNull: () => AnyNull,
  DbNull: () => DbNull,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  TaskScalarFieldEnum: () => TaskScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum
});
var runtime = __toESM(require("@prisma/client/runtime/index-browser"), 1);
var Decimal2 = runtime.Decimal;
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

// src/generated/prisma/enums.ts
var enums_exports = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $Enums,
  Prisma
});
