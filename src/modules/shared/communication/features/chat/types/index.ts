export interface Message {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
    user_type: string;
  };
}
