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

// src/use-cases/save-task.ts
var save_task_exports = {};
__export(save_task_exports, {
  SaveTaskUseCase: () => SaveTaskUseCase
});
module.exports = __toCommonJS(save_task_exports);
var SaveTaskUseCase = class {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  async execute({
    id,
    title,
    description,
    status,
    created_at,
    updated_at,
    user_id
  }) {
    const task = await this.taskRepository.save({
      id,
      title,
      description,
      status,
      created_at: created_at ?? /* @__PURE__ */ new Date(),
      updated_at: /* @__PURE__ */ new Date(),
      user_id
    });
    return {
      task
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SaveTaskUseCase
});
