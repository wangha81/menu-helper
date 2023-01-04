import {
  component$,
  useClientEffect$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { Order } from "~/orders/types";
import { finishOrder, getOrders, init } from "./socket";
import Card from "~/components/order-card-be/order-card-be";

export default component$(() => {
  // const sample: Order = {
  //   table: 3,
  //   meal: "牛肉湯麵",
  //   actions: ["加麵", "半斤"],
  //   index: 0,
  // };
  const ordersQueue = useStore<Order[]>([]);
  const muted = useSignal(true);
  const audio = useSignal<HTMLAudioElement>();

  useClientEffect$(async () => {
    const client = await init();

    const _removeOrder = (o: Order) => {
      const _idx = ordersQueue.findIndex((_o) => {
        return _o.index == o.index;
      });
      ordersQueue.splice(_idx, 1);
    };

    const playAlertSound = async () => {
      if (!audio.value) return;
      audio.value.load();
      await audio.value.play();
    };

    const refreshOrder = async () => {
      const orders = await getOrders();
      ordersQueue.splice(0);
      if (!orders) return;
      while (orders.length > 0) {
        ordersQueue.push(orders.pop()!);
      }
    };

    const updateOrder = async () => {
      await refreshOrder();
      await playAlertSound();
    };

    // Init Event
    client.on("addOrder", async () => {
      await updateOrder();
    });
    client.on("finishOrder", (payload: Order) => _removeOrder(payload));
    client.on("deprocateOrder", async (payload: Order) =>
      _removeOrder(payload)
    );
    client.on("refreshOrder", async () => {
      await updateOrder();
    });

    // Init Order
    client.emit("syncOrder", (orders: Order[]) => {
      if (!orders) return;
      while (orders.length > 0) {
        ordersQueue.push(orders.pop()!);
      }
    });
  });
  return (
    <div class="flex flex-col text-zinc-100">
      <button
        class={`${
          muted.value ? "bg-red-400" : "bg-green-400"
        } rounded px-2 my-1 w-fit self-end`}
        onClick$={async () => {
          muted.value = !muted.value;
        }}
      >
        {/* 通知音 {muted.value ? "off" : "on"} */}
        <img
          src={
            muted.value
              ? "/images/volume-disable.png"
              : "/images/volume-enable.png"
          }
          class={"object-scale-down w-12"}
        />
      </button>
      <audio ref={audio} crossOrigin="anonymous" muted={muted.value}>
        <source src="/audios/noti.wav" type="audio/wav" />
      </audio>
      {ordersQueue.map((o: Order) => {
        return (
          <Card
            order={o}
            key={o.index!}
            onClick$={(_o) => {
              ordersQueue.splice(ordersQueue.indexOf(_o), 1);
              finishOrder(_o);
            }}
          />
        );
      })}
    </div>
  );
});
