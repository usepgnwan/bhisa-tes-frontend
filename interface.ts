export interface Point {
  id: number
  title: string
  alamat: string
}

export interface Wilayah {
  id: number
  title: string
  alamat: string
  created_at: string   // bisa juga Date kalau mau langsung diparse
  updated_at: string
  points: Point[]
}
