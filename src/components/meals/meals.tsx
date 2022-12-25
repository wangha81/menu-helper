import { component$, PropFunction } from "@builder.io/qwik";

export const meals = ["牛肉麵", "牛肉湯", "牛肉湯麵", "乾拌麵", "酸辣麵"];
interface MProps {
  update$?: PropFunction<(n: string) => void>;
  meal: string;
}

export default component$(({ update$, meal }: MProps) => {
  return (
    <div class="flex flex-row flex-wrap rounded-xl bg-gray-800 p-3 m-2">
      {meals.map((d) => {
        return (
          <div class={`basis-1/3`}>
            <input type="radio" class={`peer hidden`} checked={meal == d} />
            <label
              onClick$={() => {
                if (update$) update$(d);
              }}
              class={`transition-all block cursor-pointer select-none 
                    rounded-xl p-2 text-center 
                    peer-checked:bg-blue-500
                    peer-checked:font-bold 
                    peer-checked:text-white  
                    hover:bg-cyan-300 
                    hover:text-black
                  `}
              for={d}
            >
              {d}
            </label>
          </div>
        );
      })}
    </div>
  );
});
