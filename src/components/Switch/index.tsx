import { type SwitchProps } from "../../libs/types";

export const Switch = ({
  isOn,
  handleToggle,
  colorOne,
  colorTwo,
}: SwitchProps) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor={`switch`}
      >
        <span className={`switch-button`} />
      </label>
    </>
  );
};
