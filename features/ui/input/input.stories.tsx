import { Meta, StoryObj } from "@storybook/react";
import Input from "./input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input Field",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    viewMode: "docs",
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    isDisabled: false,
    isIcon: false,
    isError: false,
    noHint: false,
    inputLabel: "Label goes here",
    hint: "Hinting at something",
    errorMess: "There's an error",
  },
};
