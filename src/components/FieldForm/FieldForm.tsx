import Props from './props';

import Input from '../Input';
import Checkbox from '../Checkbox';
import Select from '../Select';

import * as propsInput from "../Input/props";
import * as propsCheckbox from "../Checkbox/props";
import * as propsSelect from "../Select/props";

const FieldForm = (props : Props) => {
  return (
    <div className={`flex-1 mr-1 ml-1 mb-4 ${props.style}`}>
        <label>
            {props.textLabel}
            {props.typeField == 0 && <Input {...props.propsParent as propsInput.default} />}
            {props.typeField == 1 && <Checkbox {...props.propsParent as propsCheckbox.default}/>}
            {props.typeField == 2 && <Select {...props.propsParent as propsSelect.default}/>}
        </label>
    </div>
  )
}

export default FieldForm