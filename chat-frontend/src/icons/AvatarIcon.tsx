import { SVGProps } from "react";

interface Props {
  containerStyle?: string;
  SVGprops?: SVGProps<SVGSVGElement>;
}

export const AvatarIcon = ({ containerStyle, SVGprops }: Props) => {
  return (
    <div
      className="rounded size-10 relative overflow-hidden"
      style={{backgroundColor: containerStyle}}
    >
      <svg
        className="absolute -bottom-1 h-auto w-auto text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        {...SVGprops}
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
