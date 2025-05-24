import TextTwisting from "~/components/text-twisting/text-twisting";
import type { Route } from "./+types/_index";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Text Experiments" },
    { name: "description", content: "A collection of gsap text animations." },
  ];
}

export default function Home() {
  return (
    <TextTwisting text="Yeah" />
  );
}
