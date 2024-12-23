export class XmlToJsonConverter {
  convert(xml: string): object {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const json = this.xmlToJson(xmlDoc);
    return json;
  }

  private xmlToJson(xml: Document): object {
    const obj: any = {};
    console.log(xml);
    // if (xml.nodeType === 1) {
    //   // element
    //   if (xml.attributes.length > 0) {
    //     obj['@attributes'] = {};
    //     for (let j = 0; j < xml.attributes.length; j++) {
    //       const attribute = xml.attributes.item(j);
    //       obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
    //     }
    //   }
    // } else if (xml.nodeType === 3) {
    //   // text
    //   obj = xml.nodeValue;
    // }

    // if (xml.hasChildNodes()) {
    //   for (let i = 0; i < xml.childNodes.length; i++) {
    //     const item = xml.childNodes.item(i);
    //     const nodeName = item.nodeName;
    //     if (typeof obj[nodeName] === 'undefined') {
    //       obj[nodeName] = this.xmlToJson(item);
    //     } else {
    //       if (typeof obj[nodeName].push === 'undefined') {
    //         const old = obj[nodeName];
    //         obj[nodeName] = [];
    //         obj[nodeName].push(old);
    //       }
    //       obj[nodeName].push(this.xmlToJson(item));
    //     }
    //   }
    // }
    return obj;
  }
}
