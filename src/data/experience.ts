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
  {
    id: 'traffic-predictor',
    company: 'Personal Project',
    role: 'Full Stack Data Engineer & ML Engineer',
    roleVi: 'Full Stack Data Engineer & ML Engineer',
    startDate: '2024-01',
    endDate: null,
    description: [
      'Built end-to-end traffic monitoring and forecasting system for Ho Chi Minh City using HERE Traffic API',
      'Designed automated ETL pipeline with Apache Airflow and PySpark for real-time data processing',
      'Implemented TimeXer transformer model for accurate speed predictions (96-step sequence, 12-step horizon)',
      'Developed Flask REST API backend with MongoDB/DocumentDB for data persistence',
      'Created interactive Next.js dashboard with Leaflet maps for traffic visualization',
      'Deployed infrastructure on AWS using Terraform (ECS Fargate, MWAA, DocumentDB)',
      'Containerized services with Docker and orchestrated with docker-compose for local development',
    ],
    descriptionVi: [
      'Xây dựng hệ thống giám sát và dự báo giao thông toàn diện cho TP.HCM sử dụng HERE Traffic API',
      'Thiết kế ETL pipeline tự động với Apache Airflow và PySpark để xử lý dữ liệu thời gian thực',
      'Triển khai mô hình transformer TimeXer cho dự đoán tốc độ chính xác (chuỗi 96 bước, dự báo 12 bước)',
      'Phát triển backend Flask REST API với MongoDB/DocumentDB cho lưu trữ dữ liệu',
      'Tạo dashboard Next.js tương tác với bản đồ Leaflet để hiển thị giao thông',
      'Triển khai hạ tầng trên AWS sử dụng Terraform (ECS Fargate, MWAA, DocumentDB)',
      'Containerize services với Docker và orchestrate với docker-compose cho phát triển local',
    ],
    tech: ['Python', 'Flask', 'Next.js', 'Apache Airflow', 'PySpark', 'PyTorch', 'TimeXer', 'AWS ECS', 'Terraform', 'MongoDB', 'Docker'],
  },
];
