"use client";
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

// src/element/index.ts
var element_exports = {};
__export(element_exports, {
  EditableLink: () => EditableLink,
  LucideIcon: () => LucideIcon,
  lucideIconNames: () => lucideIconNames
});
module.exports = __toCommonJS(element_exports);

// src/element/lucide-icon/lucide-icon.tsx
var LucideIcons = __toESM(require("lucide-react"));
var import_jsx_runtime = require("react/jsx-runtime");
var lucideIconNames = Object.keys(LucideIcons.icons);
function LucideIcon({ name, ...props }) {
  let iconName = name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  if (!(iconName in LucideIcons.icons)) {
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`);
    iconName = "Shield";
  }
  const Icon = LucideIcons.icons[iconName];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { ...props });
}

// src/element/editable-link/editable-link.tsx
var import_dom = require("@floating-ui/dom");
var import_link = __toESM(require("next/link"));
var import_navigation = require("next/navigation");
var import_react = require("react");
var import_react_dom = require("react-dom");

// src/dashboard/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/element/editable-link/editable-link.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function EditableLinkComponent({ url, label, containerElementId }) {
  var _a, _b;
  const portalContainer = (0, import_react.useMemo)(() => {
    var _a2;
    if (typeof window !== "undefined") {
      let portalContainer2 = (_a2 = document.getElementById("editable-element-portal")) != null ? _a2 : void 0;
      if (!portalContainer2) {
        portalContainer2 = document.createElement("div");
        portalContainer2.id = "editable-element-portal";
        document.body.appendChild(portalContainer2);
      }
      return portalContainer2;
    }
    return void 0;
  }, []);
  const [visible, setVisible] = (0, import_react.useState)(false);
  const [computedPosition, setComputedPosition] = (0, import_react.useState)(void 0);
  const [containerBBox, setContainerBBox] = (0, import_react.useState)();
  const pathname = (0, import_navigation.usePathname)();
  (0, import_react.useEffect)(
    function computeFloatingPositionOnVisiblityChange() {
      let cleanup;
      if (visible) {
        const element = document.getElementById(containerElementId);
        const bboxElement = document.getElementById(`bbox-${containerElementId}`);
        if (element && bboxElement) {
          cleanup = (0, import_dom.autoUpdate)(element, bboxElement, () => {
            (0, import_dom.computePosition)(element, bboxElement, {
              middleware: [
                (0, import_dom.autoPlacement)({
                  alignment: "start"
                }),
                (0, import_dom.offset)(6)
              ],
              strategy: "fixed"
            }).then(setComputedPosition);
            setContainerBBox(element.getBoundingClientRect());
          });
        }
      }
      return () => {
        if (cleanup) {
          cleanup();
        }
      };
    },
    [visible, containerElementId]
  );
  const timeout = (0, import_react.useRef)(null);
  const handleMouseOver = (0, import_react.useCallback)(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setVisible(true);
  }, []);
  const handleMouseLeave = (0, import_react.useCallback)(() => {
    timeout.current = setTimeout(() => {
      setVisible(false);
    }, 200);
  }, []);
  (0, import_react.useEffect)(
    function addMouseOverEventListener() {
      const containerElement = document.getElementById(containerElementId);
      containerElement == null ? void 0 : containerElement.addEventListener("mouseover", handleMouseOver);
      containerElement == null ? void 0 : containerElement.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        containerElement == null ? void 0 : containerElement.removeEventListener("mouseover", handleMouseOver);
        containerElement == null ? void 0 : containerElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    [containerElementId, handleMouseOver, handleMouseLeave]
  );
  return visible && portalContainer ? (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        import_link.default,
        {
          href: `${url}?redirectTo=${pathname}`,
          className: cn(
            "fixed flex w-max items-center whitespace-nowrap rounded border border-border bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            {
              "rounded-t-none border-t-0": (_a = computedPosition == null ? void 0 : computedPosition.placement) == null ? void 0 : _a.startsWith("bottom"),
              "rounded-b-none border-b-0": (_b = computedPosition == null ? void 0 : computedPosition.placement) == null ? void 0 : _b.startsWith("top")
            }
          ),
          id: `bbox-${containerElementId}`,
          style: {
            top: computedPosition == null ? void 0 : computedPosition.y,
            left: computedPosition == null ? void 0 : computedPosition.x
          },
          onMouseOver: handleMouseOver,
          onMouseLeave: handleMouseLeave,
          children: [
            "Edit ",
            label,
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LucideIcon, { name: "chevron-right", className: "ml-2 h-4 w-4" })
          ]
        }
      ),
      containerBBox ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: "pointer-events-none fixed rounded-md ring-2 ring-border",
          style: {
            top: containerBBox.top - 4,
            left: containerBBox.left - 4,
            width: containerBBox.width + 8,
            height: containerBBox.height + 8
          }
        }
      ) : null
    ] }),
    portalContainer
  ) : null;
}
function EditableLink(props) {
  const [adminAuthenticated, setAdminAuthenticated] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(function fetchUserSession() {
    fetch("/cms/api/auth/session", { cache: "no-store" }).then((res) => res.json()).then((data) => setAdminAuthenticated(!!(data == null ? void 0 : data.user)));
  }, []);
  if (adminAuthenticated) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EditableLinkComponent, { ...props });
  }
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditableLink,
  LucideIcon,
  lucideIconNames
});
