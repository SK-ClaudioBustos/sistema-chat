import { LoaderIcon } from "@/icons/animated/LoaderIcon";

export const LoadingChat = () => {
  return (
    <div className="w-full h-[100dvh] bg-gray-800 flex justify-center items-center flex-col">
        <LoaderIcon />
        <span className="text-white font-bold">Cargando chat</span>
    </div>
  );
};
