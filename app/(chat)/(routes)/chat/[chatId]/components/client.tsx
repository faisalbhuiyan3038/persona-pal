"use client";

import { ChatHeader } from "@/components/chat-header";
import { useCompletion } from "ai/react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ChatForm } from "@/components/chat-form";
import { ChatMessages } from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[],
    _count: {
      messages: number;
    };
  };
};

export const ChatClient = ({
  companion
}: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);
  const [error, setError] = useState<string | null>(null);

  const {
    input, isLoading, handleInputChange, handleSubmit, setInput
  } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onError: (error) => {
      console.error("Completion error:", error);
    },
    onFinish: (prompt, completion) => {
      console.log("inside onfinish: ");
      console.log(prompt + completion);
      const systemMessage: ChatMessageProps = {
        role: "system",
        content: completion,
      };
      setMessages((messages) => [...messages, systemMessage]);
      setInput("");

      router.refresh();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm isLoading={isLoading} input={input} handleInputChange={handleInputChange}
        onSubmit={onSubmit} />
    </div>
  );
};
