import axios from "axios"

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    return data?.message ?? error.message
  }
  return "Something went wrong"
}