import { Task } from "../types/Task";
import { Response } from "../types/Response";
import { getCredentials } from "./auth";
import { getBackEnd } from "./backend";
import { arrayBufferToDataUri, dataURItoBlob } from "./general";
import { RequestType } from "../types/RequestType";

export const getTaskById = async (id: string) : Promise<Response<Task>> => {
    const response = await getBackEnd<Task>("GET", `/task/${getCredentials()?.uid}/${id}`)
    response.data!.imgs = response.data!.imgs.map(image => arrayBufferToDataUri(image))
    return response;
}

export const getTaskByCronogId = async (cronogId: string) : Promise<Response<Task[]>> => {
    const response = await getBackEnd<Task[]>("GET", `/task/${cronogId}`)
    response.data!.forEach(item => item.imgs = item.imgs.map(image => arrayBufferToDataUri(image)))
    return response;
}

export const saveTask = async (task: Task, images: string[]) : Promise<Response<any>> => {

    var fd = new FormData()
    fd.append('data', JSON.stringify(task))
    images.forEach(image => fd.append('img', dataURItoBlob(image)!))

    const response = await getBackEnd("POST", "/task", fd, RequestType.formData);
    return response;
}

export const updateTask = async (task : Task, images: string[], id : string, cronogId: string) : Promise<Response<any>> => {

    var fd = new FormData()
    fd.append('data', JSON.stringify(task))
    images.forEach(image => fd.append('img', dataURItoBlob(image)!))

    const response = await getBackEnd("PUT", `/task/${cronogId}/${id}`, fd, RequestType.formData);
    return response;
}

export const deleteTask = async (id : string | undefined, cronogId: string) : Promise<Response<any>> => {
    const response = await getBackEnd("DELETE", `/task/${cronogId}/${id}`);
    return response;
}

export const firstLastTask = (tasks: Task[]) : Task[] => {
    if(tasks.length == 1){
        return tasks;
    }

    return [tasks[0], tasks[tasks.length - 1]];
}