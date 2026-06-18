/** Strip trailing slash for React Router basename (undefined = site root). */
export function getRouterBasename(): string | undefined {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/' || base === './') return undefined
  const trimmed = base.replace(/\/$/, '')
  return trimmed || undefined
}
