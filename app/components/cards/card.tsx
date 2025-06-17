import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  color: "pink" | "orange" | "yellow";
  title: string;
  subtitle?: string;
  subtitleType?: "text" | "label";
  badge?: string;
  button?: string;
  buttonIcon?: string;
}

export default function Card({
  color,
  badge,
  button,
  buttonIcon,
  subtitle,
  subtitleType,
  title,
  children,
}: Props) {
  return (
    <div
      className={`col p-8 rounded-3xl w-3/12 gap-y-6 min-h-80 bg-amber-100`}
    >
      <div className="row gap-y-0.5 justify-self-start items-baseline">
        <div className="col gap-y-0.5">
          <span className="card__title">{title}</span>
          {subtitle && (
            <span
              className={`card__subtitle ${subtitleType === "text" ? "card__badge--subtitle" : ""}`}
            >
              {subtitle}
            </span>
          )}
        </div>
        {badge && (
          <span className="card__badge py-1.5 px-2 bg-white text-[0.6rem] rounded-2xl ml-auto">
            {badge}
          </span>
        )}
      </div>
      <div className="card__body mt-auto">{children}</div>
      <div className="card__footer">
        {button && (
          <button
            className={`card__btn card__btn--primary btn btn--sm ${!buttonIcon ? "w-full" : ""}`}
          >
            {button}
          </button>
        )}
        {buttonIcon && (
          <button className="card__btn card__btn--primary btn btn--sm">
            {buttonIcon}
          </button>
        )}
      </div>
    </div>
  );
}
