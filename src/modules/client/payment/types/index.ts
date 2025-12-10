export interface PaymentResult {
  success: boolean;
  message: string;
  purchase_number: string;
  transaction_date: string;
  card?: string;
  brand?: string;
  amount: number;
  currency: string;
  raw_data: unknown;
}

export interface CreatePaymentResponse {
  purchase_number: string;
  session_token: string;
  amount: number;
}

export interface CreatePaymentData {
  reservation_id: string;
  metadata: {
    antifraud: {
      client_ip: string;
      merchant_define_data: {
        mdd4: string;
        mdd32: string;
        mdd75: string;
        mdd76: number;
      };
    };
    data_map: {
      url_address: string;
      service_location_city_name: string;
      service_location_country_subdivision_code: string;
      service_location_country_code: string;
      service_location_postal_code: string;
    };
  };
}

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
}
