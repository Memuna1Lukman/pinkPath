import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createJournalEntry, deleteJournalEntry, getJournalEntries, getJournalEntry, updateJournalEntry } from '../api/journal'

const journalKeys = {
  all: ['journal'],
  list: (params) => [...journalKeys.all, 'list', params],
  detail: (id) => [...journalKeys.all, 'detail', id],
}

export function useJournalEntries(params = { limit: 50 }) {
  return useQuery({ queryKey: journalKeys.list(params), queryFn: () => getJournalEntries(params) })
}

export function useJournalEntry(id) {
  return useQuery({ queryKey: journalKeys.detail(id), queryFn: () => getJournalEntry(id), enabled: Boolean(id) })
}

function useJournalMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: journalKeys.all }),
  })
}

export function useCreateJournalEntry() { return useJournalMutation(createJournalEntry) }
export function useUpdateJournalEntry() { return useJournalMutation(({ id, entry }) => updateJournalEntry(id, entry)) }
export function useDeleteJournalEntry() { return useJournalMutation(deleteJournalEntry) }
