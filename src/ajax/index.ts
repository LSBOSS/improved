import request from "./request"
import ErrorCodes from "./error-codes"
import { IStringIndexed } from "../types"
export { ErrorCodes }

export async function get(url: string, customHeaders?: IStringIndexed) {
  return request("get", url, undefined, customHeaders)
}

export async function post(
  url: string,
  body: {},
  customHeaders?: IStringIndexed
) {
  return request("post", url, body, customHeaders)
}

export async function del(url: string, customHeaders?: IStringIndexed) {
  return request("delete", url, undefined, customHeaders)
}

export async function put(
  url: string,
  body: {},
  customHeaders?: IStringIndexed
) {
  return request("put", url, body, customHeaders)
}
