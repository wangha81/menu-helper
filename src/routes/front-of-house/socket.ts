import { Socket } from "socket.io";
import { io } from "socket.io-client";
import { Order } from "~/orders/types";

let _CLIENT: Socket;
// const HOST = "http://localhost:3000";
// const HOST = "http://192.168.0.133:3000";

export const init = async (): Promise<Socket> => {
  return new Promise((res) => {
    if (_CLIENT) return res(_CLIENT);
    _CLIENT = io() as unknown as Socket;
    // _CLIENT = io(HOST) as unknown as Socket;
    _CLIENT.on("connect", () => {
      res(_CLIENT);
    });
  });
};

export const addOrder = (o: Order) => {
  if (!_CLIENT) return;
  if (!_CLIENT.connected) return;
  _CLIENT.emit("addOrder", o);
};

export const getOrders = async (): Promise<Order[] | undefined> => {
  if (!_CLIENT) return;
  if (!_CLIENT.connected) return;
  return new Promise((res) => {
    _CLIENT.emit("syncOrder", (orders: Order[]) => {
      res(orders);
    });
  });
};

export const deprecateOrder = (o: Order) => {
  if (!_CLIENT) return;
  if (!_CLIENT.connected) return;
  _CLIENT.emit("deprocateOrder", o);
};
