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
    role: 'Data Engineer & ML Engineer',
    roleVi: 'Data Engineer & ML Engineer',
    startDate: '2025-06',
    endDate: null,
    description: [
      'Design and implement scalable data pipelines for Japan aviation clients',
      'Work with Snowflake for cloud data warehousing and analytics',
      'Work with AWS cloud services (S3, Glue, Redshift, Lambda) for data processing',
      'Collaborate with cross-functional teams to deliver data-driven solutions',
    ],
    descriptionVi: [
      'Thiết kế và triển khai data pipeline cho khách hàng hàng không Nhật Bản',
      'Làm việc với Snowflake cho cloud data warehousing và analytics',
      'Làm việc với AWS cloud services (S3, Glue, Redshift, Lambda) để xử lý dữ liệu',
      'Phối hợp với các team để cung cấp giải pháp dựa trên dữ liệu',
    ],
    tech: ['Python', 'Snowflake', 'AWS', 'Apache Spark', 'SQL', 'Docker'],
  },
];
