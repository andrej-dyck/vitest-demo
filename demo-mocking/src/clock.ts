export const clock = {

  utcNow: () => {
    return new Date(Date.parse(new Date().toISOString()))
  },

  showCurrentTime: (locale: string = 'de-DE') => {
    const now = new Date()
    return now.toLocaleTimeString(locale)
  }

} as const;
