/**
 * The db model of the cache object in a request
 */
export interface ICache {
    key: string;
    value?: string;
}