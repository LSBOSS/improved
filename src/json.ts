const SPACES = 2

// tslint:disable:no-null-keyword
export function prettyJSON(json: {} | null | undefined) {
  return JSON.stringify(json, null, SPACES)
}
// tslint:enable:no-null-keyword
