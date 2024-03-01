import { Meta, StoryFn } from "@storybook/react";
import Select from "./select";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Dropdown Select",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    viewMode: "docs",
  },
};
export default meta;

const Template: StoryFn<typeof Select> = ({ ...args }) => <Select {...args} />;

export const Default = Template.bind({});
Default.argTypes = {
  isDisabled: { control: "boolean" },
  // isFocused: { control: "boolean" },
  isError: { control: "boolean" },
  isIcon: { control: "boolean" },
  hint: {
    control: { control: "text" },
  },
  errorMess: {
    control: { control: "text" },
  },
};

Default.args = {
  // showIcon: false,
  isError: false,
  isDisabled: false,
  hint: "What hint?",
  errorMess: "There's an error",
};
