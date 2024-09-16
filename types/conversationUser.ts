export type ConversationUser = Partial<User> & {
  pivot: {
    status: boolean
    read_at: string
  }
}
