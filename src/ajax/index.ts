import request from "./request"
import ErrorCodes from "./error-codes"
import { IStringIndexed } from "../types"
export { ErrorCodes }
export { request }

export async function get(url: string, customHeaders?: IStringIndexed) {
  return request("get", url, customHeaders)
}

export async function del(url: string, customHeaders?: IStringIndexed) {
  return request("delete", url, customHeaders)
}

export async function post(
  url: string,
  body: {} | Blob,
  isForm = false,
  customHeaders?: IStringIndexed
) {
  return request("post", url, body, isForm, customHeaders)
}

export async function put(
  url: string,
  body: {} | Blob,
  isForm = false,
  customHeaders?: IStringIndexed
) {
  return request("put", url, body, isForm, customHeaders)
}
