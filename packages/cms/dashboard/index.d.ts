import * as react_jsx_runtime from 'react/jsx-runtime';

type CMSBaseField = {
    label: string;
    hidden?: boolean;
    required?: boolean;
    multiple?: boolean;
};
type CMSTextField = CMSBaseField & {
    type: 'text';
    default?: string;
};
type CMSRichTextField = CMSBaseField & {
    type: 'rich-text';
    default?: string;
};
type CMSNumberField = CMSBaseField & {
    type: 'number';
    default?: number;
};
type CMSDateField = CMSBaseField & {
    type: 'date';
    default?: string;
};
type CMSSlugField = CMSBaseField & {
    type: 'slug';
    from: string;
};
type CMSImageField = CMSBaseField & {
    type: 'image';
};
type CMSIconField = CMSBaseField & {
    type: 'icon';
};
type CMSColorField = CMSBaseField & {
    type: 'color';
    default?: CMSColorData;
};
type CMSColorData = `#${string}`;
type CMSSelectOption = {
    value: string;
    label: string;
};
type CMSSelectField = CMSBaseField & {
    type: 'select';
    options: CMSSelectOption[];
    defaultValue?: CMSSelectOption;
};
type CMSVideoField = CMSBaseField & {
    type: 'video';
};
type CMSObjectField = CMSBaseField & {
    type: 'object';
    schema: Record<string, CMSField>;
};
type CMSField = CMSTextField | CMSRichTextField | CMSNumberField | CMSDateField | CMSImageField | CMSVideoField | CMSSlugField | CMSIconField | CMSColorField | CMSSelectField | CMSObjectField;

type CMSPluginComponentProps = {
    field: CMSField;
    updateField: (value: any) => void;
};
type CMSPlugin = {
    name: string;
    enabledForFields: CMSField['type'][];
    component: React.ComponentType<CMSPluginComponentProps>;
    config: any;
    api?: {
        method: 'GET' | 'POST';
        handler: (request: Request) => Promise<any>;
    };
};

type CMSCollection<Schema extends Record<string, CMSField>, SlugField extends keyof Schema = keyof Schema, NameField extends keyof Schema = keyof Schema> = {
    label: string;
    description?: string;
    slugField: SlugField;
    nameField?: NameField;
    schema: Schema;
};
type CMSSingleton<Schema extends Record<string, CMSField>> = {
    label: string;
    description?: string;
    schema: Schema;
};

type CMSConfig<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>> = {
    storage: 'database';
    collections: CMSCollections;
    singletons: CMSSingletons;
    plugins: CMSPlugin[];
};

declare function createDashboardLayout<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>>(config: CMSConfig<CMSCollections, CMSSingletons>): ({ children, params: { slug } }: {
    children: React.ReactNode;
    params: {
        slug?: string | undefined;
    };
}) => react_jsx_runtime.JSX.Element;

declare function createDashboardPage<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>>(config: CMSConfig<CMSCollections, CMSSingletons>): () => react_jsx_runtime.JSX.Element;

export { createDashboardLayout, createDashboardPage };
