import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from "./Loading";

export default {
  title: 'Components/Loading',
  component: Loading,
  argTypes: {},
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: '',
    size: '50',
};