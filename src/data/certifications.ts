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
    id: 'aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2025',
    credentialUrl: '#',
  },
  {
    id: 'aws-solutions-architect',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: '2025',
    credentialUrl: '#',
  },
];
