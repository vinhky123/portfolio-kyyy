export interface Experience {
  id: string;
  company: string;
  role: string;
  roleVi: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  descriptionVi: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    id: 'fpt',
    company: 'FPT Software',
    role: 'Data Engineer',
    roleVi: 'Data Engineer',
    startDate: '2025-06',
    endDate: null,
    description: [
      'Design and implement scalable data pipelines for enterprise clients',
      'Work with AWS cloud services (S3, Glue, Redshift, Lambda) for data processing',
      'Collaborate with cross-functional teams to deliver data-driven solutions',
      'Optimize ETL processes for improved performance and reliability',
    ],
    descriptionVi: [
      'Thiết kế và triển khai data pipeline cho khách hàng doanh nghiệp',
      'Làm việc với AWS cloud services (S3, Glue, Redshift, Lambda) để xử lý dữ liệu',
      'Phối hợp với các team để cung cấp giải pháp dựa trên dữ liệu',
      'Tối ưu hóa quy trình ETL để cải thiện hiệu suất và độ tin cậy',
    ],
    tech: ['Python', 'AWS', 'Apache Spark', 'SQL', 'Docker'],
  },
];
