import { Meta, StoryFn } from "@storybook/react";
import Button from "./button";
import { ButtonColor, ButtonSize, ButtonState } from "./button";
import { FaRegCircle } from "react-icons/fa";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    viewMode: "docs",
  },
};
export default meta;

const Template: StoryFn<typeof Button> = ({ ...args }) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.md,
  color: ButtonColor.primary,
  state: ButtonState.default,
  text: "Button CZX",
  icon: <FaRegCircle />,
  showCircle1: false,
  showCircle2: true,
  showText: true,
};
Default.parameters = {
  viewMode: "docs",
};

Default.argTypes = {
  color: {
    control: { type: "select" },
    options: [
      "primary",
      "secondary",
      "gray",
      "empty",
      "emptyGray",
      "error",
      "emptyError",
    ],
  },
  state: {
    control: { type: "select" },
    options: ["default", "hover", "focus", "disabled"],
  },
  size: {
    control: { type: "select" },
    options: ["sm", "md", "lg", "xlg"],
  },
  showCircle1: { control: "boolean" },
  showCircle2: { control: "boolean" },
  showText: { control: "boolean" },
};
