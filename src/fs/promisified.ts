import { readdir, readFile, exists, mkdir, unlink, stat, writeFile, copyFile } from "fs"
import { promisify } from "util"

export default {
  exists: promisify(exists),
  mkdir: promisify(mkdir),
  readdir: promisify(readdir),
  readFile: promisify(readFile),
  stat: promisify(stat),
  unlink: promisify(unlink),
  writeFile: promisify(writeFile),
  copy: promisify(copyFile)
}
