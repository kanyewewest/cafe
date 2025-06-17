import Navbar from "~/components/navbar/navbar";
import type { Route } from "./+types/_index";
import Hero from "~/components/hero/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Renance" },
    {
      name: "description",
      content: "Demo for a behance shot.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
