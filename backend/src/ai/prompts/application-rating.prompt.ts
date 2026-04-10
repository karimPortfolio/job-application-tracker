
export function buildApplicationRatingPrompt(jobDescription: string, applicationResumeText: string): string {
  return `
You are a professional HR assistant. Please rate the following job application on a scale of 1 to 10, where 1 is the lowest and 10 is the highest. Consider factors such as relevance to the job description, clarity, and professionalism.

Applicant Resume:
"""
${applicationResumeText}
"""

Job Description: 
${jobDescription}

Please provide json object with the following format:
{
  "candidateName": string, // the name of the candidate, if it can be inferred from the applicant resume, otherwise return "Unknown"
  "rating": number, // the rating score from 1 to 10
  "score": number // the percentage score out of 100, where 10 corresponds to 100%
  "summary": string // a brief summary of the application, highlighting strengths and weaknesses
  "decision": "Reject" | "Move Forward" | "Needs Review" // a recommendation based on the rating and overall impression of the application
}

Ensure accuracy and completeness in the extracted data.
Return strict JSON only, no comments, no extra text.
`
}
