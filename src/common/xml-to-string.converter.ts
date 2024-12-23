export class XmlToStringConverter {
    convert(xml: string): string {
        // Simple XML to string conversion logic
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const segments: string[] = [];

        const root = xmlDoc.documentElement;
        const children = root.children;

        for (let i = 0; i < children.length; i++) {
            const segmentName = children[i].nodeName;
            const elements: string[] = [];

            for (let j = 0; j < children[i].children.length; j++) {
                elements.push(children[i].children[j].textContent || '');
            }

            segments.push(`${segmentName}*${elements.join('*')}~`);
        }

        return segments.join('');
    }
}