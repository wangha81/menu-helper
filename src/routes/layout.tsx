import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <>
      <main class="bg-zinc-700 w-full">
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>Made with Alien Lab</footer>
    </>
  );
});
