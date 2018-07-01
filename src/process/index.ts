import cp, { SpawnOptions, ExecOptions } from "./promisified"

export async function exec(
  command: string,
  options?: ExecOptions & { encoding?: BufferEncoding | null }
) {
  return cp.exec(command, options)
}

export async function spawn(
  command: string,
  args?: ReadonlyArray<string>,
  options?: SpawnOptions
) {
  return cp.spawn(command, args, options)
}
