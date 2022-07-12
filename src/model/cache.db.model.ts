/**
 * The db model of the cache object in a request
 */
export interface ICache {
    key: string;
    value: string;
    ttl: number;
    createdAt: Date;
    expireAt: Date;
    hitCount?: number;
}