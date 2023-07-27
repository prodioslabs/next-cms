import MultiInputField, { MultiInputFieldProps } from '../multi-input-field'
import SingleInputField, { SingleInputFieldProps } from '../single-input-field'

type InputFieldProps = (MultiInputFieldProps & { type: 'multiple' }) | (SingleInputFieldProps & { type: 'single' })

export default function InputField(props: InputFieldProps) {
  if (props.type === 'multiple') {
    return <MultiInputField {...props} />
  } else {
    return <SingleInputField {...props} />
  }
}
