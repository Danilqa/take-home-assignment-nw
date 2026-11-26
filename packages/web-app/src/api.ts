import ky from 'ky'

// ky retries a failed GET twice by default. A failure should reach the error state at once.
export const api = ky.create({ baseUrl: '/api/', retry: 0 })
