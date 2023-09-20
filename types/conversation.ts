type Conversation = {
  id: number
  conversable_id: number
  conversable_type: string
  conversable: { [key: string]: any }
  created_at: string
  updated_at: string
  response_time: number
  users?: ConversationUser[]
  is_read?: boolean
  latest_message?: ConversationMessage
}
