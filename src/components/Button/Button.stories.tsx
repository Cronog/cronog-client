import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from "./Button" ;

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderColor: { control: 'color' }
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Blue = Template.bind({});
Blue.args = {
    children: "Button",
    classCss: 'btn-blue',
    action: () => alert("alert")
};

export const Yellow = Template.bind({});
Yellow.args = {
    children: "Button",
    classCss: 'btn-yellow',
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    action: () => alert("alert")
};

export const Orange = Template.bind({});
Orange.args = {
    children: "Button",
    classCss: 'btn-orange',
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    action: () => alert("alert")
};

export const Red = Template.bind({});
Red.args = {
    children: "Button",
    classCss: 'btn-red',
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    action: () => alert("alert")
};

export const Pink = Template.bind({});
Pink.args = {
    children: "Button",
    classCss: 'btn-pink',
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    action: () => alert("alert")
};

export const Green = Template.bind({});
Green.args = {
    children: "Button",
    classCss: 'btn-green',
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    action: () => alert("alert")
};

export const Custom = Template.bind({});
Custom.args = {
    children: "Button",
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    action: () => alert("alert")
};