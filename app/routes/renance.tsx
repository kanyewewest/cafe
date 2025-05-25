import type { Route } from "./+types/renance";
import Hero from "~/components/hero/hero";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Renance" },
    { name: "description", content: "." },
  ];
}

export default function RenancePage() {
  return (
    <main>
      <Hero />

    </main>);
}
