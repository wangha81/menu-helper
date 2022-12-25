export const Status = {
  Order: "Order",
  Finished: "Finished",
  Deprecated: "Deprecated",
};
export type Order = {
  table: number | string;
  meal: string;
  actions: string[];
  index?: number;
  status?: string;
};
