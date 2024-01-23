import React, { useState } from "react";
import Select, { OptionProps, SingleValueProps } from "react-select";
import Image from "next/image";
import styles from "./select.module.scss";
// import check from "./icons/check.svg";
import check from "/public/icons/check-md.svg";

interface DaProps {
  label?: string;
  className?: string;
  onChange?: () => void;
  showIcon: boolean;
  isError?: boolean;
  hint?: string;
  errorMess?: string;
  isFocused?: boolean;
  isDisabled?: boolean;
}

type OptionType = {
  value: string;
  item: string;
  icon: string;
};

const options = [
  {
    value: "Monsterous Engine",
    item: "Monsterous Engine",
    icon: "./icons/user-select.svg",
  },
  {
    value: "Love Pudding",
    item: "Love Pudding",
    icon: "./icons/user-select.svg",
  },
  {
    value: "Purple Headed Warrior",
    item: "Purple Headed Warrior",
    icon: "./icons/user-select.svg",
  },
];

interface CustomOptionProps extends OptionProps<OptionType, false> {
  showIcon: boolean;
}

const CustomOption = (props: CustomOptionProps) => {
  const { data, isSelected, ...rest } = props;
  if (!data) {
    return null;
  }

  return (
    <div
      className={styles.content}
      {...rest.innerProps}
      style={{
        backgroundColor: isSelected ? "#FCFAFF" : "#fff",
      }}
    >
      {props.showIcon && (
        <img src={data?.icon} alt={data?.item} className="icon" />
      )}
      <div className="menuSelect">{data?.item}</div>
      <div className={isSelected ? "checkMarkIcon" : ""}>
        {isSelected && <Image src={check} alt="checked" />}
      </div>
    </div>
  );
};

interface CustomSingleValueProps extends SingleValueProps<OptionType, false> {
  showIcon: boolean;
}
const CustomSingleValue = (props: CustomSingleValueProps) => {
  const { data, ...rest } = props;
  // const { data, showIcon, ...rest } = props;
  if (!data) {
    return null;
  }

  return (
    <div className={styles.content} {...rest.innerProps}>
      {props.showIcon && <img src={data?.icon} alt={data?.item} />}
      {data?.item}
    </div>
  );
};

const CustomSelect = ({
  label,
  showIcon,
  isError,
  isDisabled,
  hint,
  errorMess,
}: DaProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const handleSelectChange = (newValue: OptionType | null) => {
    setSelectedOption(newValue);
  };

  type CheckYourState = {
    isFocused: boolean;
    isDisabled: boolean;
    isError?: boolean;
    menuIsOpen?: boolean;
  };
  const getColorScheme = (state: CheckYourState) => {
    if (state.isError) {
      if (state.menuIsOpen) {
        return {
          borderColor: "#FDA29B",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 0px 4px #FEE4E2",
          "&:hover": {
            boxShadow: "0px 0px 0px 4px #FEE4E2",
            borderColor: "#FDA29B",
          },
        };
      } else {
        return {
          borderColor: "#FDA29B",
          backgroundColor: "#fff",
          "&:hover": {
            boxShadow: "0px 0px 0px 4px #FEE4E2",
            borderColor: "#FDA29B",
          },
        };
      }
    } else {
      switch (true) {
        case state.menuIsOpen:
          return {
            borderColor: "#D6BBFB",
            backgroundColor: "#fff",
            color: "#101828",
            boxShadow: "0px 0px 0px 4px #F4EBFF",
            "&:hover": {
              boxShadow: "0px 0px 0px 4px #F4EBFF",
              borderColor: "#D6BBFB",
            },
          };
        case state.isFocused:
          return {
            borderColor: "#D6BBFB",
            backgroundColor: "#fff",
            boxShadow: "0px 0px 0px 4px #F4EBFF",
            color: "#101828",
            "&:hover": {
              boxShadow: "0px 0px 0px 4px #F4EBFF",
              borderColor: "#D6BBFB",
            },
          };
        case state.isDisabled:
          return {
            borderColor: "#D0D5DD",
            backgroundColor: "#F9FAFB",
            color: "#667085",
            "&:hover": { boxShadow: "none" },
          };
        default:
          return {
            borderColor: "#D0D5DD",
            backgroundColor: "#fff",
            "&:hover": {
              boxShadow: "0px 0px 0px 4px #F4EBFF",
              borderColor: "#D6BBFB",
            },
          };
      }
    }
  };

  return (
    <div className={styles.box}>
      <label className="outerLabel">
        {label}
        <Select
          value={selectedOption}
          placeholder={"Select an item"}
          onChange={handleSelectChange}
          options={options}
          isDisabled={isDisabled}
          components={{
            Option: (props) => <CustomOption {...props} showIcon={showIcon} />,
            SingleValue: (props) => (
              <CustomSingleValue {...props} showIcon={showIcon} />
            ),
          }}
          styles={{
            control: (baseStyles, state) => {
              const colorScheme = getColorScheme({ ...state, isError });
              return {
                ...baseStyles,
                borderColor: colorScheme.borderColor,
                backgroundColor: colorScheme.backgroundColor,
                boxShadow: colorScheme.boxShadow,
                "&:hover": colorScheme["&:hover"],
                cursor: "not allowed",
                isSearchable: false,
                borderRadius: "12px",
                padding: "10px 14px",
                width: "320px",
                height: "44px",
              };
            },
            valueContainer: (provided) => ({
              ...provided,
              display: "inline",
              input: "none",
              padding: "0px",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: "none",
            }),
            indicatorsContainer: (baseStyles) => ({
              ...baseStyles,
              padding: "0px 8px 8px 8px",
            }),
            menuList: (baseStyles) => ({
              ...baseStyles,
              padding: "4px 14px 4px 14px",
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              display: "inline-flex",
              width: "0px",
              height: "0px",
            }),
          }}
        />
        <span className={isError ? styles.hideHint : styles.hint}>{hint}</span>
        <span className={isError ? styles.error : styles.hideError}>
          {errorMess}
        </span>
      </label>
    </div>
  );
};

export default CustomSelect;
