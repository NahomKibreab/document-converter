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

3. Use the `fileId` returned in the previous step to request file conversion by hitting `http://localhost:3000/convert` (POST METHOD) endpoint. And here are the fields you need to include in your request.

```json
// User is requesting to convert the document from text to XML file format
{
  "fileId": "1736742780956505712001",
  "targetFormat": "STRING_TO_XML",
  "separators": {
    "segmentSeparator": "~",
    "elementSeparator": "*"
  }
}
```

> Note that some conversions are not permitted intentionally to prevent unexpected errors and here are the `targetFormat` enums this application supports.

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

> Note this application is only built for the backend and doesn't have a frontend interface so to test you can either use Insomnia or Postman to test locally. In my case, I used Insomnia to test the file conversion on my local machine and I took few screenshots for better understanding.
<img width="1371" alt="image" src="https://github.com/user-attachments/assets/28355a26-7fc5-4d82-8edd-ca7736f7699e" />

<img width="1364" alt="image" src="https://github.com/user-attachments/assets/4a2fbf24-1643-4fab-8420-025bfc1aa5d9" />



## Deployment

You can deploy to [Mau](https://mau.nestjs.com), the official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
