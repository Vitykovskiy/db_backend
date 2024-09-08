export interface ISessionDTO {
  id?: number;
  client_id: number;
  start_time: string;
  duration: number;
  cost: number;
  status: "Scheduled" | "Canceled" | "Completed";
}
