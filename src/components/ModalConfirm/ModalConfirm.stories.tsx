import { ComponentStory, ComponentMeta } from '@storybook/react';

import ModalConfirm from "./ModalConfirm";

export default {
  title: 'Components/ModalConfirm',
  component: ModalConfirm,
  argTypes: {},
} as ComponentMeta<typeof ModalConfirm>;

const Template: ComponentStory<typeof ModalConfirm> = (args) => <ModalConfirm {...args} />;

export const Default = Template.bind({});
Default.args = {
    showModal: true,
    closeModal: () => false,
    text: "Text modal",
    actionConfirm: () => alert("Confirm")
};