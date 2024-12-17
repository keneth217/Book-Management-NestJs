import { Injectable } from '@nestjs/common';
import { CreatePoemsaiDto } from './dto/create-poemsai.dto';
import { UpdatePoemsaiDto } from './dto/update-poemsai.dto';
import OpenAI from 'openai'; // Correct import for the OpenAI client
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PoemsaiService {
  private openai: OpenAI;
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
    const apiKey = this.configService.get<string>('OPEN_API'); // Fetch API key from config
    this.openai = new OpenAI({
      apiKey: apiKey, // Initialize OpenAI client with the API key
    });
  }

  async generatePoem(description: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Use the GPT-3.5 Turbo model
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that creates poems based on descriptions.',
          },
          {
            role: 'user',
            content: `Write a poem based on the following description: ${description}`,
          },
        ],
        max_tokens: 10, // Adjust the length of the poem
        temperature: 0.7, // Controls randomness
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      if (error.response && error.response.status === 429) {
        throw new Error(
          'You have exceeded the quota. Please check your billing details.',
        );
      }
      throw new Error('Error generating poem: ' + error.message);
    }
  }

  create(createPoemsaiDto: CreatePoemsaiDto) {
    return 'This action adds a new poemsai';
  }

  findAll() {
    return `This action returns all poemsai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poemsai`;
  }

  update(id: number, updatePoemsaiDto: UpdatePoemsaiDto) {
    return `This action updates a #${id} poemsai`;
  }

  remove(id: number) {
    return `This action removes a #${id} poemsai`;
  }
}
