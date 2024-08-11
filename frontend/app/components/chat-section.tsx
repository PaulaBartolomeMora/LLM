"use client";

//import { useChat } from "ai/react";
/*import { ChatInput, ChatMessages } from "./ui/chat";

export default function ChatSection() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat({ api: process.env.NEXT_PUBLIC_CHAT_API });

  return (
    <div className="space-y-4 max-w-5xl w-full">
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
      />
    </div>
  );
}*/




"use client";

import React, { useState } from "react"; // Importa React y useState
// import { useChat } from "ai/react"; // Comenta esta línea si estás creando un mock

import { ChatInput, ChatMessages } from "./ui/chat";

// Mock de la función useChat
function useChat({ api }) {
  const [messages, setMessages] = useState([]);  // Cambié React.useState por useState
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simular envío de mensaje
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simular respuesta del chat
    setTimeout(() => {
      setMessages([...messages, { role: "user", content: input }, { role: "bot", content: "This is a response" }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const reload = () => {
    // Implementación ficticia de recarga
  };

  const stop = () => {
    // Implementación ficticia de detener
  };

  return {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  };
}

export default function ChatSection() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat({ api: process.env.NEXT_PUBLIC_CHAT_API });

  return (
    <div className="space-y-4 max-w-5xl w-full">
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
      />
    </div>
  );
}
