import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { getBookOfBusiness } from './requests'

const queryKey = ['book-of-business']

export function useBookOfBusiness() {
  return useSuspenseQuery({ queryKey, queryFn: getBookOfBusiness, retry: false })
}

export function useResetBookOfBusiness() {
  const queryClient = useQueryClient()

  return () => queryClient.resetQueries({ queryKey })
}
