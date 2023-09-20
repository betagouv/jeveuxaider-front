type User = {
  id: number
  name: string
  email: string
  created_at: string
  context_role?: string
  anonymous_at?: string
  last_online_at?: string
  contextable_type?: string
  contextable_id?: number
  utm_source?: string
  utm_campaign?: string
  utm_medium?: string
  hard_bounced_at?: string
  has_agreed_responsable_terms_at?: string
  banned_reason?: string
  banned_at?: string
  has_agreed_benevole_terms_at?: string
  statistics?: { [key: string]: any }
  profile: Profile
  reseaux?: Reseau[]
  roles: Role[]
}
