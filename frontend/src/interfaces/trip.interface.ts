export interface ITrip {
  id: number;
  created_at: string;
  name: string | null;
}

export interface ITripDetails {
  id: number;
  inserted_at: string;
  name: string | null;
  updated_at: string;
  data: Data;
}
export interface Data {
  currentTime: string;
  image: string;
  threshold: number;
}
