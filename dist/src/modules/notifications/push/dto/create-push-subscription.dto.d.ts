declare class PushSubscriptionKeysDto {
    p256dh: string;
    auth: string;
}
export declare class CreatePushSubscriptionDto {
    endpoint: string;
    keys: PushSubscriptionKeysDto;
}
export {};
