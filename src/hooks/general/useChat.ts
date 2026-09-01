import { useCallback, useRef, useState } from 'react';
import type { ChatAttachment, ChatMessage } from '../../types/chat';
import { sendChatMessage, composeProductIntoPhoto, type ChatHistoryItem } from '../../api/gemini';

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function useChat(productId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Kept in a ref (not state) since it's only read/written internally,
  // not rendered — avoids extra re-renders on every turn.
  const historyRef = useRef<ChatHistoryItem[]>([]);

  const pushMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  /** Plain chat turn, optionally with one image attached for context. */
  const send = useCallback(
    async (text: string, attachments: ChatAttachment[]) => {
      if (!text.trim() && attachments.length === 0) return;

      pushMessage({
        id: uid(),
        role: 'user',
        text,
        attachments,
        status: 'sent',
      });
      setIsSending(true);

      try {
        const reply = await sendChatMessage({
          message: text,
          history: historyRef.current,
          image: attachments[0]?.file,
        });

        historyRef.current = [
          ...historyRef.current,
          { role: 'user', text },
          { role: 'model', text: reply },
        ];

        pushMessage({ id: uid(), role: 'model', text: reply, status: 'sent' });
      } catch {
        pushMessage({
          id: uid(),
          role: 'model',
          text: "Sorry, I couldn't process that. Please try again.",
          status: 'error',
        });
      } finally {
        setIsSending(false);
      }
    },
    [pushMessage]
  );

  /** Specialized action: composite the product into the attached photo. */
  const placeProductInPhoto = useCallback(
    async (attachment: ChatAttachment) => {
      pushMessage({
        id: uid(),
        role: 'user',
        text: 'Show me this product in my photo',
        attachments: [attachment],
        status: 'sent',
      });
      setIsSending(true);

      try {
        const { imageDataUrl } = await composeProductIntoPhoto({
          photo: attachment.file,
          productId,
        });

        pushMessage({
          id: uid(),
          role: 'model',
          text: 'Here\u2019s how it could look:',
          generatedImage: imageDataUrl,
          status: 'sent',
        });
      } catch {
        pushMessage({
          id: uid(),
          role: 'model',
          text: "I couldn't generate that image. Try a different photo.",
          status: 'error',
        });
      } finally {
        setIsSending(false);
      }
    },
    [productId, pushMessage]
  );

  return { messages, isSending, send, placeProductInPhoto };
}
