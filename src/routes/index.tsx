import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import UserSelectBtn from "~/components/user-select-btn/user-select-btn";

export default component$(() => {
  return (
    <div class="flex flex-col">
      <div class="text-zinc-300">請選擇身份</div>
      <UserSelectBtn path="/front-of-house/">前台</UserSelectBtn>
      <UserSelectBtn path="/back-of-house/">後廚</UserSelectBtn>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Menu Supporter",
  meta: [],
};
