import path from 'path';
export default function filePath(filePath) {
  if (process.platform == 'win32')
    return path.normalize(filePath).replace(/\\/g, path.sep + path.sep);
  else return path.normalize(filePath);
}
