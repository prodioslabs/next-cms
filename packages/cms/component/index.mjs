// src/component/cms-components.tsx
import { Slot } from "@radix-ui/react-slot";
import {
  fetchCollectionElementById,
  fetchCollectionElementBySlug,
  fetchCollectionElements,
  fetchSingleton
} from "@nextjs-cms/cms/core";
import { EditableLink } from "@nextjs-cms/cms/element";

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
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
    const items = await fetchCollectionElements(collection, collectionName);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Slot, { ...containerProps, children: renderItems({
        items: items.map((item) => ({
          id: item.id,
          elementSlug: item.slug,
          data: item.data
        }))
      }) }),
      /* @__PURE__ */ jsx(
        EditableLink,
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
    const item = elementSlug ? await fetchCollectionElementBySlug(collection, collectionName, elementSlug) : await fetchCollectionElementById(collection, elementId);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Slot, { ...containerProps, children: renderItem({
        data: item.data,
        id: item.id,
        elementSlug: item.slug
      }) }),
      /* @__PURE__ */ jsx(
        EditableLink,
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
        return /* @__PURE__ */ jsx(CollectionListReader, { ...rest });
      }
      case "element": {
        const { type, ...rest } = props;
        return /* @__PURE__ */ jsx(CollectionElementReader, { ...rest });
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
    const item = await fetchSingleton(singleton, singletonName);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Slot, { ...containerProps, children: renderItem({ data: item.data }) }),
      /* @__PURE__ */ jsx(
        EditableLink,
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
export {
  createCollectionReader,
  createSingletonReader
};
