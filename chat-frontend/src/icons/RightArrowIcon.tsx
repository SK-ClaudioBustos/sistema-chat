import { SVGProps } from "react";

export const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
  {...props}
    className="size-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);
