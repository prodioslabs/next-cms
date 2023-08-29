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

// src/component/index.ts
var component_exports = {};
__export(component_exports, {
  createCollectionReader: () => createCollectionReader,
  createSingletonReader: () => createSingletonReader
});
module.exports = __toCommonJS(component_exports);

// src/component/cms-components.tsx
var import_react_slot = require("@radix-ui/react-slot");
var import_core = require("../core");
var import_element = require("../element");

// src/lib/random.ts
function generateRandomString(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}

// src/lib/string.ts
function pascalCase(str) {
  return str.replace(/(^\w|[-_ ]+\w)/g, function(match) {
    return match.charAt(match.length - 1).toUpperCase();
  });
}

// src/component/cms-components.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function createCollectionReader(config, collectionName) {
  async function CollectionListReader({ renderItems }) {
    var _a;
    const collection = (_a = config.collections) == null ? void 0 : _a[collectionName];
    if (!collection) {
      throw new Error(`Collection ${collectionName} not found`);
    }
    const containerProps = {
      "data-cms-type": "collection",
      "data-cms-label": collection.label,
      "data-cms-id": collectionName,
      id: generateRandomString(16)
    };
    const items = await (0, import_core.fetchCollectionElements)(collection, collectionName);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_slot.Slot, { ...containerProps, children: renderItems({
        items: items.map((item) => ({
          id: item.id,
          elementSlug: item.slug,
          data: item.data
        }))
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_element.EditableLink,
        {
          label: collection.label,
          url: `/cms/admin/collection/${collectionName}`,
          containerElementId: containerProps.id
        }
      )
    ] });
  }
  CollectionListReader.displayName = `${pascalCase(collectionName)}ListReader`;
  async function CollectionElementReader({
    elementId,
    elementSlug,
    renderItem
  }) {
    var _a;
    if (typeof elementId === "undefined" && typeof elementSlug === "undefined") {
      throw new Error("Either elementId or elementSlug must be provided");
    }
    const collection = (_a = config.collections) == null ? void 0 : _a[collectionName];
    if (!collection) {
      throw new Error(`Collection ${collectionName} not found`);
    }
    const containerProps = {
      "data-cms-type": "collection",
      "data-cms-label": collection.label,
      "data-cms-id": collectionName,
      "data-cms-slug": elementSlug,
      className: "group",
      id: generateRandomString(16)
    };
    const item = elementSlug ? await (0, import_core.fetchCollectionElementBySlug)(collection, collectionName, elementSlug) : await (0, import_core.fetchCollectionElementById)(collection, elementId);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_slot.Slot, { ...containerProps, children: renderItem({
        data: item.data,
        id: item.id,
        elementSlug: item.slug
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_element.EditableLink,
        {
          label: collection.label,
          url: `/cms/admin/collection/${collectionName}/${item.id}`,
          containerElementId: containerProps.id
        }
      )
    ] });
  }
  CollectionElementReader.displayName = `${pascalCase(collectionName)}ElementReader`;
  function CollectionReader(props) {
    switch (props.type) {
      case "list": {
        const { type, ...rest } = props;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionListReader, { ...rest });
      }
      case "element": {
        const { type, ...rest } = props;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionElementReader, { ...rest });
      }
      default: {
        return null;
      }
    }
  }
  CollectionReader.displayName = `${pascalCase(collectionName)}CollectionReader`;
  return CollectionReader;
}
function createSingletonReader(config, singletonName) {
  async function SingletonReader({ renderItem }) {
    var _a;
    const singleton = (_a = config.singletons) == null ? void 0 : _a[singletonName];
    if (!singleton) {
      throw new Error(`Singleton ${singletonName} not found`);
    }
    const containerProps = {
      "data-cms-type": "collection",
      "data-cms-label": singleton.label,
      "data-cms-id": singletonName,
      className: "group",
      id: generateRandomString(16)
    };
    const item = await (0, import_core.fetchSingleton)(singleton, singletonName);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_slot.Slot, { ...containerProps, children: renderItem({ data: item.data }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_element.EditableLink,
        {
          label: singleton.label,
          url: `/cms/admin/singleton/${singletonName}`,
          containerElementId: containerProps.id
        }
      )
    ] });
  }
  SingletonReader.displayName = `${pascalCase(singletonName)}SingletonReader`;
  return SingletonReader;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCollectionReader,
  createSingletonReader
});
