import { component$, PropFunction } from "@builder.io/qwik";
import { Order } from "~/orders/types";
import Card from "~/components/order-card-fe/order-card-fe";

interface BoardProps {
  ordersQueue: Order[];
  onRemove$: PropFunction<(o: Order) => void>;
}

export default component$(({ ordersQueue, onRemove$ }: BoardProps) => {
  return (
    <div class="flex-row flex-wrap rounded-xl bg-gray-800 p-3 m-2">
      {ordersQueue.map((o: Order) => {
        return (
          <Card
            order={o}
            key={o.index!}
            onClick$={(_o) => {
              onRemove$(_o);
            }}
          />
        );
      })}
    </div>
  );
});
