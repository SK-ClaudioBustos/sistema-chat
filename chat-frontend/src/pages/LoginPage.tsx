import { LoginButton } from "@/components/LoginPage/LoginButton";
import { LogoForm } from "@/components/LoginPage/LogoForm";
import { UsernameInput } from "@/components/LoginPage/UsernameInput";
import { sanitizeUsername, validateUsername } from "@/lib/functions";
import { Card } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = userName.trim();

    if (!trimmedName) {
      setError("Por favor ingrese su nombre de usuario");
      return;
    }

    if (!validateUsername(trimmedName)) {
      setError("Solamente se permiten letras y espacios");
      return;
    }

    const sanitizedName = sanitizeUsername(trimmedName);
    navigate(`/chat/${sanitizedName}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Card className="px-8 shadow-2xl backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 py-4"
          aria-label="Formulario de inicio de sesión"
        >
          <LogoForm />
          <UsernameInput
            error={error}
            userName={userName}
            setError={setError}
            setUserName={setUserName}
          />
          <LoginButton error={error} userName={userName} />
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
