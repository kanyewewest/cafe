import { useLayoutEffect, useRef } from "react"
import gsap from 'gsap';
import { GSDevTools } from 'gsap/GSDevTools';
import { SplitText } from "gsap/SplitText";

interface Props {
  text: string
}

export default function TextTwisting({ text }: Props) {

  const $tl = useRef<gsap.core.Timeline>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(GSDevTools);
    gsap.registerPlugin(SplitText);

    if (!$tl.current) {
      $tl.current = gsap.timeline({ repeat: -1 });
    }
    const tl = $tl.current;

    const twistingWrapper = document.querySelector('#text-twisting');
    const twistingTexts = gsap.utils.toArray<HTMLParagraphElement>('p', twistingWrapper);

    const sideWrapper = document.querySelector('#side')!;
    const sideText = sideWrapper.querySelector('.side__text');
    gsap.set(sideWrapper, {
      fontSize: '21vmin',
    });

    document.fonts.ready.then(() => {
      const sideSplit = SplitText.create(sideText, { type: 'chars' });
      tl
        .from(sideSplit.chars, {
          opacity: 0,
          stagger: 0.1,
          duration: 0.15,
          modifiers: {
            opacity: (x) => Math.ceil(x)
          }
        })
        .from(sideSplit.chars, {
          x: '100%',
          duration: .8,
          ease: 'power4.inOut'
        }, '<');

    });


    // gsap.set(twistingTexts[0], {
    //   fontSize: `34vmin`,
    //   scaleY: 0.8,
    //   scaleX: 1.1,
    // });
    // gsap.set(twistingTexts[1], {
    //   fontSize: `21vmin`,
    //   scaleY: 0.8,
    //   scaleX: 1.1,
    // });
    // gsap.set(twistingTexts[2], {
    //   fontSize: `13vmin`,
    //   scaleY: 0.8,
    //   scaleX: 1.1,
    // })
    // gsap.set(twistingTexts[3], {
    //   fontSize: `8vmin`,
    //   scaleY: 0.8,
    //   scaleX: 1.1,
    // })
    // gsap.set(twistingTexts[4], {
    //   fontSize: `5vmin`,
    //   scaleY: 0.8,
    //   scaleX: 1.1,
    // });

    // const grow = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.inOut' } })
    //   .to(twistingTexts[0], {
    //     fontSize: `5vmin`,
    //   }, '0')
    //   .to(twistingTexts[1], {
    //     fontSize: `8vmin`,
    //   }, '<')
    //   .to(twistingTexts[2], {
    //     fontSize: `13vmin`,
    //   }, '<')
    //   .to(twistingTexts[3], {
    //     fontSize: `21vmin`,
    //   }, '<')
    //   .to(twistingTexts[4], {
    //     fontSize: `34vmin`,
    //   }, '<');

    // const drop = gsap.timeline({ defaults: { duration: 0.45, ease: 'power3.inOut' } })
    //   .to(twistingTexts[4], {
    //     y: 600,
    //   }, '0')
    //   .to(twistingTexts[3], {
    //     y: 800,
    //   }, '<0.05')
    //   .to(twistingTexts[2], {
    //     y: 1000,
    //   }, '<0.05')
    //   .to(twistingTexts[1], {
    //     y: 1200,
    //   }, '<0.05')
    //   .to(twistingTexts[0], {
    //     y: 1400,
    //   }, '<0.05');

    // tl
    //   .add(grow, 0)
    //   .add(drop, 0.7);

    GSDevTools.create();

    return () => {
      tl.kill();
    }
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-[100vh] font-primary bg-black">
      <div id="text-twisting" className="hidden absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center [line-height:.6]">
        <p className="font-extralight">{text}</p>
        <p className="font-light">{text}</p>
        <p className="font-medium">{text}</p>
        <p className="font-semibold">{text}</p>
        <p className="font-extrabold">{text}</p>
      </div>
      <div id="side" className="absolute top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-center font-extrabold">
        <span>$</span>
        <span className="side__text">{text}</span>
      </div>
    </div>)
}
