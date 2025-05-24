import RainbowText from "~/components/hero/rainbow-text";
import type { Route } from "./+types/renance";
import '~/styles/renance.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Renance" },
    { name: "description", content: "." },
  ];
}

export default function RenancePage() {
  return (
    <div className="text-center pt-32 pb-32 max-w-[500px] mx-auto space-y-8">
      <RainbowText className="text-6xl font-semibold" />
      <p className="text-body">Your employee's co-pilot for their entire financial life. Actionable insights into your financial health.</p>
      <button className="btn">Get Demo Account</button>
    </div>);
}
