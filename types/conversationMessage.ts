type ConversationMessage = {
  id: number
  content: string
  type: string
  created_at: string
  updated_at: string
  contextual_state: null | string
  contextual_reason: null | string
  from_id: number
  conversation_id: number
  // [key: string]: any
}
