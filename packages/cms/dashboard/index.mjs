"use client";

// src/dashboard/components/admin-dashboard/components/dashboard-layout.tsx
import { redirect } from "next/navigation";
import { useEffect as useEffect2, useMemo as useMemo2, useState as useState2 } from "react";
import { FolderOpen, LoaderIcon, Image, File } from "lucide-react";

// src/dashboard/components/nav-link/nav-link.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, useMemo } from "react";

// src/dashboard/stores/index.ts
import { create } from "zustand";
var useStore = create((set) => ({
  layout: [20, 80],
  saveLayout: (sizes) => set({ layout: sizes }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed })
}));

// src/dashboard/ui/tooltip.tsx
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// src/dashboard/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/dashboard/ui/tooltip.tsx
import { jsx } from "react/jsx-runtime";
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
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
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function NavLink({ icon, label, href, className, ...rest }) {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname.startsWith(href), [pathname, href]);
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  const iconElement = cloneElement(icon, {
    className: "h-4 w-4 flex-shrink-0"
  });
  return /* @__PURE__ */ jsxs(
    Link,
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
        sidebarCollapsed ? /* @__PURE__ */ jsx2(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx2(TooltipTrigger, { children: iconElement }),
          /* @__PURE__ */ jsx2(TooltipContent, { children: label })
        ] }) }) : iconElement,
        !sidebarCollapsed ? /* @__PURE__ */ jsx2("span", { className: "flex-1 truncate", children: label }) : null
      ]
    }
  );
}

// src/dashboard/components/admin-dashboard/components/providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

// src/server/api.ts
import { createTRPCReact } from "@trpc/react-query";
import { loggerLink, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
var api = createTRPCReact();
var trpcClient = api.createClient({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) => process.env.NODE_ENV === "development" || opts.direction === "down" && opts.result instanceof Error
    }),
    httpBatchLink({
      url: "/cms/api/trpc"
    })
  ]
});

// src/dashboard/components/admin-dashboard/components/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { jsx as jsx3 } from "react/jsx-runtime";
function ThemeProvider({ children, ...props }) {
  return /* @__PURE__ */ jsx3(NextThemesProvider, { ...props, children });
}

// src/dashboard/ui/toast.tsx
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { forwardRef as forwardRef2 } from "react";

// src/element/lucide-icon/lucide-icon.tsx
import * as LucideIcons from "lucide-react";
import { jsx as jsx4 } from "react/jsx-runtime";
var lucideIconNames = Object.keys(LucideIcons.icons);
function LucideIcon({ name, ...props }) {
  let iconName = name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  if (!(iconName in LucideIcons.icons)) {
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`);
    iconName = "Shield";
  }
  const Icon2 = LucideIcons.icons[iconName];
  return /* @__PURE__ */ jsx4(Icon2, { ...props });
}

// src/dashboard/ui/toast.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = forwardRef2(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(
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
var toastVariants = cva(
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
var Toast = forwardRef2(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx5(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = forwardRef2(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(
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
var ToastClose = forwardRef2(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx5(LucideIcon, { name: "x", className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = forwardRef2(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = forwardRef2(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/dashboard/hooks/use-toast.ts
import * as React2 from "react";
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
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs2(ToastProvider, { duration: 3e3, children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs2(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs2("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx6(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx6(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx6(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx6(ToastViewport, {})
  ] });
}

// src/dashboard/components/admin-dashboard/components/providers.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var queryClient = new QueryClient();
function Providers({ children, session }) {
  return /* @__PURE__ */ jsx7(SessionProvider, { session, basePath: "/cms/api/auth", children: /* @__PURE__ */ jsx7(api.Provider, { client: trpcClient, queryClient, children: /* @__PURE__ */ jsx7(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs3(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: [
    children,
    /* @__PURE__ */ jsx7(Toaster, {})
  ] }) }) }) });
}

// src/dashboard/components/admin-dashboard/components/dashboard-panel.tsx
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
function DashboardPanel({ sidebar, content }) {
  const { layout: defaultLayout, saveLayout, setSidebarCollapsed } = useStore();
  return /* @__PURE__ */ jsxs4(
    PanelGroup,
    {
      direction: "horizontal",
      onLayout: (sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        saveLayout(sizes);
      },
      children: [
        /* @__PURE__ */ jsx8(
          Panel,
          {
            defaultSize: defaultLayout[0],
            className: "h-screen",
            collapsible: true,
            collapsedSize: 4,
            onCollapse: setSidebarCollapsed,
            children: sidebar
          }
        ),
        /* @__PURE__ */ jsx8(PanelResizeHandle, { className: "w-0.5 border-r border-border/80 hover:border-border/100" }),
        /* @__PURE__ */ jsx8(Panel, { className: "h-screen", defaultSize: defaultLayout[1], children: content })
      ]
    }
  );
}

// src/dashboard/components/admin-dashboard/components/dashboard-menu.tsx
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Settings } from "lucide-react";

// src/dashboard/ui/menu-bar.tsx
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef as forwardRef3 } from "react";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var MenubarMenu = MenubarPrimitive.Menu;
var MenubarSub = MenubarPrimitive.Sub;
var Menubar = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
  MenubarPrimitive.Root,
  {
    ref,
    className: cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className),
    ...props
  }
));
Menubar.displayName = MenubarPrimitive.Root.displayName;
var MenubarTrigger = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
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
var MenubarSubTrigger = forwardRef3(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs5(
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
      /* @__PURE__ */ jsx9(LucideIcon, { name: "chevron-right", className: "ml-auto h-4 w-4" })
    ]
  }
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
var MenubarSubContent = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
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
var MenubarContent = forwardRef3(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx9(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsx9(
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
var MenubarItem = forwardRef3(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx9(
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
var MenubarCheckboxItem = forwardRef3(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs5(
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
      /* @__PURE__ */ jsx9("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx9(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx9(LucideIcon, { name: "check", className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;
var MenubarRadioItem = forwardRef3(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs5(
  MenubarPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx9("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx9(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx9(LucideIcon, { name: "circle", className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;
var MenubarLabel = forwardRef3(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx9(
  MenubarPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
var MenubarSeparator = forwardRef3(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(MenubarPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
var MenubarShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx9("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
};
MenubarShortcut.displayname = "MenubarShortcut";

// src/dashboard/ui/button.tsx
import { cloneElement as cloneElement2, forwardRef as forwardRef4 } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var buttonVariants = cva2(
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
var iconVariants = cva2("flex-shrink-0", {
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
var BaseButton = forwardRef4(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx10(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props, children });
  }
);
BaseButton.displayName = "BaseButton";
var Button = forwardRef4(({ loading, icon, children, ...props }, ref) => {
  return /* @__PURE__ */ jsxs6(BaseButton, { ...props, asChild: false, "data-loading": loading, ref, children: [
    loading ? /* @__PURE__ */ jsx10(
      LucideIcon,
      {
        name: "loader-2",
        className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), "animate-spin")
      }
    ) : icon ? cloneElement2(icon, {
      className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), icon.props.className)
    }) : null,
    children
  ] });
});
Button.displayName = "Button";

// src/dashboard/components/admin-dashboard/components/dashboard-menu.tsx
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
function DashboardMenu() {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  const mutation = useMutation(() => signOut({ redirect: false, callbackUrl: "/" }), {
    onSuccess: (result) => {
      if (result.url) {
        window.location.href = result.url;
      }
    }
  });
  const { setTheme } = useTheme();
  return /* @__PURE__ */ jsx11(Menubar, { className: "w-full border-none p-0", children: /* @__PURE__ */ jsxs7(MenubarMenu, { children: [
    /* @__PURE__ */ jsx11(MenubarTrigger, { asChild: true, children: /* @__PURE__ */ jsx11(Button, { icon: /* @__PURE__ */ jsx11(Settings, { name: "settings" }), variant: "outline", className: "w-full", children: sidebarCollapsed ? null : "Settings" }) }),
    /* @__PURE__ */ jsxs7(MenubarContent, { children: [
      /* @__PURE__ */ jsxs7(MenubarSub, { children: [
        /* @__PURE__ */ jsx11(MenubarSubTrigger, { children: "Theme" }),
        /* @__PURE__ */ jsxs7(MenubarSubContent, { children: [
          /* @__PURE__ */ jsx11(
            MenubarItem,
            {
              onClick: () => {
                setTheme("light");
              },
              children: "Light"
            }
          ),
          /* @__PURE__ */ jsx11(
            MenubarItem,
            {
              onClick: () => {
                setTheme("dark");
              },
              children: "Dark"
            }
          ),
          /* @__PURE__ */ jsx11(
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
      /* @__PURE__ */ jsx11(MenubarSeparator, {}),
      /* @__PURE__ */ jsx11(
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
import { jsx as jsx12 } from "react/jsx-runtime";
function SidebarLabel({ children, className, style }) {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed);
  if (sidebarCollapsed) {
    return null;
  }
  return /* @__PURE__ */ jsx12("div", { className: cn("px-1.5 text-xs uppercase text-secondary-foreground", className), style, children });
}

// src/dashboard/components/admin-dashboard/components/dashboard-layout.tsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
function createDashboardLayout(config) {
  function Layout({ children, params: { slug } }) {
    const [session, setSession] = useState2(void 0);
    useEffect2(function fetchUserSession() {
      fetch("/cms/api/auth/session", { cache: "no-store" }).then((res) => res.json()).then((data) => setSession(data));
    }, []);
    const isAuthenticated = useMemo2(() => !!Object.keys(session != null ? session : {}).length, [session]);
    if (!session) {
      return /* @__PURE__ */ jsx13("div", { className: "flex h-screen items-center justify-center", children: /* @__PURE__ */ jsx13(LoaderIcon, { className: "animate-spin" }) });
    }
    if ((slug == null ? void 0 : slug[0]) === "login") {
      if (isAuthenticated) {
        redirect("/cms/admin");
      }
      return /* @__PURE__ */ jsx13(Providers, { session: null, children: /* @__PURE__ */ jsx13("div", { children }) });
    }
    if (!isAuthenticated) {
      redirect("/cms/admin/login");
    }
    return /* @__PURE__ */ jsx13(Providers, { session, children: /* @__PURE__ */ jsx13(
      DashboardPanel,
      {
        sidebar: /* @__PURE__ */ jsxs8("div", { className: "flex h-full flex-col", children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-2 py-4", children: [
            /* @__PURE__ */ jsx13(NavLink, { href: "/cms/admin/media-library", icon: /* @__PURE__ */ jsx13(Image, {}), label: "Media Library" }),
            /* @__PURE__ */ jsx13("div", { className: "border-b border-border" }),
            /* @__PURE__ */ jsxs8("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx13(SidebarLabel, { children: "Collections" }),
              Object.entries(config.collections).map(([collectionKey, collection]) => {
                return /* @__PURE__ */ jsx13(
                  NavLink,
                  {
                    href: `/cms/admin/collection/${collectionKey}`,
                    icon: /* @__PURE__ */ jsx13(FolderOpen, {}),
                    label: collection.label
                  },
                  collectionKey
                );
              })
            ] }),
            /* @__PURE__ */ jsx13("div", { className: "border-b border-border" }),
            /* @__PURE__ */ jsxs8("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx13(SidebarLabel, { children: "Singletons" }),
              Object.entries(config.singletons).map(([singletonName, singleton]) => {
                return /* @__PURE__ */ jsx13(
                  NavLink,
                  {
                    href: `/cms/admin/singleton/${singletonName}`,
                    icon: /* @__PURE__ */ jsx13(File, {}),
                    label: singleton.label
                  },
                  singletonName
                );
              })
            ] })
          ] }),
          /* @__PURE__ */ jsx13("div", { className: "mx-2 mb-2 flex items-center space-x-2", children: /* @__PURE__ */ jsx13(DashboardMenu, {}) })
        ] }),
        content: /* @__PURE__ */ jsx13("div", { className: "h-full overflow-auto", children })
      }
    ) });
  }
  return Layout;
}

// src/dashboard/components/admin-dashboard/components/dashboard-page.tsx
import { notFound, useParams, useSearchParams } from "next/navigation";

// src/dashboard/components/admin-dashboard/components/dashboard-home.tsx
import Link2 from "next/link";
import { ChevronRight, FolderOpen as FolderOpen2, File as File2 } from "lucide-react";
import { Fragment, jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
function DashboardHome({ config }) {
  return /* @__PURE__ */ jsxs9(Fragment, { children: [
    /* @__PURE__ */ jsx14("title", { children: "Content Manager" }),
    /* @__PURE__ */ jsxs9("div", { className: "h-full space-y-8 overflow-auto p-4", children: [
      /* @__PURE__ */ jsx14("div", { className: "text-2xl font-medium text-secondary-foreground", children: "Dashboard" }),
      /* @__PURE__ */ jsxs9("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs9("div", { className: "flex items-center text-lg font-medium text-secondary-foreground", children: [
          /* @__PURE__ */ jsx14(FolderOpen2, { className: "mr-2 h-5 w-5" }),
          "Collections"
        ] }),
        Object.entries(config.collections).map(([collectionName, collection]) => {
          return /* @__PURE__ */ jsxs9(
            Link2,
            {
              href: `/cms/admin/collection/${collectionName}`,
              className: "flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary",
              children: [
                /* @__PURE__ */ jsxs9("div", { className: "flex-1 space-y-1 truncate", children: [
                  /* @__PURE__ */ jsx14("div", { className: "truncate text-sm text-secondary-foreground", children: collection.label }),
                  "description" in collection ? /* @__PURE__ */ jsx14("div", { className: "truncate text-xs text-muted-foreground", children: collection.description }) : null
                ] }),
                /* @__PURE__ */ jsx14(ChevronRight, { className: "h-5 w-5 text-muted-foreground" })
              ]
            },
            collectionName
          );
        })
      ] }),
      /* @__PURE__ */ jsxs9("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs9("div", { className: "flex items-center text-lg font-medium text-secondary-foreground", children: [
          /* @__PURE__ */ jsx14(File2, { className: "mr-2 h-5 w-5" }),
          "Singletons"
        ] }),
        Object.entries(config.singletons).map(([singletonName, singleton]) => {
          return /* @__PURE__ */ jsxs9(
            Link2,
            {
              href: `/cms/admin/singleton/${singletonName}`,
              className: "flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary",
              children: [
                /* @__PURE__ */ jsxs9("div", { className: "flex-1 space-y-1 truncate", children: [
                  /* @__PURE__ */ jsx14("div", { className: "truncate text-sm text-secondary-foreground", children: singleton.label }),
                  "description" in singleton ? /* @__PURE__ */ jsx14("div", { className: "truncate text-xs text-muted-foreground", children: singleton.description }) : null
                ] }),
                /* @__PURE__ */ jsx14(ChevronRight, { className: "h-5 w-5 text-muted-foreground" })
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
import { useMemo as useMemo7 } from "react";
import { File as File3 } from "lucide-react";

// src/dashboard/components/content-manager/components/update-singleton-form.tsx
import Link3 from "next/link";

// src/dashboard/components/content-manager/components/base-form.tsx
import { zodResolver as zodResolver3 } from "@hookform/resolvers/zod";
import { useCallback as useCallback3, useMemo as useMemo6 } from "react";
import { useForm as useForm3 } from "react-hook-form";
import slugify from "slugify";
import { FileWarning } from "lucide-react";

// src/core/validation.ts
import { z } from "zod";
function getValidationSchemaForField(field) {
  let schemaBasedOnType;
  switch (field.type) {
    case "text":
    case "rich-text":
    case "slug": {
      schemaBasedOnType = z.string().min(1);
      break;
    }
    case "date": {
      schemaBasedOnType = z.string().datetime();
      break;
    }
    case "number": {
      schemaBasedOnType = z.number();
      break;
    }
    case "image": {
      schemaBasedOnType = z.object({
        url: z.string().min(1),
        width: z.number().int(),
        height: z.number().int()
      });
      break;
    }
    case "video": {
      schemaBasedOnType = z.string();
      break;
    }
    case "icon": {
      schemaBasedOnType = z.object({
        name: z.string().min(1),
        // update the list based on the icons list in future
        iconLib: z.enum(["lucide"])
      });
      break;
    }
    case "color": {
      schemaBasedOnType = z.string().startsWith("#");
      break;
    }
    case "select": {
      schemaBasedOnType = z.object({
        value: z.string(),
        label: z.string()
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
  let validationSchema5 = z.object({});
  Object.entries(schema).forEach(([fieldKey, field]) => {
    validationSchema5 = validationSchema5.extend({ [fieldKey]: getValidationSchemaForField(field) });
  });
  return validationSchema5;
}

// src/dashboard/components/multi-input-field/multi-input-field.tsx
import { forwardRef as forwardRef6 } from "react";
import { useFieldArray } from "react-hook-form";

// src/dashboard/components/sortable-list/sortable-list.tsx
import { useMemo as useMemo4, useState as useState3 } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Slot as Slot2 } from "@radix-ui/react-slot";

// src/dashboard/components/sortable-list/components/sortable-overlay.tsx
import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { jsx as jsx15 } from "react/jsx-runtime";
var dropAnimationConfig = {
  duration: 100,
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
function SortableOverlay({ children }) {
  return /* @__PURE__ */ jsx15(DragOverlay, { dropAnimation: dropAnimationConfig, children });
}

// src/dashboard/components/sortable-list/components/sortable-item.tsx
import { useMemo as useMemo3 } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// src/dashboard/components/sortable-list/context.ts
import { createContext } from "react";
var SortableItemContext = createContext({
  attributes: {},
  listeners: void 0,
  ref() {
  }
});

// src/dashboard/components/sortable-list/components/sortable-item.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
function SortableItem({ children, id, className, style = {} }) {
  const { attributes, isDragging, listeners: listeners2, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id
  });
  const context = useMemo3(
    () => ({
      attributes,
      listeners: listeners2,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners2, setActivatorNodeRef]
  );
  const dragStyle = {
    opacity: isDragging ? 0.4 : void 0,
    transform: CSS.Translate.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsx16(SortableItemContext.Provider, { value: context, children: /* @__PURE__ */ jsx16("div", { ref: setNodeRef, style: { ...style, ...dragStyle }, className, children }) });
}

// src/dashboard/components/sortable-list/components/drag-handle.tsx
import { useContext } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
function DragHandle({ className, style }) {
  const { attributes, listeners: listeners2, ref } = useContext(SortableItemContext);
  return /* @__PURE__ */ jsx17(
    Button,
    {
      icon: /* @__PURE__ */ jsx17(LucideIcon, { name: "grip" }),
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
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
function SortableList({
  items,
  renderItem,
  onDragEnd,
  className,
  style
}) {
  const [active, setActive] = useState3(void 0);
  const activeItem = useMemo4(() => items.find((item) => item.id === (active == null ? void 0 : active.id)), [active, items]);
  const activeItemIndex = useMemo4(() => items.findIndex((item) => item.id === (active == null ? void 0 : active.id)), [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  return /* @__PURE__ */ jsxs10(
    DndContext,
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
        /* @__PURE__ */ jsx18(SortableContext, { items, strategy: rectSortingStrategy, children: /* @__PURE__ */ jsx18("div", { className, style, children: items.map((item, index) => /* @__PURE__ */ jsx18(Slot2, { children: renderItem(item, index) }, item.id)) }) }),
        /* @__PURE__ */ jsx18(SortableOverlay, { children: activeItem ? renderItem(activeItem, activeItemIndex) : null })
      ]
    }
  );
}
SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;

// src/dashboard/components/single-input-field/single-input-field.tsx
import { createElement, forwardRef as forwardRef5 } from "react";
import { Controller } from "react-hook-form";
import { Fragment as Fragment2, jsx as jsx19, jsxs as jsxs11 } from "react/jsx-runtime";
function SingleInputField({ fieldName, control, renderInput, cmsField, plugins, className, style }, ref) {
  return /* @__PURE__ */ jsx19(
    Controller,
    {
      name: fieldName,
      control,
      render: ({ field: { value, onChange } }) => {
        return /* @__PURE__ */ jsxs11("div", { className: cn("flex items-start space-x-2", className), style, ref, children: [
          /* @__PURE__ */ jsx19("div", { className: "flex-1", children: renderInput({ value, onChange, fieldName }) }),
          plugins.length ? /* @__PURE__ */ jsxs11(Fragment2, { children: [
            /* @__PURE__ */ jsx19("div", { className: "h-10 border-r border-dashed" }),
            /* @__PURE__ */ jsx19("div", { className: "space-y-2", children: plugins.map((plugin) => {
              return createElement(plugin.component, { field: cmsField, updateField: onChange, key: plugin.name });
            }) })
          ] }) : null
        ] });
      }
    }
  );
}
var single_input_field_default = forwardRef5(SingleInputField);

// src/core/fix-data.ts
import { faker } from "@faker-js/faker";

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

// src/dashboard/components/multi-input-field/multi-input-field.tsx
import { jsx as jsx20, jsxs as jsxs12 } from "react/jsx-runtime";
function MultiInputField({ fieldName, control, renderInput, cmsField, plugins, className, style }, ref) {
  const { fields, append, remove, move } = useFieldArray({ name: fieldName, control });
  return /* @__PURE__ */ jsxs12("div", { className: cn("space-y-4", className), ref, children: [
    /* @__PURE__ */ jsx20(
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
          return /* @__PURE__ */ jsxs12(SortableList.Item, { id, className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx20(SortableList.DragHandle, {}),
            /* @__PURE__ */ jsx20(
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
            /* @__PURE__ */ jsx20("div", { className: "h-10 border-r border-dashed" }),
            /* @__PURE__ */ jsx20(
              Button,
              {
                type: "button",
                icon: /* @__PURE__ */ jsx20(LucideIcon, { name: "trash" }),
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
    /* @__PURE__ */ jsx20("div", { className: "flex items-center", children: /* @__PURE__ */ jsx20(
      Button,
      {
        type: "button",
        variant: "outline",
        icon: /* @__PURE__ */ jsx20(LucideIcon, { name: "plus" }),
        onClick: () => {
          append(generateDummyDataForField(cmsField));
        },
        children: "Add Entry"
      }
    ) })
  ] });
}
var multi_input_field_default = forwardRef6(MultiInputField);

// src/dashboard/components/input-field/input-field.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
function InputField(props) {
  if (props.type === "multiple") {
    return /* @__PURE__ */ jsx21(multi_input_field_default, { ...props });
  } else {
    return /* @__PURE__ */ jsx21(single_input_field_default, { ...props });
  }
}

// src/utils/date.ts
import { parseISO } from "date-fns";
function parseDate(dateStr) {
  const parsedDate = parseISO(dateStr);
  if (isNaN(parsedDate.getTime())) {
    return void 0;
  }
  return parsedDate;
}
function stringifyDate(date) {
  return date.toISOString();
}

// src/dashboard/components/fields/image-uploader/image-uploader.tsx
import { useMutation as useMutation2 } from "@tanstack/react-query";
import Image2 from "next/image";
import { useState as useState4 } from "react";
import { Loader, Trash } from "lucide-react";

// src/dashboard/components/fields/image-uploader/queries.ts
import axios from "axios";

// src/server/upload-asset/schema.ts
import { z as z2 } from "zod";
var uploadAssetBodySchema = z2.object({
  file: z2.instanceof(Blob),
  assetType: z2.enum(["image", "video"])
});
var uploadImageResponseSchema = z2.object({
  assetType: z2.literal("image"),
  url: z2.string().min(1),
  width: z2.number(),
  height: z2.number(),
  type: z2.string().min(1)
});
var uploadVideoResponseSchema = z2.object({
  assetType: z2.literal("video"),
  url: z2.string().min(1)
});

// src/dashboard/components/fields/image-uploader/queries.ts
async function uploadImage(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("assetType", "image");
  const { data } = await axios.post("/cms/api/upload-asset", formData, {
    onUploadProgress
  });
  return uploadImageResponseSchema.parse(data);
}

// src/dashboard/ui/uploader.tsx
import { useDropzone } from "react-dropzone";
import { Fragment as Fragment3, jsx as jsx22, jsxs as jsxs13 } from "react/jsx-runtime";
function Uploader({ description, className, style, ...options }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    multiple: false
  });
  return /* @__PURE__ */ jsxs13(
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
        /* @__PURE__ */ jsx22("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs13("div", { className: "flex h-full flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsx22(LucideIcon, { name: "upload", className: "mb-2 h-6 w-6 text-muted-foreground" }),
          /* @__PURE__ */ jsx22("div", { className: "text-sm text-muted-foreground", children: isDragActive ? /* @__PURE__ */ jsx22(Fragment3, { children: "Drop the files here ..." }) : /* @__PURE__ */ jsxs13(Fragment3, { children: [
            "Drag 'n' drop ",
            /* @__PURE__ */ jsx22("span", { className: "font-medium text-foreground", children: "some files" }),
            " here, or click to select files"
          ] }) }),
          description ? /* @__PURE__ */ jsx22("div", { className: "mt-2 text-xs uppercase text-muted-foreground", children: description }) : null
        ] })
      ]
    }
  );
}

// src/dashboard/components/fields/image-uploader/image-uploader.tsx
import { jsx as jsx23, jsxs as jsxs14 } from "react/jsx-runtime";
function ImageUploader({ required, uploadedImage, onChange, className, style }) {
  const [progress, setProgress] = useState4(0);
  const mutation = useMutation2(
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
  return /* @__PURE__ */ jsxs14("div", { className: cn("relative cursor-pointer overflow-hidden rounded-md", className), style, children: [
    progress !== 0 && progress !== 1 ? /* @__PURE__ */ jsx23("div", { className: "absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-full", children: /* @__PURE__ */ jsx23("div", { className: "h-full bg-primary transition-all", style: { width: `${progress * 100}%` } }) }) : null,
    /* @__PURE__ */ jsx23(
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
    mutation.isLoading ? /* @__PURE__ */ jsx23(Loader, { className: "absolute right-3 top-3 h-6 w-6 animate-spin" }) : null,
    uploadedImage ? /* @__PURE__ */ jsxs14("div", { className: "mt-2 flex items-center space-x-2 truncate rounded-md border p-2", children: [
      /* @__PURE__ */ jsx23(
        Image2,
        {
          alt: "",
          src: uploadedImage.url,
          width: uploadedImage.width,
          height: uploadedImage.height,
          className: "h-10 w-10 rounded-md object-cover"
        }
      ),
      /* @__PURE__ */ jsxs14("div", { className: "flex-1 truncate text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx23("div", { className: "line-clamp-1 truncate whitespace-break-spaces", children: uploadedImage.url }),
        /* @__PURE__ */ jsxs14("div", { className: "truncate", children: [
          uploadedImage.width,
          "x",
          uploadedImage.height
        ] })
      ] }),
      !required ? /* @__PURE__ */ jsx23(
        Button,
        {
          icon: /* @__PURE__ */ jsx23(Trash, {}),
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
import { forwardRef as forwardRef8 } from "react";

// src/dashboard/ui/input.tsx
import { forwardRef as forwardRef7 } from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var Input = forwardRef7(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx24(
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
import { jsx as jsx25, jsxs as jsxs15 } from "react/jsx-runtime";
var SlugInput = forwardRef8(({ className, style, onGenerateSlug, ...rest }, ref) => {
  return /* @__PURE__ */ jsxs15("div", { className: cn("flex items-center space-x-2", className), style, children: [
    /* @__PURE__ */ jsx25(Input, { ...rest, className: "flex-1", ref }),
    /* @__PURE__ */ jsx25(Button, { variant: "outline", onClick: onGenerateSlug, type: "button", children: "Generate Slug" })
  ] });
});
SlugInput.displayName = "SlugInput";
var slug_input_default = SlugInput;

// src/dashboard/components/fields/icon-selector/icon-selector.tsx
import { useMemo as useMemo5, useState as useState5 } from "react";
import invariant from "tiny-invariant";
import { matchSorter } from "match-sorter";

// src/dashboard/ui/popover.tsx
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef as forwardRef9 } from "react";
import { jsx as jsx26 } from "react/jsx-runtime";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverClose = PopoverPrimitive.Close;
var PopoverContent = forwardRef9(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx26(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx26(
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
import { forwardRef as forwardRef11 } from "react";
import { Command as CommandPrimitive } from "cmdk";

// src/dashboard/ui/dialog.tsx
import * as React3 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { jsx as jsx27, jsxs as jsxs16 } from "react/jsx-runtime";
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = ({ className, ...props }) => /* @__PURE__ */ jsx27(DialogPrimitive.Portal, { className: cn(className), ...props });
DialogPortal.displayName = DialogPrimitive.Portal.displayName;
var DialogOverlay = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx27(
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
var DialogContent = React3.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs16(DialogPortal, { children: [
  /* @__PURE__ */ jsx27(DialogOverlay, {}),
  /* @__PURE__ */ jsxs16(
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
        /* @__PURE__ */ jsxs16(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx27(LucideIcon, { name: "x", className: "h-4 w-4" }),
          /* @__PURE__ */ jsx27("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx27("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx27("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx27(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx27(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var DialogClose = DialogPrimitive.Close;

// src/dashboard/ui/command.tsx
import { jsx as jsx28, jsxs as jsxs17 } from "react/jsx-runtime";
var Command = forwardRef11(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(
  CommandPrimitive,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = CommandPrimitive.displayName;
var CommandInput = forwardRef11(({ className, ...props }, ref) => (
  // eslint-disable-next-line react/no-unknown-property
  /* @__PURE__ */ jsxs17("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
    /* @__PURE__ */ jsx28(LucideIcon, { name: "search", className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
    /* @__PURE__ */ jsx28(
      CommandPrimitive.Input,
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
CommandInput.displayName = CommandPrimitive.Input.displayName;
var CommandList = forwardRef11(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(
  CommandPrimitive.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = CommandPrimitive.List.displayName;
var CommandEmpty = forwardRef11((props, ref) => /* @__PURE__ */ jsx28(CommandPrimitive.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
var CommandGroup = forwardRef11(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(
  CommandPrimitive.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;
var CommandSeparator = forwardRef11(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(CommandPrimitive.Separator, { ref, className: cn("-mx-1 h-px bg-border", className), ...props }));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
var CommandItem = forwardRef11(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(
  CommandPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = CommandPrimitive.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx28("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
};
CommandShortcut.displayName = "CommandShortcut";

// src/dashboard/components/fields/icon-selector/icon-selector.tsx
import { jsx as jsx29, jsxs as jsxs18 } from "react/jsx-runtime";
function IconSelector({ icon, onChange, className, style }) {
  var _a;
  invariant((_a = icon == null ? void 0 : icon.iconLib) != null ? _a : "lucide", `Icon library "${icon == null ? void 0 : icon.iconLib}" is not supported`);
  const [open, setOpen] = useState5(false);
  const [searchText, setSearchText] = useState5("");
  const filteredIcons = useMemo5(
    () => matchSorter(
      // lucideIconNames
      [],
      searchText
    ),
    [searchText]
  );
  return /* @__PURE__ */ jsxs18(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx29(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx29(
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
    /* @__PURE__ */ jsx29(PopoverContent, { className: "p-0", children: /* @__PURE__ */ jsxs18(
      Command,
      {
        shouldFilter: false,
        onChange: (event) => {
          setSearchText(event.target.value);
        },
        children: [
          /* @__PURE__ */ jsx29(CommandInput, { placeholder: "Search framework..." }),
          /* @__PURE__ */ jsxs18(CommandList, { className: "max-h-[300px]", children: [
            filteredIcons.length === 0 ? /* @__PURE__ */ jsx29(CommandEmpty, { children: "No icon found." }) : null,
            filteredIcons.slice(0, 50).map((iconName) => /* @__PURE__ */ jsx29(
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
import { useMutation as useMutation3 } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { useState as useState6 } from "react";

// src/dashboard/components/fields/video-uploader/queries.ts
import axios2 from "axios";
async function uploadVideo(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("assetType", "video");
  const { data } = await axios2.post("/cms/api/upload-asset", formData, {
    onUploadProgress
  });
  return uploadVideoResponseSchema.parse(data);
}

// src/dashboard/components/fields/video-uploader/video-uploader.tsx
import { jsx as jsx30, jsxs as jsxs19 } from "react/jsx-runtime";
function VideoUploader({ field, uploadedVideo, onChange, className, style }) {
  const [progress, setProgress] = useState6(0);
  const mutation = useMutation3(
    (file) => uploadVideo(file, ({ progress: progress2 }) => {
      setProgress(progress2 != null ? progress2 : 0);
    }),
    {
      onSuccess: ({ url }) => {
        onChange == null ? void 0 : onChange(url);
      }
    }
  );
  return /* @__PURE__ */ jsxs19("div", { className: cn("relative cursor-pointer overflow-hidden rounded-md", className), style, children: [
    progress !== 0 && progress !== 1 ? /* @__PURE__ */ jsx30("div", { className: "absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-full", children: /* @__PURE__ */ jsx30("div", { className: "h-full bg-primary transition-all", style: { width: `${progress * 100}%` } }) }) : null,
    /* @__PURE__ */ jsx30(
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
    mutation.isLoading ? /* @__PURE__ */ jsx30(LucideIcon, { name: "loader-2", className: "absolute right-3 top-3 h-6 w-6 animate-spin" }) : null,
    uploadedVideo ? /* @__PURE__ */ jsxs19("div", { className: "mt-2 flex items-center space-x-2 truncate rounded-md border p-2", children: [
      /* @__PURE__ */ jsx30("div", { className: "h-10 w-10 overflow-hidden rounded-md", children: /* @__PURE__ */ jsx30(ReactPlayer, { alt: "", url: uploadedVideo, width: 40, height: 40 }) }),
      /* @__PURE__ */ jsx30("div", { className: "flex-1 truncate text-xs text-muted-foreground", children: /* @__PURE__ */ jsx30("div", { className: "line-clamp-1 truncate whitespace-break-spaces", children: uploadedVideo }) }),
      !field.required ? /* @__PURE__ */ jsx30(
        Button,
        {
          icon: /* @__PURE__ */ jsx30(LucideIcon, { name: "trash" }),
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
import { useEffect as useEffect3, useState as useState9 } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Underline2 from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import LinkExtension from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image3 from "@tiptap/extension-image";

// src/dashboard/components/fields/tiptap-editor/components/editor-toolbar.tsx
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  TerminalSquare,
  Underline,
  Undo
} from "lucide-react";

// src/dashboard/components/fields/tiptap-editor/components/link-button.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as z3 } from "zod";

// src/dashboard/ui/form.tsx
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { Controller as Controller2, FormProvider, useFormContext } from "react-hook-form";
import { createContext as createContext2, forwardRef as forwardRef13, useContext as useContext2, useId } from "react";

// src/dashboard/ui/label.tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva3 } from "class-variance-authority";
import { forwardRef as forwardRef12 } from "react";
import { jsx as jsx31 } from "react/jsx-runtime";
var labelVariants = cva3("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label2 = forwardRef12(({ className, ...props }, ref) => /* @__PURE__ */ jsx31(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label2.displayName = LabelPrimitive.Root.displayName;

// src/dashboard/ui/form.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
var FormFieldContext = createContext2({});
var FormItemContext = createContext2({});
function useFormField() {
  const fieldContext = useContext2(FormFieldContext);
  const itemContext = useContext2(FormItemContext);
  const { getFieldState, formState } = useFormContext();
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
var Form = FormProvider;
function FormFieldWithController(props) {
  return /* @__PURE__ */ jsx32(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx32(Controller2, { ...props }) });
}
function FormField({ name, children }) {
  return /* @__PURE__ */ jsx32(FormFieldContext.Provider, { value: { name }, children });
}
var FormItem = forwardRef13(({ className, ...props }, ref) => {
  const id = useId();
  return /* @__PURE__ */ jsx32(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx32("div", { ref, className: cn("space-y-3", className), ...props }) });
});
FormItem.displayName = "FormItem";
var FormLabel = forwardRef13(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx32(Label2, { ref, className: cn(error && "text-destructive", className), htmlFor: formItemId, ...props });
});
FormLabel.displayName = "FormLabel";
var FormControl = forwardRef13(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /* @__PURE__ */ jsx32(
      Slot3,
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
var FormDescription = forwardRef13(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ jsx32("p", { ref, id: formDescriptionId, className: cn("text-sm text-muted-foreground", className), ...props });
  }
);
FormDescription.displayName = "FormDescription";
var FormMessage = forwardRef13(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error == null ? void 0 : error.message) : children;
    if (!body) {
      return null;
    }
    return /* @__PURE__ */ jsx32("p", { ref, id: formMessageId, className: cn("text-xs font-medium text-destructive", className), ...props, children: body });
  }
);
FormMessage.displayName = "FormMessage";

// src/dashboard/components/fields/tiptap-editor/components/link-button.tsx
import { jsx as jsx33, jsxs as jsxs20 } from "react/jsx-runtime";
var validationSchema = z3.object({
  link: z3.string().url()
});
function LinkButton({ editor, className, style }) {
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      link: editor.isActive("link") ? editor.getAttributes("link").href : ""
    }
  });
  return /* @__PURE__ */ jsxs20(
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
        /* @__PURE__ */ jsx33(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx33(
          Button,
          {
            className,
            style,
            icon: /* @__PURE__ */ jsx33(LucideIcon, { name: "link" }),
            size: "icon",
            variant: "ghost",
            type: "button"
          }
        ) }),
        /* @__PURE__ */ jsx33(PopoverContent, { sideOffset: 12, children: /* @__PURE__ */ jsx33(Form, { ...form, children: /* @__PURE__ */ jsxs20(
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
              /* @__PURE__ */ jsx33(
                FormFieldWithController,
                {
                  name: "link",
                  control: form.control,
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsxs20(FormItem, { children: [
                      /* @__PURE__ */ jsx33(FormLabel, { children: "Link" }),
                      /* @__PURE__ */ jsx33(FormControl, { children: /* @__PURE__ */ jsx33(Input, { ...field }) }),
                      /* @__PURE__ */ jsx33(FormMessage, {})
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-end space-x-2", children: [
                editor.isActive("link") ? /* @__PURE__ */ jsx33(
                  Button,
                  {
                    type: "button",
                    size: "icon-sm",
                    variant: "secondary",
                    icon: /* @__PURE__ */ jsx33(LucideIcon, { name: "unlink" }),
                    onClick: () => {
                      editor.chain().focus().unsetLink().run();
                    }
                  }
                ) : null,
                /* @__PURE__ */ jsx33(Button, { size: "icon-sm", type: "submit", icon: /* @__PURE__ */ jsx33(LucideIcon, { name: "check" }) })
              ] })
            ]
          }
        ) }) })
      ]
    }
  );
}

// src/dashboard/components/fields/tiptap-editor/components/table-menu.tsx
import { zodResolver as zodResolver2 } from "@hookform/resolvers/zod";
import { useCallback, useState as useState7 } from "react";
import { useForm as useForm2 } from "react-hook-form";
import { z as z4 } from "zod";
import { jsx as jsx34, jsxs as jsxs21 } from "react/jsx-runtime";
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
var validationSchema2 = z4.object({
  rows: z4.number().int().positive().min(1),
  cols: z4.number().int().positive().min(1)
});
function TableMenu({ editor, className, style }) {
  const form = useForm2({
    resolver: zodResolver2(validationSchema2),
    defaultValues: {
      rows: 1,
      cols: 1
    }
  });
  const handleInsertTable = useCallback(
    (rows, cols) => {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
      setTimeout(() => {
        editor.chain().focus().run();
      });
    },
    [editor]
  );
  const [customTableDialogOpen, setCustomTableDialogOpen] = useState7(false);
  return /* @__PURE__ */ jsxs21(Dialog, { open: customTableDialogOpen, onOpenChange: setCustomTableDialogOpen, children: [
    /* @__PURE__ */ jsx34(Menubar, { className: "border-none p-0", children: /* @__PURE__ */ jsxs21(MenubarMenu, { children: [
      /* @__PURE__ */ jsx34(MenubarTrigger, { asChild: true, children: /* @__PURE__ */ jsx34(
        Button,
        {
          variant: "outline",
          size: "icon",
          icon: /* @__PURE__ */ jsx34(LucideIcon, { name: "table" }),
          type: "button",
          className,
          style
        }
      ) }),
      /* @__PURE__ */ jsxs21(MenubarContent, { children: [
        /* @__PURE__ */ jsxs21(MenubarSub, { children: [
          /* @__PURE__ */ jsx34(MenubarSubTrigger, { children: "Insert Table" }),
          /* @__PURE__ */ jsxs21(MenubarSubContent, { children: [
            TABLE_SIZES.map((tableSize) => /* @__PURE__ */ jsxs21(
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
            /* @__PURE__ */ jsx34(MenubarSeparator, {}),
            /* @__PURE__ */ jsx34(DialogTrigger, { children: /* @__PURE__ */ jsx34(MenubarItem, { children: "Custom Table Size" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx34(MenubarSeparator, {}),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addColumnBefore().run();
            },
            children: "Add Column Before"
          }
        ),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addColumnAfter().run();
            },
            children: "Add Column After"
          }
        ),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().deleteColumn().run();
            },
            children: "Delete Column"
          }
        ),
        /* @__PURE__ */ jsx34(MenubarSeparator, {}),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addRowBefore().run();
            },
            children: "Add Row Before"
          }
        ),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().addRowAfter().run();
            },
            children: "Add Row After"
          }
        ),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.isActive("table"),
            onClick: () => {
              editor.chain().focus().deleteRow().run();
            },
            children: "Delete Row"
          }
        ),
        /* @__PURE__ */ jsx34(MenubarSeparator, {}),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.can().chain().mergeCells().run(),
            onClick: () => {
              editor.chain().focus().mergeCells().run();
            },
            children: "Merge Cells"
          }
        ),
        /* @__PURE__ */ jsx34(
          MenubarItem,
          {
            disabled: !editor.can().chain().splitCell().run(),
            onClick: () => {
              editor.chain().focus().splitCell().run();
            },
            children: "Split Cell"
          }
        ),
        /* @__PURE__ */ jsx34(MenubarSeparator, {}),
        /* @__PURE__ */ jsx34(
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
    /* @__PURE__ */ jsxs21(DialogContent, { className: "sm:max-w-[425px]", children: [
      /* @__PURE__ */ jsxs21(DialogHeader, { children: [
        /* @__PURE__ */ jsx34(DialogTitle, { children: "Create custom table" }),
        /* @__PURE__ */ jsx34(DialogDescription, { children: "Add rows and cols size" })
      ] }),
      /* @__PURE__ */ jsx34(Form, { ...form, children: /* @__PURE__ */ jsxs21(
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
            /* @__PURE__ */ jsx34(
              FormFieldWithController,
              {
                name: "rows",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs21(FormItem, { children: [
                    /* @__PURE__ */ jsx34(FormLabel, { children: "Rows" }),
                    /* @__PURE__ */ jsx34(FormControl, { children: /* @__PURE__ */ jsx34(
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
                    /* @__PURE__ */ jsx34(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx34(
              FormFieldWithController,
              {
                name: "cols",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs21(FormItem, { children: [
                    /* @__PURE__ */ jsx34(FormLabel, { children: "cols" }),
                    /* @__PURE__ */ jsx34(FormControl, { children: /* @__PURE__ */ jsx34(
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
                    /* @__PURE__ */ jsx34(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsxs21(DialogFooter, { children: [
              /* @__PURE__ */ jsx34(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx34(Button, { variant: "ghost", children: "Cancel" }) }),
              /* @__PURE__ */ jsx34(Button, { type: "submit", children: "Submit" })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}

// src/dashboard/components/fields/tiptap-editor/components/image-button.tsx
import { useState as useState8 } from "react";
import { jsx as jsx35, jsxs as jsxs22 } from "react/jsx-runtime";
function ImageButton({ editor, className, style }) {
  const [uploadedImage, setUploadedImage] = useState8(null);
  const [dialogOpen, setDialogOpen] = useState8(false);
  return /* @__PURE__ */ jsxs22(
    Dialog,
    {
      open: dialogOpen,
      onOpenChange: (openState) => {
        setDialogOpen(openState);
        setUploadedImage(void 0);
      },
      children: [
        /* @__PURE__ */ jsx35(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx35(Button, { size: "icon", variant: "outline", icon: /* @__PURE__ */ jsx35(LucideIcon, { name: "image" }), className, style }) }),
        /* @__PURE__ */ jsxs22(DialogContent, { children: [
          /* @__PURE__ */ jsxs22(DialogHeader, { children: [
            /* @__PURE__ */ jsx35(DialogTitle, { children: "Insert Image" }),
            /* @__PURE__ */ jsx35(DialogDescription, { children: "Upload image to upload" })
          ] }),
          /* @__PURE__ */ jsx35(ImageUploader, { required: true, uploadedImage: uploadedImage != null ? uploadedImage : void 0, onChange: setUploadedImage }),
          /* @__PURE__ */ jsxs22(DialogFooter, { children: [
            /* @__PURE__ */ jsx35(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx35(Button, { type: "button", variant: "ghost", children: "Cancel" }) }),
            /* @__PURE__ */ jsx35(
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
import { useCallback as useCallback2 } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Baseline, RemoveFormatting } from "lucide-react";

// src/dashboard/ui/toggle.tsx
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva as cva4 } from "class-variance-authority";
import { forwardRef as forwardRef14 } from "react";
import { jsx as jsx36 } from "react/jsx-runtime";
var toggleVariants = cva4(
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
var Toggle = forwardRef14(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx36(TogglePrimitive.Root, { ref, className: cn(toggleVariants({ variant, size, className })), ...props }));
Toggle.displayName = TogglePrimitive.Root.displayName;

// src/dashboard/ui/color-palette.tsx
import { HexColorPicker } from "react-colorful";

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
import { jsx as jsx37, jsxs as jsxs23 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs23("div", { className: cn("space-y-4", className), style, children: [
    /* @__PURE__ */ jsx37(
      HexColorPicker,
      {
        className: "!w-full",
        color: value ? convertToHex(value) : void 0,
        onChange: (selectedColor) => {
          onChange == null ? void 0 : onChange(selectedColor, true);
        }
      }
    ),
    /* @__PURE__ */ jsx37("div", { className: "max-h-[120px] space-y-4 overflow-auto", children: COLORS.map((block, index) => {
      return /* @__PURE__ */ jsxs23("div", { className: "space-y-2", children: [
        block.heading ? /* @__PURE__ */ jsx37("div", { className: "text-sm font-medium text-foreground", children: block.heading }) : null,
        /* @__PURE__ */ jsx37("div", { className: "flex flex-wrap gap-2", children: block.colors.map((color) => {
          return /* @__PURE__ */ jsx37(
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
import { Fragment as Fragment4, jsx as jsx38, jsxs as jsxs24 } from "react/jsx-runtime";
function ColorButton({ editor, className, style }) {
  var _a;
  const colorActive = (_a = editor.getAttributes("textStyle")) == null ? void 0 : _a.color;
  const handleColorChangeWithDebounce = useDebouncedCallback((color) => {
    editor.chain().focus().setColor(color).run();
  }, 1e3);
  const handleColorChange = useCallback2(
    (color) => {
      editor.chain().focus().setColor(color).run();
    },
    [editor]
  );
  return /* @__PURE__ */ jsxs24(Popover, { children: [
    /* @__PURE__ */ jsx38(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx38(Toggle, { className, style, variant: "outline", children: /* @__PURE__ */ jsx38(Baseline, { className: "h-4 w-4", style: { color: colorActive } }) }) }),
    /* @__PURE__ */ jsx38(PopoverContent, { sideOffset: 12, children: /* @__PURE__ */ jsxs24("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx38(
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
      colorActive ? /* @__PURE__ */ jsxs24(Fragment4, { children: [
        /* @__PURE__ */ jsx38("div", { className: "border-b" }),
        /* @__PURE__ */ jsx38(
          Button,
          {
            variant: "outline",
            icon: /* @__PURE__ */ jsx38(RemoveFormatting, {}),
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
import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef as forwardRef15 } from "react";
import { jsx as jsx39, jsxs as jsxs25 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = forwardRef15(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs25(
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
      /* @__PURE__ */ jsx39(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx39(LucideIcon, { name: "chevron-down", className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = forwardRef15(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx39(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx39(
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
    children: /* @__PURE__ */ jsx39(
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
var SelectLabel = forwardRef15(({ className, ...props }, ref) => /* @__PURE__ */ jsx39(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = forwardRef15(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs25(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx39("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx39(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx39(LucideIcon, { name: "check", className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx39(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = forwardRef15(({ className, ...props }, ref) => /* @__PURE__ */ jsx39(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/dashboard/components/fields/tiptap-editor/components/editor-toolbar.tsx
import { jsx as jsx40, jsxs as jsxs26 } from "react/jsx-runtime";
var HEADING_LEVELS = [1, 2, 3, 4, 5];
function EditorToolbar({ editor, className, style }) {
  var _a, _b;
  return /* @__PURE__ */ jsxs26("div", { className: cn("flex flex-wrap items-center gap-2", className), style, children: [
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleBold().run();
        },
        disabled: !editor.can().chain().focus().toggleBold().run(),
        pressed: editor.isActive("bold"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Bold, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleItalic().run();
        },
        disabled: !editor.can().chain().focus().toggleItalic().run(),
        pressed: editor.isActive("italic"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Italic, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleUnderline().run();
        },
        disabled: !editor.can().chain().focus().toggleUnderline().run(),
        pressed: editor.isActive("underline"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Underline, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleStrike().run();
        },
        disabled: !editor.can().chain().focus().toggleStrike().run(),
        pressed: editor.isActive("strike"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Strikethrough, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleCode().run();
        },
        disabled: !editor.can().chain().focus().toggleCode().run(),
        pressed: editor.isActive("code"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Code, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleCodeBlock().run();
        },
        disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
        pressed: editor.isActive("codeBlock"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(TerminalSquare, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleBulletList().run();
        },
        disabled: !editor.can().chain().focus().toggleBulletList().run(),
        pressed: editor.isActive("bulletList"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(List, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleOrderedList().run();
        },
        disabled: !editor.can().chain().focus().toggleOrderedList().run(),
        pressed: editor.isActive("orderedList"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(ListOrdered, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().toggleBlockquote().run();
        },
        disabled: !editor.can().chain().focus().toggleBlockquote().run(),
        pressed: editor.isActive("blockqoute"),
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Quote, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxs26(
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
          /* @__PURE__ */ jsx40(SelectTrigger, { className: "w-[210px]", children: /* @__PURE__ */ jsx40(SelectValue, { placeholder: "Text Style" }) }),
          /* @__PURE__ */ jsxs26(SelectContent, { children: [
            /* @__PURE__ */ jsx40(SelectItem, { value: "normal", children: "Normal Text" }, "normal"),
            HEADING_LEVELS.map((headingLevel) => {
              return /* @__PURE__ */ jsxs26(SelectItem, { value: `${headingLevel}`, children: [
                "Heading ",
                headingLevel
              ] }, headingLevel);
            })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx40(ColorButton, { editor }),
    /* @__PURE__ */ jsx40(LinkButton, { editor }),
    /* @__PURE__ */ jsx40(TableMenu, { editor }),
    /* @__PURE__ */ jsx40(ImageButton, { editor }),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().undo().run();
        },
        disabled: !editor.can().undo(),
        pressed: false,
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Undo, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx40(
      Toggle,
      {
        onPressedChange: () => {
          editor.chain().focus().redo().run();
        },
        disabled: !editor.can().redo(),
        pressed: false,
        variant: "outline",
        children: /* @__PURE__ */ jsx40(Redo, { className: "h-4 w-4" })
      }
    )
  ] });
}

// src/dashboard/components/fields/tiptap-editor/tiptap-editor.tsx
import { Fragment as Fragment5, jsx as jsx41, jsxs as jsxs27 } from "react/jsx-runtime";
var CustomTextStyle = TextStyle.extend({
  priority: 1e3
});
function TiptapEditor({ value, onChange, className, style }) {
  const [internalValue, setInternalValue] = useState9(value);
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: HEADING_LEVELS
        }
      }),
      Underline2,
      Color.configure({
        types: ["textStyle"]
      }),
      CustomTextStyle,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          style: "table-layout: fixed; width: 100%;"
        }
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image3
    ],
    onUpdate: () => {
      const html = editor == null ? void 0 : editor.getHTML();
      if (html) {
        onChange(html);
        setInternalValue(html);
      }
    }
  });
  useEffect3(
    function updateContentOnValueChange() {
      if (typeof value === "string" && value !== internalValue) {
        editor == null ? void 0 : editor.commands.setContent(value);
      }
    },
    [value, internalValue, editor]
  );
  return /* @__PURE__ */ jsx41("div", { className: cn("space-y-4", className), style, children: editor ? /* @__PURE__ */ jsxs27(Fragment5, { children: [
    /* @__PURE__ */ jsx41(EditorToolbar, { editor }),
    /* @__PURE__ */ jsx41(
      EditorContent,
      {
        editor,
        className: String.raw`editor-container prose prose-zinc !max-w-none rounded-md border px-3 py-2 text-sm text-foreground dark:prose-invert focus-within:border-primary/50 prose-table:table-fixed prose-table:border-collapse prose-table:border [&>.ProseMirror]:focus-within:outline-none [&_.ProseMirror-selectednode]:ring-2 [&_.ProseMirror-selectednode]:ring-ring [&_.column-resize-handle]:pointer-events-none [&_.column-resize-handle]:absolute [&_.column-resize-handle]:bottom-0 [&_.column-resize-handle]:right-0 [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:w-0.5 [&_.column-resize-handle]:cursor-col-resize [&_.column-resize-handle]:bg-primary/50 [&_.selectedCell]:after:pointer-events-none [&_.selectedCell]:after:absolute [&_.selectedCell]:after:inset-0 [&_.selectedCell]:after:bg-primary/10 [&_td]:relative [&_td]:border [&_td]:p-2 [&_td_p]:m-0 [&_th>p]:m-0 [&_th]:relative [&_th]:border [&_th]:bg-muted [&_th]:p-2`
      }
    )
  ] }) : null });
}

// src/dashboard/ui/date-picker.tsx
import { format } from "date-fns";

// src/dashboard/ui/calendar.tsx
import { DayPicker } from "react-day-picker";
import { jsx as jsx42 } from "react/jsx-runtime";
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return /* @__PURE__ */ jsx42(
    DayPicker,
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
        IconLeft: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx42(LucideIcon, { name: "chevron-left", className: cn(className2, "h-4 w-4"), ...props2 }),
        IconRight: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx42(LucideIcon, { name: "chevron-right", className: cn(className2, "h-4 w-4"), ...props2 })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";

// src/dashboard/ui/date-picker.tsx
import { jsx as jsx43, jsxs as jsxs28 } from "react/jsx-runtime";
function DatePicker({ date, onChange, className, style }) {
  return /* @__PURE__ */ jsxs28(Popover, { children: [
    /* @__PURE__ */ jsx43(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx43(
      Button,
      {
        variant: "outline",
        className: cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground", className),
        style,
        icon: /* @__PURE__ */ jsx43(LucideIcon, { name: "calendar" }),
        children: date ? format(date, "PPP") : "Pick a date"
      }
    ) }),
    /* @__PURE__ */ jsx43(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx43(Calendar, { mode: "single", selected: date, onSelect: onChange, initialFocus: true }) })
  ] });
}

// src/dashboard/ui/color-picker.tsx
import { useState as useState10 } from "react";
import { jsx as jsx44, jsxs as jsxs29 } from "react/jsx-runtime";
function ColorPicker({ value, onChange, showColor = true, className, style }) {
  const [open, setOpen] = useState10(false);
  return /* @__PURE__ */ jsxs29(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx44(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx44(
      Button,
      {
        type: "button",
        variant: "outline",
        icon: value ? /* @__PURE__ */ jsx44("div", { style: { backgroundColor: value }, className: "rounded border" }) : void 0,
        className: cn("font-mono", className),
        style,
        children: value ? showColor ? value : void 0 : "Select Color"
      }
    ) }),
    /* @__PURE__ */ jsx44(PopoverContent, { children: /* @__PURE__ */ jsx44(
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
import { Fragment as Fragment6, jsx as jsx45, jsxs as jsxs30 } from "react/jsx-runtime";
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
  const validationSchema5 = useMemo6(() => getValidationSchemaForSchema(schema), [schema]);
  const form = useForm3({
    resolver: zodResolver3(validationSchema5),
    defaultValues: initialData
  });
  const { toast: toast2 } = useToast();
  const renderForm = useCallback3(
    (schema2, rootFieldKey) => {
      return Object.entries(schema2).map(([fieldKey, fieldSchema]) => {
        if (fieldSchema.hidden) {
          return null;
        }
        const pluginsToRender = plugins.filter((plugin) => {
          return plugin.enabledForFields.includes(fieldSchema.type);
        });
        const fieldName = rootFieldKey ? `${rootFieldKey}.${fieldKey}` : fieldKey;
        return /* @__PURE__ */ jsx45(FormField, { name: fieldName, children: /* @__PURE__ */ jsxs30(FormItem, { children: [
          /* @__PURE__ */ jsxs30(FormLabel, { className: "block", children: [
            fieldSchema.label,
            " ",
            fieldSchema.required ? /* @__PURE__ */ jsx45("span", { className: "text-xs text-muted-foreground", children: "(required)" }) : null
          ] }),
          /* @__PURE__ */ jsx45(FormControl, { children: (() => {
            switch (fieldSchema.type) {
              case "text": {
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ jsx45(
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
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: (props) => {
                      return /* @__PURE__ */ jsx45(TiptapEditor, { ...props });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "slug": {
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ jsx45(
                        slug_input_default,
                        {
                          value,
                          onChange: (event) => {
                            onChange(event.target.value);
                          },
                          onGenerateSlug: () => {
                            const fromValue = form.getValues(fieldSchema.from);
                            if (fromValue && typeof fromValue === "string") {
                              const slug = slugify(fromValue).toLowerCase();
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
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ jsx45(
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
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      var _a;
                      return /* @__PURE__ */ jsx45(
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
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ jsx45(VideoUploader, { uploadedVideo: value, onChange, field: fieldSchema });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "icon": {
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ jsx45(IconSelector, { icon: value, onChange });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "color": {
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: (props) => {
                      return /* @__PURE__ */ jsx45(ColorPicker, { ...props });
                    },
                    cmsField: fieldSchema,
                    plugins: pluginsToRender
                  }
                );
              }
              case "select": {
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ value, onChange }) => {
                      return /* @__PURE__ */ jsxs30(
                        Select,
                        {
                          value: value == null ? void 0 : value.value,
                          onValueChange: (valueSelected) => {
                            onChange(fieldSchema.options.find((option) => option.value === valueSelected));
                          },
                          children: [
                            /* @__PURE__ */ jsx45(SelectTrigger, { children: /* @__PURE__ */ jsx45(SelectValue, { placeholder: `Select ${fieldSchema.label}` }) }),
                            /* @__PURE__ */ jsx45(SelectContent, { children: fieldSchema.options.map((option) => /* @__PURE__ */ jsx45(SelectItem, { value: option.value, children: option.label }, option.value)) })
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
                return /* @__PURE__ */ jsx45(
                  InputField,
                  {
                    type: fieldSchema.multiple ? "multiple" : "single",
                    fieldName,
                    control: form.control,
                    renderInput: ({ fieldName: fieldName2 }) => {
                      return /* @__PURE__ */ jsx45("div", { className: "space-y-8 rounded-md border p-4", children: renderForm(fieldSchema.schema, fieldName2) });
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
          /* @__PURE__ */ jsx45(FormMessage, {})
        ] }) }, fieldName);
      });
    },
    [form, plugins, toast2]
  );
  return /* @__PURE__ */ jsxs30(Fragment6, { children: [
    /* @__PURE__ */ jsx45("title", { children: `${form.formState.isDirty ? "\u{1F7E1} " : ""}Content Manager${title ? ` | ${title}` : ""}` }),
    /* @__PURE__ */ jsx45("div", { className: cn("rounded-md border", className), style, children: /* @__PURE__ */ jsx45(Form, { ...form, children: /* @__PURE__ */ jsxs30(
      "form",
      {
        onSubmit: form.handleSubmit(onSubmit),
        onReset: () => {
          form.reset();
        },
        children: [
          /* @__PURE__ */ jsx45("div", { className: "space-y-8 p-4", children: renderForm(schema) }),
          /* @__PURE__ */ jsxs30("div", { className: "flex items-center justify-end space-x-4 border-t bg-muted px-4 py-2", children: [
            form.formState.isDirty ? /* @__PURE__ */ jsxs30("div", { className: "flex items-center text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx45(FileWarning, { className: "mr-1 h-5 w-5" }),
              "Unsaved Changes"
            ] }) : null,
            /* @__PURE__ */ jsx45("div", { className: "flex-1" }),
            /* @__PURE__ */ jsx45(Button, { type: "reset", variant: "outline", children: "Reset" }),
            /* @__PURE__ */ jsx45(Button, { type: "submit", loading: submitting, children: "Update" })
          ] })
        ]
      }
    ) }) })
  ] });
}

// src/dashboard/components/content-manager/components/update-singleton-form.tsx
import { jsx as jsx46 } from "react/jsx-runtime";
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
        action: /* @__PURE__ */ jsx46(ToastAction, { asChild: true, altText: "View Page", children: /* @__PURE__ */ jsx46(Link3, { href: redirectToOnSave, children: "View Page" }) })
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
  return /* @__PURE__ */ jsx46(
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
import Link4 from "next/link";
import { jsx as jsx47 } from "react/jsx-runtime";
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
        action: /* @__PURE__ */ jsx47(ToastAction, { asChild: true, altText: "View Page", children: /* @__PURE__ */ jsx47(Link4, { href: redirectToOnSave, children: "View Page" }) })
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
  return /* @__PURE__ */ jsx47(
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
import Link5 from "next/link";
import { jsx as jsx48 } from "react/jsx-runtime";
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
        action: /* @__PURE__ */ jsx48(ToastAction, { asChild: true, altText: "View Page", children: /* @__PURE__ */ jsx48(Link5, { href: redirectToOnSave, children: "View Page" }) })
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
  return /* @__PURE__ */ jsx48(
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
import { jsx as jsx49 } from "react/jsx-runtime";
function ContentManager({ config, ...rest }) {
  switch (config.type) {
    case "singleton": {
      return /* @__PURE__ */ jsx49(UpdateSingletonForm, { ...rest, singletonName: config.singletonName });
    }
    case "collection": {
      switch (config.method) {
        case "create": {
          return /* @__PURE__ */ jsx49(CreateCollectionElementForm, { ...rest, collectionName: config.collectionName });
        }
        case "update": {
          return /* @__PURE__ */ jsx49(
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
import { cva as cva5 } from "class-variance-authority";
import { jsx as jsx50, jsxs as jsxs31 } from "react/jsx-runtime";
var loaderVariants = cva5("flex animate-pulse items-center justify-center gap-2 rounded-md p-4 text-xs", {
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
  return /* @__PURE__ */ jsxs31("div", { className: cn(loaderVariants({ variant }), className), style, children: [
    /* @__PURE__ */ jsx50(LucideIcon, { name: "loader-2", className: "h-5 w-5 animate-spin" }),
    /* @__PURE__ */ jsx50("span", { children: message })
  ] });
}

// src/dashboard/ui/page-heading.tsx
import { cloneElement as cloneElement3 } from "react";
import { jsx as jsx51, jsxs as jsxs32 } from "react/jsx-runtime";
function PageHeading({ title, icon, description, className, style }) {
  return /* @__PURE__ */ jsxs32("div", { className: cn("flex items-center space-x-4", className), style, children: [
    /* @__PURE__ */ jsx51("div", { className: "rounded-md border bg-muted p-2", children: cloneElement3(icon, { className: cn(icon.props.className, "h-6 w-6") }) }),
    /* @__PURE__ */ jsxs32("div", { children: [
      /* @__PURE__ */ jsx51("div", { className: "text-base font-medium text-foreground", children: title }),
      description ? /* @__PURE__ */ jsx51("div", { className: "text-sm text-muted-foreground", children: description }) : null
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/singleton-content-manager.tsx
import { jsx as jsx52, jsxs as jsxs33 } from "react/jsx-runtime";
function SingletonContentManager({
  singleton,
  singletonName,
  plugins,
  redirectTo,
  className,
  style
}) {
  const query = api.singleton.fetchSingleton.useQuery({ singletonName });
  const content = useMemo7(() => {
    if (query.isLoading) {
      return /* @__PURE__ */ jsx52(Loader2, { message: "Loading Content Manager..." });
    }
    if (query.data) {
      return /* @__PURE__ */ jsx52(
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
  return /* @__PURE__ */ jsxs33("div", { className: cn("space-y-4 p-4", className), style, children: [
    /* @__PURE__ */ jsx52(PageHeading, { title: singleton.label, icon: /* @__PURE__ */ jsx52(File3, { name: "file" }) }),
    content
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-page.tsx
import Link6 from "next/link";
import { useMemo as useMemo8 } from "react";
import { ChevronRight as ChevronRight2, PackageOpen, Plus } from "lucide-react";

// src/dashboard/components/delete-collection-item/delete-collection-item.tsx
import { useRouter } from "next/navigation";
import { Trash as Trash2 } from "lucide-react";
import { jsx as jsx53, jsxs as jsxs34 } from "react/jsx-runtime";
function DeleteCollectionItem({ elementId, onDelete, className, style }) {
  const router = useRouter();
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
  return /* @__PURE__ */ jsxs34(Popover, { children: [
    /* @__PURE__ */ jsx53(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx53(Button, { size: "icon", icon: /* @__PURE__ */ jsx53(Trash2, {}), variant: "secondary", className, style }) }),
    /* @__PURE__ */ jsxs34(PopoverContent, { className: "w-80", side: "bottom", align: "end", children: [
      /* @__PURE__ */ jsx53("div", { className: "mb-1 text-base font-medium text-foreground", children: "Delete item?" }),
      /* @__PURE__ */ jsx53("div", { className: "mb-2 text-sm text-muted-foreground", children: "Item once deleted cannot be recovered. Do you want to continue?" }),
      /* @__PURE__ */ jsxs34("div", { className: "flex items-center justify-end space-x-2", children: [
        /* @__PURE__ */ jsx53(PopoverClose, { asChild: true, children: /* @__PURE__ */ jsx53(Button, { size: "sm", variant: "ghost", children: "Cancel" }) }),
        /* @__PURE__ */ jsx53(
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
import { Fragment as Fragment7, jsx as jsx54, jsxs as jsxs35 } from "react/jsx-runtime";
function CollectionPage({ collection, collectionName, className, style }) {
  const query = api.collection.fetchCollectionElements.useQuery({ collectionName });
  const content = useMemo8(() => {
    if (query.isLoading) {
      return /* @__PURE__ */ jsx54(Loader2, { message: `Loading ${collection.label} elements...` });
    }
    if (query.data) {
      if (query.data.length === 0) {
        return /* @__PURE__ */ jsxs35("div", { className: "flex flex-col items-center justify-center rounded-md border border-dashed p-4", children: [
          /* @__PURE__ */ jsx54(PackageOpen, { className: "mb-2 h-10 w-10 text-muted-foreground opacity-20" }),
          /* @__PURE__ */ jsxs35("div", { className: "mb-2 text-sm text-muted-foreground", children: [
            "No elements found for ",
            collection.label,
            " collection"
          ] }),
          /* @__PURE__ */ jsx54(Link6, { href: `/cms/admin/collection/${collectionName}/new`, children: /* @__PURE__ */ jsx54(Button, { icon: /* @__PURE__ */ jsx54(Plus, {}), size: "sm", variant: "outline", children: "Create New Item" }) })
        ] });
      }
      return query.data.map((item, index) => {
        var _a;
        const itemId = item.id;
        const itemSlug = item.slug;
        const itemIdentifier = collection.nameField ? (_a = item[collection.nameField]) != null ? _a : itemSlug : itemSlug;
        return /* @__PURE__ */ jsxs35("div", { className: "flex items-center space-x-2 truncate rounded-md border px-4 py-2", children: [
          /* @__PURE__ */ jsxs35(Link6, { className: "flex-1 space-y-1 truncate", href: `/cms/admin/collection/${collectionName}/${itemId}`, children: [
            /* @__PURE__ */ jsx54("div", { className: "truncate text-sm text-foreground", children: typeof itemIdentifier === "string" || typeof itemIdentifier === "number" ? itemIdentifier : index }),
            /* @__PURE__ */ jsxs35("div", { className: "flex items-center text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx54("span", { children: "Edit" }),
              /* @__PURE__ */ jsx54(ChevronRight2, { className: "h-4 w-4 text-muted-foreground" })
            ] })
          ] }),
          /* @__PURE__ */ jsx54(
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
  return /* @__PURE__ */ jsxs35(Fragment7, { children: [
    /* @__PURE__ */ jsxs35("title", { children: [
      "Content Manager - ",
      collection.label
    ] }),
    /* @__PURE__ */ jsxs35("div", { className: cn("space-y-4", className), style, children: [
      /* @__PURE__ */ jsxs35("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx54("div", { className: "flex-1 text-base font-medium text-foreground", children: "Items" }),
        /* @__PURE__ */ jsx54(Link6, { href: `/cms/admin/collection/${collectionName}/new`, children: /* @__PURE__ */ jsx54(Button, { icon: /* @__PURE__ */ jsx54(Plus, {}), children: "Create New Item" }) })
      ] }),
      content
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-new-item-content-manager.tsx
import Link7 from "next/link";
import { ChevronRight as ChevronRight3 } from "lucide-react";
import { jsx as jsx55, jsxs as jsxs36 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs36("div", { className: cn("space-y-4", className), style, children: [
    /* @__PURE__ */ jsx55("div", { children: /* @__PURE__ */ jsxs36(
      Link7,
      {
        href: `/cms/admin/collection/${collectionName}`,
        className: "flex items-center text-sm text-muted-foreground",
        children: [
          /* @__PURE__ */ jsx55(ChevronRight3, { className: "mr-2 h-5 w-5" }),
          "Show all items"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx55(
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
import { FolderOpen as FolderOpen3 } from "lucide-react";
import { jsx as jsx56, jsxs as jsxs37 } from "react/jsx-runtime";
function CollectionPageLayout({ collection, children }) {
  return /* @__PURE__ */ jsxs37("div", { className: "space-y-4 p-4", children: [
    /* @__PURE__ */ jsx56(PageHeading, { title: collection.label, icon: /* @__PURE__ */ jsx56(FolderOpen3, { name: "folder-open" }) }),
    children
  ] });
}

// src/dashboard/components/admin-dashboard/components/collection-element-page.tsx
import Link8 from "next/link";
import { useMemo as useMemo9 } from "react";
import { ChevronLeft } from "lucide-react";
import { jsx as jsx57, jsxs as jsxs38 } from "react/jsx-runtime";
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
  const content = useMemo9(() => {
    if (collectionElementQuery.isLoading) {
      return /* @__PURE__ */ jsx57(Loader2, { message: "Loading content manager..." });
    }
    if (collectionElementQuery.data) {
      return /* @__PURE__ */ jsx57(
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
  return /* @__PURE__ */ jsxs38("div", { className: cn("space-y-4", className), style, children: [
    /* @__PURE__ */ jsx57("div", { children: /* @__PURE__ */ jsxs38(
      Link8,
      {
        href: `/cms/admin/collection/${collectionName}`,
        className: "flex items-center text-sm text-muted-foreground",
        children: [
          /* @__PURE__ */ jsx57(ChevronLeft, { className: "mr-2 h-5 w-5" }),
          "Show all items"
        ]
      }
    ) }),
    content
  ] });
}

// src/dashboard/components/admin-dashboard/components/login-page.tsx
import { Atom } from "lucide-react";

// src/dashboard/components/admin-dashboard/components/login-form.tsx
import { zodResolver as zodResolver4 } from "@hookform/resolvers/zod";
import { useForm as useForm4 } from "react-hook-form";
import { useMutation as useMutation4 } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { z as z5 } from "zod";
import { useRouter as useRouter2 } from "next/navigation";

// src/dashboard/ui/password-input.tsx
import { forwardRef as forwardRef16, useState as useState11 } from "react";
import { jsx as jsx58, jsxs as jsxs39 } from "react/jsx-runtime";
var PasswordInput = forwardRef16(({ className, style, ...props }, ref) => {
  const [passwordVisible, setPasswordVisible] = useState11(false);
  return /* @__PURE__ */ jsxs39(
    "div",
    {
      className: cn(
        "flex h-10 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      style,
      children: [
        /* @__PURE__ */ jsx58(
          "input",
          {
            type: passwordVisible ? "text" : "password",
            ref,
            ...props,
            className: "flex-1 px-3 py-2 outline-none"
          }
        ),
        /* @__PURE__ */ jsx58(
          "button",
          {
            type: "button",
            className: "flex-shrink-0 p-1 text-muted-foreground focus:outline-none",
            onClick: () => {
              setPasswordVisible((prevState) => !prevState);
            },
            children: passwordVisible ? /* @__PURE__ */ jsx58(LucideIcon, { name: "eye-off", className: "h-4 w-4" }) : /* @__PURE__ */ jsx58(LucideIcon, { name: "eye", className: "h-4 w-4" })
          }
        )
      ]
    }
  );
});
PasswordInput.displayName = "PasswordInput";

// src/dashboard/components/admin-dashboard/components/login-form.tsx
import { jsx as jsx59, jsxs as jsxs40 } from "react/jsx-runtime";
var validationSchema3 = z5.object({
  email: z5.string().email(),
  password: z5.string()
});
function LoginForm({ className, style }) {
  const form = useForm4({
    resolver: zodResolver4(validationSchema3),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { toast: toast2 } = useToast();
  const router = useRouter2();
  const mutation = useMutation4(
    (values) => signIn("credentials", { ...values, redirect: false, callbackUrl: "/cms/admin" }),
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
  return /* @__PURE__ */ jsx59(Form, { ...form, children: /* @__PURE__ */ jsxs40(
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
        /* @__PURE__ */ jsx59(
          FormFieldWithController,
          {
            name: "email",
            control: form.control,
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs40(FormItem, { children: [
                /* @__PURE__ */ jsx59(FormLabel, { children: "Email" }),
                /* @__PURE__ */ jsx59(FormControl, { children: /* @__PURE__ */ jsx59(Input, { placeholder: "Email", ...field }) }),
                /* @__PURE__ */ jsx59(FormMessage, {})
              ] });
            }
          }
        ),
        /* @__PURE__ */ jsx59(
          FormFieldWithController,
          {
            name: "password",
            control: form.control,
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs40(FormItem, { children: [
                /* @__PURE__ */ jsx59(FormLabel, { children: "Password" }),
                /* @__PURE__ */ jsx59(FormControl, { children: /* @__PURE__ */ jsx59(PasswordInput, { placeholder: "Password", ...field }) })
              ] });
            }
          }
        ),
        /* @__PURE__ */ jsx59(Button, { className: "w-full", loading: mutation.isLoading, children: "Login" })
      ]
    }
  ) });
}

// src/dashboard/components/admin-dashboard/components/login-page.tsx
import { Fragment as Fragment8, jsx as jsx60, jsxs as jsxs41 } from "react/jsx-runtime";
function LoginPage() {
  return /* @__PURE__ */ jsxs41(Fragment8, { children: [
    /* @__PURE__ */ jsx60("title", { children: "CMS Login" }),
    /* @__PURE__ */ jsx60("div", { className: "bg-muted-background flex h-screen items-center justify-center", children: /* @__PURE__ */ jsxs41("div", { className: "w-[480px] rounded-md border bg-primary-foreground p-6", children: [
      /* @__PURE__ */ jsxs41("div", { className: "mb-4 flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx60(Atom, { className: "h-10 w-10 text-foreground" }),
        /* @__PURE__ */ jsxs41("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx60("div", { className: "text-xl font-semibold text-foreground", children: "Admin Login" }),
          /* @__PURE__ */ jsxs41("div", { className: "text-sm text-muted-foreground", children: [
            "Login with the credentials present in ",
            /* @__PURE__ */ jsx60("code", { children: ".env" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx60(LoginForm, {})
    ] }) })
  ] });
}

// src/dashboard/components/admin-dashboard/components/media-library.tsx
import { useMemo as useMemo10 } from "react";
import { Image as Image4, PackageOpen as PackageOpen2, Plus as Plus2, Upload } from "lucide-react";

// src/dashboard/components/admin-dashboard/components/create-folder.tsx
import { zodResolver as zodResolver5 } from "@hookform/resolvers/zod";
import { useForm as useForm5 } from "react-hook-form";
import { z as z6 } from "zod";
import { useState as useState12 } from "react";
import { jsx as jsx61, jsxs as jsxs42 } from "react/jsx-runtime";
var validationSchema4 = z6.object({
  name: z6.string().nonempty()
});
function CreateFolder({ children, folderId, onFolderCreated }) {
  const [dialogOpen, setDialogOpen] = useState12(false);
  const form = useForm5({
    resolver: zodResolver5(validationSchema4),
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
  return /* @__PURE__ */ jsxs42(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
    /* @__PURE__ */ jsx61(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs42(DialogContent, { children: [
      /* @__PURE__ */ jsxs42(DialogHeader, { children: [
        /* @__PURE__ */ jsx61(DialogTitle, { children: "Create Folder" }),
        /* @__PURE__ */ jsx61(DialogDescription, { children: "Add folder to properly segregate media assets" })
      ] }),
      /* @__PURE__ */ jsx61(Form, { ...form, children: /* @__PURE__ */ jsxs42(
        "form",
        {
          className: "space-y-4",
          onSubmit: form.handleSubmit(({ name }) => {
            mutation.mutate({ name: name.trim(), parent: folderId });
          }),
          children: [
            /* @__PURE__ */ jsx61(
              FormFieldWithController,
              {
                name: "name",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs42(FormItem, { children: [
                    /* @__PURE__ */ jsx61(FormLabel, { children: "Name" }),
                    /* @__PURE__ */ jsx61(FormControl, { children: /* @__PURE__ */ jsx61(Input, { ...field }) }),
                    /* @__PURE__ */ jsx61(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsxs42(DialogFooter, { children: [
              /* @__PURE__ */ jsx61(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx61(Button, { type: "button", variant: "ghost", children: "Cancel" }) }),
              /* @__PURE__ */ jsx61(Button, { type: "submit", children: "Submit" })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/folder-card.tsx
import { FolderOpen as FolderOpen4 } from "lucide-react";

// src/dashboard/ui/context-menu.tsx
import { forwardRef as forwardRef17 } from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { jsx as jsx62, jsxs as jsxs43 } from "react/jsx-runtime";
var ContextMenu = ContextMenuPrimitive.Root;
var ContextMenuTrigger = ContextMenuPrimitive.Trigger;
var ContextMenuSubTrigger = forwardRef17(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs43(
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
      /* @__PURE__ */ jsx62(LucideIcon, { name: "chevron-right", className: "ml-auto h-4 w-4" })
    ]
  }
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
var ContextMenuSubContent = forwardRef17(({ className, ...props }, ref) => /* @__PURE__ */ jsx62(
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
var ContextMenuContent = forwardRef17(({ className, ...props }, ref) => /* @__PURE__ */ jsx62(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx62(
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
var ContextMenuItem = forwardRef17(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx62(
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
var ContextMenuCheckboxItem = forwardRef17(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs43(
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
      /* @__PURE__ */ jsx62("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx62(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx62(LucideIcon, { name: "check", className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
var ContextMenuRadioItem = forwardRef17(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs43(
  ContextMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx62("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx62(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx62(LucideIcon, { name: "circle", className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
var ContextMenuLabel = forwardRef17(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx62(
  ContextMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className),
    ...props
  }
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
var ContextMenuSeparator = forwardRef17(({ className, ...props }, ref) => /* @__PURE__ */ jsx62(ContextMenuPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-border", className), ...props }));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
var ContextMenuShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx62("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// src/dashboard/components/admin-dashboard/components/folder-card.tsx
import { jsx as jsx63, jsxs as jsxs44 } from "react/jsx-runtime";
function FolderCard({ folder, className, style }) {
  return /* @__PURE__ */ jsxs44(ContextMenu, { children: [
    /* @__PURE__ */ jsx63(ContextMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs44(
      "button",
      {
        className: cn("flex items-center space-x-2 rounded-md border bg-background px-4 py-3 text-left", className),
        style,
        children: [
          /* @__PURE__ */ jsx63(FolderOpen4, { name: "folder-open", className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx63("div", { className: "flex-1 truncate text-sm text-foreground", children: folder.name })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs44(ContextMenuContent, { children: [
      /* @__PURE__ */ jsx63(ContextMenuItem, { children: "Rename Folder" }),
      /* @__PURE__ */ jsx63(ContextMenuItem, { disabled: true, children: "Move Folder" }),
      /* @__PURE__ */ jsx63(ContextMenuSeparator, {}),
      /* @__PURE__ */ jsx63(ContextMenuItem, { className: "text-destructive", children: "Delete Folder" })
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/media-library.tsx
import { Fragment as Fragment9, jsx as jsx64, jsxs as jsxs45 } from "react/jsx-runtime";
function MediaLibrary({ folderId }) {
  const { toast: toast2 } = useToast();
  const folderContentQuery = api.media.getFolderContent.useQuery({ id: folderId });
  const foldersContent = useMemo10(() => {
    if (folderContentQuery.isLoading) {
      return /* @__PURE__ */ jsx64(Loader2, { message: "Loading Folders..." });
    }
    if (folderContentQuery.data) {
      if (folderContentQuery.data.folders.length === 0) {
        return /* @__PURE__ */ jsxs45("div", { className: "flex flex-col items-center justify-center rounded-md border border-dashed p-4", children: [
          /* @__PURE__ */ jsx64(PackageOpen2, { name: "package-open", className: "mb-2 h-10 w-10 text-muted-foreground opacity-20" }),
          /* @__PURE__ */ jsx64("div", { className: "mb-2 text-sm text-muted-foreground", children: "No folders found" }),
          /* @__PURE__ */ jsx64(
            CreateFolder,
            {
              folderId,
              onFolderCreated: () => {
                folderContentQuery.refetch();
              },
              children: /* @__PURE__ */ jsx64(Button, { icon: /* @__PURE__ */ jsx64(Plus2, { name: "plus" }), size: "sm", variant: "outline", children: "Create Folder" })
            }
          )
        ] });
      }
      return /* @__PURE__ */ jsx64("div", { className: "grid grid-cols-4 gap-4", children: folderContentQuery.data.folders.map((folder) => {
        return /* @__PURE__ */ jsx64(
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
  const filesContent = useMemo10(() => null, []);
  return /* @__PURE__ */ jsxs45(Fragment9, { children: [
    /* @__PURE__ */ jsx64("title", { children: "Media Library" }),
    /* @__PURE__ */ jsxs45("div", { className: "space-y-4 p-4", children: [
      /* @__PURE__ */ jsx64(PageHeading, { title: "Media Library", icon: /* @__PURE__ */ jsx64(Image4, {}) }),
      /* @__PURE__ */ jsxs45("div", { className: "relative flex items-center justify-between space-x-4 px-4 before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-10 before:h-px before:bg-muted", children: [
        /* @__PURE__ */ jsx64("div", { className: "bg-background px-1 text-sm font-medium text-muted-foreground", children: "Folders" }),
        /* @__PURE__ */ jsx64("div", { className: "bg-background px-2", children: /* @__PURE__ */ jsx64(
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
            children: /* @__PURE__ */ jsx64(Button, { icon: /* @__PURE__ */ jsx64(Plus2, {}), size: "sm", variant: "outline", children: "Create Folder" })
          }
        ) })
      ] }),
      foldersContent,
      /* @__PURE__ */ jsxs45("div", { className: "relative flex items-center justify-between space-x-4 px-4 before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-10 before:h-px before:bg-muted", children: [
        /* @__PURE__ */ jsx64("div", { className: "bg-background px-1 text-sm font-medium text-muted-foreground", children: "Files" }),
        /* @__PURE__ */ jsx64("div", { className: "bg-background px-2", children: /* @__PURE__ */ jsx64(Button, { icon: /* @__PURE__ */ jsx64(Upload, {}), size: "sm", variant: "outline", children: "Upload File" }) })
      ] }),
      filesContent
    ] })
  ] });
}

// src/dashboard/components/admin-dashboard/components/dashboard-page.tsx
import { jsx as jsx65 } from "react/jsx-runtime";
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
    const params = useParams();
    const slug = params.slug;
    const searchParams = useSearchParams();
    const redirectTo = (_a2 = searchParams.get("redirectTo")) != null ? _a2 : "/";
    if (typeof slug === "undefined") {
      return /* @__PURE__ */ jsx65(DashboardHome, { config: clientSideConfig });
    }
    const pageType = slug[0];
    switch (pageType) {
      case "login": {
        return /* @__PURE__ */ jsx65(LoginPage, {});
      }
      case "media-library": {
        const parentFolderId = slug[1];
        return /* @__PURE__ */ jsx65(MediaLibrary, { folderId: parentFolderId });
      }
      case "singleton": {
        const singletonName = slug[1];
        if (!singletonName) {
          return notFound();
        }
        const singleton = clientSideConfig.singletons[singletonName];
        if (!singleton) {
          return notFound();
        }
        return /* @__PURE__ */ jsx65(
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
          return notFound();
        }
        const collection = clientSideConfig.collections[collectionName];
        if (!collection) {
          return notFound();
        }
        const collectionElementId = slug[2];
        if (typeof collectionElementId === "undefined") {
          return /* @__PURE__ */ jsx65(CollectionPageLayout, { collection, children: /* @__PURE__ */ jsx65(CollectionPage, { collection, collectionName }) });
        }
        if (collectionElementId === "new") {
          return /* @__PURE__ */ jsx65(CollectionPageLayout, { collection, children: /* @__PURE__ */ jsx65(
            CollectionNewItemContentManager,
            {
              collection,
              collectionName,
              plugins: clientSideConfig.plugins,
              redirectTo
            }
          ) });
        }
        return /* @__PURE__ */ jsx65(CollectionPageLayout, { collection, children: /* @__PURE__ */ jsx65(
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
        return notFound();
      }
    }
  };
}
export {
  createDashboardLayout,
  createDashboardPage
};
