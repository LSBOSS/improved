import cp from "./promisified"
import { SpawnOptions } from "child_process"

export const exec = cp.exec

export async function spawn(
  command: string,
  args?: ReadonlyArray<string>,
  options?: SpawnOptions
) {
  return cp.spawn(command, args, options)
}
