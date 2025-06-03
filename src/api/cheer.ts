import { SERVER_URL } from '@/lib/utils'
import type { ApiResponse } from '@/types/api'
import type { ProtestCheerCount } from '@/types/protest'

interface ProtestCheerCountRequest {
  protestId: string
}

export const getProtestCheerCount = async ({
  protestId,
}: ProtestCheerCountRequest): Promise<ProtestCheerCount> => {
  const response = await fetch(`${SERVER_URL}/api/cheer/protest/${protestId}`)
  if (!response.ok) {
    throw new Error(`시위별 응원수 가져오기 error ${response.status}`)
  }
  const data = (await response.json()) as ApiResponse<ProtestCheerCount>
  return {
    ...data.data,
    protestId: String(data.data.protestId),
  }
}

export const postProtestCheer = async ({ protestId }: ProtestCheerCountRequest) => {
  const response = await fetch(`${SERVER_URL}/api/cheer/protest/${protestId}`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error(`시위별 응원수 가져오기 error ${response.status}`)
  }
  return response.json()
}
