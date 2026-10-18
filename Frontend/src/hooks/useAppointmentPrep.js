import { useQuery } from '@tanstack/react-query'
import { getAppointmentPrep } from '../api/appoint'

export function useAppointmentPrep(params) {
  return useQuery({
    queryKey: ['appointment-prep', params],
    queryFn: () => getAppointmentPrep(params),
  })
}
