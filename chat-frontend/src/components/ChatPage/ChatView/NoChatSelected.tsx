import { BigCommentIcon } from "@/icons/BigCommentIcon";

export const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-4">
          <BigCommentIcon />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Ningún chat seleccionado
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Seleccione un usuario para empezar a chatear
        </p>
      </div>
    </div>
  );
};
