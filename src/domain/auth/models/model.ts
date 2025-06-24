export interface SignUpRequest {
  email: string;
  password: string;
  option?: {};
}

export interface LoginRequest {
  email: string;
  password: string;
}
