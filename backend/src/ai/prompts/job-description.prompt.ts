import { JobDescriptionPrompt } from '../types';

export function buildJobDescriptionPrompt(data: JobDescriptionPrompt): string {
  return `
Write a professional job description for the following role:

Title: ${data.title}
Department: ${data.department}
Level: ${data.seniority ?? 'Not specified'}
Employment Type: ${data.employmentType ?? 'Not specified'}
Location: ${data.location ?? 'Not specified'}
Tech Stack: ${data.techStack?.join(', ') || 'Not specified'}

Include:
- Company intro
- Responsibilities
- Requirements
- Nice-to-have
- Benefits
- Equal opportunity statement

Tone: modern, inclusive, concise.
`;
}
