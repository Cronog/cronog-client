import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImagePick from "./ImagePick";

export default {
  title: 'Components/ImagePick',
  component: ImagePick,
  argTypes: {
    color: { control: 'color' }
  },
} as ComponentMeta<typeof ImagePick>;

const Template: ComponentStory<typeof ImagePick> = (args) => <ImagePick {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: 'black',
    cssClass: '',
    disabled: false,
    events: {
        onChange: (value) => alert(value)
    }
}