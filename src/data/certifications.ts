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
    name: 'TOEIC 875/990',
    issuer: 'ETS',
    date: '2025',
    credentialUrl: '#',
  },
  {
    id: 'aws-data-engineer-associate',
    name: 'AWS Certified Data Engineer – Associate',
    issuer: 'Amazon Web Services',
    date: '2025',
    credentialUrl: '#',
  },
];
