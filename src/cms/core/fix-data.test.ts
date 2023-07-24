import { describe, test, assert } from 'vitest'
import { CMSField } from '../types/field'
import { getValidationSchemaForSchema } from './validation'
import { fixData } from './fix-data'

type Schema = Record<string, CMSField>

describe('fix-data', () => {
  test('should fix single string data', () => {
    const schema = {
      singleField: {
        type: 'text',
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
    assert(typeof fixedData.imageField.width === 'number', 'imageField.width should be number')
    assert(typeof fixedData.imageField.height === 'number', 'imageField.height should be number')
  })

  test('should fix image data when the data is invalid', () => {
    const schema = {
      imageField: {
        type: 'image',
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
    assert(typeof fixedData.imageField.width === 'number', 'imageField.width should be number')
    assert(typeof fixedData.imageField.height === 'number', 'imageField.height should be number')
  })

  test('should fix multiple image data when the data is invalid', () => {
    const schema = {
      imageField: {
        type: 'image',
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
    assert(typeof fixedData.imageField[0].width === 'number', 'imageField.width should be number')
    assert(typeof fixedData.imageField[0].height === 'number', 'imageField.height should be number')
  })

  test('should fix multiple image data when a particular element of the field is invalid', () => {
    const schema = {
      imageField: {
        type: 'image',
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
    assert(typeof fixedData.imageField[1].width === 'number', 'imageField.width should be number')
    assert(typeof fixedData.imageField[1].height === 'number', 'imageField.height should be number')

    assert(typeof fixedData.imageField[2] === 'object', 'data should be fixed')
    assert(typeof fixedData.imageField[2].url === 'string', 'imageField.url should be string')
    assert(typeof fixedData.imageField[2].width === 'number', 'imageField.width should be number')
    assert(typeof fixedData.imageField[2].height === 'number', 'imageField.height should be number')
  })
})
