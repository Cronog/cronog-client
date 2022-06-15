import { ComponentStory, ComponentMeta } from '@storybook/react';

import ModalSelectionIcons from "./ModalSelectionIcons";

export default {
  title: 'Components/ModalSelectionIcons',
  component: ModalSelectionIcons,
  argTypes: {},
} as ComponentMeta<typeof ModalSelectionIcons>;

const Template: ComponentStory<typeof ModalSelectionIcons> = (args) => <ModalSelectionIcons {...args} />;

export const Default = Template.bind({});
Default.args = {
    showModal: true,
    closeModal: () => false,
    onSelected: (value) => alert(value),
};