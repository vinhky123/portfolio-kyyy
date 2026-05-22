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
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: '2026',
    credentialUrl:
      'https://www.credly.com/badges/290403d8-648b-48b4-9e6f-8e97250ca1e4/linked_in?t=tdc39g',
    badge: '/badges/aws-ai-practitioner.png',
  },
  {
    id: 'aws-agentic-ai-demonstrated',
    name: 'AWS Agentic AI Demonstrated',
    issuer: 'Amazon Web Services Training and Certification',
    date: '2026',
    credentialUrl:
      'https://www.credly.com/badges/79d5aa5b-f4df-4e1e-b298-1598c42581f1/public_url',
    badge: '/badges/aws-agentic-demonstrated.png',
  },
  {
    id: 'aws-serverless-demonstrated',
    name: 'AWS Serverless Demonstrated',
    issuer: 'Amazon Web Services Training and Certification',
    date: '2026',
    credentialUrl:
      'https://www.credly.com/badges/9ee2df2b-eadc-4bf1-994b-ce5e889dc1ff/public_url',
    badge: '/badges/aws-serverless-demonstrated.png',
  },
  {
    id: 'toeic',
    name: 'TOEIC Reading and Listening (875/990)',
    issuer: 'ETS',
    date: '2025',
  },
];
