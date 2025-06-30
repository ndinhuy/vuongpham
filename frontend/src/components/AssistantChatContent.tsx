"use client";

import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "@app/utils";
import { Button } from "@app/components";
import { ANALYTICS_BASE_API_URL } from "@app/constants";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AssistantChatContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you with your fashion e-commerce analytics today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      const userMessage: Message = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      try {
        const response = await fetch(`${ANALYTICS_BASE_API_URL}/analysis/ask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ prompt: input }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("ReadableStream not supported");
        }

        let assistantMessage: Message = { role: "assistant", content: "" };
        setMessages((prev) => [...prev, assistantMessage]);

        const decoder = new TextDecoder();
        let isCancelled = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);

          assistantMessage.content += chunk;

          setMessages((prev) => (isCancelled ? prev : [...prev.slice(0, -1), { ...assistantMessage }]));
        }
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, there was an error processing your request.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="p-5 pb-20 bg-white rounded w-full h-[90vh] mt-2 max-w-7xl mx-auto flex-1 flex flex-col">
      <div className="mb-5 px-5 flex-1 overflow-y-auto custom-scroll markdown" ref={scrollAreaRef}>
        {messages.map(
          (message, index) =>
            message.content && (
              <div
                key={index}
                className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`flex items-start w-full fade-in-show opacity-show ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className={cn(
                      "w-10 h-10 border flex justify-center items-center rounded-full",
                      message.role === "user" ? "ml-3" : "mr-3",
                    )}
                  >
                    {message.role === "user" ? <User size={20} /> : <Bot size={20} />}
                  </span>
                  <div
                    className={`rounded-xl p-3 overflow-hidden max-w-[80%] flex flex-col gap-3 ${
                      message.role === "user" ? "bg-gray-100" : ""
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      urlTransform={(url) => url}
                      components={{
                        table(props) {
                          return <table {...props} style={{ marginTop: "10px" }} />;
                        },
                        img(props) {
                          console.log(props);

                          return <img {...props} style={{ maxWidth: "100%" }} />;
                        },
                        code(props) {
                          const { children, className, node, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <SyntaxHighlighter
                              PreTag="div"
                              children={String(children).replace(/\n$/, "")}
                              language={match[1]}
                              style={atomOneLight}
                            />
                          ) : (
                            <code {...rest} className={className}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ),
        )}
        {isLoading && (
          <div className={`flex w-full justify-start mb-4`}>
            <div className={`flex items-center w-full`}>
              <span className={cn("w-10 h-10 border flex justify-center items-center rounded-full", "mr-3")}>
                <Bot size={20} />
              </span>
              <div className={`text-gray-500 text-sm`}>Assistant thinking...</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Đặt câu hỏi cho trợ lý Ivy về các số liệu..."
          onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
          className="flex-grow p-4 border rounded-xl"
          disabled={isLoading}
        />
        <Button className="h-full p-4 px-10 rounded-xl" onClick={handleSend} isLoading={isLoading}>
          Send
        </Button>
      </div>
    </section>
  );
}
