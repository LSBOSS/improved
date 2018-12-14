import {
  readdir,
  readFile,
  exists,
  mkdir,
  unlink,
  stat,
  writeFile,
  copyFile,
  symlink
} from "fs"
import { promisify as p } from "util"

export default {
  exists: p(exists),
  mkdir: p(mkdir),
  readdir: p(readdir),
  readFile: p(readFile),
  stat: p(stat),
  unlink: p(unlink),
  writeFile: p(writeFile),
  copy: p(copyFile),
  symlink: p(symlink)
}
