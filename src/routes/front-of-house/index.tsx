import {
  component$,
  useClientEffect$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import Meals, { meals } from "~/components/meals/meals";
import Tables, { tableNums } from "~/components/tables/tables";
import Adjust from "~/components/adjust/adjust";
import OrdersBoard from "~/routes/front-of-house/orders-board";
import {
  init,
  addOrder,
  getOrders,
  deprecateOrder,
  refreshOrder,
} from "./socket";
import { Order } from "~/orders/types";

export default component$(() => {
  const ready = useSignal(false);
  const store = useStore<Order>({
    table: tableNums[0],
    meal: meals[0],
    actions: [],
  });
  const ordersQueue = useStore<Order[]>([]);

  useClientEffect$(async () => {
    const client = await init();

    const _removeOrder = (o: Order) => {
      const _idx = ordersQueue.findIndex((_o) => {
        return _o.index == o.index;
      });
      ordersQueue.splice(_idx, 1);
    };

    // Init Event
    client.on("addOrder", (payload: Order) => {
      ordersQueue.push(payload);
    });
    client.on("finishOrder", (payload: Order) => _removeOrder(payload));
    client.on("deprocateOrder", async (payload: Order) =>
      _removeOrder(payload)
    );

    // Init Orders
    const orders = await getOrders();
    if (orders) {
      while (orders.length > 0) {
        ordersQueue.push(orders.pop()!);
      }
    }

    ready.value = true;
  });

  return (
    <div class="flex flex-col text-zinc-100">
      <div class={`flex flex-row w-full text-2xl mx-2 my-2 justify-center`}>
        <button
          class={
            "w-4/6 text-zinc-100 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 mr-3 disabled:opacity-25"
          }
          disabled={!ready.value}
          onClick$={async () => {
            const { table, meal, actions } = store;
            const t = {
              table,
              meal,
              actions,
            };
            addOrder(t);
            // Reset
            // store.table = tableNums[1];
            // store.meal = meals[0];
            store.actions = [];
            const orders = await getOrders();
            if (!orders) return;
            ordersQueue.splice(0);
            while (orders.length > 0) {
              ordersQueue.push(orders.pop()!);
            }
          }}
        >
          送出
        </button>
        <button
          disabled={!ready.value}
          class={
            "w-1/6 text-zinc-100 rounded-lg bg-gradient-to-r from-blue-400 to-pink-500 mr-3 disabled:opacity-25 flex justify-center"
          }
          onClick$={async () => {
            refreshOrder();
          }}
        >
          <img src="/images/bell.png" class={"object-scale-down w-12"} />
        </button>
      </div>
      <div>
        <h1>桌號</h1>
        <Tables
          table={store.table}
          update$={(n) => {
            store.table = n;
          }}
        />
      </div>
      <div>
        <h1>餐點</h1>
        <Meals
          meal={store.meal}
          update$={(d) => {
            store.meal = d;
          }}
        />
      </div>
      <div>
        <h1>調整</h1>
        <Adjust
          actionList={store.actions}
          update$={(actions) => {
            store.actions = actions;
          }}
        />
      </div>
      <div>
        <h1>餐點</h1>
        <OrdersBoard
          ordersQueue={ordersQueue}
          onRemove$={(_o) => {
            ordersQueue.splice(ordersQueue.indexOf(_o), 1);
            deprecateOrder(_o);
          }}
        />
      </div>
    </div>
  );
});
