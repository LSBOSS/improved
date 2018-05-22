export function removeHash() {
  const [ url ] = window.location.toString().split("#")
  window.history.replaceState({}, document.title, url)
}

export async function nextFrame() {
  return new Promise<number>(res => window.requestAnimationFrame(res))
}
