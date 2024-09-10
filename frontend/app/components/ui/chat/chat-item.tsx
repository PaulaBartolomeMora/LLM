"use client";

import ChatAvatar from "./chat-avatar";
import { Message } from "./chat-messages";

export default function ChatItem({
  id,
  content,
  role,
  addTagToMessage,
}: Message & { addTagToMessage?: (messageId: string, tag: string) => void }) {
  return (
    <div className="flex items-start gap-4 pt-5">
      {/* Pasamos solo role a ChatAvatar */}
      <ChatAvatar role={role} />
      <div>
        <p className="break-words">{content}</p>

        {/* Solo mostramos los botones de feedback si el mensaje es del bot */}
        {role === "bot" && addTagToMessage && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => addTagToMessage(id, "positive_feedback")}
              className="p-2 bg-green-500 text-white rounded"
            >
              👍
            </button>
            <button
              onClick={() => addTagToMessage(id, "negative_feedback")}
              className="p-2 bg-red-500 text-white rounded"
            >
              👎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
