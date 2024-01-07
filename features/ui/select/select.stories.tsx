import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import CustomSelect from "./select";
// import { Color, BgColor } from "./select";

const meta: Meta<typeof CustomSelect> = {
  component: CustomSelect,
  title: "Dropdown Select",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    viewMode: "docs",
  },
};
export default meta;

const Template: StoryFn<typeof CustomSelect> = ({ ...args }) => (
  <CustomSelect {...args} />
);

export const Default = Template.bind({});
Default.argTypes = {
  isDisabled: { control: "boolean" },
  isFocused: { control: "boolean" },
  isSelected: { control: "boolean" },
  isHovered: { control: "boolean" },
  isMulti: { control: "boolean" },
  menuIsOpen: { control: "boolean" },
  hasValue: { control: "boolean" },
  hint: {
    control: { control: "text" },
  },
  errorMess: {
    control: { control: "text" },
  },
};

Default.args = {
  showIcon: false,
  showError: false,
  hint: "What hint?",
  label: "The label",
  errorMess: "There's an error",
};

export const Disabled = Template.bind({});
Disabled.argTypes = {
  isDisabled: { control: "boolean" },
};
Disabled.args = {
  isDisabled: false,
};

export const Multi = Template.bind({});
Multi.args = {
  isFocused: false,
};
