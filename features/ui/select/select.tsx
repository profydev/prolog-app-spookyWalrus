import { useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import styles from "./select.module.scss";
import CheckIcon from "public/icons/check-md.svg";
import UserIcon from "public/icons/user-select.svg";
import ChevDown from "public/icons/chevron-down.svg";

// const options = [
//   {
//     value: "Monsterous Engine",
//     item: "Monsterous Engine",
//     // icon: "./icons/user-select.svg",
//   },
//   {
//     value: "Love Pudding",
//     item: "Love Pudding",
//     // icon: "./icons/user-select.svg",
//   },
//   {
//     value: "Purple Headed Warrior",
//     item: "Purple Headed Warrior",
//     icon: "./icons/user-select.svg",
//   },
// ];

type MenuItem = { id: number; value: string; item: string };

interface SelectProps {
  label: string;
  hint: string;
  errorMess: string;
  isError: boolean;
  isIcon: boolean;
  isDisabled: boolean;
  className: string;
  onChange: (value: string) => void;
  menuList: MenuItem[];
  placeholder: string;
  // setListType: (value: string) => void;
}

const Select = ({
  label = "Label goes here",
  hint,
  errorMess,
  isError,
  isIcon,
  isDisabled,
  onChange,
  menuList,
  placeholder,
}: SelectProps) => {
  const [selectedItem, setSelectedItem] = useState("");
  // const [menuSelect, setMenuSelect] = useState("");

  function menuStyles() {
    if (selectedItem === "") {
      if (isDisabled && isError) {
        return classNames(
          styles.menuButton,
          styles.menuDefault,
          styles.disablError,
        );
      }
      if (isDisabled) {
        return classNames(
          styles.menuButton,
          styles.menuDefault,
          styles.disabled,
        );
      }
      if (isError) {
        return classNames(
          styles.menuButton,
          styles.menuDefault,
          styles.isError,
        );
      }
      return classNames(styles.menuButton, styles.menuDefault);
    } else if (isDisabled) {
      return classNames(styles.menuButton, styles.disabled);
    } else if (isError) {
      return classNames(styles.menuButton, styles.isError, styles.menuChev);
    }
    return classNames(styles.menuButton, styles.menuChev);
  }

  // if (onchange) {
  // onchange(selectedItem);
  // }

  function setOnchangeling(value: string) {
    // console.log("setOnchangeling: ", value);
    setSelectedItem(value);
    onChange(value);
  }

  return (
    <div>
      <div className={styles.outerLabel}>{label}</div>
      <div className={styles.menuBox}>
        <Listbox
          value={selectedItem}
          onChange={setOnchangeling}
          as={Fragment}
          disabled={isDisabled}
        >
          <Listbox.Button className={menuStyles}>
            <div className={styles.buttonBits}>
              {isIcon && <Image src={UserIcon} alt={UserIcon} />}
              {selectedItem || placeholder}
            </div>
            <Image src={ChevDown} alt={ChevDown} className={styles.menuChev} />
          </Listbox.Button>
          <Listbox.Options className={styles.menu}>
            {menuList.map((data) => (
              <Listbox.Option key={data.id} value={data.value} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`${styles.listItems} ${
                      active ? styles.listActive : ""
                    }`}
                  >
                    <div className={styles.listDiv}>
                      {isIcon && <Image src={UserIcon} alt={UserIcon} />}
                      {data.item}
                    </div>
                    {selected && <Image src={CheckIcon} alt={CheckIcon} />}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <span className={isError ? styles.hideHint : styles.hint}>{hint}</span>
        <span className={isError ? styles.error : styles.hideError}>
          {errorMess}
        </span>
      </div>
    </div>
  );
};

export default Select;
