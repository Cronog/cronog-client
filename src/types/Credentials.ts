import { Dayjs } from "dayjs"

export type Credentials = {
    email: string
    accessToken: string
    refreshToken: string
    uid: string
    updateAt: Dayjs
}