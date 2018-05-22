export async function delay(ms: number) {
  return new Promise<void>(res => setTimeout(res, ms))
}
