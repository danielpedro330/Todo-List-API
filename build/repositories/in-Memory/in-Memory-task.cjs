"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/repositories/in-Memory/in-Memory-task.ts
var in_Memory_task_exports = {};
__export(in_Memory_task_exports, {
  InMemoryTaskRepository: () => InMemoryTaskRepository
});
module.exports = __toCommonJS(in_Memory_task_exports);
var import_node_crypto = require("crypto");
var InMemoryTaskRepository = class {
  items = [];
  async findById(id) {
    const task = this.items.find((item) => item.id === id);
    if (!task) {
      return null;
    }
    return task;
  }
  async searchMany(query, page) {
    return this.items.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20);
  }
  async create(data) {
    const task = {
      id: (0, import_node_crypto.randomUUID)(),
      title: data.title,
      description: data.description,
      status: data.status,
      user_id: data.user?.connect?.id ?? data.user_id ?? "",
      created_at: /* @__PURE__ */ new Date(),
      updated_at: /* @__PURE__ */ new Date()
    };
    this.items.push(task);
    return task;
  }
  async save(task) {
    const taskIndex = this.items.findIndex((item) => item.id == task.id);
    if (taskIndex >= 0) {
      this.items[taskIndex] = task;
    }
    return task;
  }
  async delete(id) {
    const taskIndex = this.items.findIndex((item) => item.id == id);
    if (taskIndex >= 0) {
      this.items.splice(taskIndex, 1);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryTaskRepository
});
