import { useState, useRef } from "react";

export function useDebounceCallback(onStart: () => void, onEnd: () => void, delay: number) {
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerStart = () => {
    if (!isTyping) {
      setIsTyping(true);
      onStart();
    }
  };

  const triggerEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      onEnd();
    }, delay);
  };

  return { triggerStart, triggerEnd };
}
