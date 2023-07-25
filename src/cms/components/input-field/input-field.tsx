import MultiInputField, { MultiInputFieldProps } from '../multi-input-field'
import SingleInputField, { SingleInputFieldProps } from '../single-input-field'

type InputFieldProps<DataType extends any> =
  | (MultiInputFieldProps<DataType> & { type: 'multiple' })
  | (SingleInputFieldProps<DataType> & { type: 'single' })

export default function InputField<DataType extends any>(props: InputFieldProps<DataType>) {
  if (props.type === 'multiple') {
    return <MultiInputField {...props} />
  } else {
    return <SingleInputField {...props} />
  }
}
