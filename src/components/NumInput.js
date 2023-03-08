const NumInput = ({
  label = "unnamed",
  unit = "no unit",
  placeholder,
  onChange = () => {
    console.log(
      "Please include an onChange action.",
      "label: " + label,
      "unit: " + unit
    );
  },
}) => {
  return (
    <>
      <div className="input_container">
        <label>{label}</label>
        <input placeholder={placeholder} type="number" onChange={onChange} />
        <label className="unit">{unit}</label>
      </div>
    </>
  );
};
export default NumInput;
