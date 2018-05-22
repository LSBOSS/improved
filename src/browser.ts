import { delay } from "./promise"

export function removeHash() {
  const [url] = window.location.toString().split("#")
  window.history.replaceState({}, document.title, url)
}

export async function nextFrame() {
  return new Promise<number>(res => window.requestAnimationFrame(res))
}

export async function limitFramerate(ms: number) {
  await Promise.all([nextFrame(), delay(ms)])
}
