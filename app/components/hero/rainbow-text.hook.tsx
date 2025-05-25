import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const STAGGER = 0.016;
const OPACITY_DUR = 0.05;
const WAVE_DUR = 0.3 * 0.5; // We'll yoyo this timeline
const WAVE_OFFSET_X = 3;
const WAVE_OFFSET_Y = 4;
const COLOR_STEPS = 32;

export default function useRainbowText($el: React.RefObject<HTMLHeadingElement | null>) {
  const play = (): void => {
    //const lines = el.querySelectorAll('div');
    gsap.registerPlugin(SplitText);

    const lerpH = gsap.utils.interpolate([0, 50, 0, -140, -160, -250, -250]);
    const lerpS = gsap.utils.interpolate([100, 70, 80, 60]);
    const lerpL = gsap.utils.interpolate([70, 70, 15, 30, 65, 15, 0]);

    const ds = 1 / (COLOR_STEPS - 1); // Derivated steps
    const DEF_COLORS = new Array(COLOR_STEPS).fill(undefined).map((_, i) => (
      `hsl(${lerpH(i * ds).toFixed(0)}, ${lerpS(i * ds).toFixed(0)}%, ${lerpL(i * ds).toFixed(0)}%)`
    ));

    const { lines } = new SplitText($el.current, { type: 'lines', smartWrap: true });

    for (let i = 0, cc = 0; i < lines.length; i++) { // cc: Total char count
      const { chars } = new SplitText(lines[i], { type: 'chars' });
      const mc = Math.floor(chars.length * 0.5); // mc: Middle of chars array

      gsap.set(chars, { color: DEF_COLORS[0], willChange: 'transform, color, opacity' });

      for (let j = 0; j < chars.length; j++, cc++) {
        const tlColors = gsap.timeline({ delay: cc * STAGGER });
        for (let ci = 0; ci < DEF_COLORS.length; ci++) {
          tlColors.set(chars[j], {
            color: DEF_COLORS[ci],
            delay: STAGGER,
          });
        }

        gsap.from(chars[j], {
          ease: 'power2.out',
          opacity: 0,
          duration: OPACITY_DUR,
          delay: STAGGER * cc,
        });

        gsap.to(chars[j], {
          ease: 'sine.inOut',
          x: (j - mc) * WAVE_OFFSET_X,
          y: Math.floor((i - 1) * WAVE_OFFSET_Y),
          scale: 1.1,
          duration: WAVE_DUR,
          delay: STAGGER * cc + 0.01,
          yoyo: true,
          repeat: 1,
        });
      }
    }
  };

  return play;
}
