export interface SignUpRequest {
  email: string;
  password: string;
  user_name: string;
  user_start_station: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
