import { useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import styles from "./select.module.scss";
import CheckIcon from "./icons/check.svg";
import UserIcon from "./icons/user-select.svg";
import ChevDown from "./icons/chevron-down.svg";

type MenuItem = { id: number; value: string | boolean; item: string };

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
  const [selectedItem, setSelectedItem] = useState<string | boolean>(false);

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
