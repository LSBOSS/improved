import { readdir, readFile, exists } from "fs"
import { promisify } from "util"

export default {
  readdir: promisify(readdir),
  readFile: promisify(readFile),
  exists: promisify(exists)
}
