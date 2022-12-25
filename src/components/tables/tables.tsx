import { component$, PropFunction } from "@builder.io/qwik";

export const tableNums = ["外帶", 1, 2, 3, 5, 6, 7, 8, 9, 10];
interface TProps {
  update$?: PropFunction<(n: number | string) => void>;
  table: number | string;
}

export default component$(({ update$, table }: TProps) => {
  return (
    <div class="flex flex-row flex-wrap rounded-xl bg-gray-800 p-3 m-2">
      {tableNums.map((n: number | string) => {
        return (
          <div class={"basis-1/4"}>
            <input
              type="radio"
              class={`peer hidden`}
              checked={table == n}
            ></input>
            <label
              onClick$={() => {
                if (update$) update$(n);
              }}
              class={`transition-all block cursor-pointer select-none 
            rounded-xl p-2 text-center 
            peer-checked:bg-blue-500
            peer-checked:font-bold
            peer-checked:text-white
            hover:bg-cyan-300
            hover:text-black`}
              for={`${n}`}
            >
              {n}
            </label>
          </div>
        );
      })}
    </div>
  );
});
