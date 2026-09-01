import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useChat } from '../hooks/general/useChat';
import type { ChatAttachment } from '../types/chat';
import './ChatWidget.css';

interface ChatWidgetProps {
  /** Identifies which product image the backend should composite in */
  productId: string;
  /** Display name used in copy, e.g. "the Aria Planter" */
  productName?: string;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChatWidget({ productId, productName = 'this product' }: ChatWidgetProps) {
  const { messages, isSending, send, placeProductInPhoto } = useChat(productId);
  const [text, setText] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState<ChatAttachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingAttachment({ id: uid(), file, previewUrl: URL.createObjectURL(file) });
    e.target.value = '';
  };

  const clearAttachment = () => {
    if (pendingAttachment) URL.revokeObjectURL(pendingAttachment.previewUrl);
    setPendingAttachment(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    const attachment = pendingAttachment;
    const message = text;
    setText('');
    clearAttachment();
    await send(message, attachment ? [attachment] : []);
    scrollToBottom();
  };

  const handlePlaceProduct = async () => {
    if (!pendingAttachment || isSending) return;
    const attachment = pendingAttachment;
    clearAttachment();
    await placeProductInPhoto(attachment);
    scrollToBottom();
  };

  return (
    <div className="chat-widget">
      <div className="chat-widget__header">
        <span className="chat-widget__title">Ask about {productName}</span>
      </div>

      <div className="chat-widget__messages" ref={listRef}>
        {messages.length === 0 && (
          <div className="chat-widget__empty">
            Ask a question, or attach a photo of your space to see {productName} in it.
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble chat-bubble--${m.role}`}>
            {m.attachments?.map((a) => (
              <img key={a.id} src={a.previewUrl} alt="Attachment" className="chat-bubble__image" />
            ))}
            {m.generatedImage && (
              <img src={m.generatedImage} alt="Generated result" className="chat-bubble__image" />
            )}
            {m.text && <p className="chat-bubble__text">{m.text}</p>}
          </div>
        ))}

        {isSending && (
          <div className="chat-bubble chat-bubble--model chat-bubble--pending" aria-label="Loading">
            <span className="chat-widget__dot" />
            <span className="chat-widget__dot" />
            <span className="chat-widget__dot" />
          </div>
        )}
      </div>

      {pendingAttachment && (
        <div className="chat-widget__pending">
          <img src={pendingAttachment.previewUrl} alt="Selected" className="chat-widget__pending-thumb" />
          <div className="chat-widget__pending-actions">
            <button type="button" className="chat-widget__ghost-btn" onClick={handlePlaceProduct}>
              Place {productName} here
            </button>
            <button
              type="button"
              className="chat-widget__ghost-btn chat-widget__ghost-btn--muted"
              onClick={clearAttachment}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <form className="chat-widget__composer" onSubmit={handleSubmit}>
        <button
          type="button"
          className="chat-widget__icon-btn"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach a photo"
        >
          +
        </button>
        {/* capture="environment" opens the rear camera directly on mobile */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          hidden
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="chat-widget__input"
        />
        <button
          type="submit"
          className="chat-widget__send-btn"
          disabled={isSending || (!text.trim() && !pendingAttachment)}
        >
          Send
        </button>
      </form>
    </div>
  );
}
