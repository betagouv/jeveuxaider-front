export type Role = {
  id: number
  name: string
  created_at: string
  updated_at: string
  pivot: {
    user_id: number
    role_id: number
    rolable_type?: string
    rolable_id?: number
    invited_by_user_id?: number
    fonction?: string
  }
  pivot_model: { [key: string]: any }
}
