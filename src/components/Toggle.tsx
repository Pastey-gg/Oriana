import ToggleOneSVG from "~/svgs/ToggleOne";
import "../styles/toggle.scss";
import type { Component } from "solid-js";
import ToggleTwoSVG from "~/svgs/ToggleTwo";

interface Props {
  checked: boolean;
  ontoggle: (value: boolean) => void;
}

const ToggleSwitch: Component<Props> = (props: Props) => {
  const checked = () => props.checked;

  const doToggle = () => {
    props.ontoggle(!checked());
  };

  return (
    <label class="switch">
      <input type="checkbox" checked={checked()} onchange={doToggle} />

      <div class="slider">
        <div class="circle">
          <ToggleOneSVG />
          <ToggleTwoSVG />
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
