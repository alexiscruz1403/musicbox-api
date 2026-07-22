import type { Response } from 'express';
import { HealthService } from './health.service.js';
export declare class HealthController {
    private readonly health;
    constructor(health: HealthService);
    check(res: Response): Promise<import("./health.service.js").HealthResult>;
}
