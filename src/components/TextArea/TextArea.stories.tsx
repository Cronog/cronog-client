import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextArea from "./TextArea";

export default {
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
      colorBackground: { control: 'color' },
      colorBorder: { control: 'color' },
      colorText: { control: 'color' },
  },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: '',
    name: '',
    initialValue: '',
    classCss: '',
    colorText: '',
    colorBorder: '',
    colorBackground: '',
    placeholder: 'Placeholder',
    disabled: false,
    maxLength: 100,
    rows: 4,
    events: {
        onChange: (value?: string) => alert(`onChange: ${value}`),
        onPressEnter: () => alert(`onPressEnter`),
    }
};