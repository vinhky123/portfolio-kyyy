export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badge?: string;
  row: 1 | 2 | 3;
}

export const certifications: Certification[] = [
  {
    id: 'dea-c01',
    name: 'AWS Certified Data Engineer – Associate',
    issuer: 'Amazon Web Services',
    date: '2026',
    credentialUrl:
      'https://www.credly.com/badges/9fdb3595-780c-467a-a07e-f57bef7e9047/linked_in?t=tfjj4g',
    badge: '/badges/dea-c01.png',
    row: 1,
  },
  {
    id: 'toeic',
    name: 'TOEIC Reading and Listening (875/990)',
    issuer: 'ETS',
    date: '2025',
    row: 2,
  },
  {
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: '2026',
    credentialUrl:
      'https://www.credly.com/badges/290403d8-648b-48b4-9e6f-8e97250ca1e4/linked_in?t=tdc39g',
    badge: '/badges/aws-ai-practitioner.png',
    row: 3,
  },
  {
    id: 'aws-agentic-ai-demonstrated',
    name: 'AWS Agentic AI Demonstrated',
    issuer: 'Amazon Web Services Training and Certification',
    date: '2026',
    credentialUrl:
      'https://www.credly.com/badges/79d5aa5b-f4df-4e1e-b298-1598c42581f1/public_url',
    badge: '/badges/aws-agentic-demonstrated.png',
    row: 3,
  },
  {
    id: 'aws-serverless-demonstrated',
    name: 'AWS Serverless Demonstrated',
    issuer: 'Amazon Web Services Training and Certification',
    date: '2026',
    credentialUrl:
      'https://www.credly.com/badges/9ee2df2b-eadc-4bf1-994b-ce5e889dc1ff/public_url',
    badge: '/badges/aws-serverless-demonstrated.png',
    row: 3,
  },
];
