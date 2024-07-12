
export interface ITrip {
  emails_to_invite: string[] | undefined;
  destination: string | undefined;
  starts_at: string | undefined;
  ends_at: string | undefined;
  owner_name: string ;
  owner_email: string ;
}

export interface ITripOwner {
  name: string;
  email: string;
}


export interface ITripDetails {
  "id": string;
  "destination": string;
  "starts_at": string;
  "ends_at": string;
  "is_confirmed": boolean
}


export interface ICreateTripActivity{
  occurs_at: string
  title: string
  
}