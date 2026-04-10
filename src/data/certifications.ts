export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badge?: string;
}

export const certifications: Certification[] = [
  {
    id: 'toeic',
    name: 'TOEIC Certificate Reading and Listening (875/990)',
    issuer: 'ETS',
    date: '2025',
    credentialUrl: '#',
  },
  {
    id: 'aws-ai-practitioner',
    name: 'AWS AI Practitioner',
    issuer: 'Amazon Web Services',
    date: '2026',
    credentialUrl: '#',
  },
  {
    id: 'aws-data-engineer-associate',
    name: 'AWS Certified Data Engineer – Associate',
    issuer: 'Amazon Web Services',
    date: '2026',
    credentialUrl: '#',
  },
];
