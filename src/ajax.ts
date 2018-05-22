// Requires browser, might consider adding node-fetch as dep
const headers = new Headers()
headers.append("Accept", "application/json, text/plain, */*")
headers.append("Content-Type", "application/json")

const enum Verb {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}

async function request(method: Verb, url: string, body?: {}) {
  const init = {
    method,
    headers,
    body: body ? JSON.stringify(body) : ""
  }
  return (await fetch(url, init)).json()
}

export async function get(url: string) {
  return request(Verb.GET, url)
}

export async function post(url: string, body: {}) {
  return request(Verb.POST, url, body)
}

export async function del(url: string) {
  return request(Verb.DELETE, url)
}

export async function put(url: string, body: {}) {
  return request(Verb.PUT, url, body)
}
