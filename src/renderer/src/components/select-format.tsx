import { Select } from './ui'

type SelectFormatProps = {
  value: string
  onChangeValue: (value: string) => void
  options: string[]
}

const SelectFormat = ({ value, onChangeValue, options }: SelectFormatProps) => {
  return (
    <Select value={value} onChange={(e) => onChangeValue(e.target.value)} className="font-medium">
      {options.map((option) => (
        <option key={option} value={option} className="font-medium">
          {option}
        </option>
      ))}
    </Select>
  )
}

export default SelectFormat
