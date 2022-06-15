import { ComponentStory, ComponentMeta } from '@storybook/react';

import Select from "./Select";

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: '',
    name: '',
    initialValue: '',
    classCss: '',
    colorText: '',
    colorBorder: '',
    disabled: false,
    options: [
        {
            text: 'Option 1',
            value: '1'
        },
        {
            text: 'Option 2',
            value: '2'
        }
    ],
    events: {
        onChange: (value?: string | number) => alert(`onChange: ${value}`),
    }
};