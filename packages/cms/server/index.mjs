// src/server/plugin-handler.ts
import { NextResponse } from "next/server";
function createPluginHandler(config) {
  async function GET(request, { params: { plugin } }) {
    var _a2, _b;
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && ((_a2 = pluginConfig.api) == null ? void 0 : _a2.method) === "GET") {
        return (_b = pluginConfig == null ? void 0 : pluginConfig.api) == null ? void 0 : _b.handler(request);
      }
    }
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  async function POST(request, { params: { plugin } }) {
    var _a2, _b;
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && ((_a2 = pluginConfig.api) == null ? void 0 : _a2.method) === "POST") {
        return (_b = pluginConfig == null ? void 0 : pluginConfig.api) == null ? void 0 : _b.handler(request);
      }
    }
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return { GET, POST };
}

// src/server/trpc-handler.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";

// src/core/db.ts
import { PrismaClient } from "@prisma/client";

// src/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
var env = createEnv({
  server: {
    /**
     * Next.js environment variables
     */
    NODE_ENV: z.enum(["development", "production"]),
    NEXT_RUNTIME: z.enum(["nodejs", "edge"]).optional(),
    /**
     * NextCMS configuration
     */
    DATABASE_URL: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string(),
    /**
     * AI-Content Plugin
     */
    OPENAI_API_KEY: z.string().min(1).optional(),
    /**
     * Unsplash Plugin
     */
    UNSPLASH_ACCESS_KEY: z.string().min(1).optional(),
    UNSPLASH_SECRET_KEY: z.string().min(1).optional()
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
  prisma = (_a = globalForPrisma.prisma) != null ? _a : new PrismaClient({
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
  if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

// src/core/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
var authOptions = {
  pages: {
    signIn: "/cms/admin/login",
    signOut: "/cms/admin/logout"
  },
  providers: [
    CredentialsProvider({
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
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
var trpc = initTRPC.context().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
var createRouter = trpc.router;
var publicProcedure = trpc.procedure;
var enforceUserIsAuthenticated = trpc.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});
var protectedProcedure = trpc.procedure.use(enforceUserIsAuthenticated);

// src/server/router/collection/collection.schema.ts
import { z as z2 } from "zod";
var fetchCollectionElementsSchema = z2.object({
  collectionName: z2.string()
});
var fetchCollectionElementByIdSchema = z2.object({
  collectionName: z2.string(),
  elementId: z2.string()
});
var fetchCollectionElementBySlugSchema = z2.object({
  collectionName: z2.string(),
  slug: z2.string()
});
var createCollectionElementSchema = z2.object({
  collectionName: z2.string(),
  data: z2.any()
});
var updateCollectionElementSchema = z2.object({
  collectionName: z2.string(),
  elementId: z2.string(),
  data: z2.any()
});
var deleteCollectionElementSchema = z2.object({
  elementId: z2.string()
});

// src/server/router/collection/collection.service.ts
import { TRPCError as TRPCError2 } from "@trpc/server";

// src/core/data.ts
import { z as z4 } from "zod";

// src/core/validation.ts
import { z as z3 } from "zod";
function getValidationSchemaForField(field) {
  let schemaBasedOnType;
  switch (field.type) {
    case "text":
    case "rich-text":
    case "slug": {
      schemaBasedOnType = z3.string().min(1);
      break;
    }
    case "date": {
      schemaBasedOnType = z3.string().datetime();
      break;
    }
    case "number": {
      schemaBasedOnType = z3.number();
      break;
    }
    case "image": {
      schemaBasedOnType = z3.object({
        url: z3.string().min(1),
        width: z3.number().int(),
        height: z3.number().int()
      });
      break;
    }
    case "video": {
      schemaBasedOnType = z3.string();
      break;
    }
    case "icon": {
      schemaBasedOnType = z3.object({
        name: z3.string().min(1),
        // update the list based on the icons list in future
        iconLib: z3.enum(["lucide"])
      });
      break;
    }
    case "color": {
      schemaBasedOnType = z3.string().startsWith("#");
      break;
    }
    case "select": {
      schemaBasedOnType = z3.object({
        value: z3.string(),
        label: z3.string()
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
  let validationSchema = z3.object({});
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
import { faker } from "@faker-js/faker";

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
      return faker.lorem.sentence();
    case "rich-text":
      return faker.lorem.paragraphs(2).split("\n").map((content) => `<p>${content}</p>`).join("");
    case "number":
      return faker.number.int();
    case "date":
      return faker.date.past().toISOString();
    case "slug": {
      return faker.lorem.slug();
    }
    case "image":
      return {
        url: faker.image.urlLoremFlickr({ width: 1920, height: 1080, category: "nature" }),
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
      if (error instanceof z4.ZodError) {
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
    if (error instanceof z4.ZodError) {
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
    if (error instanceof z4.ZodError) {
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
    if (error instanceof z4.ZodError) {
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
    throw new TRPCError2({
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
    throw new TRPCError2({
      code: "NOT_FOUND",
      message: `Collection ${collectionName} not found`
    });
  }
  const collection = config.collections[collectionName];
  try {
    return fetchCollectionElementById(collection, elementId, prisma2);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new TRPCError2({
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
    throw new TRPCError2({
      code: "NOT_FOUND",
      message: `Collection ${collectionName} not found`
    });
  }
  const collection = config.collections[collectionName];
  try {
    return fetchCollectionElementBySlug(collection, collectionName, slug, prisma2);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new TRPCError2({
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
    throw new TRPCError2({
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
    throw new TRPCError2({
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
import { z as z6 } from "zod";

// src/utils/validation.ts
import { z as z5 } from "zod";
var objectId = z5.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);

// src/server/router/media/media.schema.ts
var getFolderContentSchema = z6.object({
  id: objectId.optional()
});
var createFolderSchema = z6.object({
  name: z6.string().nonempty(),
  parent: objectId.optional()
});
var updateFolderSchema = createFolderSchema.partial().extend({
  id: objectId
});
var deleteFolderSchema = z6.object({
  id: objectId
});
var createFileSchema = z6.object({
  name: z6.string().nonempty(),
  path: z6.string().nonempty(),
  folder: objectId.optional()
});
var updateFileSchema = createFileSchema.partial().extend({
  id: objectId
});
var deleteFileSchema = z6.object({
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
import { z as z7 } from "zod";
var fetchSingletonSchema = z7.object({
  singletonName: z7.string()
});
var updateSingletonSchema = z7.object({
  singletonName: z7.string(),
  data: z7.any()
});

// src/server/router/singleton/singleton.service.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
function fetchSingleton2(input, config, prisma2) {
  const { singletonName } = input;
  if (!(singletonName in config.singletons)) {
    throw new TRPCError3({
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
    throw new TRPCError3({
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
    const session = await getServerSession(authOptions);
    return {
      config,
      prisma,
      session
    };
  };
  return function handler(request) {
    return fetchRequestHandler({
      endpoint: "/cms/api/trpc",
      req: request,
      router,
      createContext
    });
  };
}

// src/server/auth-handler.ts
import NextAuth from "next-auth";
import CredentialsProvider2 from "next-auth/providers/credentials";
var authOptions2 = {
  pages: {
    signIn: "/cms/admin/login",
    signOut: "/cms/admin/logout"
  },
  providers: [
    CredentialsProvider2({
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
var authHandler = NextAuth(authOptions2);

// src/server/upload-asset/route.ts
import fs from "fs/promises";
import path from "path";
import imageSize from "image-size";
import { format } from "date-fns";
import { NextResponse as NextResponse3 } from "next/server";

// src/utils/file.ts
function isErrnoException(e) {
  if ("code" in e)
    return true;
  else
    return false;
}

// src/server/upload-asset/schema.ts
import { z as z8 } from "zod";
var uploadAssetBodySchema = z8.object({
  file: z8.instanceof(Blob),
  assetType: z8.enum(["image", "video"])
});
var uploadImageResponseSchema = z8.object({
  assetType: z8.literal("image"),
  url: z8.string().min(1),
  width: z8.number(),
  height: z8.number(),
  type: z8.string().min(1)
});
var uploadVideoResponseSchema = z8.object({
  assetType: z8.literal("video"),
  url: z8.string().min(1)
});

// src/utils/api.ts
import { NextResponse as NextResponse2 } from "next/server";
import { z as z9 } from "zod";
function handleError(error) {
  if (error instanceof z9.ZodError) {
    return NextResponse2.json({ message: error.message, issues: error.issues }, { status: 422 });
  } else if (error instanceof Error) {
    return NextResponse2.json({ message: error.message }, { status: 500 });
  }
  return NextResponse2.error();
}

// src/server/upload-asset/route.ts
async function getUploadDirectory(basePath, assetType) {
  const currentDate = format(/* @__PURE__ */ new Date(), "dd-MM-yyyy");
  const uploadDirectory = path.resolve(basePath, "uploads", assetType, currentDate);
  try {
    await fs.stat(uploadDirectory);
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      await fs.mkdir(uploadDirectory, { recursive: true });
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
        const { width, height, type } = await imageSize(fileBuffer);
        const filepathWithDimensions = `${width}x${height}_${fileName}`;
        await fs.writeFile(path.resolve(uploadDirectory, filepathWithDimensions), fileBuffer);
        const assetUrl = path.resolve(uploadDirectory, filepathWithDimensions).replace(basePath, "");
        return NextResponse3.json({ url: assetUrl, width, height, type, assetType: "image" }, { status: 200 });
      }
      case "video": {
        const fileName = file.name;
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(path.resolve(uploadDirectory, fileName), fileBuffer);
        const assetUrl = path.resolve(uploadDirectory, fileName).replace(basePath, "");
        return NextResponse3.json({ url: assetUrl, assetType: "video" }, { status: 200 });
      }
    }
  } catch (error) {
    return handleError(error);
  }
}
export {
  authHandler,
  createPluginHandler,
  createTRPCHandler,
  uploadAssetHandler
};
