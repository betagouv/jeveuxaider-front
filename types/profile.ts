export type Profile = {
  id: number
  user_id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  mobile?: string
  created_at: string
  updated_at: string
  birthday: string
  zip: string
  service_civique: boolean
  is_visible: boolean
  disponibilities?: any // @todo
  description: string
  department?: string
  type?: string
  commitment?: string
  can_export_profiles: boolean
  cej: boolean
  cej_updated_at?: string
  cej_email_adviser?: string
  service_civique_completion_date?: string
  notification__responsable_frequency?: string
  notification__responsable_bilan: boolean
  notification__referent_frequency?: string
  notification__referent_bilan: boolean
  short_name: string
  full_name: string
  avatar?: { [key: string]: any } // @todo
  skills?: { [key: string]: any }[] // @todo
  domaines?: { [key: string]: any }[] // @todo
  activities?: { [key: string]: any }[] // @todo
  missions_offline?: Mission[]
  type_missions?: 'all' | 'distance' | 'presentiel'
  certifications?: 'permis_b' | 'psc1' | 'bafa'[]
}
