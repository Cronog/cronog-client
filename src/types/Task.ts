import * as yup from 'yup';

export type Task = {
    id?: string,
    cronogId: string,
    title: string,
    imgs: string[],
    order: number,
    description?: string,
    createAt: Date
}

export const schemaTask = yup.object().shape({
    id: yup
        .string(),
    cronogId: yup
        .string()
        .required(),
    title: yup
        .string()
        .required('Preencha o titulo')
        .min(3, 'O titulo deve ter pelo menos 3 caracteres')
        .max(20, 'O titulo deve ter no maximo 20 caracteres'),
    imgs: yup
        .array()
        .min(1, 'Adicione uma foto'),
    order: yup
        .number(),
    description: yup
        .string()
        .max(100, 'A descrição deve ter no maximo 100 caracteres'),
    createAt: yup
        .date()
        .required()
});