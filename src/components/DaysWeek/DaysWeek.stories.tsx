import { ComponentStory, ComponentMeta } from '@storybook/react';

import DaysWeek from "./DaysWeek";

export default {
  title: 'Components/DaysWeek',
  component: DaysWeek,
  argTypes: {
      color: { control: 'color' },
  },
} as ComponentMeta<typeof DaysWeek>;

const Template: ComponentStory<typeof DaysWeek> = (args) => <DaysWeek {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: '',
    disabled: false,
    onChange: (value) => alert(`onChange: ${value}`),
    readOnly: false,
    size: 20, 
    initialValue : []
};