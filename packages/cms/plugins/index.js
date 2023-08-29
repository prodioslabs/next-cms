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

// src/plugins/index.ts
var plugins_exports = {};
__export(plugins_exports, {
  createAIContentPlugin: () => createAIContentPlugin,
  createUnsplashPlugin: () => createUnsplashPlugin
});
module.exports = __toCommonJS(plugins_exports);

// src/plugins/ai-content/components/ai-content/ai-content.tsx
var import_react5 = require("react");
var import_zod2 = require("@hookform/resolvers/zod");
var import_react_hook_form2 = require("react-hook-form");
var import_zod3 = require("zod");
var import_react_query = require("@tanstack/react-query");

// src/plugins/ai-content/components/ai-content/queries.ts
var import_axios = __toESM(require("axios"));

// src/plugins/ai-content/api/schema.ts
var import_zod = require("zod");
var generateContentBodyValidationSchema = import_zod.z.object({
  message: import_zod.z.string().min(1),
  fieldType: import_zod.z.enum(["text", "rich-text"])
});
var generateContentResponseValidationSchema = import_zod.z.object({
  content: import_zod.z.string().min(1),
  fieldType: import_zod.z.enum(["text", "rich-text"])
});

// src/plugins/ai-content/components/ai-content/queries.ts
async function generateContent(input) {
  const { data } = await import_axios.default.post("/cms/plugins/ai-content", input);
  return generateContentResponseValidationSchema.parse(data);
}

// src/dashboard/hooks/use-toast.ts
var React = __toESM(require("react"));
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
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
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

// src/dashboard/ui/tooltip.tsx
var React2 = __toESM(require("react"));
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
var TooltipContent = React2.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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

// src/dashboard/ui/sheet.tsx
var React3 = __toESM(require("react"));
var SheetPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_class_variance_authority = require("class-variance-authority");

// src/element/lucide-icon/lucide-icon.tsx
var LucideIcons = __toESM(require("lucide-react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var lucideIconNames = Object.keys(LucideIcons.icons);
function LucideIcon({ name, ...props }) {
  let iconName = name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  if (!(iconName in LucideIcons.icons)) {
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`);
    iconName = "Shield";
  }
  const Icon = LucideIcons.icons[iconName];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { ...props });
}

// src/dashboard/ui/sheet.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetClose = SheetPrimitive.Close;
var SheetPortal = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SheetPrimitive.Portal, { className: cn(className), ...props });
SheetPortal.displayName = SheetPrimitive.Portal.displayName;
var SheetOverlay = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = (0, import_class_variance_authority.cva)(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React3.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(SheetPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SheetOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LucideIcon, { name: "x", className: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "sr-only", children: "Close" })
      ] })
    ] })
  ] })
);
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SheetPrimitive.Title, { ref, className: cn("text-lg font-semibold text-foreground", className), ...props }));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SheetPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/dashboard/ui/button.tsx
var import_react = require("react");
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime4 = require("react/jsx-runtime");
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
var BaseButton = (0, import_react.forwardRef)(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props, children });
  }
);
BaseButton.displayName = "BaseButton";
var Button = (0, import_react.forwardRef)(({ loading, icon, children, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(BaseButton, { ...props, asChild: false, "data-loading": loading, ref, children: [
    loading ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      LucideIcon,
      {
        name: "loader-2",
        className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), "animate-spin")
      }
    ) : icon ? (0, import_react.cloneElement)(icon, {
      className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), icon.props.className)
    }) : null,
    children
  ] });
});
Button.displayName = "Button";

// src/dashboard/ui/form.tsx
var import_react_slot2 = require("@radix-ui/react-slot");
var import_react_hook_form = require("react-hook-form");
var import_react3 = require("react");

// src/dashboard/ui/label.tsx
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
var import_class_variance_authority3 = require("class-variance-authority");
var import_react2 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var labelVariants = (0, import_class_variance_authority3.cva)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = (0, import_react2.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;

// src/dashboard/ui/form.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var FormFieldContext = (0, import_react3.createContext)({});
var FormItemContext = (0, import_react3.createContext)({});
function useFormField() {
  const fieldContext = (0, import_react3.useContext)(FormFieldContext);
  const itemContext = (0, import_react3.useContext)(FormItemContext);
  const { getFieldState, formState } = (0, import_react_hook_form.useFormContext)();
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
var Form = import_react_hook_form.FormProvider;
function FormFieldWithController(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_hook_form.Controller, { ...props }) });
}
var FormItem = (0, import_react3.forwardRef)(({ className, ...props }, ref) => {
  const id = (0, import_react3.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { ref, className: cn("space-y-3", className), ...props }) });
});
FormItem.displayName = "FormItem";
var FormLabel = (0, import_react3.forwardRef)(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { ref, className: cn(error && "text-destructive", className), htmlFor: formItemId, ...props });
});
FormLabel.displayName = "FormLabel";
var FormControl = (0, import_react3.forwardRef)(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_react_slot2.Slot,
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
var FormDescription = (0, import_react3.forwardRef)(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { ref, id: formDescriptionId, className: cn("text-sm text-muted-foreground", className), ...props });
  }
);
FormDescription.displayName = "FormDescription";
var FormMessage = (0, import_react3.forwardRef)(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error == null ? void 0 : error.message) : children;
    if (!body) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { ref, id: formMessageId, className: cn("text-xs font-medium text-destructive", className), ...props, children: body });
  }
);
FormMessage.displayName = "FormMessage";

// src/dashboard/ui/textarea.tsx
var import_react4 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Textarea = (0, import_react4.forwardRef)(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

// src/plugins/ai-content/components/ai-content/ai-content.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var validationSchema = import_zod3.z.object({
  message: import_zod3.z.string()
});
function AIContent({ field, updateField }) {
  const fieldType = import_zod3.z.union([import_zod3.z.literal("text"), import_zod3.z.literal("rich-text")]).parse(field.type);
  const [open, setOpen] = (0, import_react5.useState)(false);
  const [messages, setMessages] = (0, import_react5.useState)([]);
  const { toast: toast2 } = useToast();
  const mutation = (0, import_react_query.useMutation)(generateContent, {
    onSuccess: ({ content }) => {
      setMessages((prevState) => [...prevState, content]);
    },
    onError: (error) => {
      toast2({
        title: "Error updating content",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const form = (0, import_react_hook_form2.useForm)({
    resolver: (0, import_zod2.zodResolver)(validationSchema),
    defaultValues: {
      message: ""
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Tooltip, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Sheet, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SheetTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Button, { icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LucideIcon, { name: "sparkles" }), variant: "outline", size: "icon" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(SheetContent, { className: "space-y-4 overflow-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(SheetHeader, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SheetTitle, { children: "AI Content Generator" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SheetDescription, { children: "Generate content with GPT" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Form, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "form",
          {
            className: "space-y-4",
            onSubmit: (event) => {
              event.stopPropagation();
              return form.handleSubmit(() => {
                mutation.mutate({ fieldType, message: form.getValues().message });
              })(event);
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                FormFieldWithController,
                {
                  name: "message",
                  control: form.control,
                  render: ({ field: field2 }) => {
                    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(FormItem, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(FormLabel, { children: "Message" }),
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Textarea, { placeholder: "Write a brief message...", ...field2 }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(FormMessage, {})
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center justify-end space-x-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SheetClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  Button,
                  {
                    type: "button",
                    onClick: () => {
                      form.reset();
                    },
                    variant: "outline",
                    children: "Cancel"
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Button, { type: "submit", loading: mutation.isLoading, children: "Generate Content" })
              ] })
            ]
          }
        ) }),
        messages.length ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "border-b" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-sm font-medium text-foreground", children: "Generated Content" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "space-y-2", children: messages.map((message, index) => {
            return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-4 rounded-md border p-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "div",
                {
                  className: "prose prose-sm text-sm text-muted-foreground dark:prose-invert",
                  dangerouslySetInnerHTML: { __html: message }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  Button,
                  {
                    variant: "secondary",
                    onClick: () => {
                      updateField(message);
                      setOpen(false);
                    },
                    type: "button",
                    children: "Use Content"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                  Button,
                  {
                    variant: "ghost",
                    icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LucideIcon, { name: "trash-2" }),
                    size: "icon",
                    onClick: () => {
                      setMessages((prevState) => prevState.filter((_, i) => i !== index));
                    },
                    type: "button"
                  }
                )
              ] })
            ] }, `${message.slice(100)}-${index}`);
          }) })
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TooltipContent, { side: "left", sideOffset: 20, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: "Generate content with AI" }) })
  ] }) });
}

// src/plugins/ai-content/api/route.ts
var import_server2 = require("next/server");

// src/utils/api.ts
var import_server = require("next/server");
var import_zod4 = require("zod");
function handleError(error) {
  if (error instanceof import_zod4.z.ZodError) {
    return import_server.NextResponse.json({ message: error.message, issues: error.issues }, { status: 422 });
  } else if (error instanceof Error) {
    return import_server.NextResponse.json({ message: error.message }, { status: 500 });
  }
  return import_server.NextResponse.error();
}

// src/env.ts
var import_env_nextjs = require("@t3-oss/env-nextjs");
var import_zod5 = require("zod");
var env = (0, import_env_nextjs.createEnv)({
  server: {
    /**
     * Next.js environment variables
     */
    NODE_ENV: import_zod5.z.enum(["development", "production"]),
    NEXT_RUNTIME: import_zod5.z.enum(["nodejs", "edge"]).optional(),
    /**
     * NextCMS configuration
     */
    DATABASE_URL: import_zod5.z.string().min(1),
    NEXTAUTH_URL: import_zod5.z.string().min(1),
    NEXTAUTH_SECRET: import_zod5.z.string().min(1),
    ADMIN_EMAIL: import_zod5.z.string().email(),
    ADMIN_PASSWORD: import_zod5.z.string(),
    /**
     * AI-Content Plugin
     */
    OPENAI_API_KEY: import_zod5.z.string().min(1).optional(),
    /**
     * Unsplash Plugin
     */
    UNSPLASH_ACCESS_KEY: import_zod5.z.string().min(1).optional(),
    UNSPLASH_SECRET_KEY: import_zod5.z.string().min(1).optional()
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

// src/plugins/ai-content/api/route.ts
async function generateAIContent(request) {
  try {
    const { LLMChain } = await import("langchain/chains");
    const { PromptTemplate } = await import("langchain/prompts");
    const { ChatOpenAI } = await import("langchain/chat_models/openai");
    const { fieldType, message } = generateContentBodyValidationSchema.parse(await request.json());
    const llm = new ChatOpenAI({
      openAIApiKey: env.OPENAI_API_KEY,
      temperature: 0.9
    });
    const promptTemplate = fieldType === "text" ? "You are a professional chatbot meant to help the user of a CMS generate content for their website. Generate the content based on Message. Limit the content to no more than 1 paragraph.\n\nMessage: {message}\n\nContent:" : "You are a professional chatbot meant to help the user of a CMS generate content for their website. Generate the content in html based on the Message.\n\nMessage: {message}\n\nContent:";
    const prompt = new PromptTemplate({ template: promptTemplate, inputVariables: ["message"] });
    const chain = new LLMChain({ llm, prompt });
    const { text } = await chain.call({
      message
    });
    return import_server2.NextResponse.json({ fieldType, content: text });
  } catch (error) {
    return handleError(error);
  }
}

// src/plugins/ai-content/plugin.ts
function createAIContentPlugin(config) {
  return {
    name: "ai-content",
    config,
    enabledForFields: ["text", "rich-text"],
    component: AIContent,
    api: {
      method: "POST",
      handler: generateAIContent
    }
  };
}

// src/plugins/unsplash-image/components/unsplash-image-selector/unsplash-image-selector.tsx
var import_zod7 = require("@hookform/resolvers/zod");
var import_react7 = require("react");
var import_react_hook_form3 = require("react-hook-form");
var import_react_query2 = require("@tanstack/react-query");
var import_zod8 = require("zod");
var import_image = __toESM(require("next/image"));

// src/plugins/unsplash-image/components/unsplash-image-selector/queries.ts
var import_axios2 = __toESM(require("axios"));

// src/plugins/unsplash-image/api/schema.ts
var import_zod6 = require("zod");
var searchImageQueryParamsSchema = import_zod6.z.object({
  query: import_zod6.z.string(),
  page: import_zod6.z.string().optional()
});
var searchImageResponseSchema = import_zod6.z.object({
  photos: import_zod6.z.object({
    total: import_zod6.z.number(),
    total_pages: import_zod6.z.number(),
    results: import_zod6.z.array(
      import_zod6.z.object({
        id: import_zod6.z.string(),
        height: import_zod6.z.number(),
        width: import_zod6.z.number(),
        description: import_zod6.z.string().nullable(),
        urls: import_zod6.z.object({
          full: import_zod6.z.string(),
          raw: import_zod6.z.string(),
          regular: import_zod6.z.string(),
          small: import_zod6.z.string(),
          thumb: import_zod6.z.string()
        })
      })
    )
  })
});

// src/plugins/unsplash-image/components/unsplash-image-selector/queries.ts
async function searchImage({ query, page = "1" }) {
  const { data } = await import_axios2.default.get("/cms/plugins/unsplash-image", {
    params: {
      query,
      page
    }
  });
  return searchImageResponseSchema.parse(data);
}

// src/dashboard/ui/input.tsx
var import_react6 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Input = (0, import_react6.forwardRef)(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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

// src/plugins/unsplash-image/components/unsplash-image-selector/unsplash-image-selector.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var validationSchema2 = import_zod8.z.object({
  query: import_zod8.z.string().min(1)
});
function UnsplashImageSelector({ updateField }) {
  var _a, _b;
  const [open, setOpen] = (0, import_react7.useState)(false);
  const form = (0, import_react_hook_form3.useForm)({
    resolver: (0, import_zod7.zodResolver)(validationSchema2),
    defaultValues: {
      query: ""
    }
  });
  const mutation = (0, import_react_query2.useMutation)(searchImage);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Tooltip, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Sheet, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SheetTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Button,
      {
        variant: "outline",
        type: "button",
        icon: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("svg", { viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("title", {}),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", { d: "M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z", className: "fill-current" })
        ] }),
        size: "icon"
      }
    ) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(SheetContent, { className: "space-y-4 overflow-auto", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(SheetHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SheetTitle, { children: "Unsplash Image" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SheetDescription, { children: "Select image from unsplash" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Form, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
        "form",
        {
          className: "flex items-start space-x-2",
          onSubmit: (event) => {
            event.stopPropagation();
            return form.handleSubmit(() => {
              mutation.mutate({ query: form.getValues().query });
            })(event);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              FormFieldWithController,
              {
                name: "query",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(FormItem, { className: "flex-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Input, { ...field, placeholder: "Search high-resolution images..." }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Button, { type: "submit", loading: mutation.isLoading, children: "Search" })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "grid grid-cols-2 gap-4", children: (_b = (_a = mutation.data) == null ? void 0 : _a.photos) == null ? void 0 : _b.results.map((photo) => {
        var _a2;
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "button",
          {
            className: "relative block aspect-square overflow-hidden rounded-md after:absolute after:inset-0 after:bg-primary/50 after:opacity-0 after:transition-opacity hover:after:opacity-100",
            type: "button",
            onClick: () => {
              updateField({
                url: photo.urls.regular,
                width: photo.width,
                height: photo.height
              });
              setOpen(false);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              import_image.default,
              {
                className: "h-full w-full object-cover",
                src: photo.urls.thumb,
                width: photo.width,
                height: photo.height,
                alt: (_a2 = photo.description) != null ? _a2 : ""
              }
            )
          },
          photo.id
        );
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TooltipContent, { side: "left", sideOffset: 20, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: "Select image from Unsplash" }) })
  ] }) }) });
}

// src/plugins/unsplash-image/api/route.ts
var import_unsplash_js = require("unsplash-js");
var import_server3 = require("next/server");
async function searchImage2(request) {
  const unsplash = (0, import_unsplash_js.createApi)({ accessKey: env.UNSPLASH_ACCESS_KEY });
  try {
    const url = new URL(request.url);
    const { query, page = "1" } = searchImageQueryParamsSchema.parse({
      query: url.searchParams.get("query"),
      page: url.searchParams.get("page")
    });
    const { response } = await unsplash.search.getPhotos({
      query,
      perPage: 40,
      page: Number.parseInt(page, 10)
    });
    return import_server3.NextResponse.json({
      photos: response
    });
  } catch (error) {
    return handleError(error);
  }
}

// src/plugins/unsplash-image/plugin.ts
function createUnsplashPlugin(config) {
  return {
    name: "unsplash-image",
    config,
    enabledForFields: ["image"],
    component: UnsplashImageSelector,
    api: {
      method: "GET",
      handler: searchImage2
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAIContentPlugin,
  createUnsplashPlugin
});
