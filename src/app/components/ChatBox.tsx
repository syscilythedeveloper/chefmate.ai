"use client";

import { useChat } from "@ai-sdk/react";

export default function ChatBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col h-full w-full border pt-5 pb-5 border-zinc-300 dark:border-zinc-800 rounded-lg shadow-xl">
      {/* Messages area - takes up remaining space */}
      <div className="flex-1 overflow-y-auto p-4">
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
      </div>

      {/* Input area - stays at bottom of container */}
      <div className="p-4 border-t border-zinc-300 dark:border-zinc-800">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 border border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 rounded shadow-xl"
            value={input}
            placeholder="Ask ChefMate.ai about the recipe"
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
