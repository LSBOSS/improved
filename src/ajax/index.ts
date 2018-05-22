import request from "./request"
import ErrorCodes from "./error-codes"
export { ErrorCodes }

export async function get(url: string) {
  return request("get", url)
}

export async function post(url: string, body: {}) {
  return request("post", url, body)
}

export async function del(url: string) {
  return request("delete", url)
}

export async function put(url: string, body: {}) {
  return request("put", url, body)
}
