import { Socket } from "socket.io";
import { Order } from "~/orders/types";
import Orders from "~/orders";

export const addOrder = (socket: Socket) => {
  const fn = (payload: Order) => {
    const order = Orders.add(payload);
    socket.broadcast.emit("addOrder", order);
  };
  return fn;
};

export const finishOrder = (socket: Socket) => {
  const fn = (payload: Order) => {
    const order = Orders.finish(payload);
    socket.broadcast.emit("finishOrder", order);
  };
  return fn;
};

export const deprocateOrder = (socket: Socket) => {
  const fn = (payload: Order) => {
    const order = Orders.deprecate(payload);
    socket.broadcast.emit("deprocateOrder", order);
  };
  return fn;
};

export const syncOrder = () => {
  const fn = (callback: CallableFunction) => {
    const orders = Orders.list();
    callback(orders);
  };
  return fn;
};
