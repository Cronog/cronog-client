import { ComponentStory, ComponentMeta } from '@storybook/react';

import Checkbox from "./Checkbox";

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: '',
    name: '',
    textLabel: "Label",
    classCss: '',
    initialValue: true,
    key: '',
    disabled: false,
    events: {
        onChange: (value) => alert(`onChange: ${value}`)
    },
};