import { ComponentStory, ComponentMeta } from '@storybook/react';

import TemplatePage from "./Template";

export default {
  title: 'Components/Template',
  component: TemplatePage,
  argTypes: {
      colorHeader: { control: 'color' },
      colorBody: { control: 'color' },
      colorContainer: { control: 'color' },
      colorMenuHamburguer: { control: 'color' }
  },
} as ComponentMeta<typeof TemplatePage>;

const Template: ComponentStory<typeof TemplatePage> = (args) => <TemplatePage {...args} />;

export const Default = Template.bind({});
Default.args = {
    classCssBody: '',
    classCssHeader: '',
    classCssScreen: '',
    colorBody: '',
    colorContainer: '',
    colorHeader: '',
    colorMenuHamburguer: '',
    hideMenuHamburguer: false,
    pathBack: '/path-example',
    renderBody: <>render body</>,
    renderHeader: <>render header</>

};