import { ComponentStory, ComponentMeta } from '@storybook/react';

import BackButton from "./BackButton" ;

export default {
  title: 'Components/BackButton',
  component: BackButton,
  argTypes: {
  },
} as ComponentMeta<typeof BackButton>;

const Template: ComponentStory<typeof BackButton> = (args) => <BackButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: '',
    path: '',
    size: ''
};