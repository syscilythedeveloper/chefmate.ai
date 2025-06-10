"use client";

import { useChat } from "@ai-sdk/react";

export default function ChatBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`whitespace-pre-wrap flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`rounded-lg px-4 py-2 mb-2 max-w-xs ${
              message.role === "user"
                ? "bg-purple-500 text-white" // User message color
                : "bg-blue-100 text-blue-900" // AI message color
            }`}
          >
            {message.role === "user" ? "User: " : "ChefMate.ai: "}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
              }
            })}
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
