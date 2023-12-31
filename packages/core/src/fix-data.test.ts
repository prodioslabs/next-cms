import { test, assert, expect } from 'vitest'
import { CMSField } from './types/field'
import { getValidationSchemaForSchema } from './validation'
import { fixData } from './fix-data'

type Schema = Record<string, CMSField>

test('should fix single string data', () => {
  const schema = {
    singleField: {
      type: 'text',
      label: 'Single Field',
      multiple: false,
      required: true,
    },
  } satisfies Schema

  const data = {
    singleField: undefined,
  }

  const validatonSchema = getValidationSchemaForSchema(schema)
  const result = validatonSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(typeof fixedData.singleField === 'string', 'data should be fixed')
})

test('should fix multiple string data when not present', () => {
  const schema = {
    multiField: {
      type: 'text',
      label: 'Multi Field',
      multiple: true,
      required: true,
    },
  } satisfies Schema

  const data = {}

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(Array.isArray(fixedData.multiField), 'data should be fixed')
  assert(fixedData.multiField.length === 1, 'multifield should be an array with atleast one item')
  assert(typeof fixedData.multiField[0] === 'string', 'the first element of the array should be string')
})

test('should fix single data when the data is invalid', () => {
  const schema = {
    singleField: {
      type: 'text',
      label: 'Single Field',
      required: true,
    },
  } satisfies Schema

  const data = {
    singleField: ['invalid data'],
  }

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(typeof fixedData.singleField === 'string', 'data should be fixed')
})

test('should fix multiple string data when the data is invalid', () => {
  const schema = {
    multiField: {
      type: 'text',
      label: 'Multi Field',
      multiple: true,
      required: true,
    },
  } satisfies Schema

  const data = {
    multiField: 'invalid data',
  }

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(Array.isArray(fixedData.multiField), 'data should be fixed')
  assert(fixedData.multiField.length === 1, 'multifield should be an array with atleast one item')
  assert(typeof fixedData.multiField[0] === 'string', 'the first element of the array should be string')
})

test('should fix multiple string data when a particular element of the field is invalid', () => {
  const schema = {
    multiField: {
      type: 'text',
      label: 'Multi Field',
      multiple: true,
      required: true,
    },
  } satisfies Schema

  const data = {
    multiField: ['correct data', 3, 'correct data'],
  }

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(Array.isArray(fixedData.multiField), 'data should be fixed')
  assert(fixedData.multiField.length === 3, 'multifield should be an array with atleast one item')
  assert(typeof fixedData.multiField[1] === 'string', 'invalid element of the array should be string')
})

test('should fix image data when not present', () => {
  const schema = {
    imageField: {
      type: 'image',
      label: 'Image Field',
      required: true,
    },
  } satisfies Schema

  const data = {}

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(typeof fixedData.imageField === 'object', 'data should be fixed')
  assert(typeof fixedData.imageField.url === 'string', 'imageField.url should be string')
  assert(typeof fixedData.imageField.metadata.width === 'number', 'imageField.width should be number')
  assert(typeof fixedData.imageField.metadata.height === 'number', 'imageField.height should be number')
})

test('should fix image data when the data is invalid', () => {
  const schema = {
    imageField: {
      type: 'image',
      label: 'Image Field',
      required: true,
    },
  } satisfies Schema

  const data = {
    imageField: ['invalid data'],
  }

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(typeof fixedData.imageField === 'object', 'data should be fixed')
  assert(typeof fixedData.imageField.url === 'string', 'imageField.url should be string')
  assert(typeof fixedData.imageField.metadata.width === 'number', 'imageField.width should be number')
  assert(typeof fixedData.imageField.metadata.height === 'number', 'imageField.height should be number')
})

test('should fix multiple image data when the data is invalid', () => {
  const schema = {
    imageField: {
      type: 'image',
      label: 'Image Field',
      required: true,
      multiple: true,
    },
  } satisfies Schema

  const data = {
    imageField: ['invalid data'],
  }

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)
  assert(Array.isArray(fixedData.imageField), 'data should be fixed')
  assert(typeof fixedData.imageField[0] === 'object', 'data should be fixed')
  assert(typeof fixedData.imageField[0].url === 'string', 'imageField.url should be string')
  assert(typeof fixedData.imageField[0].metadata.width === 'number', 'imageField.width should be number')
  assert(typeof fixedData.imageField[0].metadata.height === 'number', 'imageField.height should be number')
})

test('should fix multiple image data when a particular element of the field is invalid', () => {
  const schema = {
    imageField: {
      type: 'image',
      label: 'Image Field',
      required: true,
      multiple: true,
    },
  } satisfies Schema

  const data = {
    imageField: [
      {
        url: '/path/to/image',
        width: 120,
        height: 120,
      },
      'invalid data',
      {
        url: '/path/to/image',
        width: 120,
      },
    ],
  }

  const validationSchema = getValidationSchemaForSchema(schema)
  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')
  const fixedData = fixData(schema, data, result.error)

  assert(Array.isArray(fixedData.imageField), 'data should be fixed')
  assert(fixedData.imageField.length === 3, 'data should be of correct element')

  assert(typeof fixedData.imageField[1] === 'object', 'data should be fixed')
  assert(typeof fixedData.imageField[1].url === 'string', 'imageField.url should be string')
  assert(typeof fixedData.imageField[1].metadata.width === 'number', 'imageField.width should be number')
  assert(typeof fixedData.imageField[1].metadata.height === 'number', 'imageField.height should be number')
  assert(typeof fixedData.imageField[2] === 'object', 'data should be fixed')
  assert(typeof fixedData.imageField[2].url === 'string', 'imageField.url should be string')
  assert(typeof fixedData.imageField[2].metadata.width === 'number', 'imageField.width should be number')
  assert(typeof fixedData.imageField[2].metadata.height === 'number', 'imageField.height should be number')
})

test('should fix object data when not present', () => {
  const schema = {
    objectField: {
      type: 'object',
      label: 'Object Field',
      required: true,
      schema: {
        stringField: {
          type: 'text',
          label: 'String Field',
          required: true,
        },
        imageField: {
          type: 'image',
          label: 'Image Field',
          required: true,
        },
      },
    },
  } satisfies Schema

  const data = {
    objectField: undefined,
  }

  const validationSchema = getValidationSchemaForSchema(schema)

  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')

  const fixedData = fixData(schema, data, result.error)
  assert(typeof fixedData.objectField === 'object', 'fixedData.objectField should of type object')
  assert(
    typeof fixedData.objectField.stringField === 'string',
    'fixedData.objectField.stringField should of type string',
  )
  assert(typeof fixedData.objectField.imageField === 'object', 'fixedData.objectField.imageField should of type object')
  assert(
    typeof fixedData.objectField.imageField.url === 'string',
    'fixedData.objectField.imageField.url should of type string',
  )
})

test('should fix object data when partial data is present', () => {
  const schema = {
    objectField: {
      type: 'object',
      label: 'Object Field',
      required: true,
      schema: {
        stringField: {
          type: 'text',
          label: 'String Field',
          required: true,
        },
        imageField: {
          type: 'image',
          label: 'Image Field',
          required: true,
        },
      },
    },
  } satisfies Schema

  const data = {
    objectField: {
      stringField: 'String Field Data',
    },
  }

  const validationSchema = getValidationSchemaForSchema(schema)

  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')

  const fixedData = fixData(schema, data, result.error)

  assert(typeof fixedData.objectField === 'object', 'fixedData.objectField should of type object')
  expect(fixedData.objectField.stringField).toEqual(data.objectField.stringField)
  assert(typeof fixedData.objectField.imageField === 'object', 'fixedData.objectField.imageField should of type object')
  assert(
    typeof fixedData.objectField.imageField.url === 'string',
    'fixedData.objectField.imageField.url should of type string',
  )
})

test('should fix multiple object data when data is not present', () => {
  const schema = {
    objectField: {
      type: 'object',
      label: 'Object Field',
      required: true,
      multiple: true,
      schema: {
        stringField: {
          type: 'text',
          label: 'String Field',
          required: true,
        },
        imageField: {
          type: 'image',
          label: 'Image Field',
          required: true,
        },
      },
    },
  } satisfies Schema

  const data = {}

  const validationSchema = getValidationSchemaForSchema(schema)

  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')

  const fixedData = fixData(schema, data, result.error)

  assert(Array.isArray(fixedData.objectField), 'fixedData.objectField should be an array')
  assert(
    typeof fixedData.objectField[0].imageField === 'object',
    'fixedData.objectField.imageField should of type object',
  )
  assert(
    typeof fixedData.objectField[0].imageField.url === 'string',
    'fixedData.objectField.imageField.url should of type string',
  )
})

test('should fix multiple object data when partial data is present', () => {
  const schema = {
    objectField: {
      type: 'object',
      label: 'Object Field',
      required: true,
      multiple: true,
      schema: {
        stringField: {
          type: 'text',
          label: 'String Field',
          required: true,
        },
        imageField: {
          type: 'image',
          label: 'Image Field',
          required: true,
        },
      },
    },
  } satisfies Schema

  const data = {
    objectField: [
      {
        stringField: 'String Field Data',
        imageField: {
          url: '/path/to/image',
          height: 120,
        },
      },
      {
        stringField: 'String Field Data',
      },
    ],
  }

  const validationSchema = getValidationSchemaForSchema(schema)

  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')

  const fixedData = fixData(schema, data, result.error)

  assert(Array.isArray(fixedData.objectField), 'fixedData.objectField should be an array')
  expect(data.objectField[0].stringField).toEqual(fixedData.objectField[0].stringField)
  assert(
    typeof fixedData.objectField[0].imageField === 'object',
    'fixedData.objectField.imageField should of type object',
  )
  assert(
    typeof fixedData.objectField[0].imageField.url === 'string',
    'fixedData.objectField.imageField.url should of type string',
  )
  assert(
    typeof fixedData.objectField[0].imageField.metadata.width === 'number',
    'fixedData.objectField.imageField.width should of type number',
  )

  expect(data.objectField[1].stringField).toEqual(fixedData.objectField[1].stringField)
  assert(
    typeof fixedData.objectField[1].imageField === 'object',
    'fixedData.objectField.imageField should of type object',
  )
  assert(
    typeof fixedData.objectField[1].imageField.url === 'string',
    'fixedData.objectField.imageField.url should of type string',
  )
})

test('should fix multiple deeply nested object data when partial data is present', () => {
  const schema = {
    objectField: {
      type: 'object',
      label: 'Object Field',
      required: true,
      multiple: true,
      schema: {
        nestedObjectField: {
          type: 'object',
          label: 'Nexted Object Field',
          multiple: true,
          required: true,
          schema: {
            stringField: {
              type: 'text',
              label: 'String Field',
              required: true,
            },
            imageField: {
              type: 'image',
              label: 'Image Field',
              required: true,
            },
          },
        },
      },
    },
  } satisfies Schema

  const data = {
    objectField: [
      {
        nestedObjectField: [
          {
            stringField: 'String Field Data',
            imageField: {
              url: '/path/to/image',
              height: 120,
            },
          },
          {
            stringField: 'String Field Data',
          },
        ],
      },
    ],
  }

  const validationSchema = getValidationSchemaForSchema(schema)

  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')

  const fixedData = fixData(schema, data, result.error)

  assert(Array.isArray(fixedData.objectField), 'fixedData.objectField should be an array')
  expect(data.objectField[0].nestedObjectField[0].stringField).toEqual(
    fixedData.objectField[0].nestedObjectField[0].stringField,
  )

  assert(
    typeof fixedData.objectField[0].nestedObjectField[0].imageField === 'object',
    'fixedData.objectField.imageField should of type object',
  )
  assert(
    typeof fixedData.objectField[0].nestedObjectField[0].imageField.url === 'string',
    'fixedData.objectField.imageField.url should of type string',
  )
  assert(
    typeof fixedData.objectField[0].nestedObjectField[0].imageField.metadata.width === 'number',
    'fixedData.objectField.imageField.width should of type number',
  )

  expect(data.objectField[0].nestedObjectField[1].stringField).toEqual(
    fixedData.objectField[0].nestedObjectField[1].stringField,
  )
  assert(
    typeof fixedData.objectField[0].nestedObjectField[1].imageField === 'object',
    'fixedData.objectField.imageField should of type object',
  )
  assert(
    typeof fixedData.objectField[0].nestedObjectField[1].imageField.url === 'string',
    'fixedData.objectField.imageField.url should of type string',
  )
})

test('should fix object data when string data is present', () => {
  const schema = {
    objectField: {
      label: 'Object Field',
      type: 'object',
      required: true,
      multiple: true,
      schema: {
        stringField: {
          label: 'String Field',
          type: 'text',
        },
      },
    },
  } satisfies Schema

  const data = { objectField: ['invalid data'] }

  const validationSchema = getValidationSchemaForSchema(schema)

  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')

  const fixedData = fixData(schema, data, result.error)
  assert(typeof fixedData.objectField[0] === 'object', 'fixedData.objectField should of type object')
  assert(
    typeof fixedData.objectField[0].stringField === 'string',
    'fixedData.objectField.stringField should of type string',
  )
})

test('should fix object data when invalid object data is present', () => {
  const schema = {
    objectField: {
      label: 'Object Field',
      type: 'object',
      required: true,
      multiple: true,
      schema: {
        stringField: {
          label: 'String Field',
          type: 'text',
          required: true,
        },
      },
    },
  } satisfies Schema

  const data = { objectField: [{ invalidField: 'invalidData' }] }

  const validationSchema = getValidationSchemaForSchema(schema)

  const result = validationSchema.safeParse(data)
  assert(result.success === false, 'data should be invalid')

  const fixedData = fixData(schema, data, result.error)
  assert(typeof fixedData.objectField[0] === 'object', 'fixedData.objectField should of type object')
  assert(
    typeof fixedData.objectField[0].stringField === 'string',
    'fixedData.objectField.stringField should of type string',
  )
})
