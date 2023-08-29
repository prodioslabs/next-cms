import { DefaultSession } from 'next-auth';

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

declare function createPluginHandler(config: CMSConfig<any, any>): {
    GET: (request: Request, { params: { plugin } }: {
        params: {
            plugin: string;
        };
    }) => Promise<any>;
    POST: (request: Request, { params: { plugin } }: {
        params: {
            plugin: string;
        };
    }) => Promise<any>;
};

declare function createTRPCHandler(config: CMSConfig<any, any>): (request: Request) => Promise<Response>;

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
        } & DefaultSession['user'];
    }
}
declare const authHandler: any;

declare function uploadAssetHandler(request: Request): Promise<Response>;

export { authHandler, createPluginHandler, createTRPCHandler, uploadAssetHandler };
