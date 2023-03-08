const SliderInput = ({
  label = "unnamed",
  unit = "no unit",
  step = 1,
  min = 0,
  max = 100,
  onChange = () => {
    console.log(
      "Please include an onChange action.",
      "label: " + label,
      "step: " + step,
      "min: " + min,
      "max: " + max
    );
  },
}) => {
  return (
    <div className="input_container">
      <label>{label}</label>
      <input onChange={onChange} type="range" step={step} min={min} max={max} />
      <label className="unit">{unit}</label>
    </div>
  );
};
export default SliderInput;
