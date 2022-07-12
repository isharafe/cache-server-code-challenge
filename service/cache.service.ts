/**
 * stdTTL: the standard ttl as number in seconds for every generated cache element. 0 = unlimited
 * checkperiod: The period in seconds, as a number, used for the automatic delete check interval. 0 = no periodic check.
 */
// const empCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const set = (key: string, value: any, ttl?: number) => {
    // TODO
};

export const get = (key: string) => {
    // TODO
    return "";
};
