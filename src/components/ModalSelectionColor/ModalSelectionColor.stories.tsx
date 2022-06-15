import { ComponentStory, ComponentMeta } from '@storybook/react';

import ModalSelectionColor from "./ModalSelectionColor";

export default {
  title: 'Components/ModalSelectionColor',
  component: ModalSelectionColor,
  argTypes: {},
} as ComponentMeta<typeof ModalSelectionColor>;

const Template: ComponentStory<typeof ModalSelectionColor> = (args) => <ModalSelectionColor {...args} />;

export const Default = Template.bind({});
Default.args = {
    showModal: true,
    closeModal: () => false,
    onSelected: (value) => alert(value) 
};