import { component$, Slot } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

interface SelectProps {
  path?: string;
}

export default component$((pros: SelectProps) => {
  const nav = useNavigate();
  const { path } = pros;
  return (
    <button
      type="button"
      class="my-1 p-1 rounded 
      text-zinc-100
      bg-gradient-to-r from-teal-500 to-blue-500 
      hover:from-pink-500
      hover:to-yellow-500"
      onClick$={() => {
        path ? (nav.path = path) : {};
      }}
    >
      <Slot />
    </button>
  );
});
