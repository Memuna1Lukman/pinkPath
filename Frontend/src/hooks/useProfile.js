import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProfile, getProfile, updateProfile } from '../api/profile'

const profileKey = ['profile']

export function useProfile() {
  return useQuery({ queryKey: profileKey, queryFn: getProfile, retry: false })
}

function useProfileMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: profileKey }) })
}

export function useCreateProfile() { return useProfileMutation(createProfile) }
export function useUpdateProfile() { return useProfileMutation(updateProfile) }
