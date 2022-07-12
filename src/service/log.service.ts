/**
 * manage the log requirements
 * using console logging for now.
 * if later we need to change logging mechanism, we can do that by only updating this file
 */

export function logError(data: string) {
    console.error(data);
}

export function logInfo(data: string) {
    console.info(data);
}

export function logDebugInfo(data: string) {
    console.debug(data);
}