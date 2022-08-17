import { LocalNotificationDescriptor, LocalNotifications, LocalNotificationSchema } from "@capacitor/local-notifications";
import { Cronog } from "../types/Cronog";

export const setNotification = async (notificationId: number, cronog: Cronog) : Promise<boolean> => {
    
    let notifications = [] as LocalNotificationSchema[]
    deleteNotification(notificationId, cronog);

    if(cronog.weekdays){
        notifications = cronog.weekdays?.map(item => {
            return {
                id: parseInt(notificationId.toString().concat(item.toString())),
                title: `${cronog.title}`,
                body: "Já está na hora de começar... Vamos nessa?",
                extra: cronog.id,
                actionTypeId: "ACTION",
                schedule: {
                    repeats: true,
                    on: {
                        weekday: item as number,
                        hour: parseInt(cronog.time!.split(":")[0]),
                        minute: parseInt(cronog.time!.split(":")[1]),
                        second: 0
                    }
                }
            } as LocalNotificationSchema
        })
    }else{
        notifications = [{
            id: parseInt(notificationId.toString().concat(cronog.date!)),
            title: `${cronog.title}`,
            body: "Já está na hora de começar... Vamos nessa?",
            extra: cronog,
            actionTypeId: "ACTION"
        }]
    }

    try {
        await LocalNotifications.schedule({
            notifications: notifications
        })
        return true;
    } catch (error) {
        return false;
    }
}

export const deleteNotification = async (notificationId: number, cronog: Cronog) : Promise<boolean> => {
    let notifications : LocalNotificationDescriptor[] = [];
    if(cronog.weekdays){
        notifications = cronog.weekdays?.map(item => {
            return {
                id: parseInt(notificationId.toString().concat(item.toString()))
            } as LocalNotificationDescriptor
        })
    }else{
        notifications = [ { id: parseInt(cronog.notificationId.toString().concat("1")) } ]
    }
    try {
        LocalNotifications.cancel({ notifications: notifications })
        return true;
    } catch (error) {
        return false;
    }
}

LocalNotifications.registerActionTypes({
    types: [{
        id: "ACTION",
        actions: [
            {
                id: "OPEN",
                title: "Vamos!",
                foreground: true
            },
            {
                id: "CANCEL",
                title: "Agora não",
                destructive: true
            },
        ]
    }]
})

LocalNotifications.addListener('localNotificationActionPerformed', event => {
    switch(event.actionId){
        case "OPEN":
            window.location.pathname = `/home/cronog-detail/${event.notification.extra}`
            break;
    }
})