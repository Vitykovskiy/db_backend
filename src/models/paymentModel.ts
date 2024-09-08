export interface IPaymentDTO {
  id?: number;
  client_id: number;
  session_id: number;
  amount: number;
  payment_date: string;
}
