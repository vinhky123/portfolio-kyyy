export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  categoryVi: string;
  skills: Skill[];
  hasMore?: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    categoryVi: 'Ngôn ngữ',
    skills: [
      { name: 'Python', icon: 'SiPython' },
      { name: 'SQL', icon: 'SiSqlite' },
      { name: 'Bash/Shell', icon: 'SiGnubash' },
      { name: 'English (Professional)', icon: 'MdOutlineLanguage' },
    ],
  },
  {
    category: 'Cloud & AWS',
    categoryVi: 'Cloud & AWS',
    skills: [
      { name: 'AWS S3', icon: 'FaAws' },
      { name: 'AWS Lambda', icon: 'FaAws' },
      { name: 'AWS Glue', icon: 'FaAws' },
      { name: 'AWS Redshift', icon: 'FaAws' },
      { name: 'AWS EC2', icon: 'FaAws' },
      { name: 'AWS DynamoDB', icon: 'FaAws' },
    ],
    hasMore: true,
  },
  {
    category: 'Data Engineering',
    categoryVi: 'Data Engineering',
    skills: [
      { name: 'Apache Spark', icon: 'SiApachespark' },
      { name: 'Apache Kafka', icon: 'SiApachekafka' },
      { name: 'Apache Airflow', icon: 'SiApacheairflow' },
      { name: 'Snowflake', icon: 'SiSnowflake' },
      { name: 'dbt', icon: 'SiDbt' },
    ],
  },
  {
    category: 'Tools & DevOps',
    categoryVi: 'Công cụ & DevOps',
    skills: [
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'Git', icon: 'SiGit' },
      { name: 'Linux', icon: 'SiLinux' },
      { name: 'Terraform', icon: 'SiTerraform' },
      { name: 'GitHub Actions', icon: 'SiGithubactions' },
    ],
  },
];
