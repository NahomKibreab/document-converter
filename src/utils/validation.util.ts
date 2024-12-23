export function validateStringFormat(input: string, segmentSeparator: string, elementSeparator: string): boolean {
    const segments = input.split(segmentSeparator);
    for (const segment of segments) {
        const elements = segment.split(elementSeparator);
        if (elements.length === 0 || elements[0].trim() === '') {
            return false; // Invalid segment
        }
    }
    return true; // Valid string format
}

export function validateJsonFormat(input: any): boolean {
    if (typeof input !== 'object' || input === null) {
        return false; // Not a valid JSON object
    }
    for (const key in input) {
        if (Array.isArray(input[key])) {
            for (const item of input[key]) {
                if (typeof item !== 'object' || item === null) {
                    return false; // Invalid item in array
                }
            }
        } else {
            return false; // Invalid structure
        }
    }
    return true; // Valid JSON format
}

export function validateXmlFormat(input: string): boolean {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(input, 'text/xml');
    const parserError = xmlDoc.getElementsByTagName('parsererror');
    return parserError.length === 0; // Valid XML if no parser errors
}