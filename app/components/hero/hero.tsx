import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import useRainbowText from "./rainbow-text.hook";
import { GSDevTools } from "gsap/GSDevTools";

export default function Hero() {
  const $heading = useRef<HTMLHeadingElement>(null);
  const $body = useRef<HTMLParagraphElement>(null);
  const $btn = useRef<HTMLButtonElement>(null);

  const playHeading = useRainbowText($heading);

  useLayoutEffect(() => {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(GSDevTools);

    const { lines } = new SplitText($body.current, { type: 'lines' });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      playHeading();

      tl
        .from(lines, { y: 60, opacity: 0, duration: 0.35, stagger: 0.35, ease: 'power1.in' })
        .from($btn.current, { opacity: 0, duration: 0.4, ease: 'power1.inOut' });
    });
    GSDevTools.create();
    return () => ctx.kill();
  }, []);

  return (
    <section className="text-center pt-32 pb-32 max-w-[40rem] mx-auto space-y-10 flex flex-col justify-center items-center">
      <h1 className="text-7xl font-semibold" ref={$heading}>
        All-in-one Financial Platform for Employees
      </h1>
      <p className="max-w-[35rem]" ref={$body}>Your employee's co-pilot for their entire financial life. Actionable insights into your financial health.</p>
      <button className="btn" ref={$btn}>Get Demo Account</button>
    </section>)

}
