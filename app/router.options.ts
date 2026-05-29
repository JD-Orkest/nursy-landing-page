import type { RouterConfig } from '@nuxt/schema'

type QueryValue = string | string[]

const IGNORED_QUERY_KEYS = [
  /^utm_/i,
  /^fbclid$/i,
  /^gclid$/i,
  /^msclkid$/i,
  /^ttclid$/i,
  /^_ga$/i,
  /^_gl$/i,
  /^mc_cid$/i,
  /^mc_eid$/i,
]

function shouldIgnoreKey(key: string) {
  return IGNORED_QUERY_KEYS.some((rule) => rule.test(key))
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    // Keep raw value if encoding is invalid to prevent route parsing crashes.
    return value
  }
}

export default <RouterConfig>{
  parseQuery(search) {
    const query: Record<string, QueryValue> = {}
    const raw = search.startsWith('?') ? search.slice(1) : search

    if (!raw) {
      return query
    }

    for (const chunk of raw.split('&')) {
      if (!chunk) continue

      const separatorIndex = chunk.indexOf('=')
      const rawKey = separatorIndex >= 0 ? chunk.slice(0, separatorIndex) : chunk
      const rawValue = separatorIndex >= 0 ? chunk.slice(separatorIndex + 1) : ''

      const key = safeDecode(rawKey)
      if (!key || shouldIgnoreKey(key)) {
        continue
      }

      const value = safeDecode(rawValue)
      const currentValue = query[key]

      if (currentValue === undefined) {
        query[key] = value
      } else if (Array.isArray(currentValue)) {
        currentValue.push(value)
      } else {
        query[key] = [currentValue, value]
      }
    }

    return query
  },
}
