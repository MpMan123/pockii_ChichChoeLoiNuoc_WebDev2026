import { groq } from '@ai-sdk/groq';

export const models = {
    "instant": groq('llama-3.1-8b-instant'),
    "fast": groq('llama-3.3-70b-versatile'),
    "smart": groq('openai/gpt-oss-120b')
}