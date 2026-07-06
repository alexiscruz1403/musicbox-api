import { type MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class NotificationsSseService {
    private readonly subjects;
    subscribe(userId: string): Observable<MessageEvent>;
    push(userId: string, notification: object): void;
    private getOrCreate;
}
