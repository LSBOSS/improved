import { PathLike, Stats } from "fs"
import { join, basename, dirname, extname } from "path"
import fs from "./promisified"

export async function unlink(path: PathLike) {
  return fs.unlink(path)
}

export async function mkdir(path: PathLike) {
  return fs.mkdir(path)
}

export async function exists(path: PathLike) {
  return fs.exists(path)
}

export async function stat(path: PathLike): Promise<Stats> {
  return fs.stat(path)
}

export async function createIfDoesntExist(folder: string) {
  if (await exists(folder)) return
  return mkdir(folder)
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

type Encoding =
  | "ascii"
  | "binary"
  | "base64"
  | "hex"
  | "ucs2"
  | "ucs-2"
  | "utf16le"
  | "utf-16le"
  | "utf8"
  | "utf-8"
  | "latin1"
export async function read(
  path: PathLike,
  encoding: Encoding = "utf8"
): Promise<string> {
  return (await fs.readFile(path, encoding ? { encoding } : {})).toString()
}

export async function readBuffer(path: PathLike): Promise<Buffer> {
  // tslint:disable-next-line:no-null-keyword
  return fs.readFile(path, { encoding: null })
}

/**
 * @throws Error
 */
export async function readJSON<T>(path: string): Promise<T> {
  return JSON.parse(await read(path, "utf8")) as T
}

/** whitelist - what files to keep, defaults to /a^/ which matches nothing */
export const clearFolder = async (folder: string, whitelist = /a^/) => {
  const files = await ls(folder, true)
  const deletionJobs = files.map(
    async f => (whitelist.test(f) ? Promise.resolve() : unlink(f))
  )
  return Promise.all(deletionJobs)
}

export async function write(
  path: string,
  // tslint:disable-next-line:no-any
  data: any,
  encoding: string = "utf8"
) {
  return fs.writeFile(path, data.toString(), encoding ? { encoding } : {})
}
