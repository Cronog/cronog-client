import { LocalNotificationDescriptor, LocalNotifications, LocalNotificationSchema, Weekday } from "@capacitor/local-notifications";
import { Cronog } from "../types/Cronog";

export const setNotification = async (notificationId: number, cronog: Cronog) : Promise<boolean> => {
    
    let notifications = [] as LocalNotificationSchema[]
    deleteNotification(notificationId, cronog);

    if(cronog.weekdays){
        notifications = cronog.weekdays?.map(item => {
            return {
                id: parseInt(notificationId.toString().concat(item.toString())),
                title: `Cronog-${cronog.title}`,
                body: "Já está na hora de começar... Vamos nessa?",
                schedule: {
                    repeats: true,
                    on: {
                        weekday: item as number,
                        hour: cronog.time ? parseInt(cronog.time.split(":")[0]) : 0,
                        minute: cronog.time ? parseInt(cronog.time.split(":")[1]) : 0,
                        second: 0
                    }
                }
            } as LocalNotificationSchema
        })
    }else{
        notifications = [{ 
            id: parseInt(notificationId.toString().concat("1")),
            title: `Cronog-${cronog.title}`,
            body: "Já está na hora de começar... Vamos nessa?",
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

LocalNotifications.addListener('localNotificationReceived', async (notification) => {
    // alert(JSON.stringify(notification))
    // const t = await LocalNotifications.getPending()
    // t.notifications.forEach(item => {
    //      alert(JSON.stringify(item))
    // })
})