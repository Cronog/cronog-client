import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as yup from 'yup';
import { Days } from "./Days";
import { typeCronog } from "./TypeCronog";

export type Cronog = {
    id: string,
    userId: string,
    notificationId: number,
    order: number,
    color: string,
    date?: string,
    time?: string,
    icon: IconDefinition,
    weekdays?: Array<Days>,
    type: typeCronog,
    title: string,
    taskCount: number;
};

export const schemaCronog = yup.object().shape({
    id: yup.string(),
    userId: yup.string().required(),
    order: yup.number(),
    title: yup
        .string()
        .required('Preencha o titulo')
        .min(3, 'O campo Titulo deve ter pelo menos 3 caracteres')
        .max(20, 'O campo Titulo deve ter no maximo 20 caracteres'),
    type: yup
        .number()
        .required('Escolha ao menos um dia da semana'),
    color: yup.string().required('Selecione a cor'),
    date: yup.string().test({
        name: 'weekDaysRequired',
        message: 'Selecione o dia',
        exclusive: false,
        test: (value, context) => {
            if(context.parent.type !== 2){
                return true;
            }else{
                return value ? true : false;
            }
        }
    }),
    time: yup.string().required('Escolha o horário'),
    icon: yup.object().shape({}).required('Selecione o icone'),
    weekdays: yup.array(yup.number())
    .test({
        name: 'weekDaysRequired',
        message: 'Selecione pelo menos 1 dia',
        exclusive: false,
        test: (value, context) => {
            if(context.parent.type == typeCronog.monthly){
                return true;
            }else{
                return value?.length == 0 ? false : true;
            }
        }
    })
});

