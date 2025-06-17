import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { SvgGlobe } from "~/utils/svg";

export default function Navbar() {
  const $nav = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!$nav.current) return;
    const side = $nav.current.querySelectorAll('[data-side]');

    const DELAY = 0.1;
    const DURATION = 0.2;
    const STAGGER = 0.06;
    const OFFSET_X = 20;

    gsap.from(side, {
      opacity: 0,
      x: OFFSET_X,
      duration: DURATION,
      stagger: STAGGER,
      ease: 'power1.out',
      delay: DELAY
    });
  }, []);

  return (
    <nav className="w-full text-base py-4" ref={$nav}>
      <div className="w-section w-full mx-auto flex flex-row flex-nowrap items-center">
        <div className="w-3/12 text-xl font-extrabold [letter-spacing:-1px]">
          Renance
        </div>
        <ul className="w-6/12 flex flex-row flex-nowrap gap-x-8" >
          <li data-side><a>Home</a></li>
          <li data-side><a>Insights</a></li>
          <li data-side><a>Pricing</a></li>
          <li data-side><a>About</a></li>
          <li data-side><a>Get in touch</a></li>
        </ul>
        <div className="w-3/12 flex flex-row flex-nowrap gap-x-4 justify-end">
          <button className="btn btn--sm btn--sec btn--icon" data-side><SvgGlobe /> English</button>
          <button className="btn btn--sm" data-side>Log in</button>
        </div>
      </div>
    </nav>)
}
