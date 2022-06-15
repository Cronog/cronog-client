import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from "./Input";

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: '',
    name: '',
    initialValue: '',
    classCss: '',
    classCssContainer: '',
    placeholder: 'Placeholder',
    disabled: false,
    colorText: '',
    colorBorder: '',
    maxLength: 50,
    minLength: 3,
    events: {
        onChange: (value?: string) => alert(`onChange: ${value}`),
        onPressEnter: () => alert(`onPressEnter`)
    }
};