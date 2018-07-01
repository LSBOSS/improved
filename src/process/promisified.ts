import { spawn, exec } from "child_process"
import { promisify } from "util"

export default {
  spawn: promisify(spawn),
  exec: promisify(exec)
}
