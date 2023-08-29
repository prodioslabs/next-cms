"use client";

// src/plugins/ai-content/components/ai-content/ai-content.tsx
import { useState as useState2 } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as z2 } from "zod";
import { useMutation } from "@tanstack/react-query";

// src/plugins/ai-content/components/ai-content/queries.ts
import axios from "axios";

// src/plugins/ai-content/api/schema.ts
import { z } from "zod";
var generateContentBodyValidationSchema = z.object({
  message: z.string().min(1),
  fieldType: z.enum(["text", "rich-text"])
});
var generateContentResponseValidationSchema = z.object({
  content: z.string().min(1),
  fieldType: z.enum(["text", "rich-text"])
});

// src/plugins/ai-content/components/ai-content/queries.ts
async function generateContent(input) {
  const { data } = await axios.post("/cms/plugins/ai-content", input);
  return generateContentResponseValidationSchema.parse(data);
}

// src/dashboard/hooks/use-toast.ts
import * as React from "react";
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
import * as React2 from "react";
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
var TooltipContent = React2.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
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
import * as React3 from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";

// src/element/lucide-icon/lucide-icon.tsx
import * as LucideIcons from "lucide-react";
import { jsx as jsx2 } from "react/jsx-runtime";
var lucideIconNames = Object.keys(LucideIcons.icons);
function LucideIcon({ name, ...props }) {
  let iconName = name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  if (!(iconName in LucideIcons.icons)) {
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`);
    iconName = "Shield";
  }
  const Icon = LucideIcons.icons[iconName];
  return /* @__PURE__ */ jsx2(Icon, { ...props });
}

// src/dashboard/ui/sheet.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetClose = SheetPrimitive.Close;
var SheetPortal = ({ className, ...props }) => /* @__PURE__ */ jsx3(SheetPrimitive.Portal, { className: cn(className), ...props });
SheetPortal.displayName = SheetPrimitive.Portal.displayName;
var SheetOverlay = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
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
var sheetVariants = cva(
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
  ({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx3(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
      children,
      /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
        /* @__PURE__ */ jsx3(LucideIcon, { name: "x", className: "h-4 w-4" }),
        /* @__PURE__ */ jsx3("span", { className: "sr-only", children: "Close" })
      ] })
    ] })
  ] })
);
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx3("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx3("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(SheetPrimitive.Title, { ref, className: cn("text-lg font-semibold text-foreground", className), ...props }));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(SheetPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/dashboard/ui/button.tsx
import { cloneElement, forwardRef as forwardRef3 } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
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
var BaseButton = forwardRef3(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx4(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props, children });
  }
);
BaseButton.displayName = "BaseButton";
var Button = forwardRef3(({ loading, icon, children, ...props }, ref) => {
  return /* @__PURE__ */ jsxs2(BaseButton, { ...props, asChild: false, "data-loading": loading, ref, children: [
    loading ? /* @__PURE__ */ jsx4(
      LucideIcon,
      {
        name: "loader-2",
        className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), "animate-spin")
      }
    ) : icon ? cloneElement(icon, {
      className: cn(iconVariants({ type: children ? "withChildren" : "withoutChildren" }), icon.props.className)
    }) : null,
    children
  ] });
});
Button.displayName = "Button";

// src/dashboard/ui/form.tsx
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { createContext, forwardRef as forwardRef5, useContext, useId } from "react";

// src/dashboard/ui/label.tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva3 } from "class-variance-authority";
import { forwardRef as forwardRef4 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var labelVariants = cva3("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = forwardRef4(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;

// src/dashboard/ui/form.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var FormFieldContext = createContext({});
var FormItemContext = createContext({});
function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
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
  return /* @__PURE__ */ jsx6(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx6(Controller, { ...props }) });
}
var FormItem = forwardRef5(({ className, ...props }, ref) => {
  const id = useId();
  return /* @__PURE__ */ jsx6(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx6("div", { ref, className: cn("space-y-3", className), ...props }) });
});
FormItem.displayName = "FormItem";
var FormLabel = forwardRef5(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx6(Label, { ref, className: cn(error && "text-destructive", className), htmlFor: formItemId, ...props });
});
FormLabel.displayName = "FormLabel";
var FormControl = forwardRef5(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /* @__PURE__ */ jsx6(
      Slot2,
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
var FormDescription = forwardRef5(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ jsx6("p", { ref, id: formDescriptionId, className: cn("text-sm text-muted-foreground", className), ...props });
  }
);
FormDescription.displayName = "FormDescription";
var FormMessage = forwardRef5(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error == null ? void 0 : error.message) : children;
    if (!body) {
      return null;
    }
    return /* @__PURE__ */ jsx6("p", { ref, id: formMessageId, className: cn("text-xs font-medium text-destructive", className), ...props, children: body });
  }
);
FormMessage.displayName = "FormMessage";

// src/dashboard/ui/textarea.tsx
import { forwardRef as forwardRef6 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Textarea = forwardRef6(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx7(
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
import { Fragment, jsx as jsx8, jsxs as jsxs3 } from "react/jsx-runtime";
var validationSchema = z2.object({
  message: z2.string()
});
function AIContent({ field, updateField }) {
  const fieldType = z2.union([z2.literal("text"), z2.literal("rich-text")]).parse(field.type);
  const [open, setOpen] = useState2(false);
  const [messages, setMessages] = useState2([]);
  const { toast: toast2 } = useToast();
  const mutation = useMutation(generateContent, {
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
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      message: ""
    }
  });
  return /* @__PURE__ */ jsx8(TooltipProvider, { children: /* @__PURE__ */ jsxs3(Tooltip, { children: [
    /* @__PURE__ */ jsxs3(Sheet, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx8(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx8(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx8(Button, { icon: /* @__PURE__ */ jsx8(LucideIcon, { name: "sparkles" }), variant: "outline", size: "icon" }) }) }),
      /* @__PURE__ */ jsxs3(SheetContent, { className: "space-y-4 overflow-auto", children: [
        /* @__PURE__ */ jsxs3(SheetHeader, { children: [
          /* @__PURE__ */ jsx8(SheetTitle, { children: "AI Content Generator" }),
          /* @__PURE__ */ jsx8(SheetDescription, { children: "Generate content with GPT" })
        ] }),
        /* @__PURE__ */ jsx8(Form, { ...form, children: /* @__PURE__ */ jsxs3(
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
              /* @__PURE__ */ jsx8(
                FormFieldWithController,
                {
                  name: "message",
                  control: form.control,
                  render: ({ field: field2 }) => {
                    return /* @__PURE__ */ jsxs3(FormItem, { children: [
                      /* @__PURE__ */ jsx8(FormLabel, { children: "Message" }),
                      /* @__PURE__ */ jsx8(FormControl, { children: /* @__PURE__ */ jsx8(Textarea, { placeholder: "Write a brief message...", ...field2 }) }),
                      /* @__PURE__ */ jsx8(FormMessage, {})
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-end space-x-4", children: [
                /* @__PURE__ */ jsx8(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx8(
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
                /* @__PURE__ */ jsx8(Button, { type: "submit", loading: mutation.isLoading, children: "Generate Content" })
              ] })
            ]
          }
        ) }),
        messages.length ? /* @__PURE__ */ jsxs3(Fragment, { children: [
          /* @__PURE__ */ jsx8("div", { className: "border-b" }),
          /* @__PURE__ */ jsx8("div", { className: "text-sm font-medium text-foreground", children: "Generated Content" }),
          /* @__PURE__ */ jsx8("div", { className: "space-y-2", children: messages.map((message, index) => {
            return /* @__PURE__ */ jsxs3("div", { className: "space-y-4 rounded-md border p-4", children: [
              /* @__PURE__ */ jsx8(
                "div",
                {
                  className: "prose prose-sm text-sm text-muted-foreground dark:prose-invert",
                  dangerouslySetInnerHTML: { __html: message }
                }
              ),
              /* @__PURE__ */ jsxs3("div", { className: "flex space-x-2", children: [
                /* @__PURE__ */ jsx8(
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
                /* @__PURE__ */ jsx8(
                  Button,
                  {
                    variant: "ghost",
                    icon: /* @__PURE__ */ jsx8(LucideIcon, { name: "trash-2" }),
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
    /* @__PURE__ */ jsx8(TooltipContent, { side: "left", sideOffset: 20, children: /* @__PURE__ */ jsx8("p", { children: "Generate content with AI" }) })
  ] }) });
}

// src/plugins/ai-content/api/route.ts
import { NextResponse as NextResponse2 } from "next/server";

// src/utils/api.ts
import { NextResponse } from "next/server";
import { z as z3 } from "zod";
function handleError(error) {
  if (error instanceof z3.ZodError) {
    return NextResponse.json({ message: error.message, issues: error.issues }, { status: 422 });
  } else if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.error();
}

// src/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z as z4 } from "zod";
var env = createEnv({
  server: {
    /**
     * Next.js environment variables
     */
    NODE_ENV: z4.enum(["development", "production"]),
    NEXT_RUNTIME: z4.enum(["nodejs", "edge"]).optional(),
    /**
     * NextCMS configuration
     */
    DATABASE_URL: z4.string().min(1),
    NEXTAUTH_URL: z4.string().min(1),
    NEXTAUTH_SECRET: z4.string().min(1),
    ADMIN_EMAIL: z4.string().email(),
    ADMIN_PASSWORD: z4.string(),
    /**
     * AI-Content Plugin
     */
    OPENAI_API_KEY: z4.string().min(1).optional(),
    /**
     * Unsplash Plugin
     */
    UNSPLASH_ACCESS_KEY: z4.string().min(1).optional(),
    UNSPLASH_SECRET_KEY: z4.string().min(1).optional()
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
    return NextResponse2.json({ fieldType, content: text });
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
import { zodResolver as zodResolver2 } from "@hookform/resolvers/zod";
import { useState as useState3 } from "react";
import { useForm as useForm2 } from "react-hook-form";
import { useMutation as useMutation2 } from "@tanstack/react-query";
import { z as z6 } from "zod";
import Image from "next/image";

// src/plugins/unsplash-image/components/unsplash-image-selector/queries.ts
import axios2 from "axios";

// src/plugins/unsplash-image/api/schema.ts
import { z as z5 } from "zod";
var searchImageQueryParamsSchema = z5.object({
  query: z5.string(),
  page: z5.string().optional()
});
var searchImageResponseSchema = z5.object({
  photos: z5.object({
    total: z5.number(),
    total_pages: z5.number(),
    results: z5.array(
      z5.object({
        id: z5.string(),
        height: z5.number(),
        width: z5.number(),
        description: z5.string().nullable(),
        urls: z5.object({
          full: z5.string(),
          raw: z5.string(),
          regular: z5.string(),
          small: z5.string(),
          thumb: z5.string()
        })
      })
    )
  })
});

// src/plugins/unsplash-image/components/unsplash-image-selector/queries.ts
async function searchImage({ query, page = "1" }) {
  const { data } = await axios2.get("/cms/plugins/unsplash-image", {
    params: {
      query,
      page
    }
  });
  return searchImageResponseSchema.parse(data);
}

// src/dashboard/ui/input.tsx
import { forwardRef as forwardRef7 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var Input = forwardRef7(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx9(
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
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
var validationSchema2 = z6.object({
  query: z6.string().min(1)
});
function UnsplashImageSelector({ updateField }) {
  var _a, _b;
  const [open, setOpen] = useState3(false);
  const form = useForm2({
    resolver: zodResolver2(validationSchema2),
    defaultValues: {
      query: ""
    }
  });
  const mutation = useMutation2(searchImage);
  return /* @__PURE__ */ jsx10(TooltipProvider, { children: /* @__PURE__ */ jsx10(Tooltip, { children: /* @__PURE__ */ jsxs4(Sheet, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx10(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx10(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx10(
      Button,
      {
        variant: "outline",
        type: "button",
        icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsx10("title", {}),
          /* @__PURE__ */ jsx10("path", { d: "M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z", className: "fill-current" })
        ] }),
        size: "icon"
      }
    ) }) }),
    /* @__PURE__ */ jsxs4(SheetContent, { className: "space-y-4 overflow-auto", children: [
      /* @__PURE__ */ jsxs4(SheetHeader, { children: [
        /* @__PURE__ */ jsx10(SheetTitle, { children: "Unsplash Image" }),
        /* @__PURE__ */ jsx10(SheetDescription, { children: "Select image from unsplash" })
      ] }),
      /* @__PURE__ */ jsx10(Form, { ...form, children: /* @__PURE__ */ jsxs4(
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
            /* @__PURE__ */ jsx10(
              FormFieldWithController,
              {
                name: "query",
                control: form.control,
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs4(FormItem, { className: "flex-1", children: [
                    /* @__PURE__ */ jsx10(FormControl, { children: /* @__PURE__ */ jsx10(Input, { ...field, placeholder: "Search high-resolution images..." }) }),
                    /* @__PURE__ */ jsx10(FormMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx10(Button, { type: "submit", loading: mutation.isLoading, children: "Search" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx10("div", { className: "grid grid-cols-2 gap-4", children: (_b = (_a = mutation.data) == null ? void 0 : _a.photos) == null ? void 0 : _b.results.map((photo) => {
        var _a2;
        return /* @__PURE__ */ jsx10(
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
            children: /* @__PURE__ */ jsx10(
              Image,
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
    /* @__PURE__ */ jsx10(TooltipContent, { side: "left", sideOffset: 20, children: /* @__PURE__ */ jsx10("p", { children: "Select image from Unsplash" }) })
  ] }) }) });
}

// src/plugins/unsplash-image/api/route.ts
import { createApi } from "unsplash-js";
import { NextResponse as NextResponse3 } from "next/server";
async function searchImage2(request) {
  const unsplash = createApi({ accessKey: env.UNSPLASH_ACCESS_KEY });
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
    return NextResponse3.json({
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
export {
  createAIContentPlugin,
  createUnsplashPlugin
};
