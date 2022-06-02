import { Task } from "../types/Task";
import { Response } from "../types/Response";
import { getCredentials } from "./auth";
import { chamarBackEnd } from "./backend";
import { arrayBufferToDataUri, dataURItoBlob } from "./general";

export const getTaskById = async (id: string) : Promise<Response<Task>> => {
    const response = await chamarBackEnd<Task>("GET", `/task/${getCredentials()?.uid}/${id}`)
    response.data!.img = arrayBufferToDataUri(response.data?.img)
    return response;
}

export const getTaskByCronogId = async (cronogId: string) : Promise<Response<Task[]>> => {
    const response = await chamarBackEnd<Task[]>("GET", `/task/${cronogId}`)
    response.data!.forEach(item => item.img = arrayBufferToDataUri(item.img))
    return response;
}

export const saveTask = async (task : Task, image : string) : Promise<Response<any>> => {

    var fd = new FormData()
    fd.append('data', JSON.stringify(task))
    fd.append('img', dataURItoBlob(image)!)

    const response = await chamarBackEnd("POST", "/task", fd, 1);
    return response;
}

export const updateTask = async (task : Task, image: string, id : string, cronogId: string) : Promise<Response<any>> => {

    var fd = new FormData()
    fd.append('data', JSON.stringify(task))
    fd.append('img', dataURItoBlob(image)!)

    const response = await chamarBackEnd("PUT", `/task/${cronogId}/${id}`, fd, 1);
    return response;
}

export const deleteTask = async (id : string | undefined, cronogId: string) : Promise<Response<any>> => {
    const response = await chamarBackEnd("DELETE", `/task/${cronogId}/${id}`);
    return response;
}

export const firstLastTask = (tasks: Task[]) : Task[] => {
    if(tasks.length == 1){
        return tasks;
    }

    return [tasks[0], tasks[tasks.length - 1]];
}