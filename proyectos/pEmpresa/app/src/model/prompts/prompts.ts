// prompts.ts
// Centraliza los prompts para los hooks de OpenAI
// @ts-ignore
import ibexPromptRaw from './ibexPrompt.txt?raw';

export function ibexPrompt(typeDefinition: string, schemaExample: string) {
  return ibexPromptRaw
    .replace('{{typeDefinition}}', typeDefinition)
    .replace('{{schemaExample}}', schemaExample);
}
