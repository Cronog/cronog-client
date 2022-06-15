import { ComponentStory, ComponentMeta } from '@storybook/react';

import FieldForm from "./FieldForm";

export default {
  title: 'Components/FieldForm',
  component: FieldForm,
  argTypes: {},
} as ComponentMeta<typeof FieldForm>;

const Template: ComponentStory<typeof FieldForm> = (args) => <FieldForm {...args} />;

export const Input = Template.bind({});
Input.args = {
    key: '',
    classCss: '',
    textLabel: 'Label',
    typeField: 0,
    propsParent: {
        id: '',
        name: '',
        initialValue: '',
        classCss: '',
        classCssContainer: '',
        placeholder: 'Placeholder',
        disabled: false,
        colorText: '',
        colorBorder: '',
        maxLength: 50,
        minLength: 3,
        events: {
            onChange: (value?: string) => alert(`onChange: ${value}`),
            onPressEnter: () => alert(`onPressEnter`)
        }
    }
};

export const Checkbox = Template.bind({});
Checkbox.args = {
    key: '',
    classCss: '',
    textLabel: 'Label',
    typeField: 1,
    propsParent: {
        id: '',
        name: '',
        classCss: '',
        initialValue: true,
        disabled: false,
        events: {
            onChange: (value) => alert(`onChange: ${value}`)
        },
    }
};

export const Select = Template.bind({});
Select.args = {
    key: '',
    classCss: '',
    textLabel: 'Label',
    typeField: 2,
    propsParent: {
        id: '',
        name: '',
        initialValue: '',
        classCss: '',
        colorText: '',
        colorBorder: '',
        disabled: false,
        options: [
            {
                text: 'Option 1',
                value: '1'
            },
            {
                text: 'Option 2',
                value: '2'
            }
        ],
        events: {
            onChange: (value?: string | number) => alert(`onChange: ${value}`),
        }
    }
};

export const TextArea = Template.bind({});
TextArea.args = {
    key: '',
    classCss: '',
    textLabel: 'Label',
    typeField: 3,
    propsParent: {
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
    }
};