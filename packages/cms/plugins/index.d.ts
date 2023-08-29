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

declare function createAIContentPlugin(config: any): CMSPlugin;

declare function createUnsplashPlugin(config: any): CMSPlugin;

export { createAIContentPlugin, createUnsplashPlugin };
