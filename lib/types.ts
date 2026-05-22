export type Business={id:string;name:string;city:string;district:string|null;description:string|null;phone:string|null;owner_id:string};
export type Service={id:string;business_id:string;name:string;duration_minutes:number;price_xof:number};
export type Booking={id:string;business_id:string;service_id:string;starts_at:string;ends_at:string;customer_name:string;customer_phone:string;status:'pending'|'confirmed'|'cancelled'|'paid';payment_status:'unpaid'|'pending'|'paid'|'failed'};
