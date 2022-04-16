import * as propsInput  from "../Input/props";
import * as propsCheckbox  from "../Checkbox/props";
import * as propsSelect  from "../Select/props";

export default interface Props {
    textLabel: string,
    typeField: TypeFieldForm,
    propsParent : propsInput.default | propsCheckbox.default | propsSelect.default,
    style?: string
}

enum TypeFieldForm {
    text,
    checkbox,
    select
}