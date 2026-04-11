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
    id: 'toeic',
    name: 'TOEIC Reading and Listening (875/990)',
    issuer: 'ETS',
    date: '2025',
  },
];
