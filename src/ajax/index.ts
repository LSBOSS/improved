import request from "./request"
import ErrorCodes from "./error-codes"
import { IStringIndexed } from "../types"
export { ErrorCodes }

export async function get(
  url: string,
  customHeaders?: IStringIndexed,
  returnRawResponse = false
) {
  return request("get", url, returnRawResponse, undefined, customHeaders)
}

export async function post(
  url: string,
  body: {},
  customHeaders?: IStringIndexed,
  returnRawResponse = false
) {
  return request("post", url, returnRawResponse, body, customHeaders)
}

export async function del(
  url: string,
  customHeaders?: IStringIndexed,
  returnRawResponse = false
) {
  return request("delete", url, returnRawResponse, undefined, customHeaders)
}

export async function put(
  url: string,
  body: {},
  customHeaders?: IStringIndexed,
  returnRawResponse = false
) {
  return request("put", url, returnRawResponse, body, customHeaders)
}
