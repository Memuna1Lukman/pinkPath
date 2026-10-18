import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { completeReminder, createReminder, deleteReminder, getReminders, getUpcomingReminders, updateReminder } from '../api/reminders'

const reminderKeys = {
  all: ['reminders'],
  list: (params) => [...reminderKeys.all, 'list', params],
  upcoming: (days) => [...reminderKeys.all, 'upcoming', days],
}

export function useReminders(params = { active: true }) {
  return useQuery({ queryKey: reminderKeys.list(params), queryFn: () => getReminders(params) })
}

export function useUpcomingReminders(days = 30) {
  return useQuery({ queryKey: reminderKeys.upcoming(days), queryFn: () => getUpcomingReminders(days) })
}

function useReminderMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reminderKeys.all }),
  })
}

export function useCreateReminder() { return useReminderMutation(createReminder) }
export function useUpdateReminder() { return useReminderMutation(({ id, update }) => updateReminder(id, update)) }
export function useCompleteReminder() { return useReminderMutation(completeReminder) }
export function useDeleteReminder() { return useReminderMutation(deleteReminder) }
