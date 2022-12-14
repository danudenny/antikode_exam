export interface IUploadFile {
  fieldname: 'string';
  originalname: 'string';
  encoding: 'string';
  mimetype: 'string';
  buffer: Buffer;
  size: 'integer';
  path: 'string';
  filename: 'string';
}
