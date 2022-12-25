import { Order, Status } from "./types";

const _Orders: Order[] = [];
let _Count: number = 0;
let _last = Date.now();
const OneHOUR = 1000 * 60 * 60;

setInterval(() => {
  if (Date.now() - _last > OneHOUR * 12) {
    _last = Date.now();
    _Count = 0;
  }
}, OneHOUR);

const add = (order: Order) => {
  order.index = _Count;
  order.status = Status.Order;
  _Orders.push(order);
  _Count += 1;
  return order;
};

const finish = (order: Order) => {
  _Orders[order.index!].status = Status.Finished;
  return _Orders[order.index!];
};

const deprecate = (order: Order) => {
  _Orders[order.index!].status = Status.Deprecated;
  return _Orders[order.index!];
};

const list = (): Order[] => {
  return _Orders.filter((o) => o.status == Status.Order).reverse();
};

export default {
  add,
  finish,
  deprecate,
  list,
};
