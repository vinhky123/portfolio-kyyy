# Portfolio - Le Vinh Ky

Personal portfolio website showcasing my work as a Data Engineer, ML Engineer, and Cloud (AWS) specialist.

## Featured Project: TrafficPredictor

**TrafficPredictor** - Real-time traffic monitoring and transformer-based speed forecasting for Ho Chi Minh City.

An end-to-end data engineering and machine learning system that:
- **Ingests** live traffic flow data from the HERE Traffic API
- **Processes** it through an automated ETL pipeline (Apache Airflow + PySpark)
- **Serves** speed forecasts via a TimeXer transformer model
- **Visualizes** results on an interactive web dashboard

### Tech Stack

| Component | Technologies |
|-----------|--------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS 4, Leaflet |
| **Backend** | Flask 3, PyTorch, TimeXer, MongoDB/DocumentDB |
| **ETL Pipeline** | Apache Airflow 2.10, PySpark, boto3 |
| **Infrastructure** | Terraform, AWS ECS Fargate, AWS MWAA |
| **Containerization** | Docker, Docker Compose |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

This project is configured for zero-config deployment on [Vercel](https://vercel.com).

## Customization

All portfolio content is in `src/data/` — update your personal info, skills, projects, experience, education, and certifications without touching the components.

## License

MIT
