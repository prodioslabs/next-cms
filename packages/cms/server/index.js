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

// src/server/index.ts
var server_exports = {};
__export(server_exports, {
  authHandler: () => authHandler,
  createPluginHandler: () => createPluginHandler,
  createTRPCHandler: () => createTRPCHandler,
  uploadAssetHandler: () => uploadAssetHandler
});
module.exports = __toCommonJS(server_exports);

// src/server/plugin-handler.ts
var import_server = require("next/server");
function createPluginHandler(config) {
  async function GET(request, { params: { plugin } }) {
    var _a2, _b;
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && ((_a2 = pluginConfig.api) == null ? void 0 : _a2.method) === "GET") {
        return (_b = pluginConfig == null ? void 0 : pluginConfig.api) == null ? void 0 : _b.handler(request);
      }
    }
    return import_server.NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  async function POST(request, { params: { plugin } }) {
    var _a2, _b;
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && ((_a2 = pluginConfig.api) == null ? void 0 : _a2.method) === "POST") {
        return (_b = pluginConfig == null ? void 0 : pluginConfig.api) == null ? void 0 : _b.handler(request);
      }
    }
    return import_server.NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return { GET, POST };
}

// src/server/trpc-handler.ts
var import_fetch = require("@trpc/server/adapters/fetch");
var import_next_auth = require("next-auth");

// src/core/db.ts
var import_client = require("@prisma/client");

// src/env.ts
var import_env_nextjs = require("@t3-oss/env-nextjs");
var import_zod = require("zod");
var env = (0, import_env_nextjs.createEnv)({
  server: {
    /**
     * Next.js environment variables
     */
    NODE_ENV: import_zod.z.enum(["development", "production"]),
    NEXT_RUNTIME: import_zod.z.enum(["nodejs", "edge"]).optional(),
    /**
     * NextCMS configuration
     */
    DATABASE_URL: import_zod.z.string().min(1),
    NEXTAUTH_URL: import_zod.z.string().min(1),
    NEXTAUTH_SECRET: import_zod.z.string().min(1),
    ADMIN_EMAIL: import_zod.z.string().email(),
    ADMIN_PASSWORD: import_zod.z.string(),
    /**
     * AI-Content Plugin
     */
    OPENAI_API_KEY: import_zod.z.string().min(1).optional(),
    /**
     * Unsplash Plugin
     */
    UNSPLASH_ACCESS_KEY: import_zod.z.string().min(1).optional(),
    UNSPLASH_SECRET_KEY: import_zod.z.string().min(1).optional()
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY
  }
});

// src/core/db.ts
var globalForPrisma = globalThis;
var prisma;
var _a;
if (typeof window === "undefined" && env.NEXT_RUNTIME === "nodejs") {
  prisma = (_a = globalForPrisma.prisma) != null ? _a : new import_client.PrismaClient({
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
  if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

// src/core/auth.ts
var import_credentials = __toESM(require("next-auth/providers/credentials"));
var authOptions = {
  pages: {
    signIn: "/cms/admin/login",
    signOut: "/cms/admin/logout"
  },
  providers: [
    (0, import_credentials.default)({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@xyz.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if ((credentials == null ? void 0 : credentials.email) === env.ADMIN_EMAIL && (credentials == null ? void 0 : credentials.password) === env.ADMIN_PASSWORD) {
          return { id: credentials.email, email: credentials.email };
        }
        return null;
      }
    })
  ]
};

// src/server/trpc.ts
var import_server2 = require("@trpc/server");
var import_superjson = __toESM(require("superjson"));
var import_zod2 = require("zod");
var trpc = import_server2.initTRPC.context().create({
  transformer: import_superjson.default,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof import_zod2.ZodError ? error.cause.flatten() : null
      }
    };
  }
});
var createRouter = trpc.router;
var publicProcedure = trpc.procedure;
var enforceUserIsAuthenticated = trpc.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new import_server2.TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});
var protectedProcedure = trpc.procedure.use(enforceUserIsAuthenticated);

// src/server/router/collection/collection.schema.ts
var import_zod3 = require("zod");
var fetchCollectionElementsSchema = import_zod3.z.object({
  collectionName: import_zod3.z.string()
});
var fetchCollectionElementByIdSchema = import_zod3.z.object({
  collectionName: import_zod3.z.string(),
  elementId: import_zod3.z.string()
});
var fetchCollectionElementBySlugSchema = import_zod3.z.object({
  collectionName: import_zod3.z.string(),
  slug: import_zod3.z.string()
});
var createCollectionElementSchema = import_zod3.z.object({
  collectionName: import_zod3.z.string(),
  data: import_zod3.z.any()
});
var updateCollectionElementSchema = import_zod3.z.object({
  collectionName: import_zod3.z.string(),
  elementId: import_zod3.z.string(),
  data: import_zod3.z.any()
});
var deleteCollectionElementSchema = import_zod3.z.object({
  elementId: import_zod3.z.string()
});

// src/server/router/collection/collection.service.ts
var import_server3 = require("@trpc/server");

// src/core/data.ts
var import_zod5 = require("zod");

// src/core/validation.ts
var import_zod4 = require("zod");
function getValidationSchemaForField(field) {
  let schemaBasedOnType;
  switch (field.type) {
    case "text":
    case "rich-text":
    case "slug": {
      schemaBasedOnType = import_zod4.z.string().min(1);
      break;
    }
    case "date": {
      schemaBasedOnType = import_zod4.z.string().datetime();
      break;
    }
    case "number": {
      schemaBasedOnType = import_zod4.z.number();
      break;
    }
    case "image": {
      schemaBasedOnType = import_zod4.z.object({
        url: import_zod4.z.string().min(1),
        width: import_zod4.z.number().int(),
        height: import_zod4.z.number().int()
      });
      break;
    }
    case "video": {
      schemaBasedOnType = import_zod4.z.string();
      break;
    }
    case "icon": {
      schemaBasedOnType = import_zod4.z.object({
        name: import_zod4.z.string().min(1),
        // update the list based on the icons list in future
        iconLib: import_zod4.z.enum(["lucide"])
      });
      break;
    }
    case "color": {
      schemaBasedOnType = import_zod4.z.string().startsWith("#");
      break;
    }
    case "select": {
      schemaBasedOnType = import_zod4.z.object({
        value: import_zod4.z.string(),
        label: import_zod4.z.string()
      });
      break;
    }
    case "object": {
      schemaBasedOnType = getValidationSchemaForSchema(field.schema);
      break;
    }
    default: {
      throw new Error("Invalid field type");
    }
  }
  let validationSchema;
  if (field.multiple) {
    validationSchema = schemaBasedOnType.array().min(1);
  } else {
    validationSchema = schemaBasedOnType;
  }
  if (!field.required) {
    return validationSchema.optional();
  }
  return validationSchema;
}
function getValidationSchemaForSchema(schema) {
  let validationSchema = import_zod4.z.object({});
  Object.entries(schema).forEach(([fieldKey, field]) => {
    validationSchema = validationSchema.extend({ [fieldKey]: getValidationSchemaForField(field) });
  });
  return validationSchema;
}
function getValidationSchemaForCollectionElement(collection) {
  return getValidationSchemaForSchema(collection.schema);
}
function getValidationSchemaForSingleton(singleton) {
  return getValidationSchemaForSchema(singleton.schema);
}

// src/core/fix-data.ts
var import_faker = require("@faker-js/faker");

// src/utils/object.ts
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isPlainObject(obj) {
  if (isObject(obj) === false)
    return false;
  const ctor = obj.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}

// src/core/field.ts
function isFieldArrayType(field) {
  return !!field.multiple;
}
function isFieldObjectType(field) {
  return field.type === "object";
}

// src/core/fix-data.ts
function generateDummyDataForField(field) {
  if ("default" in field) {
    return field.default;
  }
  switch (field.type) {
    case "text":
      return import_faker.faker.lorem.sentence();
    case "rich-text":
      return import_faker.faker.lorem.paragraphs(2).split("\n").map((content) => `<p>${content}</p>`).join("");
    case "number":
      return import_faker.faker.number.int();
    case "date":
      return import_faker.faker.date.past().toISOString();
    case "slug": {
      return import_faker.faker.lorem.slug();
    }
    case "image":
      return {
        url: import_faker.faker.image.urlLoremFlickr({ width: 1920, height: 1080, category: "nature" }),
        width: 1920,
        height: 1080
      };
    case "video": {
      return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
    case "icon": {
      return {
        name: "ShieldQuestion",
        iconLib: "lucide"
      };
    }
    case "color": {
      return "#000000";
    }
    case "select": {
      return field.options[0];
    }
    case "object": {
      return generateDummyData(field.schema);
    }
    default:
      throw new Error("Unknown field type");
  }
}
function generateDummyData(schema) {
  const data = {};
  Object.entries(schema).forEach(([fieldKey, field]) => {
    if (isFieldArrayType(field)) {
      data[fieldKey] = [generateDummyDataForField(field)];
    } else {
      data[fieldKey] = generateDummyDataForField(field);
    }
  });
  return data;
}
function fixData(schema, invalidData, error) {
  function fixItemData(itemData, issuePath, schema2) {
    const fieldKeyWithIssue = issuePath[0];
    const field = schema2[fieldKeyWithIssue];
    if (isFieldArrayType(field)) {
      const indexWithIssue = issuePath[1];
      if (typeof indexWithIssue === "undefined") {
        itemData[fieldKeyWithIssue] = [generateDummyDataForField(field)];
      } else {
        if (isFieldObjectType(field)) {
          const issuePathForTheIndex = issuePath.slice(2);
          if (issuePathForTheIndex.length !== 0) {
            fixItemData(itemData[fieldKeyWithIssue][indexWithIssue], issuePathForTheIndex, field.schema);
          } else {
            itemData[fieldKeyWithIssue][indexWithIssue] = generateDummyData(field.schema);
          }
        } else {
          itemData[fieldKeyWithIssue][indexWithIssue] = generateDummyDataForField(field);
        }
      }
    } else if (isFieldObjectType(field)) {
      const subFieldWithIssue = issuePath[1];
      if (typeof subFieldWithIssue !== "undefined") {
        fixItemData(itemData[fieldKeyWithIssue], issuePath.slice(1), field.schema);
      } else {
        itemData[fieldKeyWithIssue] = generateDummyData(field.schema);
      }
    } else {
      itemData[fieldKeyWithIssue] = generateDummyDataForField(field);
    }
  }
  if (!isPlainObject(invalidData)) {
    return generateDummyData(schema);
  } else {
    const fixedData = { ...invalidData };
    error.issues.forEach((issue) => {
      try {
        fixItemData(fixedData, issue.path, schema);
      } catch (error2) {
        return generateDummyData(schema);
      }
    });
    return fixedData;
  }
}

// src/core/error.ts
var NotFoundError = class extends Error {
};
NotFoundError.errorCode = "NOT_FOUND";

// src/core/data.ts
async function updateCollectionElementData(collection, elementId, data, db = prisma) {
  const validationSchema = getValidationSchemaForCollectionElement(collection);
  const validatedData = validationSchema.parse(data);
  const slug = validatedData[collection.slugField];
  return db.collectionElement.update({
    where: {
      id: elementId
    },
    data: {
      data: validatedData,
      slug
    }
  });
}
async function createCollectionElement(collection, collectionName, data, db = prisma) {
  const validationSchema = getValidationSchemaForCollectionElement(collection);
  const validatedData = validationSchema.parse(data);
  const slug = validatedData[collection.slugField];
  return db.collectionElement.create({
    data: {
      slug,
      data: validatedData,
      collection: {
        connect: {
          name: collectionName
        }
      }
    }
  });
}
async function fetchCollectionElements(collection, collectionName, db = prisma) {
  const validationSchema = getValidationSchemaForCollectionElement(collection);
  const data = await db.collectionElement.findMany({
    where: {
      collection: {
        name: collectionName
      }
    }
  });
  const finalData = [];
  for (const item of data) {
    try {
      validationSchema.parse(item.data);
      finalData.push(item);
    } catch (error) {
      if (error instanceof import_zod5.z.ZodError) {
        const fixedData = fixData(collection.schema, item.data, error);
        const updatedData = await updateCollectionElementData(collection, item.id, fixedData, db);
        finalData.push(updatedData);
      } else {
        throw error;
      }
    }
  }
  return finalData;
}
async function fetchCollectionElementById(collection, elementId, db = prisma) {
  const validationSchema = getValidationSchemaForCollectionElement(collection);
  const item = await db.collectionElement.findFirst({
    where: {
      id: elementId
    }
  });
  if (!item) {
    throw new NotFoundError(`Element with id ${elementId} not found in collection ${collection.label}`);
  }
  try {
    validationSchema.parse(item.data);
    return item;
  } catch (error) {
    if (error instanceof import_zod5.z.ZodError) {
      const fixedData = fixData(collection.schema, item.data, error);
      return updateCollectionElementData(collection, item.id, fixedData, db);
    } else {
      throw error;
    }
  }
}
async function fetchCollectionElementBySlug(collection, collectionName, elementSlug, db = prisma) {
  const validationSchema = getValidationSchemaForCollectionElement(collection);
  const item = await db.collectionElement.findFirst({
    where: {
      slug: elementSlug,
      collection: {
        name: collectionName
      }
    }
  });
  if (!item) {
    throw new NotFoundError(`Element with slug ${elementSlug} not found in collection ${collection.label}`);
  }
  try {
    validationSchema.parse(item.data);
    return item;
  } catch (error) {
    if (error instanceof import_zod5.z.ZodError) {
      const fixedData = fixData(collection.schema, item.data, error);
      return updateCollectionElementData(collection, item.id, fixedData, db);
    } else {
      throw error;
    }
  }
}
function deleteCollectionElement(elementId, db = prisma) {
  return db.collectionElement.delete({
    where: {
      id: elementId
    }
  });
}
async function createSingleton(singleton, singletonName, data, db = prisma) {
  const validationSchema = getValidationSchemaForSingleton(singleton);
  const validatedData = validationSchema.parse(data);
  return db.singleton.create({
    data: {
      label: singleton.label,
      schema: singleton.schema,
      name: singletonName,
      data: validatedData
    }
  });
}
async function updateSingleton(singleton, singletonName, data, db = prisma) {
  const validationSchema = getValidationSchemaForSingleton(singleton);
  const validatedData = validationSchema.parse(data);
  return db.singleton.update({
    where: {
      name: singletonName
    },
    data: {
      data: validatedData
    }
  });
}
async function fetchSingleton(singleton, singletonName, db = prisma) {
  const validationSchema = getValidationSchemaForSingleton(singleton);
  let item = await db.singleton.findFirst({
    where: {
      name: singletonName
    }
  });
  if (!item) {
    const dummyData = generateDummyData(singleton.schema);
    item = await createSingleton(singleton, singletonName, dummyData);
  }
  try {
    validationSchema.parse(item.data);
    return item;
  } catch (error) {
    if (error instanceof import_zod5.z.ZodError) {
      const fixedData = fixData(singleton.schema, item.data, error);
      return updateSingleton(singleton, singletonName, fixedData, db);
    } else {
      throw error;
    }
  }
}

// src/server/router/collection/collection.service.ts
function fetchCollectionElements2(input, config, prisma2) {
  const { collectionName } = input;
  if (!(collectionName in config.collections)) {
    throw new import_server3.TRPCError({
      code: "NOT_FOUND",
      message: `Collection ${collectionName} not found`
    });
  }
  const collection = config.collections[collectionName];
  return fetchCollectionElements(collection, collectionName, prisma2);
}
function fetchCollectionElementById2(input, config, prisma2) {
  const { collectionName, elementId } = input;
  if (!(collectionName in config.collections)) {
    throw new import_server3.TRPCError({
      code: "NOT_FOUND",
      message: `Collection ${collectionName} not found`
    });
  }
  const collection = config.collections[collectionName];
  try {
    return fetchCollectionElementById(collection, elementId, prisma2);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new import_server3.TRPCError({
        code: "NOT_FOUND",
        message: error.message
      });
    }
    throw error;
  }
}
function fetchCollectionElementBySlug2(input, config, prisma2) {
  const { collectionName, slug } = input;
  if (!(collectionName in config.collections)) {
    throw new import_server3.TRPCError({
      code: "NOT_FOUND",
      message: `Collection ${collectionName} not found`
    });
  }
  const collection = config.collections[collectionName];
  try {
    return fetchCollectionElementBySlug(collection, collectionName, slug, prisma2);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new import_server3.TRPCError({
        code: "NOT_FOUND",
        message: error.message
      });
    }
    throw error;
  }
}
function createCollectionElement2(input, config, prisma2) {
  const { collectionName, data } = input;
  if (!(collectionName in config.collections)) {
    throw new import_server3.TRPCError({
      code: "NOT_FOUND",
      message: `Collection ${collectionName} not found`
    });
  }
  const collection = config.collections[collectionName];
  return createCollectionElement(collection, collectionName, data, prisma2);
}
function updateCollectionElement(input, config, prisma2) {
  const { collectionName, elementId, data } = input;
  if (!(collectionName in config.collections)) {
    throw new import_server3.TRPCError({
      code: "NOT_FOUND",
      message: `Collection ${collectionName} not found`
    });
  }
  const collection = config.collections[collectionName];
  return updateCollectionElementData(collection, elementId, data, prisma2);
}
function deleteCollectionElement2(input, prisma2) {
  const { elementId } = input;
  return deleteCollectionElement(elementId, prisma2);
}

// src/server/router/collection/collection.router.ts
var collectionRouter = createRouter({
  fetchCollectionElements: publicProcedure.input(fetchCollectionElementsSchema).query(({ input, ctx: { prisma: prisma2, config } }) => fetchCollectionElements2(input, config, prisma2)),
  fetchCollectionElementById: publicProcedure.input(fetchCollectionElementByIdSchema).query(({ input, ctx: { prisma: prisma2, config } }) => fetchCollectionElementById2(input, config, prisma2)),
  fetchCollectionElementBySlug: publicProcedure.input(fetchCollectionElementBySlugSchema).query(({ input, ctx: { prisma: prisma2, config } }) => fetchCollectionElementBySlug2(input, config, prisma2)),
  createCollectionElement: protectedProcedure.input(createCollectionElementSchema).mutation(({ input, ctx: { prisma: prisma2, config } }) => createCollectionElement2(input, config, prisma2)),
  updateCollectionElement: protectedProcedure.input(updateCollectionElementSchema).mutation(({ input, ctx: { prisma: prisma2, config } }) => updateCollectionElement(input, config, prisma2)),
  deleteCollectionElement: protectedProcedure.input(deleteCollectionElementSchema).mutation(({ input, ctx: { prisma: prisma2 } }) => deleteCollectionElement2(input, prisma2))
});

// src/server/router/media/media.schema.ts
var import_zod7 = require("zod");

// src/utils/validation.ts
var import_zod6 = require("zod");
var objectId = import_zod6.z.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);

// src/server/router/media/media.schema.ts
var getFolderContentSchema = import_zod7.z.object({
  id: objectId.optional()
});
var createFolderSchema = import_zod7.z.object({
  name: import_zod7.z.string().nonempty(),
  parent: objectId.optional()
});
var updateFolderSchema = createFolderSchema.partial().extend({
  id: objectId
});
var deleteFolderSchema = import_zod7.z.object({
  id: objectId
});
var createFileSchema = import_zod7.z.object({
  name: import_zod7.z.string().nonempty(),
  path: import_zod7.z.string().nonempty(),
  folder: objectId.optional()
});
var updateFileSchema = createFileSchema.partial().extend({
  id: objectId
});
var deleteFileSchema = import_zod7.z.object({
  id: objectId
});

// src/server/router/media/media.service.ts
var FOLDER_INCLUDE_FIELDS = {
  parent: true
};
function createFolder(input, prisma2) {
  return prisma2.folder.create({
    data: {
      name: input.name,
      parent: input.parent ? {
        connect: {
          id: input.parent
        }
      } : void 0
    },
    include: FOLDER_INCLUDE_FIELDS
  });
}
function updateFolder(input, prisma2) {
  return prisma2.folder.update({
    where: {
      id: input.id
    },
    data: {
      name: input.name,
      parent: input.parent ? {
        connect: { id: input.parent }
      } : void 0
    },
    include: FOLDER_INCLUDE_FIELDS
  });
}
function deleteFolder(input, prisma2) {
  return prisma2.folder.delete({
    where: {
      id: input.id
    },
    include: FOLDER_INCLUDE_FIELDS
  });
}
var FILE_INCLUDE_FIELDS = {
  parent: true
};
function createFile(input, prisma2) {
  return prisma2.file.create({
    data: {
      name: input.name,
      path: input.path,
      parent: input.folder ? { connect: { id: input.folder } } : void 0
    },
    include: FILE_INCLUDE_FIELDS
  });
}
function updateFile(input, prisma2) {
  return prisma2.file.update({
    where: {
      id: input.id
    },
    data: {
      name: input.name,
      path: input.path,
      parent: input.folder ? { connect: { id: input.folder } } : void 0
    },
    include: FILE_INCLUDE_FIELDS
  });
}
function deleteFile(input, prisma2) {
  return prisma2.file.delete({
    where: {
      id: input.id
    },
    include: FILE_INCLUDE_FIELDS
  });
}
async function getFolderContent(input, prisma2) {
  const [folders, files] = await Promise.all([
    prisma2.folder.findMany({
      where: {
        parentId: input.id
      }
    }),
    prisma2.file.findMany({
      where: {
        parentId: input.id
      }
    })
  ]);
  return { folders, files };
}

// src/server/router/media/media.router.ts
var mediaRouter = createRouter({
  createFolder: protectedProcedure.input(createFolderSchema).mutation(({ input, ctx: { prisma: prisma2 } }) => createFolder(input, prisma2)),
  updateFolder: protectedProcedure.input(updateFolderSchema).mutation(({ input, ctx: { prisma: prisma2 } }) => updateFolder(input, prisma2)),
  deleteFolder: protectedProcedure.input(deleteFolderSchema).mutation(({ input, ctx: { prisma: prisma2 } }) => deleteFolder(input, prisma2)),
  createFile: protectedProcedure.input(createFileSchema).mutation(({ input, ctx: { prisma: prisma2 } }) => createFile(input, prisma2)),
  updateFile: protectedProcedure.input(updateFileSchema).mutation(({ input, ctx: { prisma: prisma2 } }) => updateFile(input, prisma2)),
  deleteFile: protectedProcedure.input(deleteFileSchema).mutation(({ input, ctx: { prisma: prisma2 } }) => deleteFile(input, prisma2)),
  getFolderContent: protectedProcedure.input(getFolderContentSchema).query(({ input, ctx: { prisma: prisma2 } }) => getFolderContent(input, prisma2))
});

// src/server/router/singleton/singleton.schema.ts
var import_zod8 = require("zod");
var fetchSingletonSchema = import_zod8.z.object({
  singletonName: import_zod8.z.string()
});
var updateSingletonSchema = import_zod8.z.object({
  singletonName: import_zod8.z.string(),
  data: import_zod8.z.any()
});

// src/server/router/singleton/singleton.service.ts
var import_server4 = require("@trpc/server");
function fetchSingleton2(input, config, prisma2) {
  const { singletonName } = input;
  if (!(singletonName in config.singletons)) {
    throw new import_server4.TRPCError({
      code: "NOT_FOUND",
      message: `Singleton ${singletonName} not found`
    });
  }
  const singleton = config.singletons[singletonName];
  return fetchSingleton(singleton, singletonName, prisma2);
}
function updateSingleton2(input, config, prisma2) {
  const { singletonName, data } = input;
  if (!(singletonName in config.singletons)) {
    throw new import_server4.TRPCError({
      code: "NOT_FOUND",
      message: `Singleton ${singletonName} not found`
    });
  }
  const singleton = config.singletons[singletonName];
  return updateSingleton(singleton, singletonName, data, prisma2);
}

// src/server/router/singleton/singleton.router.ts
var singletonRouter = createRouter({
  fetchSingleton: publicProcedure.input(fetchSingletonSchema).query(({ input, ctx: { config, prisma: prisma2 } }) => fetchSingleton2(input, config, prisma2)),
  updateSingleton: protectedProcedure.input(updateSingletonSchema).mutation(({ input, ctx: { prisma: prisma2, config } }) => updateSingleton2(input, config, prisma2))
});

// src/server/router/index.ts
var router = createRouter({
  singleton: singletonRouter,
  collection: collectionRouter,
  media: mediaRouter
});

// src/server/trpc-handler.ts
function createTRPCHandler(config) {
  const createContext = async () => {
    const session = await (0, import_next_auth.getServerSession)(authOptions);
    return {
      config,
      prisma,
      session
    };
  };
  return function handler(request) {
    return (0, import_fetch.fetchRequestHandler)({
      endpoint: "/cms/api/trpc",
      req: request,
      router,
      createContext
    });
  };
}

// src/server/auth-handler.ts
var import_next_auth2 = __toESM(require("next-auth"));
var import_credentials2 = __toESM(require("next-auth/providers/credentials"));
var authOptions2 = {
  pages: {
    signIn: "/cms/admin/login",
    signOut: "/cms/admin/logout"
  },
  providers: [
    (0, import_credentials2.default)({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@xyz.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if ((credentials == null ? void 0 : credentials.email) === env.ADMIN_EMAIL && (credentials == null ? void 0 : credentials.password) === env.ADMIN_PASSWORD) {
          return { id: credentials.email, email: credentials.email };
        }
        return null;
      }
    })
  ]
};
var authHandler = (0, import_next_auth2.default)(authOptions2);

// src/server/upload-asset/route.ts
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_image_size = __toESM(require("image-size"));
var import_date_fns = require("date-fns");
var import_server6 = require("next/server");

// src/utils/file.ts
function isErrnoException(e) {
  if ("code" in e)
    return true;
  else
    return false;
}

// src/server/upload-asset/schema.ts
var import_zod9 = require("zod");
var uploadAssetBodySchema = import_zod9.z.object({
  file: import_zod9.z.instanceof(Blob),
  assetType: import_zod9.z.enum(["image", "video"])
});
var uploadImageResponseSchema = import_zod9.z.object({
  assetType: import_zod9.z.literal("image"),
  url: import_zod9.z.string().min(1),
  width: import_zod9.z.number(),
  height: import_zod9.z.number(),
  type: import_zod9.z.string().min(1)
});
var uploadVideoResponseSchema = import_zod9.z.object({
  assetType: import_zod9.z.literal("video"),
  url: import_zod9.z.string().min(1)
});

// src/utils/api.ts
var import_server5 = require("next/server");
var import_zod10 = require("zod");
function handleError(error) {
  if (error instanceof import_zod10.z.ZodError) {
    return import_server5.NextResponse.json({ message: error.message, issues: error.issues }, { status: 422 });
  } else if (error instanceof Error) {
    return import_server5.NextResponse.json({ message: error.message }, { status: 500 });
  }
  return import_server5.NextResponse.error();
}

// src/server/upload-asset/route.ts
async function getUploadDirectory(basePath, assetType) {
  const currentDate = (0, import_date_fns.format)(/* @__PURE__ */ new Date(), "dd-MM-yyyy");
  const uploadDirectory = import_path.default.resolve(basePath, "uploads", assetType, currentDate);
  try {
    await import_promises.default.stat(uploadDirectory);
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      await import_promises.default.mkdir(uploadDirectory, { recursive: true });
    } else {
      throw error;
    }
  }
  return uploadDirectory;
}
async function uploadAssetHandler(request) {
  try {
    const formData = await request.formData();
    const { file, assetType } = uploadAssetBodySchema.parse({
      file: formData.get("file"),
      assetType: formData.get("assetType")
    });
    const basePath = `${process.cwd()}/public`;
    const uploadDirectory = await getUploadDirectory(basePath, assetType);
    switch (assetType) {
      case "image": {
        const fileName = file.name;
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const { width, height, type } = await (0, import_image_size.default)(fileBuffer);
        const filepathWithDimensions = `${width}x${height}_${fileName}`;
        await import_promises.default.writeFile(import_path.default.resolve(uploadDirectory, filepathWithDimensions), fileBuffer);
        const assetUrl = import_path.default.resolve(uploadDirectory, filepathWithDimensions).replace(basePath, "");
        return import_server6.NextResponse.json({ url: assetUrl, width, height, type, assetType: "image" }, { status: 200 });
      }
      case "video": {
        const fileName = file.name;
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await import_promises.default.writeFile(import_path.default.resolve(uploadDirectory, fileName), fileBuffer);
        const assetUrl = import_path.default.resolve(uploadDirectory, fileName).replace(basePath, "");
        return import_server6.NextResponse.json({ url: assetUrl, assetType: "video" }, { status: 200 });
      }
    }
  } catch (error) {
    return handleError(error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authHandler,
  createPluginHandler,
  createTRPCHandler,
  uploadAssetHandler
});
