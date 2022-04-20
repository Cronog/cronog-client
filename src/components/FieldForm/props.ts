import * as propsInput  from "../Input/props";
import * as propsCheckbox  from "../Checkbox/props";
import * as propsSelect  from "../Select/props";
import * as propsArea from "../TextArea/props";

export default interface Props {
    textLabel: string,
    typeField: TypeFieldForm,
    propsParent : propsInput.default | propsCheckbox.default | propsSelect.default | propsArea.default,
    classCss?: string
}

enum TypeFieldForm {
    text,
    checkbox,
    select,
    textArea,
}