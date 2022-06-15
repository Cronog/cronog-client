import { ComponentStory, ComponentMeta } from '@storybook/react';

import HamburguerMenu from "./HamburguerMenu";

export default {
  title: 'Components/HamburguerMenu',
  component: HamburguerMenu,
  argTypes: {},
} as ComponentMeta<typeof HamburguerMenu>;

const Template: ComponentStory<typeof HamburguerMenu> = (args) => <HamburguerMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: ''
}