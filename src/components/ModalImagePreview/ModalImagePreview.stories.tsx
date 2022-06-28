import { ComponentStory, ComponentMeta } from '@storybook/react';

const logo = require("../../assets/logo.png");

import ModalImagePreview from "./ModalImagePreview";

export default {
  title: 'Components/ModalImagePreview',
  component: ModalImagePreview,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof ModalImagePreview>;

const Template: ComponentStory<typeof ModalImagePreview> = (args) => <ModalImagePreview {...args} />;

export const Default = Template.bind({});
Default.args = {
    showModal: true,
    image: logo,
    color: "--main-color",
    closeModal: () => false,
};