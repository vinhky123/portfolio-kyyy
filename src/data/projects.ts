export interface Project {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  tech: string[];
  github?: string;
  demo?: string;
  architectureImage?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'aviation-data-warehouse',
    title: 'Aviation Data Warehouse Pipeline',
    titleVi: 'Kho Dữ Liệu Hàng Không - Data Pipeline',
    description:
      'A cloud-native data warehouse solution that transforms fragmented aviation data from 3 heterogeneous sources into 7 production-grade analytics-ready data marts. Designed and implemented a daily ETL pipeline orchestrated by Apache Airflow, with PySpark transformations in AWS Glue for data cleaning and standardization, SQL transformations in Snowflake for analytics-ready datasets, and automated workflows enabling enterprise business intelligence.',
    descriptionVi:
      'Giải pháp kho dữ liệu cloud-native chuyển đổi dữ liệu hàng không phân mảnh từ 3 nguồn khác nhau thành 7 data marts sẵn sàng cho phân tích. Thiết kế và triển khai ETL pipeline hàng ngày với Apache Airflow, biến đổi PySpark trong AWS Glue để làm sạch và chuẩn hóa dữ liệu, biến đổi SQL trong Snowflake cho datasets sẵn sàng phân tích, và các workflows tự động hỗ trợ business intelligence doanh nghiệp.',
    tech: ['AWS S3', 'AWS Glue (PySpark)', 'AWS Lambda', 'AWS DynamoDB', 'AWS Redshift', 'Apache Airflow', 'Snowflake (SQL)', 'Python'],
    github: 'https://github.com/vinhky123', // Update with actual repo if available
    featured: true,
  },
  {
    id: 'traffic-predictor',
    title: 'TrafficPredictor - Real-time Traffic Forecasting',
    titleVi: 'TrafficPredictor - Dự báo Giao thông thời gian thực',
    description:
      'An end-to-end data engineering and ML system for real-time traffic monitoring and transformer-based speed forecasting in Ho Chi Minh City. Features an automated ETL pipeline (Apache Airflow + PySpark), TimeXer transformer model for predictions, Flask REST API backend, and an interactive Next.js dashboard with Leaflet maps. Deployed on AWS ECS Fargate with Terraform infrastructure.',
    descriptionVi:
      'Hệ thống data engineering và machine learning toàn diện để giám sát giao thông thời gian thực và dự báo tốc độ dựa trên transformer tại TP.HCM. Bao gồm ETL pipeline tự động (Apache Airflow + PySpark), mô hình TimeXer transformer cho dự đoán, backend Flask REST API, và dashboard Next.js tương tác với bản đồ Leaflet. Triển khai trên AWS ECS Fargate với hạ tầng Terraform.',
    tech: ['Python', 'Flask', 'Next.js', 'Apache Airflow', 'PySpark', 'PyTorch', 'TimeXer', 'AWS ECS', 'Terraform', 'MongoDB', 'Docker'],
    github: 'https://github.com/vinhky123/TrafficPredictor',
    demo: 'https://traffic-predictor.vercel.app', // Update with actual URL if deployed
    featured: true,
  },
];

