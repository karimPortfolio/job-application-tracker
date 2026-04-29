"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCandidateResumeParsingPrompt = buildCandidateResumeParsingPrompt;
function buildCandidateResumeParsingPrompt(resumeText, email, phone) {
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
//# sourceMappingURL=candidate-resume-parsing.prompt.js.map