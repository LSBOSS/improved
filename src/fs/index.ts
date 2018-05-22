// Need to import URL for `exists` due to https://github.com/Microsoft/TypeScript/issues/9944
import { URL } from "url"
import { join } from "path"
import fs from "./promisified"

export const exists = fs.exists

export async function ls(path: string, absolute = false): Promise<string[]> {
  const files = await fs.readdir(path)
  return absolute ? files.map(f => join(path, f)) : files
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
