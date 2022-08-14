import { ComponentStory, ComponentMeta } from '@storybook/react';

import ModalAlert from "./ModalAlert";

export default {
  title: 'Components/ModalAlert',
  component: ModalAlert,
  argTypes: {},
} as ComponentMeta<typeof ModalAlert>;

const Template: ComponentStory<typeof ModalAlert> = (args) => <ModalAlert {...args} />;

export const Default = Template.bind({});
Default.args = {
    showModal: true,
    closeModal: () => false,
    actionConfirm: () => alert("Confirm"),
    actionDecline: () => alert("Decline")
};