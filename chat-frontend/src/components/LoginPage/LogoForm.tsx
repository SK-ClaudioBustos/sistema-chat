export const LogoForm = () => {
  return (
    <div>
      <div className="flex justify-center">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
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
