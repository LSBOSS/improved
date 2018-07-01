import { PathLike } from "fs"
import { join } from "path"
import fs from "./promisified"

export async function exists(path: PathLike) {
  return fs.exists(path)
}

export async function ls(path: PathLike, absolute = false): Promise<string[]> {
  const files = await fs.readdir(path)
  const pathStr = path.toString()
  return absolute ? files.map(f => join(pathStr, f)) : files
}

export async function read(
  path: string,
  encoding: string = "utf8"
): Promise<string> {
  return (await fs.readFile(path, encoding ? { encoding } : {})).toString()
}

/**
 * @throws Error
 */
export async function readJSON<T>(path: string): Promise<T> {
  return JSON.parse(await read(path, "utf8")) as T
}
