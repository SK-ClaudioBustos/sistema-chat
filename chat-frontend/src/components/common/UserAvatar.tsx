import { AvatarIcon } from "@/icons/AvatarIcon";
import { generateColorFromUsername } from "@/lib/functions";

export const UserAvatar = ({ username }: { username: string }) => {
  const bgClass = generateColorFromUsername(username);
  return <AvatarIcon containerStyle={bgClass} SVGprops={{className: "text-white"}} />;
};
