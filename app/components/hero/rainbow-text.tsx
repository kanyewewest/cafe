import { useLayoutEffect, useRef } from "react"
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GSDevTools } from "gsap/GSDevTools";


interface Props {
  className?: string
}

export default function RainbowText({ className }: Props) {
  const $el = useRef<HTMLHeadingElement>(null);
  const $tl = useRef<gsap.core.Timeline>(null);

  useLayoutEffect(() => {
    if (!$el.current) return;
    const el = $el.current;

    const ctx = gsap.context(() => {
      if (!$tl.current) {
        $tl.current = gsap.timeline({ paused: true });
      }
      const tl = $tl.current;

      const lines = el.querySelectorAll('span');
      if (lines.length !== 3) return;

      gsap.registerPlugin(SplitText);
      gsap.registerPlugin(GSDevTools);

      const DEF_STAGGER = 0.02;
      const DEF_OPACITY_DUR = 0.08;
      const DEF_WAVE_DUR = 0.3 * 0.5; // We'll yoyo this timeline
      const DEF_WAVE_OFFSET_X = 4;
      const DEF_WAVE_OFFSET_Y = 8;

      for (let i = 0, cc = 0; i < lines.length; i++) { // cc: Total char count
        const { chars } = new SplitText(lines[i], { autoSplit: true, type: 'chars' });
        const mc = Math.floor(chars.length * 0.5); // mc: Middle of chars array

        for (let j = 0; j < chars.length; j++, cc++) {
          gsap.from(chars[j], {
            ease: 'power1.in',
            opacity: 0,
            duration: DEF_OPACITY_DUR,
            delay: DEF_STAGGER * cc,
          });

          const oz = +Math.sin(Math.PI / chars.length * j).toFixed(2); // oz: Offset Z

          gsap.to(chars[j], {
            ease: 'sine.inOut',
            x: (j - mc) * DEF_WAVE_OFFSET_X,
            y: Math.floor((i - 1) * oz * DEF_WAVE_OFFSET_Y),
            scale: 1.16 + 0.1 * (i % 2),
            duration: DEF_WAVE_DUR,
            delay: DEF_STAGGER * cc,
            yoyo: true,
            repeat: 1,
          });
        }
      }

      tl.play();
      GSDevTools.create();

    }, el);

    return () => ctx.kill();
  }, []);

  return (
    <h1 ref={$el} className={className}>
      <span className="block">All-in-one</span>
      <span className="block">Financial Platform</span>
      <span className="block">for Employees</span>
    </h1>)
}
