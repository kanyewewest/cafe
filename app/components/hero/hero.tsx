import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import useRainbowText from "./rainbow-text.hook";
import { GSDevTools } from "gsap/GSDevTools";
import CustomEase from "gsap/CustomEase";

export default function Hero() {
  const $heading = useRef<HTMLHeadingElement>(null);
  const $body = useRef<HTMLParagraphElement>(null);
  const $btn = useRef<HTMLButtonElement>(null);

  const playHeading = useRainbowText($heading);

  useLayoutEffect(() => {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(CustomEase);
    //gsap.registerPlugin(GSDevTools);

    const { lines } = new SplitText($body.current, {
      type: "lines",
    });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      playHeading();
      const DELAY_BODY = 0.3;
      const DELAY_BTN = 0.25;
      const STAGGER = 0.12;
      const DURATION = 0.45;
      //const EASE: gsap.EaseString = CustomEase.create("custom", "M0,0 C0.266,0.412 0.292,0.506 0.491,0.719 0.65,0.889 0.78,1 1,1");
      const EASE: gsap.EaseString = "power1.out";

      tl.from(
        lines,
        {
          y: 32,
          opacity: 0,
          duration: (i) => DURATION - STAGGER * i,
          stagger: STAGGER,
          ease: EASE,
        },
        DELAY_BODY,
      ).from(
        $btn.current,
        {
          opacity: 0,
          duration: DURATION - DELAY_BTN,
          ease: EASE,
        },
        DELAY_BODY + DELAY_BTN,
      );
    });
    //GSDevTools.create();
    return () => ctx.kill();
  }, []);

  return (
    <section className="section section--center mx-auto [text-rendering:optimizeSpeed] [color-rendering:optimizeSpeed]">
      <h1
        className="text-5xl md:text-7xl font-semibold"
        ref={$heading}
      >
        All-in-one Financial Platform for Employees
      </h1>
      <p className="max-w-[35rem]" ref={$body}>
        Your employee's co-pilot for their entire financial
        life. Actionable insights into your financial
        health.
      </p>
      <button className="btn" ref={$btn}>
        Get Demo Account
      </button>
    </section>
  );
}
