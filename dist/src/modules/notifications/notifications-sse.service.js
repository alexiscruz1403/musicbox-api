var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { finalize, interval, map, merge, Subject } from 'rxjs';
import { SSE_HEARTBEAT_INTERVAL_MS } from './notifications.constants.js';
let NotificationsSseService = class NotificationsSseService {
    subjects = new Map();
    subscribe(userId) {
        const subject = this.getOrCreate(userId);
        const heartbeat = interval(SSE_HEARTBEAT_INTERVAL_MS).pipe(map(() => ({ type: 'heartbeat', data: {} })));
        return merge(subject.asObservable(), heartbeat).pipe(finalize(() => {
            if (!subject.observed)
                this.subjects.delete(userId);
        }));
    }
    push(userId, notification) {
        this.subjects
            .get(userId)
            ?.next({ type: 'notification', data: notification });
    }
    getOrCreate(userId) {
        let subject = this.subjects.get(userId);
        if (!subject) {
            subject = new Subject();
            this.subjects.set(userId, subject);
        }
        return subject;
    }
};
NotificationsSseService = __decorate([
    Injectable()
], NotificationsSseService);
export { NotificationsSseService };
//# sourceMappingURL=notifications-sse.service.js.map