export type Notification = {
  id: string
  created_at: string
  data: { [key: string]: any }
  notifiable: { [key: string]: any }
  notifiable_id: number
  notifiable_type: string
  read_at?: string
  type: string
  updated_at: string
}
