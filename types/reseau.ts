export type Reseau = {
  id: number
  name: string
  created_at: string
  updated_at: string
  publics_beneficiaires?: string[]
  description?: string
  phone?: string
  email?: string
  address?: string
  zip?: string
  city?: string
  department?: string
  country?: string
  latitude?: string
  longitude?: string
  website?: string
  facebook?: string
  twitter?: string
  instagram?: string
  donation?: string
  image_1?: string
  image_2?: string
  color?: string
  is_published: boolean
  slug: string
  full_address: string
  full_url: string
  pivot: { [key: string]: any }
  // [key: string]: any
}
