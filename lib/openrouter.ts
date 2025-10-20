import OpenAI from 'openai'

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'HPZ Crew Dashboard',
  },
})

export interface ChatCompletionOptions {
  model?: string
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  temperature?: number
  max_tokens?: number
}

export async function createChatCompletion({
  model = 'meta-llama/llama-3.1-8b-instruct:free',
  messages,
  temperature = 0.7,
  max_tokens = 1000,
}: ChatCompletionOptions) {
  try {
    const completion = await openrouter.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    })

    return completion.choices[0].message
  } catch (error) {
    console.error('OpenRouter API error:', error)
    throw new Error('Failed to generate chat completion')
  }
}

export async function createStreamingChatCompletion({
  model = 'meta-llama/llama-3.1-8b-instruct:free',
  messages,
  temperature = 0.7,
  max_tokens = 1000,
}: ChatCompletionOptions) {
  try {
    const stream = await openrouter.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
      stream: true,
    })

    return stream
  } catch (error) {
    console.error('OpenRouter streaming API error:', error)
    throw new Error('Failed to create streaming chat completion')
  }
}

export default openrouter