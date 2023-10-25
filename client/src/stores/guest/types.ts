export interface SignUpDetails {
  email: string,
  password: string,
  name: string,
  description?: string,
  dob?: string,
  dateEst?: string,
  phoneno?: number,
  address?: string,
  country?: string,
  gender?: string,
  status: "ACTIVE" | "INACTIVE",
}
export interface SignUpResponse {
  result_code: number,
  user_id: string,
}