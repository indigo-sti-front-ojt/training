import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { btn as Button } from "./Buttons";
import React from "react";

export default {
  title: "ボタン",
  component: Button,
  parameters: {
    backgrounds: {
      values: [
        { name: "red", value: "#f00" },
        { name: "green", value: "#0f0" },
        { name: "blue", value: "#00f" },
      ],
    },
  },
  argTypes: {
    text: {
      control: {
        type: "select",
        options: ["blue", "yellow", "red", "green"],
        labels: {
          blue: "青",
          yellow: "黄",
          red: "赤",
          green: "緑",
        },
      },
    },
    color: {
      control: {
        type: "color",
      },
    },
    date: {
      control: {
        type: "date",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Index = Template.bind({});
Index.args = { text: "text", flag: true, onClick: action("clicked") };
