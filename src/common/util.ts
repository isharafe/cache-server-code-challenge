/**
 * copied from inet
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";

export function randomString(): string {
    const len = Math.round(Math.random() * 100);

    const randomArray = Array.from( { length: len },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
    const randomString = randomArray.join("");

    return randomString;
}
