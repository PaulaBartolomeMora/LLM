"use client";

//import { useChat } from "ai/react";
import { ChatInput, ChatMessages } from "./ui/chat";
import React, { useState } from "react"; // Importa React y useState


////////////////////////////

function useChat({api}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit called"); // Log para verificar cuándo se llama a handleSubmit

    setIsLoading(true);
    console.log("Input value:", input); // Log para ver el valor actual de input

    // Agregar el mensaje del usuario al estado
    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    console.log("Messages after user input:", [...messages, userMessage]); // Log para verificar el estado de los mensajes

    try {
      //${process.env.REACT_APP_BACKEND_URL}/ai
      //http://localhost:8000/ai
      const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/ai', { // Enviar la solicitud al backend en Python
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from API:", data);

      // Agregar la respuesta del bot al estado
      const botMessage = { role: "bot", content: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      console.log("Messages after bot response:", [...messages, botMessage]); // Log para verificar el estado de los mensajes después de la respuesta del bot

    } catch (error) {
      console.error("Error fetching response:", error); // Log para errores en la solicitud
    } finally {
      setIsLoading(false);
      setInput("");  // Limpiar la entrada solo después de recibir la respuesta
      console.log("Input cleared, isLoading set to false"); // Log para verificar que la entrada se ha limpiado
    }
  };

  const handleInputChange = (event) => {
    console.log("handleInputChange called"); // Log para verificar cuándo se llama a handleInputChange
    setInput(event.target.value);
    console.log("New input value:", event.target.value); // Log para ver el nuevo valor de input
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

////////////////////////////

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
