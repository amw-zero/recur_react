interface TextInputProps {
  label: string;
  placeholder: string;
  field: any
}

export const TextInput = ({ field, label, placeholder }: TextInputProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" type="text" placeholder={placeholder} {...field}></input>
      </div>
    </div>
  );
}

export const NumberInput = ({ field, label, placeholder }: TextInputProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" type="number" placeholder={placeholder} {...field}></input>
      </div>
    </div>
  );
}