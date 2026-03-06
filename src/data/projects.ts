export interface Project {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'data-pipeline',
    title: 'Real-time Data Pipeline',
    titleVi: 'Data Pipeline Thời gian thực',
    description:
      'An end-to-end real-time data pipeline using Apache Kafka for streaming, Apache Spark for processing, and AWS S3 for storage. Includes automated monitoring with CloudWatch.',
    descriptionVi:
      'Data pipeline thời gian thực sử dụng Apache Kafka để streaming, Apache Spark để xử lý, và AWS S3 để lưu trữ. Bao gồm giám sát tự động với CloudWatch.',
    tech: ['Python', 'Apache Kafka', 'Apache Spark', 'AWS S3', 'Docker'],
    github: 'https://github.com/vinhky123',
    featured: true,
  },
  {
    id: 'etl-framework',
    title: 'ETL Automation Framework',
    titleVi: 'ETL Automation Framework',
    description:
      'A modular ETL framework built with Apache Airflow and dbt for orchestrating data transformations. Supports incremental loading and data quality checks.',
    descriptionVi:
      'Framework ETL module hóa sử dụng Apache Airflow và dbt để điều phối các phép biến đổi dữ liệu. Hỗ trợ tải incremental và kiểm tra chất lượng dữ liệu.',
    tech: ['Python', 'Apache Airflow', 'dbt', 'PostgreSQL', 'AWS'],
    github: 'https://github.com/vinhky123',
    featured: true,
  },
  {
    id: 'data-warehouse',
    title: 'Cloud Data Warehouse',
    titleVi: 'Cloud Data Warehouse',
    description:
      'Designed and implemented a cloud-native data warehouse on AWS Redshift with automated data ingestion from multiple sources and BI dashboard integration.',
    descriptionVi:
      'Thiết kế và triển khai data warehouse trên AWS Redshift với tự động hóa ingestion dữ liệu từ nhiều nguồn và tích hợp BI dashboard.',
    tech: ['AWS Redshift', 'AWS Glue', 'Python', 'SQL', 'Terraform'],
    github: 'https://github.com/vinhky123',
    featured: true,
  },
  {
    id: 'monitoring-dashboard',
    title: 'Infrastructure Monitoring',
    titleVi: 'Giám sát Hạ tầng',
    description:
      'A comprehensive monitoring solution for data infrastructure with real-time alerts, performance metrics tracking, and automated incident response.',
    descriptionVi:
      'Giải pháp giám sát toàn diện cho hạ tầng dữ liệu với cảnh báo thời gian thực, theo dõi metrics hiệu suất, và phản hồi sự cố tự động.',
    tech: ['Python', 'AWS CloudWatch', 'Docker', 'Grafana'],
    github: 'https://github.com/vinhky123',
    featured: false,
  },
];
