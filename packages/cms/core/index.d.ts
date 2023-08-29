import * as _prisma_client_runtime_library from '@prisma/client/runtime/library';
import * as _prisma_client from '@prisma/client';
import { PrismaClient } from '@prisma/client';

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

declare function createCMSConfig<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>>({ collections, singletons, plugins, }: {
    collections: CMSCollections;
    singletons: CMSSingletons;
    plugins?: CMSPlugin[];
}): CMSConfig<CMSCollections, CMSSingletons>;

declare function bootstrap<CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>, CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>>(config: CMSConfig<CMSCollections, CMSSingletons>): Promise<void>;

/**
 * Update data of a particular collection element
 *
 * @param collection collection to be updated
 * @param elementId id of the collection item to be updated
 * @param data data to be updated
 * @returns updated collection element
 */
declare function updateCollectionElementData<_Collection extends CMSCollection<Record<string, CMSField>>>(collection: _Collection, elementId: string, data: any, db?: PrismaClient): Promise<{
    id: string;
    mode: _prisma_client.$Enums.DataMode;
    data: _prisma_client.Prisma.JsonValue;
    slug: string;
    collectionId: string;
}>;
/**
 * Update data of a particular collection element
 *
 * @param collection collection to be updated
 * @param id id of the collection item to be updated
 * @param data data to be updated
 * @returns updated collection element
 */
declare function createCollectionElement<_Collection extends CMSCollection<Record<string, CMSField>>>(collection: _Collection, collectionName: string, data: any, db?: PrismaClient): Promise<{
    id: string;
    mode: _prisma_client.$Enums.DataMode;
    data: _prisma_client.Prisma.JsonValue;
    slug: string;
    collectionId: string;
}>;
/**
 * Fetch all the collection elements for a particular collection. This also validates the data of all the collection items
 * and if the data is not valid, it fixes the data and updates the collection item.
 *
 * @param collection collection to be fetched
 * @param collectionName name of the collection
 * @returns list of all the elements of the collection
 */
declare function fetchCollectionElements<_Collection extends CMSCollection<Record<string, CMSField>>>(collection: _Collection, collectionName: string, db?: PrismaClient): Promise<{
    id: string;
    mode: _prisma_client.$Enums.DataMode;
    data: _prisma_client.Prisma.JsonValue;
    slug: string;
    collectionId: string;
}[]>;
/**
 * Fetch a particular collection element by id. This also validates the data of the collection
 * and if the data is not valid, it fixes the data and updates the collection item.
 *
 * @param collection collection whose collection item is to fetched
 * @param elementId id of the collection item to be fetched
 * @returns collection item
 */
declare function fetchCollectionElementById<_Collection extends CMSCollection<Record<string, CMSField>>>(collection: _Collection, elementId: string, db?: PrismaClient): Promise<{
    id: string;
    mode: _prisma_client.$Enums.DataMode;
    data: _prisma_client.Prisma.JsonValue;
    slug: string;
    collectionId: string;
}>;
/**
 * Fetch a particular collection element by slug. This also validates the data of the collection
 * and if the data is not valid, it fixes the data and updates the collection item.
 *
 * @param collection collection whose collection item is to fetched
 * @param collectionName name of the collection
 * @param elementSlug slug of the collection item to be fetched
 * @returns collection element
 */
declare function fetchCollectionElementBySlug<_Collection extends CMSCollection<Record<string, CMSField>>>(collection: _Collection, collectionName: string, elementSlug: string, db?: PrismaClient): Promise<{
    id: string;
    mode: _prisma_client.$Enums.DataMode;
    data: _prisma_client.Prisma.JsonValue;
    slug: string;
    collectionId: string;
}>;
declare function deleteCollectionElement(elementId: string, db?: PrismaClient): _prisma_client.Prisma.Prisma__CollectionElementClient<{
    id: string;
    mode: _prisma_client.$Enums.DataMode;
    data: _prisma_client.Prisma.JsonValue;
    slug: string;
    collectionId: string;
}, never, _prisma_client_runtime_library.DefaultArgs>;
/**
 * Update data of a particular singleton
 *
 * @param singleton singleton to be updated
 * @param singletonName name of the singleton
 * @param data data to be updated
 * @returns single data
 */
declare function createSingleton<_Singleton extends CMSSingleton<Record<string, CMSField>>>(singleton: _Singleton, singletonName: string, data: any, db?: PrismaClient): Promise<{
    id: string;
    label: string;
    name: string;
    schema: _prisma_client.Prisma.JsonValue;
    data: _prisma_client.Prisma.JsonValue;
}>;
/**
 * Update data of a particular singleton
 *
 * @param singleton singleton to be updated
 * @param singletonName name of the singleton
 * @param data data to be updated
 * @returns single data
 */
declare function updateSingleton<_Singleton extends CMSSingleton<Record<string, CMSField>>>(singleton: _Singleton, singletonName: string, data: any, db?: PrismaClient): Promise<{
    id: string;
    label: string;
    name: string;
    schema: _prisma_client.Prisma.JsonValue;
    data: _prisma_client.Prisma.JsonValue;
}>;
/**
 * Fetch data of a particular singleton. This also validates the data of the singleton
 * and if the data is not valid, it fixes the data and updates the singleton.
 *
 * @param singleton singleton to be fetched
 * @param singletonName singleton name
 * @param createDummyDataIfNotPresent create dummy data if the data for singleton is not present
 * @returns singleton
 */
declare function fetchSingleton<_Singleton extends CMSSingleton<Record<string, CMSField>>>(singleton: _Singleton, singletonName: string, db?: PrismaClient): Promise<{
    id: string;
    label: string;
    name: string;
    schema: _prisma_client.Prisma.JsonValue;
    data: _prisma_client.Prisma.JsonValue;
}>;

export { bootstrap, createCMSConfig, createCollectionElement, createSingleton, deleteCollectionElement, fetchCollectionElementById, fetchCollectionElementBySlug, fetchCollectionElements, fetchSingleton, updateCollectionElementData, updateSingleton };
