export async function delay(ms: number) {
  return new Promise<void>(res => setTimeout(res, ms))
}

export async function series<T, R>(
  arr: T[],
  cb: (item: T, index?: number, arr?: T[]) => Promise<R>
): Promise<R[]> {
  const ret: R[] = []
  let i = 0

  await arr.reduce(async (a, v) => {
    await a
    const result = await cb(v, i, arr)
    i++
    ret.push(result)
  }, Promise.resolve())

  return ret
}
