import React, { useState } from "react";
import Select, {
  OptionProps,
  SingleValueProps,
  components,
  Props as SelectProps,
} from "react-select";
import { CSSObject } from "@emotion/react";
import { ControlProps } from "react-select/dist/declarations/src/components/Control";
import classNames from "classnames";
import styles from "./select.module.scss";
import Icon from "./icons/user-select.svg";

export enum Color {
  empty = "#D0D5DD",
  filled = "#D0D5DD",
  // focused = "#D6BBFB",
  focused = "#0cef6e",
  disabled = "#D0D5DD",
  open = "#0fe71a",
}

export enum BgColor {
  empty = "#FFF",
  filled = "#fff",
  focused = "#fff",
  disabled = "##F9FAFB",
  open = "#fff",
}

export enum Shadow {
  focused = "0px 0px 0px 4px #F4EBFF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  default = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
}
interface Props {
  label?: string;
  name?: string;
  color?: Color;
  background?: BgColor;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: () => void;
  showIcon: boolean;
  showError?: boolean;
  hint?: string;
  errorMess?: string;
  isFocused?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
  isMulti?: boolean;
  menuIsOpen?: boolean;
  hasValue?: boolean;
}

const options = [
  {
    value: "Monsterous Engine",
    label: "Monsterous Engine",
    icon: "./icons/user-select.svg",
  },
  {
    value: "Love Pudding",
    label: "Love Pudding",
    icon: "./icons/user-select.svg",
  },
  {
    value: "Purple Headed Warrior",
    label: "Purple Headed Warrior",
    icon: "./icons/user-select.svg",
  },
];

interface CustomOptionProps extends OptionProps<any, any> {
  data: OptionType | null;
  showIcon: boolean;
}

const CustomOption = (props: CustomOptionProps) => {
  const { data, ...rest } = props;
  return (
    <div className={styles.content} {...rest.innerProps}>
      {props.showIcon && <img src={data?.icon} alt={data?.label} />}
      {data?.label}
    </div>
  );
};

type OptionType = {
  label: string;
  value: string;
  icon: string;
};

interface CustomSingleValueProps extends SingleValueProps<any, any> {
  data: OptionType | null;
  showIcon: boolean;
}
const CustomSingleValue = (props: CustomSingleValueProps) => {
  const { data, ...rest } = props;
  return (
    <div className={styles.content} {...rest.innerProps}>
      {props.showIcon && <img src={data?.icon} alt={data?.label} />}
      {data?.label}
    </div>
  );
};

const CustomSelect = ({
  label,
  color = Color.empty,
  background = BgColor.empty,
  onChange,
  showIcon,
  showError,
  hint,
  errorMess,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [colorChoice, setColorChoice] = useState(null);

  const handleSelectChange = (newValue: any, actionMeta: any) => {
    if (newValue.hasOwnProperty("icon")) {
      setSelectedOption(newValue);
      console.log(actionMeta);
    } else {
      setColorChoice(newValue);
      console.log("color: ", newValue);
    }
  };

  return (
    <div className={styles.box}>
      <label>
        {label}
        <Select
          value={selectedOption}
          placeholder={"Select an item"}
          onChange={handleSelectChange}
          options={options}
          components={{
            Option: (props) => <CustomOption {...props} showIcon={showIcon} />,
            SingleValue: (props) => (
              <CustomSingleValue {...props} showIcon={showIcon} />
            ),
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "blue" : "red",

              boxShadow: state.isFocused ? Shadow.focused : Shadow.default,
              "&:hover": {
                borderColor: BgColor.empty,
                boxShadow: BgColor.empty,
              },
              cursor: "not allowed",
              isSearchable: false,
              borderRadius: "12px",
              display: "flex",
            }),
          }}
        />
        <span className={showError ? styles.hideHint : styles.hint}>
          {hint}
        </span>
        <span className={showError ? styles.error : styles.hideError}>
          {errorMess}
        </span>
      </label>
    </div>
  );
};

export default CustomSelect;
