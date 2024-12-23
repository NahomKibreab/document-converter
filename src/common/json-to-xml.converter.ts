export class JsonToXmlConverter {
    convert(jsonData: any): string {
        let xml = '<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n';
        
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                jsonData[key].forEach((item: any) => {
                    xml += `  <${key}>\n`;
                    for (const itemKey in item) {
                        if (item.hasOwnProperty(itemKey)) {
                            xml += `    <${itemKey}>${item[itemKey]}</${itemKey}>\n`;
                        }
                    }
                    xml += `  </${key}>\n`;
                });
            }
        }
        
        xml += '</root>';
        return xml;
    }
}