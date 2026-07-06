import { Injectable, type MessageEvent } from '@nestjs/common';
import { finalize, interval, map, merge, Observable, Subject } from 'rxjs';
import { SSE_HEARTBEAT_INTERVAL_MS } from './notifications.constants.js';

// Single-instance in-memory registry (per §11 of docs/musicbox.md) — one
// Subject per connected user, fanning out to every open tab/device. Scaling
// horizontally would replace this with Redis pub/sub on a
// `notifications:{userId}` channel; out of scope for this phase.
@Injectable()
export class NotificationsSseService {
  private readonly subjects = new Map<string, Subject<MessageEvent>>();

  subscribe(userId: string): Observable<MessageEvent> {
    const subject = this.getOrCreate(userId);
    const heartbeat = interval(SSE_HEARTBEAT_INTERVAL_MS).pipe(
      map((): MessageEvent => ({ type: 'heartbeat', data: {} })),
    );

    return merge(subject.asObservable(), heartbeat).pipe(
      finalize(() => {
        if (!subject.observed) this.subjects.delete(userId);
      }),
    );
  }

  push(userId: string, notification: object): void {
    this.subjects
      .get(userId)
      ?.next({ type: 'notification', data: notification });
  }

  private getOrCreate(userId: string): Subject<MessageEvent> {
    let subject = this.subjects.get(userId);
    if (!subject) {
      subject = new Subject<MessageEvent>();
      this.subjects.set(userId, subject);
    }
    return subject;
  }
}
