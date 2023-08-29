"use client";

// src/element/lucide-icon/lucide-icon.tsx
import * as LucideIcons from "lucide-react";
import { jsx } from "react/jsx-runtime";
var lucideIconNames = Object.keys(LucideIcons.icons);
function LucideIcon({ name, ...props }) {
  let iconName = name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  if (!(iconName in LucideIcons.icons)) {
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`);
    iconName = "Shield";
  }
  const Icon = LucideIcons.icons[iconName];
  return /* @__PURE__ */ jsx(Icon, { ...props });
}

// src/element/editable-link/editable-link.tsx
import { autoPlacement, autoUpdate, computePosition, offset } from "@floating-ui/dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// src/dashboard/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/element/editable-link/editable-link.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
function EditableLinkComponent({ url, label, containerElementId }) {
  var _a, _b;
  const portalContainer = useMemo(() => {
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
  const [visible, setVisible] = useState(false);
  const [computedPosition, setComputedPosition] = useState(void 0);
  const [containerBBox, setContainerBBox] = useState();
  const pathname = usePathname();
  useEffect(
    function computeFloatingPositionOnVisiblityChange() {
      let cleanup;
      if (visible) {
        const element = document.getElementById(containerElementId);
        const bboxElement = document.getElementById(`bbox-${containerElementId}`);
        if (element && bboxElement) {
          cleanup = autoUpdate(element, bboxElement, () => {
            computePosition(element, bboxElement, {
              middleware: [
                autoPlacement({
                  alignment: "start"
                }),
                offset(6)
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
  const timeout = useRef(null);
  const handleMouseOver = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setVisible(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    timeout.current = setTimeout(() => {
      setVisible(false);
    }, 200);
  }, []);
  useEffect(
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
  return visible && portalContainer ? createPortal(
    /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        Link,
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
            /* @__PURE__ */ jsx2(LucideIcon, { name: "chevron-right", className: "ml-2 h-4 w-4" })
          ]
        }
      ),
      containerBBox ? /* @__PURE__ */ jsx2(
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
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  useEffect(function fetchUserSession() {
    fetch("/cms/api/auth/session", { cache: "no-store" }).then((res) => res.json()).then((data) => setAdminAuthenticated(!!(data == null ? void 0 : data.user)));
  }, []);
  if (adminAuthenticated) {
    return /* @__PURE__ */ jsx2(EditableLinkComponent, { ...props });
  }
  return null;
}
export {
  EditableLink,
  LucideIcon,
  lucideIconNames
};
