export type ChatRole = 'user' | 'model';

export interface ChatAttachment {
  id: string;
  file: File;
  previewUrl: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  attachments?: ChatAttachment[];
  /** Base64 data URL returned by the compose-product endpoint */
  generatedImage?: string;
  status?: 'sent' | 'error';
}
