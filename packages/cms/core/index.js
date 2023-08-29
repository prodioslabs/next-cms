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

// src/core/index.ts
var core_exports = {};
__export(core_exports, {
  bootstrap: () => bootstrap,
  createCMSConfig: () => createCMSConfig,
  createCollectionElement: () => createCollectionElement,
  createSingleton: () => createSingleton,
  deleteCollectionElement: () => deleteCollectionElement,
  fetchCollectionElementById: () => fetchCollectionElementById,
  fetchCollectionElementBySlug: () => fetchCollectionElementBySlug,
  fetchCollectionElements: () => fetchCollectionElements,
  fetchSingleton: () => fetchSingleton,
  updateCollectionElementData: () => updateCollectionElementData,
  updateSingleton: () => updateSingleton
});
module.exports = __toCommonJS(core_exports);

// src/core/config.ts
function createCMSConfig({
  collections,
  singletons,
  plugins
}) {
  return {
    storage: "database",
    collections,
    singletons,
    plugins: plugins != null ? plugins : []
  };
}

// src/core/bootstrap.ts
var import_zod3 = require("zod");

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
function isTextField(field) {
  return ((field == null ? void 0 : field.type) === "text" || (field == null ? void 0 : field.type) === "rich-text" || (field == null ? void 0 : field.type) === "slug") && !field.multiple;
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

// src/core/validation.ts
var import_zod2 = require("zod");
function getValidationSchemaForField(field) {
  let schemaBasedOnType;
  switch (field.type) {
    case "text":
    case "rich-text":
    case "slug": {
      schemaBasedOnType = import_zod2.z.string().min(1);
      break;
    }
    case "date": {
      schemaBasedOnType = import_zod2.z.string().datetime();
      break;
    }
    case "number": {
      schemaBasedOnType = import_zod2.z.number();
      break;
    }
    case "image": {
      schemaBasedOnType = import_zod2.z.object({
        url: import_zod2.z.string().min(1),
        width: import_zod2.z.number().int(),
        height: import_zod2.z.number().int()
      });
      break;
    }
    case "video": {
      schemaBasedOnType = import_zod2.z.string();
      break;
    }
    case "icon": {
      schemaBasedOnType = import_zod2.z.object({
        name: import_zod2.z.string().min(1),
        // update the list based on the icons list in future
        iconLib: import_zod2.z.enum(["lucide"])
      });
      break;
    }
    case "color": {
      schemaBasedOnType = import_zod2.z.string().startsWith("#");
      break;
    }
    case "select": {
      schemaBasedOnType = import_zod2.z.object({
        value: import_zod2.z.string(),
        label: import_zod2.z.string()
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
  let validationSchema = import_zod2.z.object({});
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

// src/utils/cli.ts
var CLI_STYLES = {
  RESET: "\x1B[0m",
  BRIGHT: "\x1B[1m",
  DIM: "\x1B[2m",
  UNDERSCORE: "\x1B[4m",
  BLINK: "\x1B[5m",
  REVERSE: "\x1B[7m",
  HIDDEN: "\x1B[8m",
  BLACK: "\x1B[30m",
  RED: "\x1B[31m",
  GREEN: "\x1B[32m",
  YELLOW: "\x1B[33m",
  BLUE: "\x1B[34m",
  MAGENTA: "\x1B[35m",
  CYAN: "\x1B[36m",
  WHITE: "\x1B[37m",
  GRAY: "\x1B[90m",
  BG_BLACK: "\x1B[40m",
  BG_RED: "\x1B[41m",
  BG_GREEN: "\x1B[42m",
  BG_YELLOW: "\x1B[43m",
  BG_BLUE: "\x1B[44m",
  BG_MAGENTA: "\x1B[45m",
  BG_CYAN: "\x1B[46m",
  BG_WHITE: "\x1B[47m",
  BG_GRAY: "\x1B[100m"
};
var DIVIDER = `
${Array.from({ length: 80 }).map(() => "_").join("")}
`;
function eventMessage(message) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.BLUE}event${CLI_STYLES.RESET} ${message}`;
}
function warnMessage(message) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.YELLOW}warn${CLI_STYLES.RESET} ${message}`;
}
function errorMessage(message) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.RED}error${CLI_STYLES.RESET} ${message}`;
}
function successMessage(message) {
  return `${CLI_STYLES.GRAY}>>${CLI_STYLES.RESET} ${CLI_STYLES.GREEN}success${CLI_STYLES.RESET} ${message}`;
}

// src/core/bootstrap.ts
function validateCollection(collection, collectionName) {
  if (!isTextField(collection.schema[collection.slugField])) {
    throw new Error(`Collection - ${collectionName}: slugField ${collection.slugField} is not of type "text"`);
  }
  if (collection.nameField && !isTextField(collection.schema[collection.nameField])) {
    throw new Error(`Collection - ${collectionName}: nameField ${collection.nameField} is not of type "text"`);
  }
}
async function bootstrap(config) {
  console.log(DIVIDER);
  console.group(eventMessage("bootstrapping cms..."));
  console.group(eventMessage("syncing collection and collection elements..."));
  for (const [collectionName, collection] of Object.entries(config.collections)) {
    validateCollection(collection, collectionName);
    const collectionPresent = await prisma.collection.findFirst({
      where: {
        name: collectionName
      }
    });
    if (!collectionPresent) {
      console.log(warnMessage(`collection - ${collectionName} not found. creating ...`));
      await prisma.collection.create({
        data: {
          label: collection.label,
          name: collectionName,
          schema: collection.schema,
          slugField: collection.slugField
        }
      });
      console.log(successMessage(`collection - ${collectionName} created`));
    } else {
      console.log(eventMessage(`syncing singleton ${collectionName} schema...`));
      await prisma.collection.update({
        where: {
          id: collectionPresent.id
        },
        data: {
          label: collection.label,
          name: collectionName,
          schema: collection.schema,
          slugField: collection.slugField
        }
      });
      console.log(successMessage(`collection - ${collectionName} synced`));
    }
    const validationSchema = getValidationSchemaForCollectionElement(collection);
    console.group(eventMessage(`syncing collection elements for collection - ${collectionName}...`));
    const collectionElements = await prisma.collectionElement.findMany({
      where: {
        collection: {
          name: collectionName
        }
      }
    });
    for (const collectionElement of collectionElements) {
      try {
        validationSchema.parse(collectionElement.data);
      } catch (error) {
        if (error instanceof import_zod3.z.ZodError) {
          console.log(
            errorMessage(
              `invalid collection element ${collectionElement.id} for collection - ${collectionName} data found`
            )
          );
          console.log(
            eventMessage(
              `fixing collection element ${collectionElement.id} for collection - ${collectionName} data...`
            )
          );
          const fixedData = fixData(collection.schema, collectionElement.data, error);
          await prisma.collectionElement.update({
            where: {
              id: collectionElement.id
            },
            data: {
              data: fixedData
            }
          });
          console.log(
            successMessage(`collection element ${collectionElement.id} for collection - ${collectionName} data fixed`)
          );
        } else {
          throw error;
        }
      }
    }
    console.groupEnd();
    console.log(successMessage(`syncing collection elements for collection - ${collectionName}...`));
  }
  console.groupEnd();
  console.log(successMessage("collection and collection elements synced"));
  console.group(eventMessage("syncing singletons..."));
  for (const [singletonName, singleton] of Object.entries(config.singletons)) {
    const singletonPresent = await prisma.singleton.findFirst({
      where: {
        name: singletonName
      }
    });
    if (!singletonPresent) {
      console.log(warnMessage(`singleton - ${singletonName} not created. creating ...`));
      await prisma.singleton.create({
        data: {
          label: singleton.label,
          name: singletonName,
          schema: singleton.schema,
          data: generateDummyData(singleton.schema)
        }
      });
      console.log(successMessage(`singleton - ${singletonName} created`));
    } else {
      console.log(eventMessage(`syncing singleton ${singletonName} schema...`));
      await prisma.singleton.update({
        where: {
          id: singletonPresent.id
        },
        data: {
          label: singleton.label,
          name: singletonName,
          schema: singleton.schema
        }
      });
      console.log(successMessage(`singleton - ${singletonName} synced`));
      const validationSchema = getValidationSchemaForSingleton(singleton);
      try {
        validationSchema.parse(singletonPresent.data);
      } catch (error) {
        if (error instanceof import_zod3.z.ZodError) {
          console.log(errorMessage(`invalid singleton ${singletonName} data found`));
          console.log(eventMessage(`fixing singleton ${singletonName} data...`));
          const fixedData = fixData(singleton.schema, singletonPresent.data, error);
          await prisma.singleton.update({
            where: {
              name: singletonName
            },
            data: {
              data: fixedData
            }
          });
          console.log(successMessage(`singleton ${singletonName} data fixed`));
        } else {
          throw error;
        }
      }
    }
  }
  console.groupEnd();
  console.log(successMessage("singletons synced"));
  console.groupEnd();
  console.log(successMessage("cms bootstrapped"));
  console.log(DIVIDER);
}

// src/core/data.ts
var import_zod4 = require("zod");

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
      if (error instanceof import_zod4.z.ZodError) {
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
    if (error instanceof import_zod4.z.ZodError) {
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
    if (error instanceof import_zod4.z.ZodError) {
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
    if (error instanceof import_zod4.z.ZodError) {
      const fixedData = fixData(singleton.schema, item.data, error);
      return updateSingleton(singleton, singletonName, fixedData, db);
    } else {
      throw error;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bootstrap,
  createCMSConfig,
  createCollectionElement,
  createSingleton,
  deleteCollectionElement,
  fetchCollectionElementById,
  fetchCollectionElementBySlug,
  fetchCollectionElements,
  fetchSingleton,
  updateCollectionElementData,
  updateSingleton
});
