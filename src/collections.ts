type Collection<T> = T[] | Set<T>

export function union<T>(...collections: Collection<T>[]) {
  return new Set(collections.reduce((a, v) => [...a, ...v], []))
}

export function intersection<T>(...collections: Collection<T>[]) {
  return compareCollections(
    (i, ...sets) => sets.every(s => s.has(i)),
    ...collections
  )
}

export function difference<T>(...collections: Collection<T>[]) {
  return compareCollections(
    (i, ...sets) => sets.every(s => !s.has(i)),
    ...collections
  )
}

function compareCollections<T>(
  cb: (item: T, ...sets: Set<T>[]) => boolean,
  ...collections: Collection<T>[]
) {
  const sets = collections.map(c => (c instanceof Set ? c : new Set(c)))

  const firstSet = sets.shift()
  if (firstSet === undefined) return new Set<T>()

  return new Set([...firstSet].filter(i => cb(i, ...sets)))
}
