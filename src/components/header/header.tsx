import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  return (
    <header>
      <div
        onClick$={() => {
          nav.path = "/";
        }}
        class="m-auto py-2 text-zinc-100 text-2xl sm:text-5xl font-extrabold cursor-pointer"
      >
        李師傅簡易餐廚輔助系統
      </div>
    </header>
  );
});
