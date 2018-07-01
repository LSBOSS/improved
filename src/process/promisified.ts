import { spawn, exec, SpawnOptions, ExecOptions } from "child_process"
import { promisify } from "util"

export type ExecOptions = ExecOptions
export type SpawnOptions = SpawnOptions

export default {
  spawn: promisify(spawn),
  exec: promisify(exec)
}
