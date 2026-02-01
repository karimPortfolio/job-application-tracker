import { Injectable, Logger } from "@nestjs/common"
import { openRouterClient } from "./openrouter.client"

interface RunAIOptions {
  prompt: string
  model?: string
  temperature?: number
  maxTokens?: number
  feature?: string
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name)

  async run({
    prompt,
    model = "meta-llama/llama-3-8b-instruct",
    temperature = 0.4,
    maxTokens = 800,
    feature = "generic",
  }: RunAIOptions): Promise<string> {
    const res = await openRouterClient.post("/chat/completions", {
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a professional HR assistant generating business-safe content.",
        },
        { role: "user", content: prompt },
      ],
      temperature,
      max_tokens: maxTokens,
    })

    return res.data.choices[0].message.content
  }
}
