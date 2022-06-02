import { ReactNode, useEffect, useState } from 'react'
import Props from './props';

const DaysWeek = (props : Props) => {

    const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
    const daysWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    useEffect(() => {
        if(props.initialValue) setSelectedWeekDays(props.initialValue);
    }, [props.initialValue])

    function onChange(index : number) {
        let response;
        if(selectedWeekDays.indexOf(index) >= 0){
            response = selectedWeekDays.filter(item => item !== index)
            setSelectedWeekDays(response);
        }else{
            response = [...selectedWeekDays, index];
            setSelectedWeekDays(response);
        }

        if(props.onChange) props.onChange(response);
    }
    
  return (
    <div className="flex justify-between"
    style={{
        opacity: props.disabled ? 0.6 : 1
    }}
    >
        {daysWeek.map((item, index) => {
            return (
                <div 
                className="font-bold border-2 rounded-[50%] flex items-center justify-center" 
                style={{
                    backgroundColor: selectedWeekDays.indexOf(index) >= 0 ? "white" : props.color,
                    color: props.color ? selectedWeekDays.indexOf(index) >= 0 ? props.color : "white" : "black",
                    height: `${props.size}px`,
                    width: `${props.size}px`,
                    borderColor: props.color,
                }}
                onClick={() => props.disabled || props.readOnly || onChange(index)}>
                    {item}
                </div>
            )
        }) as ReactNode}
    </div>
  )
}

export default DaysWeek