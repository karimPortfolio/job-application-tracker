export function buildCandidateResumeParsingPrompt(
  resumeText: string,
  email: string,
  phone: string,
): string {
  return `
You are an expert at parsing resumes and extracting relevant information for job applications. Given the resume text below, extract the following details in a structured JSON format:

- Full Name
${!email ? '- Contact Information (Email)' : ''}
${!phone ? '- Contact Information (Phone Number)' : ''}
- Links (LinkedIn, GitHub, Portfolio)

Resume Text:
"""
${resumeText}
"""

Provide the extracted information in the following JSON format:

{
  "fullName": "",
  "contactInformation": {
    "email": "",
    "phoneNumber": ""
  },
  "links": {
    "linkedin": "",
    "github": "",
    "portfolio": ""
  },
  "location" : {
    "city": "",
    "country": ""
  }
}

Ensure accuracy and completeness in the extracted data.
Return strict JSON only, no comments, no extra text.
`;
}

// TODO: send this JSON structure later to the AI model
// - Professional Summary
// - Work Experience (Company, Role, Duration, Responsibilities)
// - Education (Institution, Degree, Graduation Year)
// - Skills (Technical and Soft Skills)
// - Certifications (if any)
// - Languages (if any)

// "professionalSummary": "",
//   "workExperience": [
//     {
//       "company": "",
//       "role": "",
//       "duration": "",
//       "responsibilities": []
//     }
//   ],
//   "education": [
//     {
//       "institution": "",
//       "degree": "",
//       "graduationYear": ""
//     }
//   ],
//   "skills": [],
//   "certifications": [],
//   "languages": []
