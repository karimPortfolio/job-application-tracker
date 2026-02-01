import { Test, TestingModule } from '@nestjs/testing';
import { AIService } from './ai.service';
import { openRouterClient } from './openrouter.client';

jest.mock('./openrouter.client', () => ({
  openRouterClient: {
    post: jest.fn(),
  },
}));

describe('AIService', () => {
  let service: AIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIService],
    }).compile();

    service = module.get<AIService>(AIService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('run', () => {
    it('should call openRouterClient.post with correct parameters and return content', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: 'AI generated content',
              },
            },
          ],
        },
      };
      (openRouterClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.run({
        prompt: 'Hello AI',
        model: 'test-model',
        temperature: 0.5,
        maxTokens: 100,
        feature: 'test-feature',
      });

      expect(openRouterClient.post).toHaveBeenCalledWith('/chat/completions', {
        model: 'test-model',
        messages: [
          {
            role: 'system',
            content: 'You are a professional HR assistant generating business-safe content.',
          },
          { role: 'user', content: 'Hello AI' },
        ],
        temperature: 0.5,
        max_tokens: 100,
      });
      expect(result).toBe('AI generated content');
    });

    it('should use default values if optional parameters are missing', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: 'Default AI content',
              },
            },
          ],
        },
      };
      (openRouterClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.run({ prompt: 'Default prompt' });

      expect(openRouterClient.post).toHaveBeenCalledWith(
        '/chat/completions',
        expect.objectContaining({
          model: 'meta-llama/llama-3-8b-instruct',
          temperature: 0.4,
          max_tokens: 800,
        })
      );
      expect(result).toBe('Default AI content');
    });

    it('should throw an error if the API call fails', async () => {
      (openRouterClient.post as jest.Mock).mockRejectedValue(new Error('API error'));

      await expect(service.run({ prompt: 'error' })).rejects.toThrow('API error');
    });
  });
});
