export type Credentials = {
    apiKey: string
    appName:  string
    createdAt: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    lastLoginAt: string
    providerData: []
    stsTokenManager: {
        accessToken: string
        expirationTime: number
        refreshToken: string
    }
    uid: string
}