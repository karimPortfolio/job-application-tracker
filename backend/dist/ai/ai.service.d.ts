interface RunAIOptions {
    prompt: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    feature?: string;
}
export declare class AIService {
    private readonly logger;
    run({ prompt, model, temperature, maxTokens, feature, }: RunAIOptions): Promise<string>;
}
export {};
