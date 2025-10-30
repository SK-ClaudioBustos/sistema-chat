import { CommentIcon } from "@/icons/CommentIcon";

export const LogoForm = () => {
  return (
    <div>
      <div className="flex justify-center">
        <CommentIcon />
      </div>

      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Bienvenido a Chat App</h1>
        <p className="text-secondary-600 dark:text-secondary-300">
          Ingresa tu nombre para empezar a chatear
        </p>
      </div>
    </div>
  );
};
