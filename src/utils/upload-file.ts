import { createWriteStream } from 'fs';
import { extname } from 'path';

export class UploadFile {
  static async saveFile(file: Buffer, directory: string, filename: string) {
    const writeStream = createWriteStream(`${directory}/${filename}`);
    writeStream.write(file);
    writeStream.end();
  }

  static fileRename(string: string): String {
    let trimName = string.split('.');
    let randomName = `${Math.floor(Date.now() / 1000)}-${trimName[0]}`;
    return `${randomName}${extname(string)}`;
  }
}
