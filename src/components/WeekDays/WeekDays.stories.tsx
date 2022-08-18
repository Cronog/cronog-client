import { ComponentStory, ComponentMeta } from '@storybook/react';

import WeekDays from "./WeekDays";

export default {
  title: 'Components/WeekDays',
  component: WeekDays,
  argTypes: {
      color: { control: 'color' },
  },
} as ComponentMeta<typeof WeekDays>;

const Template: ComponentStory<typeof WeekDays> = (args) => <WeekDays {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: '',
    disabled: false,
    onChange: (value) => alert(`onChange: ${value}`),
    readOnly: false,
    size: 20, 
    initialValue : []
};