import { Meta, StoryFn } from "@storybook/react";
import Checkbox from "./checkbox";
import { CheckSize, CheckColor } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Input checkbox",
  argTypes: { onClick: { action: "clicked" } },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    viewMode: "docs",
  },
};
export default meta;

const Template: StoryFn<typeof Checkbox> = ({ ...args }) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  size: CheckSize.md,
  color: CheckColor.default,
  // label: "Label",
  checked: false,
  indeterminate: true,
};

Default.argTypes = {
  size: {
    control: { type: "select" },
    options: ["sm", "md"],
  },
  // label: {
  //   control: { control: "text" },
  // },
  color: {
    control: { type: "select" },
    options: ["default", "hover", "focus", "disabled"],
  },
};
