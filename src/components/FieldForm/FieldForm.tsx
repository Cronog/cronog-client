import { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import Props from './props';

import Input from '../Input';
import Checkbox from '../Checkbox';
import Select from '../Select';
import Textarea from '../TextArea';

import * as propsInput from "../Input/props";
import * as propsCheckbox from "../Checkbox/props";
import * as propsSelect from "../Select/props";
import * as propsArea from "../TextArea/props";

const FieldForm :ForwardRefRenderFunction<
  HTMLInputElement | 
  HTMLSelectElement | 
  HTMLTextAreaElement, Props> = (
	props,
	ref
): JSX.Element => {
  return (
    <div className={`flex-1 mx-1 mb-2 ${props.classCss}`}>
        <label>
            {props.textLabel}
        </label>
        {props.typeField === 0 && <Input ref={ref as Ref<HTMLInputElement> | undefined} {...props.propsParent as propsInput.default} />}
        {props.typeField === 1 && <Checkbox ref={ref as Ref<HTMLInputElement> | undefined} {...props.propsParent as propsCheckbox.default}/>}
        {props.typeField === 2 && <Select ref={ref as Ref<HTMLSelectElement> | undefined} {...props.propsParent as propsSelect.default}/>}
        {props.typeField === 3 && <Textarea ref={ref as Ref<HTMLTextAreaElement> | undefined} {...props.propsParent as propsArea.default}/>}
    </div>
  )
}

export default forwardRef(FieldForm);