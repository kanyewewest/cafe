import CustomEase from "gsap/CustomEase";

// bone chilling slowburn 🥶🥶🥶
const SLOWBURN = CustomEase.create(
  "custom",
  "M0,0 C0.266,0.412 0.391,0.572 0.462,0.654 0.568,0.777 0.78,1 1,1",
);

export default {
  SLOWBURN,
};
