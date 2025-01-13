## Description

Document Converter is an API to convert documents between three different formats:

- .txt
- .json
- .xml

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test


# test coverage
$ npm run test:cov
```

## How to run locally

Steps to convert documents:

1. Run `npm run start:dev`
2. Once the server starts, upload a single file using `http://localhost:3000/upload` (POST METHOD)

- Currently the application support one of the three document formats i.e. `JSON | TXT | XML`
- If you upload file sussecfully a response that includes the `fileId` will be returned.

```json
// When a user uploads `real-string.txt` file
{
  "fileId": "1736742780956505712001",
  "originalFileName": "real-string.txt",
  "fileType": "text/plain"
}
```

3. Use the `fileId` returned in previous step to request file conversion by hitting `http://localhost:3000/convert` (POST METHOD) endpoint. And here's the fields you need to include in your request.

```json
// User is requesting to convert document from text to xml file format
{
  "fileId": "1736742780956505712001",
  "targetFormat": "STRING_TO_XML",
  "separators": {
    "segmentSeparator": "~",
    "elementSeparator": "*"
  }
}
```

> Note that some conversion are not permitted intentionally to prevent unexpected errors and here are the `targetFormat` enums this application support.

```typescript
enum FileFormatType {
  STRING_TO_JSON = 'STRING_TO_JSON',
  STRING_TO_XML = 'STRING_TO_XML',
  XML_TO_STRING = 'XML_TO_STRING',
  JSON_TO_STRING = 'JSON_TO_STRING',
  XML_TO_JSON = 'XML_TO_JSON',
  JSON_TO_XML = 'JSON_TO_XML',
}
```

## Deployment

You can deploy to [Mau](https://mau.nestjs.com), the official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
