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
type CMSImageData = {
    url: string;
    width: number;
    height: number;
};
type CMSIconField = CMSBaseField & {
    type: 'icon';
};
type CMSIconData = {
    name: string;
    iconLib: 'lucide';
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
type CMSObjectData<F extends CMSObjectField> = {
    [Key in keyof F['schema']]: CMSFieldDataType<F['schema'][Key]>;
};
type CMSField = CMSTextField | CMSRichTextField | CMSNumberField | CMSDateField | CMSImageField | CMSVideoField | CMSSlugField | CMSIconField | CMSColorField | CMSSelectField | CMSObjectField;
type FieldDataTypeOnFieldType<F extends CMSField> = F extends CMSTextField ? string : F extends CMSRichTextField ? string : F extends CMSNumberField ? number : F extends CMSDateField ? string : F extends CMSImageField ? CMSImageData : F extends CMSVideoField ? string : F extends CMSSlugField ? string : F extends CMSIconField ? CMSIconData : F extends CMSColorField ? CMSColorData : F extends CMSSelectField ? CMSSelectOption : F extends CMSObjectField ? CMSObjectData<F> : never;
type FieldDataTypeOnMultiple<F extends CMSField> = F['multiple'] extends true ? FieldDataTypeOnFieldType<F>[] : FieldDataTypeOnFieldType<F>;
type FieldDataTypeOnRequired<F extends CMSField> = F['required'] extends true ? FieldDataTypeOnMultiple<F> : FieldDataTypeOnMultiple<F> | undefined;
type CMSFieldDataType<F extends CMSField> = FieldDataTypeOnRequired<F>;

type CMSCollection<Schema extends Record<string, CMSField>, SlugField extends keyof Schema = keyof Schema, NameField extends keyof Schema = keyof Schema> = {
    label: string;
    description?: string;
    slugField: SlugField;
    nameField?: NameField;
    schema: Schema;
};
type CMSSchemaData<Schema extends Record<string, CMSField>> = {
    [Key in keyof Schema]: CMSFieldDataType<Schema[Key]>;
};
type CMSCollectionData<_Collection extends CMSCollection<Record<string, CMSField>>> = CMSSchemaData<_Collection['schema']>;
type CMSSingleton<Schema extends Record<string, CMSField>> = {
    label: string;
    description?: string;
    schema: Schema;
};
type CMSSingletonData<_Singleton extends CMSSingleton<Record<string, CMSField>>> = CMSSchemaData<_Singleton['schema']>;

type CollectionReaderProps<_Collection extends CMSCollection<Record<string, CMSField>>> = ({
    type: 'list';
} & CollectionListReaderProps<_Collection>) | ({
    type: 'element';
} & CollectionElementReaderProps<_Collection>);
type CollectionListReaderProps<_Collection extends CMSCollection<Record<string, CMSField>>> = {
    renderItems: (args: {
        items: {
            data: CMSCollectionData<_Collection>;
            id: string;
            elementSlug: string;
        }[];
    }) => React.ReactNode;
};
type CollectionElementReaderProps<_Collection extends CMSCollection<Record<string, CMSField>>> = {
    elementId?: string;
    elementSlug?: string;
    renderItem: (args: {
        data: CMSCollectionData<_Collection>;
        elementSlug: string;
        id: string;
    }) => React.ReactNode;
};
type SingletonReaderProps<_Singleton extends CMSSingleton<Record<string, CMSField>>> = {
    renderItem: (args: {
        data: CMSSingletonData<_Singleton>;
    }) => React.ReactNode;
};

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

type CMSConfig<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>> = {
    storage: 'database';
    collections: CMSCollections;
    singletons: CMSSingletons;
    plugins: CMSPlugin[];
};

declare function createCollectionReader<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>, CollectionName extends keyof CMSCollections = keyof CMSCollections>(config: CMSConfig<CMSCollections, CMSSingletons>, collectionName: CollectionName & string): {
    (props: CollectionReaderProps<CMSCollections[CollectionName]>): react_jsx_runtime.JSX.Element | null;
    displayName: string;
};
declare function createSingletonReader<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>, SingletonName extends keyof CMSSingletons = keyof CMSSingletons>(config: CMSConfig<CMSCollections, CMSSingletons>, singletonName: SingletonName & string): {
    ({ renderItem }: SingletonReaderProps<CMSSingletons[SingletonName]>): Promise<react_jsx_runtime.JSX.Element>;
    displayName: string;
};

export { createCollectionReader, createSingletonReader };
