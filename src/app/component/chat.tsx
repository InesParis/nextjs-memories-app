"use client";
import { useState } from "react";
import Message from "./message";
import { eleganceClient } from "@/services/eleganceClient";
const Chat = () => {
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<Array<string | undefined>>([]);
  const tableName = "memories";

  const chatCompletion = eleganceClient.hooks.useSearchChatCompletion();
  const handleClick = async () => {
    if (!value || !tableName) return;
    try {
      const completion = await chatCompletion.execute({
        collection: tableName,
        textField: "memory",
        prompt: value.trim(),
        embeddingField: "embeddings",
        minSimilarity: 0.6,
        maxContextLength: 3000,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        value,
        completion?.context,
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message ? message : "No message"} />
        ))}
      </div>
      <div className="input-container">
        <input
          placeholder="Type your question here..."
          disabled={chatCompletion.isLoading}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="send"
          onClick={handleClick}
          disabled={!value || chatCompletion.isLoading}
        >
          ➤
        </button>
      </div>
    </>
  );
};

export default Chat;
