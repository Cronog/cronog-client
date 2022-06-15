import { ComponentStory, ComponentMeta } from '@storybook/react';

import ModalSelectionPreviewMode from "./ModalSelectionPreviewMode";

export default {
  title: 'Components/ModalSelectionPreviewMode',
  component: ModalSelectionPreviewMode,
  argTypes: {},
} as ComponentMeta<typeof ModalSelectionPreviewMode>;

const Template: ComponentStory<typeof ModalSelectionPreviewMode> = (args) => <ModalSelectionPreviewMode {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: '',
    showModal: true,
    closeModal: () => false,
    onSelected: (value) => alert(value),
};