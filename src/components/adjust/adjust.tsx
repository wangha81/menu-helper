import { component$, PropFunction } from "@builder.io/qwik";

interface AProps {
  update$?: PropFunction<(a: string[]) => void>;
  actionList: string[];
}

export const actions = [
  "加麵",
  "隔板",
  "半斤",
  "一斤",
  "兩斤",
  "三斤",
  "四斤",
  "不蔥",
];

export default component$(({ update$, actionList }: AProps) => {
  return (
    <div class="flex flex-row flex-wrap rounded-xl bg-gray-800 p-3 m-2">
      {actions.map((act) => {
        return (
          <div class={`basis-1/4`}>
            <input
              type="checkbox"
              class={`peer hidden`}
              checked={actionList.includes(act)}
            />
            <label
              class={`transition-all block cursor-pointer select-none 
                  rounded-xl p-2 text-center 
                  peer-checked:bg-blue-500
                  peer-checked:font-bold 
                  peer-checked:text-white
                `}
              for={act}
              onClick$={() => {
                const _actionList: string[] = Object.assign([], actionList);
                if (!actionList.includes(act)) {
                  // Add
                  _actionList.push(act);
                } else {
                  // Remove
                  _actionList.splice(_actionList.indexOf(act), 1);
                }
                if (update$) update$(_actionList);
              }}
            >
              {act}
            </label>
          </div>
        );
      })}
    </div>
  );
});
