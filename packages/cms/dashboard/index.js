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

// src/dashboard/index.ts
var dashboard_exports = {};
__export(dashboard_exports, {
  createDashboardLayout: () => createDashboardLayout,
  createDashboardPage: () => createDashboardPage
});
module.exports = __toCommonJS(dashboard_exports);

// src/dashboard/components/admin-dashboard/components/dashboard-layout.tsx
var import_navigation2 = require("next/navigation");
var import_react7 = require("react");
var import_lucide_react2 = require("lucide-react");

// src/dashboard/components/nav-link/nav-link.tsx
var import_link = __toESM(require("next/link"));
var import_navigation = require("next/navigation");
var import_react = require("react");

// src/dashboard/stores/index.ts
var import_zustand = require("zustand");
var useStore = (0, import_zustand.create)((set) => ({
  layout: [20, 80],
  saveLayout: (sizes) => set({ layout: sizes }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed })
}));

// src/dashboard/ui/tooltip.tsx
var React = __toESM(require("react"));
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"));

// src/dashboard/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/dashboard/ui/tooltip.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// src/dashboard/components/nav-link/nav-link.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function NavLink({ icon, label, href, className, ...rest }) {
  const pathname = (0, import_navigation.usePathname)();
  const isActive = (0, import_react.useMemo)(() => pathname.startsWith(href), [pathname, href]);
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  const iconElement = (0, import_react.cloneElement)(icon, {
    className: "h-4 w-4 flex-shrink-0"
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    import_link.default,
    {
      href,
      ...rest,
      className: cn(
        {
          "flex items-center space-x-2 truncate rounded-md border border-transparent p-1.5 text-sm text-muted-foreground hover:border-border hover:bg-muted": true,
          "border-border bg-muted text-secondary-foreground": isActive,
          "justify-center": sidebarCollapsed
        },
        className
      ),
      children: [
        sidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TooltipTrigger, { children: iconElement }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TooltipContent, { children: label })
        ] }) }) : iconElement,
        !sidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "flex-1 truncate", children: label }) : null
      ]
    }
  );
}

// src/dashboard/components/admin-dashboard/components/providers.tsx
var import_react_query2 = require("@tanstack/react-query");
var import_react3 = require("next-auth/react");

// src/server/api.ts
var import_react_query = require("@trpc/react-query");
var import_client = require("@trpc/client");
var import_superjson = __toESM(require("superjson"));
var api = (0, import_react_query.createTRPCReact)();
var trpcClient = api.createClient({
  transformer: import_superjson.default,
  links: [
    (0, import_client.loggerLink)({
      enabled: (opts) => process.env.NODE_ENV === "development" || opts.direction === "down" && opts.result instanceof Error
    }),
    (0, import_client.httpBatchLink)({
      url: "/cms/api/trpc"
    })
  ]
});

// src/dashboard/components/admin-dashboard/components/theme-provider.tsx
var import_next_themes = require("next-themes");
var import_jsx_runtime3 = require("react/jsx-runtime");
function ThemeProvider({ children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_next_themes.ThemeProvider, { ...props, children });
}

// src/dashboard/ui/toast.tsx
var ToastPrimitives = __toESM(require("@radix-ui/react-toast"));
var import_class_variance_authority = require("class-variance-authority");
var import_react2 = require("react");

// src/element/lucide-icon/lucide-icon.tsx
var LucideIcons = __toESM(require("lucide-react"));
var import_jsx_runtime4 = require("react/jsx-runtime");
var lucideIconNames = Object.keys(LucideIcons.icons);
function LucideIcon({ name, ...props }) {
  let iconName = name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  if (!(iconName in LucideIcons.icons)) {
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`);
    iconName = "Shield";
  }
  const Icon2 = LucideIcons.icons[iconName];
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon2, { ...props });
}

// src/dashboard/ui/toast.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = (0, import_react2.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = (0, import_class_variance_authority.cva)(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = (0, import_react2.forwardRef)(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = (0, import_react2.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = (0, import_react2.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LucideIcon, { name: "x", className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = (0, import_react2.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = (0, import_react2.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/dashboard/hooks/use-toast.ts
var React2 = __toESM(require("react"));
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open)
          dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React2.useState(memoryState);
  React2.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

// src/dashboard/ui/toaster.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(ToastProvider, { duration: 3e3, children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Toast, { ...props, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToastTitle, { children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToastViewport, {})
  ] });
}

// src/dashboard/components/admin-dashboard/components/providers.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var queryClient = new import_react_query2.QueryClient();
function Providers({ children, session }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react3.SessionProvider, { session, basePath: "/cms/api/auth", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(api.Provider, { client: trpcClient, queryClient, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_query2.QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Toaster, {})
  ] }) }) }) });
}

// src/dashboard/components/admin-dashboard/components/dashboard-panel.tsx
var import_react_resizable_panels = require("react-resizable-panels");
var import_jsx_runtime8 = require("react/jsx-runtime");
function DashboardPanel({ sidebar, content }) {
  const { layout: defaultLayout, saveLayout, setSidebarCollapsed } = useStore();
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    import_react_resizable_panels.PanelGroup,
    {
      direction: "horizontal",
      onLayout: (sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        saveLayout(sizes);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_react_resizable_panels.Panel,
          {
            defaultSize: defaultLayout[0],
            className: "h-screen",
            collapsible: true,
            collapsedSize: 4,
            onCollapse: setSidebarCollapsed,
            children: sidebar
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_resizable_panels.PanelResizeHandle, { className: "w-0.5 border-r border-border/80 hover:border-border/100" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_resizable_panels.Panel, { className: "h-screen", defaultSize: defaultLayout[1], children: content })
      ]
    }
  );
}

// src/dashboard/components/admin-dashboard/components/dashboard-menu.tsx
var import_react_query3 = require("@tanstack/react-query");
var import_react6 = require("next-auth/react");
var import_next_themes2 = require("next-themes");
var import_lucide_react = require("lucide-react");

// src/dashboard/ui/menu-bar.tsx
var MenubarPrimitive = __toESM(require("@radix-ui/react-menubar"));
var import_react4 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var MenubarMenu = MenubarPrimitive.Menu;
var MenubarSub = MenubarPrimitive.Sub;
var Menubar = (0, import_react4.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  MenubarPrimitive.Root,
  {
    ref,
    className: cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className),
    ...props
  }
));
Menubar.displayName = MenubarPrimitive.Root.displayName;
var MenubarTrigger = (0, import_react4.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  MenubarPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    ),
    ...props
  }
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;
var MenubarSubTrigger = (0, import_react4.forwardRef)(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
  MenubarPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LucideIcon, { name: "chevron-right", className: "ml-auto h-4 w-4" })
    ]
  }
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
var MenubarSubContent = (0, import_react4.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  MenubarPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
var MenubarContent = (0, import_react4.forwardRef)(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MenubarPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  MenubarPrimitive.Content,
  {
    ref,
    align,
    alignOffset,
    sideOffset,
    className: cn(
      "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;
var MenubarItem = (0, import_react4.forwardRef)(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  MenubarPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;
var MenubarCheckboxItem = (0, import_react4.forwardRef)(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
  MenubarPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LucideIcon, { name: "check", className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;
var MenubarRadioItem = (0, import_react4.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
  MenubarPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LucideIcon, { name: "circle", className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;
var MenubarLabel = (0, import_react4.forwardRef)(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  MenubarPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
var MenubarSeparator = (0, import_react4.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MenubarPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
var MenubarShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
};
MenubarShortcut.displayname = "MenubarShortcut";

// src/dashboard/ui/button.tsx
var import_react5 = require("react");
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime10 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority2.cva)(
  "inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[loading=true]:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "destructive-outline": "border border-destructive/30 text-destructive hover:bg-destructive/10",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var iconVariants = (0, import_class_variance_authority2.cva)("flex-shrink-0", {
  variants: {
    type: {
      withChildren: "mr-3 h-5 w-5",
      withoutChildren: "h-4 w-4"
    }
  },
  defaultVariants: {
    type: "withChildren"
  }
});
var BaseButton = (0, import_react5.forwardRef)(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props, children });
  }
);
BaseButton.displayName = "BaseButton";
var Button = (0, import_react5.forwardRef)(({ loading, icon, children, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(BaseButton, { ...props, asChild: false, "data-loading": loading, ref, children: [
    loading ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      LucideIcon,
      {
        name: "loader-2",
        className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), "animate-spin")
      }
    ) : icon ? (0, import_react5.cloneElement)(icon, {
      className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), icon.props.className)
    }) : null,
    children
  ] });
});
Button.displayName = "Button";

// src/dashboard/components/admin-dashboard/components/dashboard-menu.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function DashboardMenu() {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  const mutation = (0, import_react_query3.useMutation)(() => (0, import_react6.signOut)({ redirect: false, callbackUrl: "/" }), {
    onSuccess: (result) => {
      if (result.url) {
        window.location.href = result.url;
      }
    }
  });
  const { setTheme } = (0, import_next_themes2.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Menubar, { className: "w-full border-none p-0", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(MenubarMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(MenubarTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.Settings, { name: "settings" }), variant: "outline", className: "w-full", children: sidebarCollapsed ? null : "Settings" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(MenubarContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(MenubarSub, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(MenubarSubTrigger, { children: "Theme" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(MenubarSubContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            MenubarItem,
            {
              onClick: () => {
                setTheme("light");
              },
              children: "Light"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            MenubarItem,
            {
              onClick: () => {
                setTheme("dark");
              },
              children: "Dark"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            MenubarItem,
            {
              onClick: () => {
                setTheme("system");
              },
              children: "System"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(MenubarSeparator, {}),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        MenubarItem,
        {
          onClick: () => {
            mutation.mutate();
          },
          children: "Logout"
        }
      )
    ] })
  ] }) });
}

// src/dashboard/components/admin-dashboard/components/sidebar-label.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function SidebarLabel({ children, className, style }) {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  if (sidebarCollapsed) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: cn("px-1.5 text-xs uppercase text-secondary-foreground", className), style, children });
}

// src/dashboard/components/admin-dashboard/components/dashboard-layout.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function createDashboardLayout(config) {
  function Layout({ children, params: { slug } }) {
    const [session, setSession] = (0, import_react7.useState)(void 0);
    (0, import_react7.useEffect)(function fetchUserSession() {
      fetch("/cms/api/auth/session", { cache: "no-store" }).then((res) => res.json()).then((data) => setSession(data));
    }, []);
    const isAuthenticated = (0, import_react7.useMemo)(() => !!Object.keys(session != null ? session : {}).length, [session]);
    if (!session) {
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex h-screen items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react2.LoaderIcon, { className: "animate-spin" }) });
    }
    if ((slug == null ? void 0 : slug[0]) === "login") {
      if (isAuthenticated) {
        (0, import_navigation2.redirect)("/cms/admin");
      }
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Providers, { session: null, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { children }) });
    }
    if (!isAuthenticated) {
      (0, import_navigation2.redirect)("/cms/admin/login");
    }
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Providers, { session, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      DashboardPanel,
      {
        sidebar: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex h-full flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-2 py-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(NavLink, { href: "/cms/admin/media-library", icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react2.Image, {}), label: "Media Library" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "border-b border-border" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SidebarLabel, { children: "Collections" }),
              Object.entries(config.collections).map(([collectionKey, collection]) => {
                return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                  NavLink,
                  {
                    href: `/cms/admin/collection/${collectionKey}`,
                    icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react2.FolderOpen, {}),
                    label: collection.label
                  },
                  collectionKey
                );
              })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "border-b border-border" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SidebarLabel, { children: "Singletons" }),
              Object.entries(config.singletons).map(([singletonName, singleton]) => {
                return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                  NavLink,
                  {
                    href: `/cms/admin/singleton/${singletonName}`,
                    icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react2.File, {}),
                    label: singleton.label
                  },
                  singletonName
                );
              })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "mx-2 mb-2 flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(DashboardMenu, {}) })
        ] }),
        content: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "h-full overflow-auto", children })
      }
    ) });
  }
  return Layout;
}

// src/dashboard/components/admin-dashboard/components/dashboard-page.tsx
var import_navigation5 = require("next/navigation");

// src/dashboard/components/admin-dashboard/components/dashboard-home.tsx
var import_link2 = __toESM(require("next/link"));
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime14 = require("react/jsx-runtime");
function DashboardHome({ config }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("title", { children: "Content Manager" }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "h-full space-y-8 overflow-auto p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "text-2xl font-medium text-secondary-foreground", children: "Dashboard" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center text-lg font-medium text-secondary-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react3.FolderOpen, { className: "mr-2 h-5 w-5" }),
          "Collections"
        ] }),
        Object.entries(config.collections).map(([collectionName, collection]) => {
          return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            import_link2.default,
            {
              href: `/cms/admin/collection/${collectionName}`,
              className: "flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex-1 space-y-1 truncate", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "truncate text-sm text-secondary-foreground", children: collection.label }),
                  "description" in collection ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "truncate text-xs text-muted-foreground", children: collection.description }) : null
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react3.ChevronRight, { className: "h-5 w-5 text-muted-foreground" })
              ]
            },
            collectionName
          );
        })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center text-lg font-medium text-secondary-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react3.File, { className: "mr-2 h-5 w-5" }),
          "Singletons"
        ] }),
        Object.entries(config.singletons).map(([singletonName, singleton]) => {
          return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            import_link2.default,
            {
              href: `/cms/admin/singleton/${singletonName}`,
              className: "flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex-1 space-y-1 truncate", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "truncate text-sm text-secondary-foreground", children: singleton.label }),
                  "description" in singleton ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "truncate text-xs text-muted-foreground", children: singleton.description }) : null
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react3.ChevronRight, { className: "h-5 w-5 text-muted-foreground" })
              ]
            },
            singletonName
          );
        })
      ] })
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/singleton-content-manager.tsx
var import_react33 = require("react");
var import_lucide_react8 = require("lucide-react");

// src/dashboard/components/content-manager/components/update-singleton-form.tsx
var import_link3 = __toESM(require("next/link"));

// src/dashboard/components/content-manager/components/base-form.tsx
var import_zod7 = require("@hookform/resolvers/zod");
var import_react31 = require("react");
var import_react_hook_form6 = require("react-hook-form");
var import_slugify = __toESM(require("slugify"));
var import_lucide_react7 = require("lucide-react");

// src/core/validation.ts
var import_zod = require("zod");
function getValidationSchemaForField(field) {
  let schemaBasedOnType;
  switch (field.type) {
    case "text":
    case "rich-text":
    case "slug": {
      schemaBasedOnType = import_zod.z.string().min(1);
      break;
    }
    case "date": {
      schemaBasedOnType = import_zod.z.string().datetime();
      break;
    }
    case "number": {
      schemaBasedOnType = import_zod.z.number();
      break;
    }
    case "image": {
      schemaBasedOnType = import_zod.z.object({
        url: import_zod.z.string().min(1),
        width: import_zod.z.number().int(),
        height: import_zod.z.number().int()
      });
      break;
    }
    case "video": {
      schemaBasedOnType = import_zod.z.string();
      break;
    }
    case "icon": {
      schemaBasedOnType = import_zod.z.object({
        name: import_zod.z.string().min(1),
        // update the list based on the icons list in future
        iconLib: import_zod.z.enum(["lucide"])
      });
      break;
    }
    case "color": {
      schemaBasedOnType = import_zod.z.string().startsWith("#");
      break;
    }
    case "select": {
      schemaBasedOnType = import_zod.z.object({
        value: import_zod.z.string(),
        label: import_zod.z.string()
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
  let validationSchema5;
  if (field.multiple) {
    validationSchema5 = schemaBasedOnType.array().min(1);
  } else {
    validationSchema5 = schemaBasedOnType;
  }
  if (!field.required) {
    return validationSchema5.optional();
  }
  return validationSchema5;
}
function getValidationSchemaForSchema(schema) {
  let validationSchema5 = import_zod.z.object({});
  Object.entries(schema).forEach(([fieldKey, field]) => {
    validationSchema5 = validationSchema5.extend({ [fieldKey]: getValidationSchemaForField(field) });
  });
  return validationSchema5;
}

// src/dashboard/components/multi-input-field/multi-input-field.tsx
var import_react13 = require("react");
var import_react_hook_form2 = require("react-hook-form");

// src/dashboard/components/sortable-list/sortable-list.tsx
var import_react11 = require("react");
var import_core2 = require("@dnd-kit/core");
var import_sortable2 = require("@dnd-kit/sortable");
var import_react_slot2 = require("@radix-ui/react-slot");

// src/dashboard/components/sortable-list/components/sortable-overlay.tsx
var import_core = require("@dnd-kit/core");
var import_jsx_runtime15 = require("react/jsx-runtime");
var dropAnimationConfig = {
  duration: 100,
  sideEffects: (0, import_core.defaultDropAnimationSideEffects)({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
function SortableOverlay({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_core.DragOverlay, { dropAnimation: dropAnimationConfig, children });
}

// src/dashboard/components/sortable-list/components/sortable-item.tsx
var import_react9 = require("react");
var import_sortable = require("@dnd-kit/sortable");
var import_utilities = require("@dnd-kit/utilities");

// src/dashboard/components/sortable-list/context.ts
var import_react8 = require("react");
var SortableItemContext = (0, import_react8.createContext)({
  attributes: {},
  listeners: void 0,
  ref() {
  }
});

// src/dashboard/components/sortable-list/components/sortable-item.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function SortableItem({ children, id, className, style = {} }) {
  const { attributes, isDragging, listeners: listeners2, setNodeRef, setActivatorNodeRef, transform, transition } = (0, import_sortable.useSortable)({
    id
  });
  const context = (0, import_react9.useMemo)(
    () => ({
      attributes,
      listeners: listeners2,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners2, setActivatorNodeRef]
  );
  const dragStyle = {
    opacity: isDragging ? 0.4 : void 0,
    transform: import_utilities.CSS.Translate.toString(transform),
    transition
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(SortableItemContext.Provider, { value: context, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { ref: setNodeRef, style: { ...style, ...dragStyle }, className, children }) });
}

// src/dashboard/components/sortable-list/components/drag-handle.tsx
var import_react10 = require("react");
var import_jsx_runtime17 = require("react/jsx-runtime");
function DragHandle({ className, style }) {
  const { attributes, listeners: listeners2, ref } = (0, import_react10.useContext)(SortableItemContext);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    Button,
    {
      icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(LucideIcon, { name: "grip" }),
      ...attributes,
      ...listeners2,
      ref,
      type: "button",
      variant: "ghost",
      size: "icon",
      className: cn("cursor-grab", className),
      style
    }
  );
}

// src/dashboard/components/sortable-list/sortable-list.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function SortableList({
  items,
  renderItem,
  onDragEnd,
  className,
  style
}) {
  const [active, setActive] = (0, import_react11.useState)(void 0);
  const activeItem = (0, import_react11.useMemo)(() => items.find((item) => item.id === (active == null ? void 0 : active.id)), [active, items]);
  const activeItemIndex = (0, import_react11.useMemo)(() => items.findIndex((item) => item.id === (active == null ? void 0 : active.id)), [active, items]);
  const sensors = (0, import_core2.useSensors)(
    (0, import_core2.useSensor)(import_core2.PointerSensor),
    (0, import_core2.useSensor)(import_core2.KeyboardSensor, {
      coordinateGetter: import_sortable2.sortableKeyboardCoordinates
    })
  );
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    import_core2.DndContext,
    {
      sensors,
      onDragStart: ({ active: active2 }) => {
        setActive(active2);
      },
      onDragCancel: () => {
        setActive(void 0);
      },
      onDragEnd: (event) => {
        var _a;
        if (event.over && event.over.id !== ((_a = event.active) == null ? void 0 : _a.id)) {
          onDragEnd == null ? void 0 : onDragEnd(event);
        }
        setActive(void 0);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_sortable2.SortableContext, { items, strategy: import_sortable2.rectSortingStrategy, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className, style, children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_slot2.Slot, { children: renderItem(item, index) }, item.id)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(SortableOverlay, { children: activeItem ? renderItem(activeItem, activeItemIndex) : null })
      ]
    }
  );
}
SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;

// src/dashboard/components/single-input-field/single-input-field.tsx
var import_react12 = require("react");
var import_react_hook_form = require("react-hook-form");
var import_jsx_runtime19 = require("react/jsx-runtime");
function SingleInputField({ fieldName, control, renderInput, cmsField, plugins, className, style }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    import_react_hook_form.Controller,
    {
      name: fieldName,
      control,
      render: ({ field: { value, onChange } }) => {
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: cn("flex items-start space-x-2", className), style, ref, children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "flex-1", children: renderInput({ value, onChange, fieldName }) }),
          plugins.length ? /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_jsx_runtime19.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "h-10 border-r border-dashed" }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "space-y-2", children: plugins.map((plugin) => {
              return (0, import_react12.createElement)(plugin.component, { field: cmsField, updateField: onChange, key: plugin.name });
            }) })
          ] }) : null
        ] });
      }
    }
  );
}
var single_input_field_default = (0, import_react12.forwardRef)(SingleInputField);

// src/core/fix-data.ts
var import_faker = require("@faker-js/faker");

// src/core/field.ts
function isFieldArrayType(field) {
  return !!field.multiple;
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

// src/dashboard/components/multi-input-field/multi-input-field.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
function MultiInputField({ fieldName, control, renderInput, cmsField, plugins, className, style }, ref) {
  const { fields, append, remove, move } = (0, import_react_hook_form2.useFieldArray)({ name: fieldName, control });
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: cn("space-y-4", className), ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      SortableList,
      {
        className: "space-y-4",
        style,
        items: fields.map((field) => ({ id: field.id, data: field })),
        onDragEnd: ({ active, over }) => {
          const fromIndex = fields == null ? void 0 : fields.findIndex((item) => item.id === active.id);
          const toIndex = fields == null ? void 0 : fields.findIndex((item) => item.id === over.id);
          if (typeof fromIndex !== "undefined" && typeof toIndex !== "undefined") {
            move(fromIndex, toIndex);
          }
        },
        renderItem: ({ id }, index) => {
          return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(SortableList.Item, { id, className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(SortableList.DragHandle, {}),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              single_input_field_default,
              {
                className: "flex-1",
                cmsField,
                plugins,
                fieldName: `${fieldName}.${index}`,
                control,
                renderInput
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "h-10 border-r border-dashed" }),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              Button,
              {
                type: "button",
                icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(LucideIcon, { name: "trash" }),
                variant: "destructive-outline",
                size: "icon",
                className: "opacity-30 hover:opacity-100",
                onClick: () => {
                  remove(index);
                }
              }
            )
          ] }, id);
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      Button,
      {
        type: "button",
        variant: "outline",
        icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(LucideIcon, { name: "plus" }),
        onClick: () => {
          append(generateDummyDataForField(cmsField));
        },
        children: "Add Entry"
      }
    ) })
  ] });
}
var multi_input_field_default = (0, import_react13.forwardRef)(MultiInputField);

// src/dashboard/components/input-field/input-field.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function InputField(props) {
  if (props.type === "multiple") {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(multi_input_field_default, { ...props });
  } else {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(single_input_field_default, { ...props });
  }
}

// src/utils/date.ts
var import_date_fns = require("date-fns");
function parseDate(dateStr) {
  const parsedDate = (0, import_date_fns.parseISO)(dateStr);
  if (isNaN(parsedDate.getTime())) {
    return void 0;
  }
  return parsedDate;
}
function stringifyDate(date) {
  return date.toISOString();
}

// src/dashboard/components/fields/image-uploader/image-uploader.tsx
var import_react_query4 = require("@tanstack/react-query");
var import_image = __toESM(require("next/image"));
var import_react14 = require("react");
var import_lucide_react4 = require("lucide-react");

// src/dashboard/components/fields/image-uploader/queries.ts
var import_axios = __toESM(require("axios"));

// src/server/upload-asset/schema.ts
var import_zod2 = require("zod");
var uploadAssetBodySchema = import_zod2.z.object({
  file: import_zod2.z.instanceof(Blob),
  assetType: import_zod2.z.enum(["image", "video"])
});
var uploadImageResponseSchema = import_zod2.z.object({
  assetType: import_zod2.z.literal("image"),
  url: import_zod2.z.string().min(1),
  width: import_zod2.z.number(),
  height: import_zod2.z.number(),
  type: import_zod2.z.string().min(1)
});
var uploadVideoResponseSchema = import_zod2.z.object({
  assetType: import_zod2.z.literal("video"),
  url: import_zod2.z.string().min(1)
});

// src/dashboard/components/fields/image-uploader/queries.ts
async function uploadImage(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("assetType", "image");
  const { data } = await import_axios.default.post("/cms/api/upload-asset", formData, {
    onUploadProgress
  });
  return uploadImageResponseSchema.parse(data);
}

// src/dashboard/ui/uploader.tsx
var import_react_dropzone = require("react-dropzone");
var import_jsx_runtime22 = require("react/jsx-runtime");
function Uploader({ description, className, style, ...options }) {
  const { getRootProps, getInputProps, isDragActive } = (0, import_react_dropzone.useDropzone)({
    ...options,
    multiple: false
  });
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "div",
    {
      className: cn(
        "h-[200px] rounded-md border p-4",
        {
          "border-dashed": !isDragActive,
          "border-border bg-muted shadow-inner": isDragActive,
          "cursor-not-allowed opacity-50": options.disabled
        },
        className
      ),
      style,
      ...getRootProps(),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("input", { ...getInputProps() }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex h-full flex-col items-center justify-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(LucideIcon, { name: "upload", className: "mb-2 h-6 w-6 text-muted-foreground" }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "text-sm text-muted-foreground", children: isDragActive ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_jsx_runtime22.Fragment, { children: "Drop the files here ..." }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, { children: [
            "Drag 'n' drop ",
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "font-medium text-foreground", children: "some files" }),
            " here, or click to select files"
          ] }) }),
          description ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "mt-2 text-xs uppercase text-muted-foreground", children: description }) : null
        ] })
      ]
    }
  );
}

// src/dashboard/components/fields/image-uploader/image-uploader.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
function ImageUploader({ required, uploadedImage, onChange, className, style }) {
  const [progress, setProgress] = (0, import_react14.useState)(0);
  const mutation = (0, import_react_query4.useMutation)(
    (file) => uploadImage(file, ({ progress: progress2 }) => {
      setProgress(progress2 != null ? progress2 : 0);
    }),
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: ({ assetType, ...image }) => {
        onChange == null ? void 0 : onChange(image);
      }
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: cn("relative cursor-pointer overflow-hidden rounded-md", className), style, children: [
    progress !== 0 && progress !== 1 ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-full", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "h-full bg-primary transition-all", style: { width: `${progress * 100}%` } }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      Uploader,
      {
        description: "Accept Images",
        accept: {
          "image/*": [".jpeg", ".png"]
        },
        disabled: mutation.isLoading,
        onDrop: (acceptedFile) => {
          mutation.mutate(acceptedFile[0]);
        }
      }
    ),
    mutation.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react4.Loader, { className: "absolute right-3 top-3 h-6 w-6 animate-spin" }) : null,
    uploadedImage ? /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mt-2 flex items-center space-x-2 truncate rounded-md border p-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_image.default,
        {
          alt: "",
          src: uploadedImage.url,
          width: uploadedImage.width,
          height: uploadedImage.height,
          className: "h-10 w-10 rounded-md object-cover"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex-1 truncate text-xs text-muted-foreground", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "line-clamp-1 truncate whitespace-break-spaces", children: uploadedImage.url }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "truncate", children: [
          uploadedImage.width,
          "x",
          uploadedImage.height
        ] })
      ] }),
      !required ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        Button,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react4.Trash, {}),
          size: "icon",
          variant: "destructive-outline",
          type: "button",
          className: "opacity-30 transition-opacity hover:opacity-100",
          onClick: () => {
            onChange == null ? void 0 : onChange(null);
          }
        }
      ) : null
    ] }, uploadedImage.url) : null
  ] });
}

// src/dashboard/components/fields/slug-input/slug-input.tsx
var import_react16 = require("react");

// src/dashboard/ui/input.tsx
var import_react15 = require("react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var Input = (0, import_react15.forwardRef)(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Input.displayName = "Input";

// src/dashboard/components/fields/slug-input/slug-input.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var SlugInput = (0, import_react16.forwardRef)(({ className, style, onGenerateSlug, ...rest }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: cn("flex items-center space-x-2", className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Input, { ...rest, className: "flex-1", ref }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { variant: "outline", onClick: onGenerateSlug, type: "button", children: "Generate Slug" })
  ] });
});
SlugInput.displayName = "SlugInput";
var slug_input_default = SlugInput;

// src/dashboard/components/fields/icon-selector/icon-selector.tsx
var import_react19 = require("react");
var import_tiny_invariant = __toESM(require("tiny-invariant"));
var import_match_sorter = require("match-sorter");

// src/dashboard/ui/popover.tsx
var PopoverPrimitive = __toESM(require("@radix-ui/react-popover"));
var import_react17 = require("react");
var import_jsx_runtime26 = require("react/jsx-runtime");
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverClose = PopoverPrimitive.Close;
var PopoverContent = (0, import_react17.forwardRef)(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(PopoverPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// src/dashboard/ui/command.tsx
var import_react18 = require("react");
var import_cmdk = require("cmdk");

// src/dashboard/ui/dialog.tsx
var React3 = __toESM(require("react"));
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_jsx_runtime27 = require("react/jsx-runtime");
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(DialogPrimitive.Portal, { className: cn(className), ...props });
DialogPortal.displayName = DialogPrimitive.Portal.displayName;
var DialogOverlay = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React3.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(DialogPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(DialogOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(LucideIcon, { name: "x", className: "h-4 w-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var DialogClose = DialogPrimitive.Close;

// src/dashboard/ui/command.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
var Command = (0, import_react18.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  import_cmdk.Command,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = import_cmdk.Command.displayName;
var CommandInput = (0, import_react18.forwardRef)(({ className, ...props }, ref) => (
  // eslint-disable-next-line react/no-unknown-property
  /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(LucideIcon, { name: "search", className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      import_cmdk.Command.Input,
      {
        ref,
        className: cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    )
  ] })
));
CommandInput.displayName = import_cmdk.Command.Input.displayName;
var CommandList = (0, import_react18.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  import_cmdk.Command.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = import_cmdk.Command.List.displayName;
var CommandEmpty = (0, import_react18.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_cmdk.Command.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = import_cmdk.Command.Empty.displayName;
var CommandGroup = (0, import_react18.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  import_cmdk.Command.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = import_cmdk.Command.Group.displayName;
var CommandSeparator = (0, import_react18.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_cmdk.Command.Separator, { ref, className: cn("-mx-1 h-px bg-border", className), ...props }));
CommandSeparator.displayName = import_cmdk.Command.Separator.displayName;
var CommandItem = (0, import_react18.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  import_cmdk.Command.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = import_cmdk.Command.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
};
CommandShortcut.displayName = "CommandShortcut";

// src/dashboard/components/fields/icon-selector/icon-selector.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
function IconSelector({ icon, onChange, className, style }) {
  var _a;
  (0, import_tiny_invariant.default)((_a = icon == null ? void 0 : icon.iconLib) != null ? _a : "lucide", `Icon library "${icon == null ? void 0 : icon.iconLib}" is not supported`);
  const [open, setOpen] = (0, import_react19.useState)(false);
  const [searchText, setSearchText] = (0, import_react19.useState)("");
  const filteredIcons = (0, import_react19.useMemo)(
    () => (0, import_match_sorter.matchSorter)(
      // lucideIconNames
      [],
      searchText
    ),
    [searchText]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        className,
        style,
        children: icon ? icon.name : "Select Icon"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(PopoverContent, { className: "p-0", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
      Command,
      {
        shouldFilter: false,
        onChange: (event) => {
          setSearchText(event.target.value);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(CommandInput, { placeholder: "Search framework..." }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(CommandList, { className: "max-h-[300px]", children: [
            filteredIcons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(CommandEmpty, { children: "No icon found." }) : null,
            filteredIcons.slice(0, 50).map((iconName) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
              CommandItem,
              {
                onSelect: () => {
                  onChange == null ? void 0 : onChange({
                    iconLib: "lucide",
                    name: iconName
                  });
                  setOpen(false);
                },
                children: iconName
              },
              iconName
            ))
          ] })
        ]
      }
    ) })
  ] });
}

// src/dashboard/components/fields/video-uploader/video-uploader.tsx
var import_react_query5 = require("@tanstack/react-query");
var import_react_player = __toESM(require("react-player"));
var import_react20 = require("react");

// src/dashboard/components/fields/video-uploader/queries.ts
var import_axios2 = __toESM(require("axios"));
async function uploadVideo(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("assetType", "video");
  const { data } = await import_axios2.default.post("/cms/api/upload-asset", formData, {
    onUploadProgress
  });
  return uploadVideoResponseSchema.parse(data);
}

// src/dashboard/components/fields/video-uploader/video-uploader.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
function VideoUploader({ field, uploadedVideo, onChange, className, style }) {
  const [progress, setProgress] = (0, import_react20.useState)(0);
  const mutation = (0, import_react_query5.useMutation)(
    (file) => uploadVideo(file, ({ progress: progress2 }) => {
      setProgress(progress2 != null ? progress2 : 0);
    }),
    {
      onSuccess: ({ url }) => {
        onChange == null ? void 0 : onChange(url);
      }
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: cn("relative cursor-pointer overflow-hidden rounded-md", className), style, children: [
    progress !== 0 && progress !== 1 ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-full", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "h-full bg-primary transition-all", style: { width: `${progress * 100}%` } }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      Uploader,
      {
        description: "Accept Videos",
        accept: {
          "video/*": [".mp4", ".mov", ".webm"]
        },
        disabled: mutation.isLoading,
        onDrop: (acceptedFile) => {
          mutation.mutate(acceptedFile[0]);
        }
      }
    ),
    mutation.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(LucideIcon, { name: "loader-2", className: "absolute right-3 top-3 h-6 w-6 animate-spin" }) : null,
    uploadedVideo ? /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "mt-2 flex items-center space-x-2 truncate rounded-md border p-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "h-10 w-10 overflow-hidden rounded-md", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_player.default, { alt: "", url: uploadedVideo, width: 40, height: 40 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex-1 truncate text-xs text-muted-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "line-clamp-1 truncate whitespace-break-spaces", children: uploadedVideo }) }),
      !field.required ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
        Button,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(LucideIcon, { name: "trash" }),
          size: "icon",
          variant: "destructive-outline",
          type: "button",
          className: "opacity-30 transition-opacity hover:opacity-100",
          onClick: () => {
            onChange == null ? void 0 : onChange(null);
          }
        }
      ) : null
    ] }, uploadedVideo) : null
  ] });
}

// src/dashboard/components/fields/tiptap-editor/tiptap-editor.tsx
var import_react28 = require("react");
var import_react29 = require("@tiptap/react");
var import_starter_kit = require("@tiptap/starter-kit");
var import_extension_underline = __toESM(require("@tiptap/extension-underline"));
var import_extension_text_style = __toESM(require("@tiptap/extension-text-style"));
var import_extension_color = __toESM(require("@tiptap/extension-color"));
var import_extension_link = __toESM(require("@tiptap/extension-link"));
var import_extension_table = __toESM(require("@tiptap/extension-table"));
var import_extension_table_cell = __toESM(require("@tiptap/extension-table-cell"));
var import_extension_table_header = __toESM(require("@tiptap/extension-table-header"));
var import_extension_table_row = __toESM(require("@tiptap/extension-table-row"));
var import_extension_image = __toESM(require("@tiptap/extension-image"));

// src/dashboard/components/fields/tiptap-editor/components/editor-toolbar.tsx
var import_lucide_react6 = require("lucide-react");

// src/dashboard/components/fields/tiptap-editor/components/link-button.tsx
var import_zod3 = require("@hookform/resolvers/zod");
var import_react_hook_form4 = require("react-hook-form");
var import_zod4 = require("zod");

// src/dashboard/ui/form.tsx
var import_react_slot3 = require("@radix-ui/react-slot");
var import_react_hook_form3 = require("react-hook-form");
var import_react22 = require("react");

// src/dashboard/ui/label.tsx
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
var import_class_variance_authority3 = require("class-variance-authority");
var import_react21 = require("react");
var import_jsx_runtime31 = require("react/jsx-runtime");
var labelVariants = (0, import_class_variance_authority3.cva)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label2 = (0, import_react21.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label2.displayName = LabelPrimitive.Root.displayName;

// src/dashboard/ui/form.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var FormFieldContext = (0, import_react22.createContext)({});
var FormItemContext = (0, import_react22.createContext)({});
function useFormField() {
  const fieldContext = (0, import_react22.useContext)(FormFieldContext);
  const itemContext = (0, import_react22.useContext)(FormItemContext);
  const { getFieldState, formState } = (0, import_react_hook_form3.useFormContext)();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
}
var Form = import_react_hook_form3.FormProvider;
function FormFieldWithController(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_hook_form3.Controller, { ...props }) });
}
function FormField({ name, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FormFieldContext.Provider, { value: { name }, children });
}
var FormItem = (0, import_react22.forwardRef)(({ className, ...props }, ref) => {
  const id = (0, import_react22.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { ref, className: cn("space-y-3", className), ...props }) });
});
FormItem.displayName = "FormItem";
var FormLabel = (0, import_react22.forwardRef)(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Label2, { ref, className: cn(error && "text-destructive", className), htmlFor: formItemId, ...props });
});
FormLabel.displayName = "FormLabel";
var FormControl = (0, import_react22.forwardRef)(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
      import_react_slot3.Slot,
      {
        ref,
        id: formItemId,
        "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error,
        ...props
      }
    );
  }
);
FormControl.displayName = "FormControl";
var FormDescription = (0, import_react22.forwardRef)(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { ref, id: formDescriptionId, className: cn("text-sm text-muted-foreground", className), ...props });
  }
);
FormDescription.displayName = "FormDescription";
var FormMessage = (0, import_react22.forwardRef)(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error == null ? void 0 : error.message) : children;
    if (!body) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { ref, id: formMessageId, className: cn("text-xs font-medium text-destructive", className), ...props, children: body });
  }
);
FormMessage.displayName = "FormMessage";

// src/dashboard/components/fields/tiptap-editor/components/link-button.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var validationSchema = import_zod4.z.object({
  link: import_zod4.z.string().url()
});
function LinkButton({ editor, className, style }) {
  const form = (0, import_react_hook_form4.useForm)({
    resolver: (0, import_zod3.zodResolver)(validationSchema),
    defaultValues: {
      link: editor.isActive("link") ? editor.getAttributes("link").href : ""
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
    Popover,
    {
      onOpenChange: (open) => {
        if (editor.isActive("link") && open) {
          form.setValue("link", editor.getAttributes("link").href);
        }
        if (!open && !editor.isActive("link")) {
          form.setValue("link", "");
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          Button,
          {
            className,
            style,
            icon: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(LucideIcon, { name: "link" }),
            size: "icon",
            variant: "ghost",
            type: "button"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(PopoverContent, { sideOffset: 12, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Form, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
          "form",
          {
            onSubmit: (event) => {
              event.stopPropagation();
              form.handleSubmit(({ link }) => {
                editor.chain().focus().setLink({ href: link }).run();
              })(event);
            },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                FormFieldWithController,
                {
                  name: "link",
                  control: form.control,
                  render: ({ field }) => {
                    return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(FormItem, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FormLabel, { children: "Link" }),
                      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Input, { ...field }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FormMessage, {})
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex items-center justify-end space-x-2", children: [
                editor.isActive("link") ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                  Button,
                  {
                    type: "button",
                    size: "icon-sm",
                    variant: "secondary",
                    icon: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(LucideIcon, { name: "unlink" }),
                    onClick: () => {
                      editor.chain().focus().unsetLink().run();
                    }
                  }
                ) : null,
                /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Button, { size: "icon-sm", type: "submit", icon: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(LucideIcon, { name: "check" }) })
              ] })
            ]
          }
        ) }) })
      ]
    }
  );
}

// src/dashboard/components/fields/tiptap-editor/components/table-menu.tsx
var import_zod5 = require("@hookform/resolvers/zod");
var import_react23 = require("react");
var import_react_hook_form5 = require("react-hook-form");
var import_zod6 = require("zod");
var import_jsx_runtime34 = require("react/jsx-runtime");
var TABLE_SIZES = [
  {
    cols: 3,
    rows: 4
  },
  {
    cols: 4,
    rows: 4
  },
  {
    cols: 5,
    rows: 4
  },
  {
    cols: 6,
    rows: 4
  }
];
var validationSchema2 = import_zod6.z.object({
  rows: import_zod6.z.number().int().positive().min(1),
  cols: import_zod6.z.number().int().positive().min(1)
});
function TableMenu({ editor, className, style }) {
  const form = (0, import_react_hook_form5.useForm)({
    resolver: (0, import_zod5.zodResolver)(validationSchema2),
    defaultValues: {
      rows: 1,
      cols: 1
    }
  });
  const handleInsertTable = (0, import_react23.useCallback)(
    (rows, cols) => {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
      setTimeout(() => {
        editor.chain().focus().run();
      });
    },
    [editor]
  );
  const [customTableDialogOpen, setCustomTableDialogOpen] = (0, import_react23.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(Dialog, { open: customTableDialogOpen, onOpenChange: setCustomTableDialogOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Menubar, { className: "border-none p-0", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(MenubarMenu, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
        Button,
        {
          variant: "outline",
          size: "icon",
          icon: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(LucideIcon, { name: "table" }),
          type: "button",
          className,
          style
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(MenubarContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(MenubarSub, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarSubTrigger, { children: "Insert Table" }),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(MenubarSubContent, { children: [
            TABLE_SIZES.map((tableSize) => /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
              MenubarItem,
              {
                onClick: () => {
                  handleInsertTable(tableSize.rows, tableSize.cols);
                },
                children: [
                  tableSize.rows,
                  " x ",
                  tableSize.cols
                ]
              },
              `${tableSize.rows}x${tableSize.cols}`
            )),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarSeparator, {}),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DialogTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarItem, { children: "Custom Table Size" }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarSeparator, {}),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addColumnBefore().run();
            },
            children: "Add Column Before"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addColumnAfter().run();
            },
            children: "Add Column After"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().deleteColumn().run();
            },
            children: "Delete Column"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarSeparator, {}),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addRowBefore().run();
            },
            children: "Add Row Before"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addRowAfter().run();
            },
            children: "Add Row After"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().deleteRow().run();
            },
            children: "Delete Row"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarSeparator, {}),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.can().chain().mergeCells().run(),
            onClick: () => {
              editor.chain().focus().mergeCells().run();
            },
            children: "Merge Cells"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.can().chain().splitCell().run(),
            onClick: () => {
              editor.chain().focus().splitCell().run();
            },
            children: "Split Cell"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(MenubarSeparator, {}),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().deleteTable().run();
            },
            className: "text-destructive",
            children: "Delete Table"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DialogContent, { className: "sm:max-w-[425px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DialogHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DialogTitle, { children: "Create custom table" }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DialogDescription, { children: "Add rows and cols size" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Form, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
        "form",
        {
          onSubmit: (event) => {
            event.stopPropagation();
            form.handleSubmit(({ rows, cols }) => {
              handleInsertTable(rows, cols);
              setCustomTableDialogOpen(false);
            })(event);
          },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
              FormFieldWithController,
              {
                name: "rows",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(FormItem, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormLabel, { children: "Rows" }),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                      Input,
                      {
                        placeholder: "Rows",
                        ...field,
                        type: "number",
                        onChange: (event) => {
                          field.onChange(Number.parseInt(event.target.value, 10));
                        }
                      }
                    ) }),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
              FormFieldWithController,
              {
                name: "cols",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(FormItem, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormLabel, { children: "cols" }),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                      Input,
                      {
                        placeholder: "cols",
                        ...field,
                        type: "number",
                        onChange: (event) => {
                          field.onChange(Number.parseInt(event.target.value, 10));
                        }
                      }
                    ) }),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DialogFooter, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DialogClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Button, { variant: "ghost", children: "Cancel" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Button, { type: "submit", children: "Submit" })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}

// src/dashboard/components/fields/tiptap-editor/components/image-button.tsx
var import_react24 = require("react");
var import_jsx_runtime35 = require("react/jsx-runtime");
function ImageButton({ editor, className, style }) {
  const [uploadedImage, setUploadedImage] = (0, import_react24.useState)(null);
  const [dialogOpen, setDialogOpen] = (0, import_react24.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
    Dialog,
    {
      open: dialogOpen,
      onOpenChange: (openState) => {
        setDialogOpen(openState);
        setUploadedImage(void 0);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(DialogTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Button, { size: "icon", variant: "outline", icon: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(LucideIcon, { name: "image" }), className, style }) }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(DialogContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(DialogHeader, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(DialogTitle, { children: "Insert Image" }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(DialogDescription, { children: "Upload image to upload" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(ImageUploader, { required: true, uploadedImage: uploadedImage != null ? uploadedImage : void 0, onChange: setUploadedImage }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(DialogFooter, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(DialogClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Button, { type: "button", variant: "ghost", children: "Cancel" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
              Button,
              {
                type: "button",
                disabled: !uploadedImage,
                onClick: () => {
                  if (uploadedImage) {
                    editor.chain().setImage({ src: uploadedImage.url }).run();
                    setDialogOpen(false);
                  }
                },
                children: "Submit"
              }
            )
          ] })
        ] })
      ]
    }
  );
}

// src/dashboard/components/fields/tiptap-editor/components/color-button.tsx
var import_react26 = require("react");
var import_use_debounce = require("use-debounce");
var import_lucide_react5 = require("lucide-react");

// src/dashboard/ui/toggle.tsx
var TogglePrimitive = __toESM(require("@radix-ui/react-toggle"));
var import_class_variance_authority4 = require("class-variance-authority");
var import_react25 = require("react");
var import_jsx_runtime36 = require("react/jsx-runtime");
var toggleVariants = (0, import_class_variance_authority4.cva)(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Toggle = (0, import_react25.forwardRef)(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(TogglePrimitive.Root, { ref, className: cn(toggleVariants({ variant, size, className })), ...props }));
Toggle.displayName = TogglePrimitive.Root.displayName;

// src/dashboard/ui/color-palette.tsx
var import_react_colorful = require("react-colorful");

// src/dashboard/lib/colors.json
var colors_default = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  slate: {
    "50": "#f8fafc",
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "300": "#cbd5e1",
    "400": "#94a3b8",
    "500": "#64748b",
    "600": "#475569",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a",
    "950": "#020617"
  },
  gray: {
    "50": "#f9fafb",
    "100": "#f3f4f6",
    "200": "#e5e7eb",
    "300": "#d1d5db",
    "400": "#9ca3af",
    "500": "#6b7280",
    "600": "#4b5563",
    "700": "#374151",
    "800": "#1f2937",
    "900": "#111827",
    "950": "#030712"
  },
  zinc: {
    "50": "#fafafa",
    "100": "#f4f4f5",
    "200": "#e4e4e7",
    "300": "#d4d4d8",
    "400": "#a1a1aa",
    "500": "#71717a",
    "600": "#52525b",
    "700": "#3f3f46",
    "800": "#27272a",
    "900": "#18181b",
    "950": "#09090b"
  },
  neutral: {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#e5e5e5",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717",
    "950": "#0a0a0a"
  },
  stone: {
    "50": "#fafaf9",
    "100": "#f5f5f4",
    "200": "#e7e5e4",
    "300": "#d6d3d1",
    "400": "#a8a29e",
    "500": "#78716c",
    "600": "#57534e",
    "700": "#44403c",
    "800": "#292524",
    "900": "#1c1917",
    "950": "#0c0a09"
  },
  red: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
    "950": "#450a0a"
  },
  orange: {
    "50": "#fff7ed",
    "100": "#ffedd5",
    "200": "#fed7aa",
    "300": "#fdba74",
    "400": "#fb923c",
    "500": "#f97316",
    "600": "#ea580c",
    "700": "#c2410c",
    "800": "#9a3412",
    "900": "#7c2d12",
    "950": "#431407"
  },
  amber: {
    "50": "#fffbeb",
    "100": "#fef3c7",
    "200": "#fde68a",
    "300": "#fcd34d",
    "400": "#fbbf24",
    "500": "#f59e0b",
    "600": "#d97706",
    "700": "#b45309",
    "800": "#92400e",
    "900": "#78350f",
    "950": "#451a03"
  },
  yellow: {
    "50": "#fefce8",
    "100": "#fef9c3",
    "200": "#fef08a",
    "300": "#fde047",
    "400": "#facc15",
    "500": "#eab308",
    "600": "#ca8a04",
    "700": "#a16207",
    "800": "#854d0e",
    "900": "#713f12",
    "950": "#422006"
  },
  lime: {
    "50": "#f7fee7",
    "100": "#ecfccb",
    "200": "#d9f99d",
    "300": "#bef264",
    "400": "#a3e635",
    "500": "#84cc16",
    "600": "#65a30d",
    "700": "#4d7c0f",
    "800": "#3f6212",
    "900": "#365314",
    "950": "#1a2e05"
  },
  green: {
    "50": "#f0fdf4",
    "100": "#dcfce7",
    "200": "#bbf7d0",
    "300": "#86efac",
    "400": "#4ade80",
    "500": "#22c55e",
    "600": "#16a34a",
    "700": "#15803d",
    "800": "#166534",
    "900": "#14532d",
    "950": "#052e16"
  },
  emerald: {
    "50": "#ecfdf5",
    "100": "#d1fae5",
    "200": "#a7f3d0",
    "300": "#6ee7b7",
    "400": "#34d399",
    "500": "#10b981",
    "600": "#059669",
    "700": "#047857",
    "800": "#065f46",
    "900": "#064e3b",
    "950": "#022c22"
  },
  teal: {
    "50": "#f0fdfa",
    "100": "#ccfbf1",
    "200": "#99f6e4",
    "300": "#5eead4",
    "400": "#2dd4bf",
    "500": "#14b8a6",
    "600": "#0d9488",
    "700": "#0f766e",
    "800": "#115e59",
    "900": "#134e4a",
    "950": "#042f2e"
  },
  cyan: {
    "50": "#ecfeff",
    "100": "#cffafe",
    "200": "#a5f3fc",
    "300": "#67e8f9",
    "400": "#22d3ee",
    "500": "#06b6d4",
    "600": "#0891b2",
    "700": "#0e7490",
    "800": "#155e75",
    "900": "#164e63",
    "950": "#083344"
  },
  sky: {
    "50": "#f0f9ff",
    "100": "#e0f2fe",
    "200": "#bae6fd",
    "300": "#7dd3fc",
    "400": "#38bdf8",
    "500": "#0ea5e9",
    "600": "#0284c7",
    "700": "#0369a1",
    "800": "#075985",
    "900": "#0c4a6e",
    "950": "#082f49"
  },
  blue: {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "#60a5fa",
    "500": "#3b82f6",
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a",
    "950": "#172554"
  },
  indigo: {
    "50": "#eef2ff",
    "100": "#e0e7ff",
    "200": "#c7d2fe",
    "300": "#a5b4fc",
    "400": "#818cf8",
    "500": "#6366f1",
    "600": "#4f46e5",
    "700": "#4338ca",
    "800": "#3730a3",
    "900": "#312e81",
    "950": "#1e1b4b"
  },
  violet: {
    "50": "#f5f3ff",
    "100": "#ede9fe",
    "200": "#ddd6fe",
    "300": "#c4b5fd",
    "400": "#a78bfa",
    "500": "#8b5cf6",
    "600": "#7c3aed",
    "700": "#6d28d9",
    "800": "#5b21b6",
    "900": "#4c1d95",
    "950": "#2e1065"
  },
  purple: {
    "50": "#faf5ff",
    "100": "#f3e8ff",
    "200": "#e9d5ff",
    "300": "#d8b4fe",
    "400": "#c084fc",
    "500": "#a855f7",
    "600": "#9333ea",
    "700": "#7e22ce",
    "800": "#6b21a8",
    "900": "#581c87",
    "950": "#3b0764"
  },
  fuchsia: {
    "50": "#fdf4ff",
    "100": "#fae8ff",
    "200": "#f5d0fe",
    "300": "#f0abfc",
    "400": "#e879f9",
    "500": "#d946ef",
    "600": "#c026d3",
    "700": "#a21caf",
    "800": "#86198f",
    "900": "#701a75",
    "950": "#4a044e"
  },
  pink: {
    "50": "#fdf2f8",
    "100": "#fce7f3",
    "200": "#fbcfe8",
    "300": "#f9a8d4",
    "400": "#f472b6",
    "500": "#ec4899",
    "600": "#db2777",
    "700": "#be185d",
    "800": "#9d174d",
    "900": "#831843",
    "950": "#500724"
  },
  rose: {
    "50": "#fff1f2",
    "100": "#ffe4e6",
    "200": "#fecdd3",
    "300": "#fda4af",
    "400": "#fb7185",
    "500": "#f43f5e",
    "600": "#e11d48",
    "700": "#be123c",
    "800": "#9f1239",
    "900": "#881337",
    "950": "#4c0519"
  },
  lightBlue: {
    "50": "#f0f9ff",
    "100": "#e0f2fe",
    "200": "#bae6fd",
    "300": "#7dd3fc",
    "400": "#38bdf8",
    "500": "#0ea5e9",
    "600": "#0284c7",
    "700": "#0369a1",
    "800": "#075985",
    "900": "#0c4a6e",
    "950": "#082f49"
  },
  warmGray: {
    "50": "#fafaf9",
    "100": "#f5f5f4",
    "200": "#e7e5e4",
    "300": "#d6d3d1",
    "400": "#a8a29e",
    "500": "#78716c",
    "600": "#57534e",
    "700": "#44403c",
    "800": "#292524",
    "900": "#1c1917",
    "950": "#0c0a09"
  },
  trueGray: {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#e5e5e5",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717",
    "950": "#0a0a0a"
  },
  coolGray: {
    "50": "#f9fafb",
    "100": "#f3f4f6",
    "200": "#e5e7eb",
    "300": "#d1d5db",
    "400": "#9ca3af",
    "500": "#6b7280",
    "600": "#4b5563",
    "700": "#374151",
    "800": "#1f2937",
    "900": "#111827",
    "950": "#030712"
  },
  blueGray: {
    "50": "#f8fafc",
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "300": "#cbd5e1",
    "400": "#94a3b8",
    "500": "#64748b",
    "600": "#475569",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a",
    "950": "#020617"
  }
};

// src/dashboard/ui/color-palette.tsx
var import_jsx_runtime37 = require("react/jsx-runtime");
function convertToHex(rgb) {
  const result = rgb.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);
  if (!result) {
    return rgb;
  }
  return "#" + result.slice(1).map((part) => {
    const hex = parseInt(part).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}
var COLORS = [
  {
    colors: [colors_default.white, colors_default.black]
  },
  {
    heading: "Slate",
    colors: Object.values(colors_default.slate)
  },
  {
    heading: "Gray",
    colors: Object.values(colors_default.gray)
  },
  {
    heading: "Zinc",
    colors: Object.values(colors_default.zinc)
  },
  {
    heading: "Neutral",
    colors: Object.values(colors_default.neutral)
  },
  {
    heading: "Stone",
    colors: Object.values(colors_default.stone)
  },
  {
    heading: "Red",
    colors: Object.values(colors_default.red)
  },
  {
    heading: "Orange",
    colors: Object.values(colors_default.orange)
  },
  {
    heading: "Amber",
    colors: Object.values(colors_default.amber)
  },
  {
    heading: "Yellow",
    colors: Object.values(colors_default.yellow)
  },
  {
    heading: "Lime",
    colors: Object.values(colors_default.lime)
  },
  {
    heading: "Green",
    colors: Object.values(colors_default.green)
  },
  {
    heading: "Emerald",
    colors: Object.values(colors_default.emerald)
  },
  {
    heading: "Teal",
    colors: Object.values(colors_default.teal)
  },
  {
    heading: "Cyan",
    colors: Object.values(colors_default.cyan)
  },
  {
    heading: "Sky",
    colors: Object.values(colors_default.sky)
  },
  {
    heading: "Blue",
    colors: Object.values(colors_default.blue)
  },
  {
    heading: "Indigo",
    colors: Object.values(colors_default.indigo)
  },
  {
    heading: "Violet",
    colors: Object.values(colors_default.violet)
  },
  {
    heading: "Purple",
    colors: Object.values(colors_default.purple)
  },
  {
    heading: "Fuchsia",
    colors: Object.values(colors_default.fuchsia)
  },
  {
    heading: "Pink",
    colors: Object.values(colors_default.pink)
  },
  {
    heading: "Rose",
    colors: Object.values(colors_default.rose)
  }
];
function ColorPalette({ value, onChange, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: cn("space-y-4", className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
      import_react_colorful.HexColorPicker,
      {
        className: "!w-full",
        color: value ? convertToHex(value) : void 0,
        onChange: (selectedColor) => {
          onChange == null ? void 0 : onChange(selectedColor, true);
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "max-h-[120px] space-y-4 overflow-auto", children: COLORS.map((block, index) => {
      return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-2", children: [
        block.heading ? /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "text-sm font-medium text-foreground", children: block.heading }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "flex flex-wrap gap-2", children: block.colors.map((color) => {
          return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            "button",
            {
              style: { backgroundColor: color },
              className: cn(
                "h-5 w-5 rounded-full ring-current focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                color === colors_default.white ? "border" : void 0
              ),
              onClick: () => {
                onChange == null ? void 0 : onChange(color, false);
              }
            },
            color
          );
        }) })
      ] }, index);
    }) })
  ] });
}

// src/dashboard/components/fields/tiptap-editor/components/color-button.tsx
var import_jsx_runtime38 = require("react/jsx-runtime");
function ColorButton({ editor, className, style }) {
  var _a;
  const colorActive = (_a = editor.getAttributes("textStyle")) == null ? void 0 : _a.color;
  const handleColorChangeWithDebounce = (0, import_use_debounce.useDebouncedCallback)((color) => {
    editor.chain().focus().setColor(color).run();
  }, 1e3);
  const handleColorChange = (0, import_react26.useCallback)(
    (color) => {
      editor.chain().focus().setColor(color).run();
    },
    [editor]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Popover, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Toggle, { className, style, variant: "outline", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react5.Baseline, { className: "h-4 w-4", style: { color: colorActive } }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(PopoverContent, { sideOffset: 12, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        ColorPalette,
        {
          value: colorActive,
          onChange: (colorSelected, fromPicker) => {
            if (fromPicker) {
              handleColorChangeWithDebounce(colorSelected);
            } else {
              handleColorChange(colorSelected);
            }
          }
        }
      ),
      colorActive ? /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(import_jsx_runtime38.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: "border-b" }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          Button,
          {
            variant: "outline",
            icon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react5.RemoveFormatting, {}),
            size: "sm",
            onClick: () => {
              editor.chain().focus().unsetColor().run();
            },
            children: "Remove Formatting"
          }
        )
      ] }) : null
    ] }) })
  ] });
}

// src/dashboard/ui/select.tsx
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_react27 = require("react");
var import_jsx_runtime39 = require("react/jsx-runtime");
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = (0, import_react27.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(LucideIcon, { name: "chevron-down", className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = (0, import_react27.forwardRef)(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        ),
        children
      }
    )
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = (0, import_react27.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = (0, import_react27.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(LucideIcon, { name: "check", className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = (0, import_react27.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/dashboard/components/fields/tiptap-editor/components/editor-toolbar.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
var HEADING_LEVELS = [1, 2, 3, 4, 5];
function EditorToolbar({ editor, className, style }) {
  var _a, _b;
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: cn("flex flex-wrap items-center gap-2", className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleBold().run();
        },
        disabled: !editor.can().chain().focus().toggleBold().run(),
        pressed: editor.isActive("bold"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Bold, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleItalic().run();
        },
        disabled: !editor.can().chain().focus().toggleItalic().run(),
        pressed: editor.isActive("italic"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Italic, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleUnderline().run();
        },
        disabled: !editor.can().chain().focus().toggleUnderline().run(),
        pressed: editor.isActive("underline"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Underline, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleStrike().run();
        },
        disabled: !editor.can().chain().focus().toggleStrike().run(),
        pressed: editor.isActive("strike"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Strikethrough, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleCode().run();
        },
        disabled: !editor.can().chain().focus().toggleCode().run(),
        pressed: editor.isActive("code"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Code, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleCodeBlock().run();
        },
        disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
        pressed: editor.isActive("codeBlock"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.TerminalSquare, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleBulletList().run();
        },
        disabled: !editor.can().chain().focus().toggleBulletList().run(),
        pressed: editor.isActive("bulletList"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.List, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleOrderedList().run();
        },
        disabled: !editor.can().chain().focus().toggleOrderedList().run(),
        pressed: editor.isActive("orderedList"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.ListOrdered, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleBlockquote().run();
        },
        disabled: !editor.can().chain().focus().toggleBlockquote().run(),
        pressed: editor.isActive("blockqoute"),
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Quote, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      Select,
      {
        value: `${(_b = (_a = editor.getAttributes("heading")) == null ? void 0 : _a.level) != null ? _b : "normal"}`,
        onValueChange: (args) => {
          var _a2;
          if (args === "normal") {
            const currentHeadingLevel = (_a2 = editor.getAttributes("heading")) == null ? void 0 : _a2.level;
            if (currentHeadingLevel) {
              editor.chain().focus().toggleHeading({ level: currentHeadingLevel }).run();
            }
          } else {
            editor.chain().toggleHeading({ level: Number.parseInt(args, 10) }).focus().focus().run();
          }
          setTimeout(() => {
            editor.chain().focus().run();
          });
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(SelectTrigger, { className: "w-[210px]", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(SelectValue, { placeholder: "Text Style" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(SelectContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(SelectItem, { value: "normal", children: "Normal Text" }, "normal"),
            HEADING_LEVELS.map((headingLevel) => {
              return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(SelectItem, { value: `${headingLevel}`, children: [
                "Heading ",
                headingLevel
              ] }, headingLevel);
            })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ColorButton, { editor }),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(LinkButton, { editor }),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(TableMenu, { editor }),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ImageButton, { editor }),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().undo().run();
        },
        disabled: !editor.can().undo(),
        pressed: false,
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Undo, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().redo().run();
        },
        disabled: !editor.can().redo(),
        pressed: false,
        variant: "outline",
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react6.Redo, { className: "h-4 w-4" })
      }
    )
  ] });
}

// src/dashboard/components/fields/tiptap-editor/tiptap-editor.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
var CustomTextStyle = import_extension_text_style.default.extend({
  priority: 1e3
});
function TiptapEditor({ value, onChange, className, style }) {
  const [internalValue, setInternalValue] = (0, import_react28.useState)(value);
  const editor = (0, import_react29.useEditor)({
    content: value,
    extensions: [
      import_starter_kit.StarterKit.configure({
        heading: {
          levels: HEADING_LEVELS
        }
      }),
      import_extension_underline.default,
      import_extension_color.default.configure({
        types: ["textStyle"]
      }),
      CustomTextStyle,
      import_extension_link.default.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      import_extension_table.default.configure({
        resizable: true,
        HTMLAttributes: {
          style: "table-layout: fixed; width: 100%;"
        }
      }),
      import_extension_table_row.default,
      import_extension_table_header.default,
      import_extension_table_cell.default,
      import_extension_image.default
    ],
    onUpdate: () => {
      const html = editor == null ? void 0 : editor.getHTML();
      if (html) {
        onChange(html);
        setInternalValue(html);
      }
    }
  });
  (0, import_react28.useEffect)(
    function updateContentOnValueChange() {
      if (typeof value === "string" && value !== internalValue) {
        editor == null ? void 0 : editor.commands.setContent(value);
      }
    },
    [value, internalValue, editor]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("div", { className: cn("space-y-4", className), style, children: editor ? /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_jsx_runtime41.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(EditorToolbar, { editor }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      import_react29.EditorContent,
      {
        editor,
        className: String.raw`editor-container prose prose-zinc !max-w-none rounded-md border px-3 py-2 text-sm text-foreground dark:prose-invert focus-within:border-primary/50 prose-table:table-fixed prose-table:border-collapse prose-table:border [&>.ProseMirror]:focus-within:outline-none [&_.ProseMirror-selectednode]:ring-2 [&_.ProseMirror-selectednode]:ring-ring [&_.column-resize-handle]:pointer-events-none [&_.column-resize-handle]:absolute [&_.column-resize-handle]:bottom-0 [&_.column-resize-handle]:right-0 [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:w-0.5 [&_.column-resize-handle]:cursor-col-resize [&_.column-resize-handle]:bg-primary/50 [&_.selectedCell]:after:pointer-events-none [&_.selectedCell]:after:absolute [&_.selectedCell]:after:inset-0 [&_.selectedCell]:after:bg-primary/10 [&_td]:relative [&_td]:border [&_td]:p-2 [&_td_p]:m-0 [&_th>p]:m-0 [&_th]:relative [&_th]:border [&_th]:bg-muted [&_th]:p-2`
      }
    )
  ] }) : null });
}

// src/dashboard/ui/date-picker.tsx
var import_date_fns2 = require("date-fns");

// src/dashboard/ui/calendar.tsx
var import_react_day_picker = require("react-day-picker");
var import_jsx_runtime42 = require("react/jsx-runtime");
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
    import_react_day_picker.DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ className: className2, ...props2 }) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(LucideIcon, { name: "chevron-left", className: cn(className2, "h-4 w-4"), ...props2 }),
        IconRight: ({ className: className2, ...props2 }) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(LucideIcon, { name: "chevron-right", className: cn(className2, "h-4 w-4"), ...props2 })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";

// src/dashboard/ui/date-picker.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
function DatePicker({ date, onChange, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(Popover, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      Button,
      {
        variant: "outline",
        className: cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground", className),
        style,
        icon: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(LucideIcon, { name: "calendar" }),
        children: date ? (0, import_date_fns2.format)(date, "PPP") : "Pick a date"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Calendar, { mode: "single", selected: date, onSelect: onChange, initialFocus: true }) })
  ] });
}

// src/dashboard/ui/color-picker.tsx
var import_react30 = require("react");
var import_jsx_runtime44 = require("react/jsx-runtime");
function ColorPicker({ value, onChange, showColor = true, className, style }) {
  const [open, setOpen] = (0, import_react30.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
      Button,
      {
        type: "button",
        variant: "outline",
        icon: value ? /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { style: { backgroundColor: value }, className: "rounded border" }) : void 0,
        className: cn("font-mono", className),
        style,
        children: value ? showColor ? value : void 0 : "Select Color"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(PopoverContent, { children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
      ColorPalette,
      {
        value,
        onChange: (colorSelected, fromColorPicker) => {
          onChange == null ? void 0 : onChange(colorSelected);
          if (!fromColorPicker) {
            setOpen(false);
          }
        }
      }
    ) })
  ] });
}

// src/dashboard/components/content-manager/components/base-form.tsx
var import_jsx_runtime45 = require("react/jsx-runtime");
function BaseForm({
  schema,
  initialData,
  onSubmit,
  submitting,
  plugins = [],
  title,
  className,
  style
}) {
  const validationSchema5 = (0, import_react31.useMemo)(() => getValidationSchemaForSchema(schema), [schema]);
  const form = (0, import_react_hook_form6.useForm)({
    resolver: (0, import_zod7.zodResolver)(validationSchema5),
    defaultValues: initialData
  });
  const { toast: toast2 } = useToast();
  const renderForm = (0, import_react31.useCallback)(
    (schema2, rootFieldKey) => {
      return Object.entries(schema2).map(([fieldKey, fieldSchema]) => {
        if (fieldSchema.hidden) {
          return null;
        }
        const pluginsToRender = plugins.filter((plugin) => {
          return plugin.enabledForFields.includes(fieldSchema.type);
        });
        const fieldName = rootFieldKey ? `${rootFieldKey}.${fieldKey}` : fieldKey;
        return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(FormField, { name: fieldName, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(FormItem, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(FormLabel, { className: "block", children: [
            fieldSchema.label,
            " ",
            fieldSchema.required ? /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "text-xs text-muted-foreground", children: "(required)" }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(FormControl, { children: (() => {
            switch (fieldSchema.type) {
              case "text": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                        Input,
                        {
                          value,
                          onChange: (event) => {
                            onChange(event.target.value);
                          }
                        }
                      );
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "rich-text": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: (props) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(TiptapEditor, { ...props });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "slug": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                        slug_input_default,
                        {
                          value,
                          onChange: (event) => {
                            onChange(event.target.value);
                          },
                          onGenerateSlug: () => {
                            const fromValue = form.getValues(fieldSchema.from);
                            if (fromValue && typeof fromValue === "string") {
                              const slug = (0, import_slugify.default)(fromValue).toLowerCase();
                              onChange(slug);
                            } else {
                              toast2({
                                title: "Couldn't generate slug",
                                description: "The field to generate slug from is not a string. Please check your cms.config",
                                variant: "destructive"
                              });
                            }
                          }
                        }
                      );
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "date": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                        DatePicker,
                        {
                          date: parseDate(value),
                          onChange: (dateSelected) => {
                            onChange(dateSelected ? stringifyDate(dateSelected) : void 0);
                          }
                        }
                      );
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "image": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      var _a;
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                        ImageUploader,
                        {
                          uploadedImage: value,
                          onChange,
                          required: (_a = fieldSchema.required) != null ? _a : false
                        }
                      );
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "video": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(VideoUploader, { uploadedVideo: value, onChange, field: fieldSchema });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "icon": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(IconSelector, { icon: value, onChange });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "color": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: (props) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(ColorPicker, { ...props });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "select": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
                        Select,
                        {
                          value: value == null ? void 0 : value.value,
                          onValueChange: (valueSelected) => {
                            onChange(fieldSchema.options.find((option) => option.value === valueSelected));
                          },
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(SelectValue, { placeholder: `Select ${fieldSchema.label}` }) }),
                            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(SelectContent, { children: fieldSchema.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(SelectItem, { value: option.value, children: option.label }, option.value)) })
                          ]
                        }
                      );
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "object": {
                return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ fieldName: fieldName2 }) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "space-y-8 rounded-md border p-4", children: renderForm(fieldSchema.schema, fieldName2) });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              default: {
                return null;
              }
            }
          })() }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(FormMessage, {})
        ] }) }, fieldName);
      });
    },
    [form, plugins, toast2]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(import_jsx_runtime45.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("title", { children: `${form.formState.isDirty ? "\u{1F7E1} " : ""}Content Manager${title ? ` | ${title}` : ""}` }),
    /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: cn("rounded-md border", className), style, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(Form, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
      "form",
      {
        onSubmit: form.handleSubmit(onSubmit),
        onReset: () => {
          form.reset();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "space-y-8 p-4", children: renderForm(schema) }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "flex items-center justify-end space-x-4 border-t bg-muted px-4 py-2", children: [
            form.formState.isDirty ? /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "flex items-center text-sm text-muted-foreground", children: [
              /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_lucide_react7.FileWarning, { className: "mr-1 h-5 w-5" }),
              "Unsaved Changes"
            ] }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "flex-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(Button, { type: "reset", variant: "outline", children: "Reset" }),
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(Button, { type: "submit", loading: submitting, children: "Update" })
          ] })
        ]
      }
    ) }) })
  ] });
}

// src/dashboard/components/content-manager/components/update-singleton-form.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
function UpdateSingletonForm({
  singletonName,
  redirectToOnSave,
  onUpdate,
  ...rest
}) {
  const { toast: toast2 } = useToast();
  const mutation = api.singleton.updateSingleton.useMutation({
    onSuccess: (singleton) => {
      toast2({
        title: `${singleton.label} content updated successfully`,
        description: "Refresh page to see the updated content",
        action: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(ToastAction, { asChild: true, altText: "View Page", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_link3.default, { href: redirectToOnSave, children: "View Page" }) })
      });
      onUpdate();
    },
    onError: (error) => {
      toast2({
        title: "Error updating content",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
    BaseForm,
    {
      ...rest,
      submitting: mutation.isLoading,
      onSubmit: (data) => {
        mutation.mutate({
          singletonName,
          data
        });
      }
    }
  );
}

// src/dashboard/components/content-manager/components/update-collection-element-form.tsx
var import_link4 = __toESM(require("next/link"));
var import_jsx_runtime47 = require("react/jsx-runtime");
function UpdateCollectionElementForm({
  collectionName,
  elementId,
  redirectToOnSave,
  onUpdate,
  ...rest
}) {
  const { toast: toast2 } = useToast();
  const mutation = api.collection.updateCollectionElement.useMutation({
    onSuccess: (collectionElement) => {
      toast2({
        title: `${collectionElement.slug} content updated successfully`,
        description: "Refresh page to see the updated content",
        action: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(ToastAction, { asChild: true, altText: "View Page", children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_link4.default, { href: redirectToOnSave, children: "View Page" }) })
      });
      onUpdate();
    },
    onError: (error) => {
      toast2({
        title: "Error updating content",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
    BaseForm,
    {
      ...rest,
      submitting: mutation.isLoading,
      onSubmit: (data) => {
        mutation.mutate({
          collectionName,
          elementId,
          data
        });
      }
    }
  );
}

// src/dashboard/components/content-manager/components/create-collection-element-form.tsx
var import_link5 = __toESM(require("next/link"));
var import_jsx_runtime48 = require("react/jsx-runtime");
function CreateCollectionElementForm({
  collectionName,
  redirectToOnSave,
  onUpdate,
  ...rest
}) {
  const { toast: toast2 } = useToast();
  const mutation = api.collection.createCollectionElement.useMutation({
    onSuccess: (collectionElement) => {
      toast2({
        title: `${collectionElement.slug} content updated successfully`,
        description: "Refresh page to see the updated content",
        action: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(ToastAction, { asChild: true, altText: "View Page", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_link5.default, { href: redirectToOnSave, children: "View Page" }) })
      });
      onUpdate();
    },
    onError: (error) => {
      toast2({
        title: "Error updating content",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
    BaseForm,
    {
      ...rest,
      submitting: mutation.isLoading,
      onSubmit: (data) => {
        mutation.mutate({
          collectionName,
          data
        });
      }
    }
  );
}

// src/dashboard/components/content-manager/content-manager.tsx
var import_jsx_runtime49 = require("react/jsx-runtime");
function ContentManager({ config, ...rest }) {
  switch (config.type) {
    case "singleton": {
      return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(UpdateSingletonForm, { ...rest, singletonName: config.singletonName });
    }
    case "collection": {
      switch (config.method) {
        case "create": {
          return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(CreateCollectionElementForm, { ...rest, collectionName: config.collectionName });
        }
        case "update": {
          return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
            UpdateCollectionElementForm,
            {
              ...rest,
              collectionName: config.collectionName,
              elementId: config.elementId
            }
          );
        }
        default: {
          return null;
        }
      }
    }
    default: {
      return null;
    }
  }
}

// src/dashboard/ui/loader.tsx
var import_class_variance_authority5 = require("class-variance-authority");
var import_jsx_runtime50 = require("react/jsx-runtime");
var loaderVariants = (0, import_class_variance_authority5.cva)("flex animate-pulse items-center justify-center gap-2 rounded-md p-4 text-xs", {
  variants: {
    variant: {
      default: "bg-muted text-secondary-foreground",
      outline: "border text-muted-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Loader2({ message = "Loading...", variant, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: cn(loaderVariants({ variant }), className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(LucideIcon, { name: "loader-2", className: "h-5 w-5 animate-spin" }),
    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { children: message })
  ] });
}

// src/dashboard/ui/page-heading.tsx
var import_react32 = require("react");
var import_jsx_runtime51 = require("react/jsx-runtime");
function PageHeading({ title, icon, description, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { className: cn("flex items-center space-x-4", className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "rounded-md border bg-muted p-2", children: (0, import_react32.cloneElement)(icon, { className: cn(icon.props.className, "h-6 w-6") }) }),
    /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "text-base font-medium text-foreground", children: title }),
      description ? /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "text-sm text-muted-foreground", children: description }) : null
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/singleton-content-manager.tsx
var import_jsx_runtime52 = require("react/jsx-runtime");
function SingletonContentManager({
  singleton,
  singletonName,
  plugins,
  redirectTo,
  className,
  style
}) {
  const query = api.singleton.fetchSingleton.useQuery({ singletonName });
  const content = (0, import_react33.useMemo)(() => {
    if (query.isLoading) {
      return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(Loader2, { message: "Loading Content Manager..." });
    }
    if (query.data) {
      return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
        ContentManager,
        {
          redirectToOnSave: redirectTo,
          schema: singleton.schema,
          config: { type: "singleton", singletonName, method: "update" },
          initialData: query.data.data,
          plugins,
          onUpdate: () => {
            query.refetch();
          },
          title: singleton.label
        }
      );
    }
    return null;
  }, [query, redirectTo, plugins, singleton, singletonName]);
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)("div", { className: cn("space-y-4 p-4", className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(PageHeading, { title: singleton.label, icon: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_lucide_react8.File, { name: "file" }) }),
    content
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-page.tsx
var import_link6 = __toESM(require("next/link"));
var import_react34 = require("react");
var import_lucide_react10 = require("lucide-react");

// src/dashboard/components/delete-collection-item/delete-collection-item.tsx
var import_navigation3 = require("next/navigation");
var import_lucide_react9 = require("lucide-react");
var import_jsx_runtime53 = require("react/jsx-runtime");
function DeleteCollectionItem({ elementId, onDelete, className, style }) {
  const router = (0, import_navigation3.useRouter)();
  const { toast: toast2 } = useToast();
  const mutation = api.collection.deleteCollectionElement.useMutation({
    onSuccess: (element) => {
      router.refresh();
      onDelete == null ? void 0 : onDelete();
      toast2({
        title: "Item deleted successfully",
        description: `Item ${element.id} has been deleted successfully`
      });
    },
    onError: (error) => {
      toast2({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(Popover, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(Button, { size: "icon", icon: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_lucide_react9.Trash, {}), variant: "secondary", className, style }) }),
    /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(PopoverContent, { className: "w-80", side: "bottom", align: "end", children: [
      /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { className: "mb-1 text-base font-medium text-foreground", children: "Delete item?" }),
      /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { className: "mb-2 text-sm text-muted-foreground", children: "Item once deleted cannot be recovered. Do you want to continue?" }),
      /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", { className: "flex items-center justify-end space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(PopoverClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(Button, { size: "sm", variant: "ghost", children: "Cancel" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
          Button,
          {
            size: "sm",
            variant: "outline",
            loading: mutation.isLoading,
            onClick: () => {
              mutation.mutate({ elementId });
            },
            children: "Continue"
          }
        )
      ] })
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-page.tsx
var import_jsx_runtime54 = require("react/jsx-runtime");
function CollectionPage({ collection, collectionName, className, style }) {
  const query = api.collection.fetchCollectionElements.useQuery({ collectionName });
  const content = (0, import_react34.useMemo)(() => {
    if (query.isLoading) {
      return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Loader2, { message: `Loading ${collection.label} elements...` });
    }
    if (query.data) {
      if (query.data.length === 0) {
        return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex flex-col items-center justify-center rounded-md border border-dashed p-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_lucide_react10.PackageOpen, { className: "mb-2 h-10 w-10 text-muted-foreground opacity-20" }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "mb-2 text-sm text-muted-foreground", children: [
            "No elements found for ",
            collection.label,
            " collection"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_link6.default, { href: `/cms/admin/collection/${collectionName}/new`, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Button, { icon: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_lucide_react10.Plus, {}), size: "sm", variant: "outline", children: "Create New Item" }) })
        ] });
      }
      return query.data.map((item, index) => {
        var _a;
        const itemId = item.id;
        const itemSlug = item.slug;
        const itemIdentifier = collection.nameField ? (_a = item[collection.nameField]) != null ? _a : itemSlug : itemSlug;
        return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex items-center space-x-2 truncate rounded-md border px-4 py-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_link6.default, { className: "flex-1 space-y-1 truncate", href: `/cms/admin/collection/${collectionName}/${itemId}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "truncate text-sm text-foreground", children: typeof itemIdentifier === "string" || typeof itemIdentifier === "number" ? itemIdentifier : index }),
            /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex items-center text-xs text-muted-foreground", children: [
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { children: "Edit" }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_lucide_react10.ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
            DeleteCollectionItem,
            {
              elementId: itemId,
              onDelete: () => {
                query.refetch();
              }
            }
          )
        ] }, itemId);
      });
    }
  }, [query, collection, collectionName]);
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_jsx_runtime54.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("title", { children: [
      "Content Manager - ",
      collection.label
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: cn("space-y-4", className), style, children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "flex-1 text-base font-medium text-foreground", children: "Items" }),
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_link6.default, { href: `/cms/admin/collection/${collectionName}/new`, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Button, { icon: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_lucide_react10.Plus, {}), children: "Create New Item" }) })
      ] }),
      content
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-new-item-content-manager.tsx
var import_link7 = __toESM(require("next/link"));
var import_lucide_react11 = require("lucide-react");
var import_jsx_runtime55 = require("react/jsx-runtime");
function CollectionNewItemContentManager({
  collection,
  collectionName,
  redirectTo,
  plugins,
  className,
  style
}) {
  const collectionElementsQuery = api.collection.fetchCollectionElements.useQuery(
    {
      collectionName
    },
    {
      enabled: false
    }
  );
  const initialData = generateDummyData(collection.schema);
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { className: cn("space-y-4", className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
      import_link7.default,
      {
        href: `/cms/admin/collection/${collectionName}`,
        className: "flex items-center text-sm text-muted-foreground",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_lucide_react11.ChevronRight, { className: "mr-2 h-5 w-5" }),
          "Show all items"
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      ContentManager,
      {
        schema: collection.schema,
        config: { type: "collection", collectionName, method: "create" },
        initialData,
        plugins,
        redirectToOnSave: redirectTo,
        onUpdate: () => {
          collectionElementsQuery.refetch();
        },
        title: `${collection.label} - New Item`
      }
    )
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-page-layout.tsx
var import_lucide_react12 = require("lucide-react");
var import_jsx_runtime56 = require("react/jsx-runtime");
function CollectionPageLayout({ collection, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "space-y-4 p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(PageHeading, { title: collection.label, icon: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_lucide_react12.FolderOpen, { name: "folder-open" }) }),
    children
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-element-page.tsx
var import_link8 = __toESM(require("next/link"));
var import_react35 = require("react");
var import_lucide_react13 = require("lucide-react");
var import_jsx_runtime57 = require("react/jsx-runtime");
function CollectionElementPage({
  collection,
  collectionName,
  elementId,
  redirectTo,
  plugins,
  className,
  style
}) {
  const collectionElementsQuery = api.collection.fetchCollectionElements.useQuery(
    {
      collectionName
    },
    {
      enabled: false
    }
  );
  const collectionElementQuery = api.collection.fetchCollectionElementById.useQuery({
    collectionName,
    elementId
  });
  const content = (0, import_react35.useMemo)(() => {
    if (collectionElementQuery.isLoading) {
      return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(Loader2, { message: "Loading content manager..." });
    }
    if (collectionElementQuery.data) {
      return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
        ContentManager,
        {
          schema: collection.schema,
          config: { type: "collection", collectionName, elementId, method: "update" },
          initialData: collectionElementQuery.data.data,
          plugins,
          redirectToOnSave: redirectTo,
          onUpdate: () => {
            collectionElementQuery.refetch();
            collectionElementsQuery.refetch();
          },
          title: `Edit ${collection.label} item`
        }
      );
    }
    return null;
  }, [collectionElementQuery, collectionElementsQuery, collection, collectionName, plugins, redirectTo, elementId]);
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { className: cn("space-y-4", className), style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
      import_link8.default,
      {
        href: `/cms/admin/collection/${collectionName}`,
        className: "flex items-center text-sm text-muted-foreground",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_lucide_react13.ChevronLeft, { className: "mr-2 h-5 w-5" }),
          "Show all items"
        ]
      }
    ) }),
    content
  ] });
}

// src/dashboard/components/admin-dashboard/components/login-page.tsx
var import_lucide_react14 = require("lucide-react");

// src/dashboard/components/admin-dashboard/components/login-form.tsx
var import_zod8 = require("@hookform/resolvers/zod");
var import_react_hook_form7 = require("react-hook-form");
var import_react_query6 = require("@tanstack/react-query");
var import_react37 = require("next-auth/react");
var import_zod9 = require("zod");
var import_navigation4 = require("next/navigation");

// src/dashboard/ui/password-input.tsx
var import_react36 = require("react");
var import_jsx_runtime58 = require("react/jsx-runtime");
var PasswordInput = (0, import_react36.forwardRef)(({ className, style, ...props }, ref) => {
  const [passwordVisible, setPasswordVisible] = (0, import_react36.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
    "div",
    {
      className: cn(
        "flex h-10 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      style,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
          "input",
          {
            type: passwordVisible ? "text" : "password",
            ref,
            ...props,
            className: "flex-1 px-3 py-2 outline-none"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
          "button",
          {
            type: "button",
            className: "flex-shrink-0 p-1 text-muted-foreground focus:outline-none",
            onClick: () => {
              setPasswordVisible((prevState) => !prevState);
            },
            children: passwordVisible ? /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(LucideIcon, { name: "eye-off", className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(LucideIcon, { name: "eye", className: "h-4 w-4" })
          }
        )
      ]
    }
  );
});
PasswordInput.displayName = "PasswordInput";

// src/dashboard/components/admin-dashboard/components/login-form.tsx
var import_jsx_runtime59 = require("react/jsx-runtime");
var validationSchema3 = import_zod9.z.object({
  email: import_zod9.z.string().email(),
  password: import_zod9.z.string()
});
function LoginForm({ className, style }) {
  const form = (0, import_react_hook_form7.useForm)({
    resolver: (0, import_zod8.zodResolver)(validationSchema3),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { toast: toast2 } = useToast();
  const router = (0, import_navigation4.useRouter)();
  const mutation = (0, import_react_query6.useMutation)(
    (values) => (0, import_react37.signIn)("credentials", { ...values, redirect: false, callbackUrl: "/cms/admin" }),
    {
      onSuccess: (result) => {
        if (result == null ? void 0 : result.url) {
          const url = new URL(result.url);
          router.replace(url.pathname);
        } else if (result == null ? void 0 : result.error) {
          toast2({
            title: "Error logging in",
            description: result.error === "CredentialsSignin" ? "Invalid credentials" : "Unknown error",
            variant: "destructive"
          });
        }
      }
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Form, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
    "form",
    {
      className: cn("space-y-4", className),
      style,
      onSubmit: form.handleSubmit(({ email, password }) => {
        mutation.mutate({ email, password });
      }),
      onReset: () => {
        form.reset();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          FormFieldWithController,
          {
            name: "email",
            control: form.control,
            render: ({ field }) => {
              return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(FormItem, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormLabel, { children: "Email" }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { placeholder: "Email", ...field }) }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormMessage, {})
              ] });
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          FormFieldWithController,
          {
            name: "password",
            control: form.control,
            render: ({ field }) => {
              return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(FormItem, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormLabel, { children: "Password" }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(PasswordInput, { placeholder: "Password", ...field }) })
              ] });
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { className: "w-full", loading: mutation.isLoading, children: "Login" })
      ]
    }
  ) });
}

// src/dashboard/components/admin-dashboard/components/login-page.tsx
var import_jsx_runtime60 = require("react/jsx-runtime");
function LoginPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(import_jsx_runtime60.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("title", { children: "CMS Login" }),
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("div", { className: "bg-muted-background flex h-screen items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", { className: "w-[480px] rounded-md border bg-primary-foreground p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", { className: "mb-4 flex items-center space-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_lucide_react14.Atom, { className: "h-10 w-10 text-foreground" }),
        /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("div", { className: "text-xl font-semibold text-foreground", children: "Admin Login" }),
          /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", { className: "text-sm text-muted-foreground", children: [
            "Login with the credentials present in ",
            /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("code", { children: ".env" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(LoginForm, {})
    ] }) })
  ] });
}

// src/dashboard/components/admin-dashboard/components/media-library.tsx
var import_react40 = require("react");
var import_lucide_react16 = require("lucide-react");

// src/dashboard/components/admin-dashboard/components/create-folder.tsx
var import_zod10 = require("@hookform/resolvers/zod");
var import_react_hook_form8 = require("react-hook-form");
var import_zod11 = require("zod");
var import_react38 = require("react");
var import_jsx_runtime61 = require("react/jsx-runtime");
var validationSchema4 = import_zod11.z.object({
  name: import_zod11.z.string().nonempty()
});
function CreateFolder({ children, folderId, onFolderCreated }) {
  const [dialogOpen, setDialogOpen] = (0, import_react38.useState)(false);
  const form = (0, import_react_hook_form8.useForm)({
    resolver: (0, import_zod10.zodResolver)(validationSchema4),
    defaultValues: {
      name: ""
    }
  });
  const mutation = api.media.createFolder.useMutation({
    onSuccess: (folder) => {
      onFolderCreated == null ? void 0 : onFolderCreated(folder);
      setDialogOpen(false);
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(DialogContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(DialogHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(DialogTitle, { children: "Create Folder" }),
        /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(DialogDescription, { children: "Add folder to properly segregate media assets" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Form, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
        "form",
        {
          className: "space-y-4",
          onSubmit: form.handleSubmit(({ name }) => {
            mutation.mutate({ name: name.trim(), parent: folderId });
          }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
              FormFieldWithController,
              {
                name: "name",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(FormItem, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(FormLabel, { children: "Name" }),
                    /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Input, { ...field }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(DialogFooter, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(DialogClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Button, { type: "button", variant: "ghost", children: "Cancel" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Button, { type: "submit", children: "Submit" })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/folder-card.tsx
var import_lucide_react15 = require("lucide-react");

// src/dashboard/ui/context-menu.tsx
var import_react39 = require("react");
var ContextMenuPrimitive = __toESM(require("@radix-ui/react-context-menu"));
var import_jsx_runtime62 = require("react/jsx-runtime");
var ContextMenu = ContextMenuPrimitive.Root;
var ContextMenuTrigger = ContextMenuPrimitive.Trigger;
var ContextMenuSubTrigger = (0, import_react39.forwardRef)(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
  ContextMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(LucideIcon, { name: "chevron-right", className: "ml-auto h-4 w-4" })
    ]
  }
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
var ContextMenuSubContent = (0, import_react39.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
  ContextMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
var ContextMenuContent = (0, import_react39.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
  ContextMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
var ContextMenuItem = (0, import_react39.forwardRef)(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
  ContextMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
var ContextMenuCheckboxItem = (0, import_react39.forwardRef)(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
  ContextMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(LucideIcon, { name: "check", className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
var ContextMenuRadioItem = (0, import_react39.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
  ContextMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(LucideIcon, { name: "circle", className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
var ContextMenuLabel = (0, import_react39.forwardRef)(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
  ContextMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className),
    ...props
  }
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
var ContextMenuSeparator = (0, import_react39.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ContextMenuPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-border", className), ...props }));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
var ContextMenuShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// src/dashboard/components/admin-dashboard/components/folder-card.tsx
var import_jsx_runtime63 = require("react/jsx-runtime");
function FolderCard({ folder, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(ContextMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(ContextMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(
      "button",
      {
        className: cn("flex items-center space-x-2 rounded-md border bg-background px-4 py-3 text-left", className),
        style,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_lucide_react15.FolderOpen, { name: "folder-open", className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ (0, import_jsx_runtime63.jsx)("div", { className: "flex-1 truncate text-sm text-foreground", children: folder.name })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(ContextMenuContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(ContextMenuItem, { children: "Rename Folder" }),
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(ContextMenuItem, { disabled: true, children: "Move Folder" }),
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(ContextMenuSeparator, {}),
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(ContextMenuItem, { className: "text-destructive", children: "Delete Folder" })
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/media-library.tsx
var import_jsx_runtime64 = require("react/jsx-runtime");
function MediaLibrary({ folderId }) {
  const { toast: toast2 } = useToast();
  const folderContentQuery = api.media.getFolderContent.useQuery({ id: folderId });
  const foldersContent = (0, import_react40.useMemo)(() => {
    if (folderContentQuery.isLoading) {
      return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Loader2, { message: "Loading Folders..." });
    }
    if (folderContentQuery.data) {
      if (folderContentQuery.data.folders.length === 0) {
        return /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "flex flex-col items-center justify-center rounded-md border border-dashed p-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react16.PackageOpen, { name: "package-open", className: "mb-2 h-10 w-10 text-muted-foreground opacity-20" }),
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "mb-2 text-sm text-muted-foreground", children: "No folders found" }),
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
            CreateFolder,
            {
              folderId,
              onFolderCreated: () => {
                folderContentQuery.refetch();
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { icon: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react16.Plus, { name: "plus" }), size: "sm", variant: "outline", children: "Create Folder" })
            }
          )
        ] });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "grid grid-cols-4 gap-4", children: folderContentQuery.data.folders.map((folder) => {
        return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
          FolderCard,
          {
            folder,
            onDelete: () => {
              folderContentQuery.refetch();
            },
            onRename: () => {
              folderContentQuery.refetch();
            }
          },
          folder.id
        );
      }) });
    }
  }, [folderId, folderContentQuery]);
  const filesContent = (0, import_react40.useMemo)(() => null, []);
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(import_jsx_runtime64.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("title", { children: "Media Library" }),
    /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "space-y-4 p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(PageHeading, { title: "Media Library", icon: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react16.Image, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "relative flex items-center justify-between space-x-4 px-4 before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-10 before:h-px before:bg-muted", children: [
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "bg-background px-1 text-sm font-medium text-muted-foreground", children: "Folders" }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "bg-background px-2", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
          CreateFolder,
          {
            folderId,
            onFolderCreated: (folderCreated) => {
              folderContentQuery.refetch();
              toast2({
                title: "Success",
                description: `Folder ${folderCreated.name} has been created successfully`
              });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { icon: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react16.Plus, {}), size: "sm", variant: "outline", children: "Create Folder" })
          }
        ) })
      ] }),
      foldersContent,
      /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "relative flex items-center justify-between space-x-4 px-4 before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-10 before:h-px before:bg-muted", children: [
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "bg-background px-1 text-sm font-medium text-muted-foreground", children: "Files" }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "bg-background px-2", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { icon: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react16.Upload, {}), size: "sm", variant: "outline", children: "Upload File" }) })
      ] }),
      filesContent
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/dashboard-page.tsx
var import_jsx_runtime65 = require("react/jsx-runtime");
function createDashboardPage(config) {
  var _a;
  const clientSideConfig = {
    ...config,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    plugins: ((_a = config.plugins) != null ? _a : []).map(({ api: api2, ...rest }) => {
      return {
        ...rest
      };
    })
  };
  return function Page() {
    var _a2;
    const params = (0, import_navigation5.useParams)();
    const slug = params.slug;
    const searchParams = (0, import_navigation5.useSearchParams)();
    const redirectTo = (_a2 = searchParams.get("redirectTo")) != null ? _a2 : "/";
    if (typeof slug === "undefined") {
      return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(DashboardHome, { config: clientSideConfig });
    }
    const pageType = slug[0];
    switch (pageType) {
      case "login": {
        return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(LoginPage, {});
      }
      case "media-library": {
        const parentFolderId = slug[1];
        return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(MediaLibrary, { folderId: parentFolderId });
      }
      case "singleton": {
        const singletonName = slug[1];
        if (!singletonName) {
          return (0, import_navigation5.notFound)();
        }
        const singleton = clientSideConfig.singletons[singletonName];
        if (!singleton) {
          return (0, import_navigation5.notFound)();
        }
        return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
          SingletonContentManager,
          {
            singleton,
            singletonName,
            plugins: clientSideConfig.plugins,
            redirectTo
          }
        );
      }
      case "collection": {
        const collectionName = slug[1];
        if (!collectionName) {
          return (0, import_navigation5.notFound)();
        }
        const collection = clientSideConfig.collections[collectionName];
        if (!collection) {
          return (0, import_navigation5.notFound)();
        }
        const collectionElementId = slug[2];
        if (typeof collectionElementId === "undefined") {
          return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(CollectionPageLayout, { collection, children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(CollectionPage, { collection, collectionName }) });
        }
        if (collectionElementId === "new") {
          return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(CollectionPageLayout, { collection, children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
            CollectionNewItemContentManager,
            {
              collection,
              collectionName,
              plugins: clientSideConfig.plugins,
              redirectTo
            }
          ) });
        }
        return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(CollectionPageLayout, { collection, children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
          CollectionElementPage,
          {
            collection,
            collectionName,
            elementId: collectionElementId,
            plugins: clientSideConfig.plugins,
            redirectTo
          }
        ) });
      }
      default: {
        return (0, import_navigation5.notFound)();
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDashboardLayout,
  createDashboardPage
});
