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

// src/http/controllers/Task/routes.ts
var routes_exports = {};
__export(routes_exports, {
  taskRoutes: () => taskRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/enum/status.ts
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["done"] = "done";
  Status2["progress"] = "progress";
  return Status2;
})(Status || {});

// src/lib/prisma.ts
var import_client = require("@prisma/client");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = __toESM(require("zod"), 1);
var envSchema = import_zod.default.object({
  NODE_ENV: import_zod.default.enum(["dev", "test", "production"]).default("dev"),
  JWT_SERCRET: import_zod.default.string(),
  PORT: import_zod.default.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success == false) {
  console.error("Invalid environment variable", _env.error.format());
  throw new Error("Invalid environment variable");
}
var env = _env.data;

// src/lib/prisma.ts
var prisma = new import_client.PrismaClient({
  log: env?.NODE_ENV == "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-task-repository.ts
var PrismaTaskRepository = class {
  async findById(id) {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    });
    return task;
  }
  async searchMany(query, page) {
    const task = await prisma.task.findMany({
      where: {
        title: { contains: query, mode: "insensitive" }
      },
      take: 20,
      skip: (page - 1) * 20
    });
    return task;
  }
  async create(data) {
    const task = await prisma.task.create({
      data
    });
    return task;
  }
  async save(data) {
    const taskUpdate = await prisma.task.update({
      where: {
        id: data.id
      },
      data
    });
    return taskUpdate;
  }
  async delete(id) {
    await prisma.task.delete({
      where: {
        id
      }
    });
  }
};

// src/use-cases/create-task.ts
var CreateTaskUseCase = class {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  async execute({
    title,
    description,
    status,
    userId
  }) {
    const task = await this.taskRepository.create({
      title,
      description,
      status,
      user: {
        connect: { id: userId }
      }
    });
    return {
      task
    };
  }
};

// src/use-cases/factories/make-create-task-use-case.ts
function makeCreateTaskUseCase() {
  const taskRepository = new PrismaTaskRepository();
  const createTask = new CreateTaskUseCase(taskRepository);
  return createTask;
}

// src/http/controllers/Task/create.ts
var import_zod2 = __toESM(require("zod"), 1);
async function create(request, reply) {
  const createTaskBodySchema = import_zod2.default.object({
    title: import_zod2.default.string(),
    description: import_zod2.default.string(),
    status: import_zod2.default.nativeEnum(Status)
  });
  const { title, description, status } = createTaskBodySchema.parse(request.body);
  const createTask = makeCreateTaskUseCase();
  await createTask.execute({
    title,
    description,
    status,
    userId: request.user.sub
  });
  return reply.status(201).send();
}

// src/use-cases/search-task.ts
var SearchTaskUseCase = class {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  async execute({
    query,
    page
  }) {
    const task = await this.taskRepository.searchMany(query, page);
    return {
      task
    };
  }
};

// src/use-cases/factories/make-search-task-use-case.ts
function makeSearchTaskUseCase() {
  const taskRepository = new PrismaTaskRepository();
  const searchTask = new SearchTaskUseCase(taskRepository);
  return searchTask;
}

// src/http/controllers/Task/search.ts
var import_zod3 = __toESM(require("zod"), 1);
async function search(request, reply) {
  const searchTaskBodySchema = import_zod3.default.object({
    q: import_zod3.default.string(),
    page: import_zod3.default.coerce.number().min(1).default(1)
  });
  const { q, page } = searchTaskBodySchema.parse(request.query);
  const searchTaskUseCase = makeSearchTaskUseCase();
  const { task } = await searchTaskUseCase.execute({
    query: q,
    page
  });
  return reply.status(200).send({
    task
  });
}

// src/http/middlewares/verify-jwt.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}

// src/use-cases/delete-task.ts
var DeleteTaskUseCase = class {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  async execute({
    id
  }) {
    const task = await this.taskRepository.delete(id);
  }
};

// src/use-cases/factories/make-delete-task-use-case.ts
function makeDeleteUseCase() {
  const taskRepository = new PrismaTaskRepository();
  const deleteTask2 = new DeleteTaskUseCase(taskRepository);
  return deleteTask2;
}

// src/http/controllers/Task/delete.ts
var import_zod4 = __toESM(require("zod"), 1);
async function deleteTask(request, reply) {
  const deleteTaskParamsSchema = import_zod4.default.object({
    taskId: import_zod4.default.string().uuid()
  });
  console.log("PARAMS", request.params);
  const { taskId } = deleteTaskParamsSchema.parse(request.params);
  const deleteUseCase = makeDeleteUseCase();
  await deleteUseCase.execute({
    id: taskId
  });
  return reply.status(204).send();
}

// src/use-cases/save-task.ts
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

// src/use-cases/factories/make-save-task-use-case.ts
function makeSaveUseCase() {
  const taskRepository = new PrismaTaskRepository();
  const saveTask2 = new SaveTaskUseCase(taskRepository);
  return saveTask2;
}

// src/http/controllers/Task/save.ts
var import_zod5 = __toESM(require("zod"), 1);
async function saveTask(request, reply) {
  const saveTaskBodySchema = import_zod5.default.object({
    title: import_zod5.default.string(),
    description: import_zod5.default.string(),
    status: import_zod5.default.nativeEnum(Status)
  });
  const saveTaskParamsSchema = import_zod5.default.object({
    taskId: import_zod5.default.string().uuid()
  });
  const { taskId } = saveTaskParamsSchema.parse(request.params);
  const { title, description, status } = saveTaskBodySchema.parse(request.body);
  const saveUseCase = makeSaveUseCase();
  await saveUseCase.execute({
    id: taskId,
    title,
    description,
    status,
    updated_at: /* @__PURE__ */ new Date(),
    user_id: request.user.sub
  });
  return reply.status(200).send({ message: "Task updated successfully" });
}

// src/http/controllers/Task/routes.ts
function taskRoutes(app) {
  app.addHook("onRequest", verifyJWT);
  app.post("/tasks", create);
  app.get("/tasks/search", search);
  app.delete("/tasks/:taskId/delete", deleteTask);
  app.patch("/tasks/:taskId/save", saveTask);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskRoutes
});
