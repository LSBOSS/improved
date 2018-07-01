import { PathLike } from "fs"
import { join, basename, dirname, extname } from "path"
import fs from "./promisified"

export async function exists(path: PathLike) {
  return fs.exists(path)
}

export async function ls(path: PathLike, absolute = false): Promise<string[]> {
  const files = await fs.readdir(path)
  const pathStr = path.toString()
  return absolute ? files.map(f => join(pathStr, f)) : files
}

/**
 * The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. If there is no . in the last portion of the path, or if the first character of the basename of path (see path.basename()) is ., then an empty string is returned.
 */
export function getFileExtension(path: PathLike) {
  return extname(path.toString())
}

export function getFileName(path: PathLike, withoutExtension: boolean = false) {
  return basename(
    path.toString(),
    withoutExtension ? getFileExtension(path) : undefined
  )
}

export function getFolderName(path: PathLike) {
  return dirname(path.toString())
}

export function changeFileExtension(path: PathLike, newExtension: string) {
  const ext = getFileExtension(path)
  const end = new RegExp(`\\${ext}$`)
  return path.toString().replace(end, newExtension)
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
