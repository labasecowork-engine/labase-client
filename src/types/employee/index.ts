export interface WorkArea {
  id: string;
  name: string;
  description: string;
  capacity: number;
  disabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  profile_image: string;
  phone: string | null;
  birth_date: string;
  gender: string;
  status: string;
  creation_timestamp: string;
  work_area_id: string;
  company_id: string;
}
