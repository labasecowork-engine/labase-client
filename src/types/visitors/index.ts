export interface Visitor {
  id: string;
  dni: string;
  ruc: string | null;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  user_id: string;
  company_id: string | null;
  space_id: string;
  entry_time: string;
  exit_time: string;
  created_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
  };
  space: {
    id: string;
    name: string;
  };
}
