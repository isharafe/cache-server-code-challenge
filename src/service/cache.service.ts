/**
 * TODO
 * The number of entries allowed in the cache is limited. If the maximum amount of cached
items is reached, some old entry needs to be overwritten. Please explain the approach
of what is overwritten in the comments of the source code.

● Every cached item has a Time To Live (TTL). If the TTL is exceeded, the cached data
will not be used. A new random value will then be generated (just like cache miss). The
TTL will be reset on every read/cache hit.

 */
const MAX_CACHE_ENTRIES = 100;


export const set = (key: string, value: any, ttl?: number) => {
    // TODO
};

export const get = (key: string) => {
    // TODO
    return "";
};
