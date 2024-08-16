// chat-input.tsx (modificado)
"use client";

export interface ChatInputProps {
  /** El valor actual del input */
  input?: string;
  /** Handler para cambiar el valor del input */
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /** Handler para el envío del formulario */
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Booleano que indica si está cargando */
  isLoading: boolean;
  /** Placeholder para personalizar el input */
  placeholder?: string;
  /** Tipo del input (email, password, etc.) */
  type?: string;
}

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  placeholder = "Escribe un mensaje...",
  type = "text", // Tipo por defecto
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start justify-between w-full max-w-5xl p-4 bg-white rounded-xl shadow-xl gap-4"
    >
      <input
        autoFocus
        name="message"
        type={type}
        placeholder={placeholder}
        className="w-full p-4 rounded-xl shadow-inner flex-1"
        value={input}
        onChange={handleInputChange}
      />
      <button
        disabled={isLoading}
        type="submit"
        className="p-4 text-white rounded-xl shadow-xl bg-gradient-to-r from-cyan-500 to-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enviar
      </button>
    </form>
  );
}
