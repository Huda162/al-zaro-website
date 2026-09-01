// Base URL for your Laravel API. Set VITE_API_BASE_URL in your .env

import { API_URL } from "../constants/API_URL";

// e.g. VITE_API_BASE_URL=http://localhost:8000/api
const API_BASE = API_URL;

export interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

interface ChatResponse {
  reply: string;
}

interface ComposeResponse {
  image_base64: string;
  mime_type: string;
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body.message ?? `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

/**
 * Sends a chat message plus prior history to the Laravel /chat endpoint.
 * If an image is attached, the request is sent as multipart/form-data
 * so the backend can pass it to Gemini as visual context.
 */
export async function sendChatMessage(params: {
  message: string;
  history: ChatHistoryItem[];
  image?: File;
}): Promise<string> {
  const { message, history, image } = params;

  let response: Response;

  if (image) {
    const form = new FormData();
    form.append('message', message);
    form.append('history', JSON.stringify(history));
    form.append('image', image);

    response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      body: form,
    });
  } else {
    response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
  }

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const data: ChatResponse = await response.json();
  return data.reply;
}

/**
 * Sends the user's photo + a product identifier to the Laravel
 * /compose-product endpoint, which asks Gemini to place the product
 * into the scene. Returns a ready-to-render data URL.
 */
export async function composeProductIntoPhoto(params: {
  photo: File;
  productId: string;
}): Promise<{ imageDataUrl: string }> {
  const form = new FormData();
  form.append('photo', params.photo);
  form.append('product_id', params.productId);

  const response = await fetch(`${API_BASE}/compose-product`, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const data: ComposeResponse = await response.json();
  return { imageDataUrl: `data:${data.mime_type};base64,${data.image_base64}` };
}
