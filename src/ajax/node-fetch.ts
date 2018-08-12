import nodeFetch, { RequestInit } from "node-fetch"

// tslint:disable-next-line:no-any
const g = global as any
if (!g.fetch) {
  g.fetch = async (url: string, init?: RequestInit) => {
    if (/^\/\//.test(url)) {
      url = "https:" + url
    }
    return nodeFetch(url, init)
  }
}

export default fetch
