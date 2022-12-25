import {
  component$,
  PropFunction,
  useClientEffect$,
  useSignal,
} from "@builder.io/qwik";
import { Order } from "~/orders/types";

interface CardProps {
  onClick$?: PropFunction<(order: Order) => void>;
  key: number;
  order: Order;
}

export default component$(({ order, onClick$ }: CardProps) => {
  const start = useSignal("-translate-x-12 opacity-0");
  useClientEffect$(() => {
    start.value = "translate-x-0 opacity-100";
  });
  return (
    <div
      onClick$={() => {
        start.value = "translate-x-24 opacity-0";
        setTimeout(() => {
          start.value = `${start.value} hidden`;
          onClick$!(order);
        }, 300);
      }}
      class={`
        bg-teal-600 py-1 px-0.5 pb-0 rounded 
          mb-2 sm:mb-3
          select-none
          transform transition-all duration-200 ease-in-out ${start.value}
          hover:cursor-pointer
        `}
    >
      <div class={`flex flex-row justify-between items-center`}>
        <span class={`top-0 left-0 ml-0.5 absolute text-xs`}>
          {order.index}
        </span>
        <span class={`inline-flex items-baseline`}>
          <span class={`text-6xl sm:text-8xl`}>{order.table}</span>
          <span class={`text-sm sm:text-lg`}>
            {typeof order.table === "number" ? `桌` : ""}
          </span>
        </span>
        <span class={`text-8xl`}>{order.meal}</span>
        <span class={`text-4xl`}>
          {order.actions.map((act) => {
            return (
              <p
                class={`bg-cyan-500 p-0.5 my-0.5 rounded border border-blue-500`}
              >
                {act}
              </p>
            );
          })}
        </span>
      </div>
    </div>
  );
});
