export interface PaymentResponse {
  id: string;
  transaction_id: string;
  purchase_number: string;
  amount: number;
  authorization_code: string;
  status: string;
  action_description: string;
  card_masked: string;
  transaction_date: string;
  error_code: number;
  error_message: string;
  created_at: string;
  reservation_id: string;
  user_id: string;
  reservation: {
    id: string;
    purchase_number: string;
    user_id: string;
    space_id: string;
    start_time: string;
    end_time: string;
    people: number;
    full_room: boolean;
    code_qr: string;
    price: string;
    status: string;
    created_at: string;
  };
}
