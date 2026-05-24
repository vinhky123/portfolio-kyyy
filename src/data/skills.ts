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
    category: 'Programming Languages',
    categoryVi: 'Ngôn ngữ lập trình',
    skills: [
      { name: 'Python', icon: 'SiPython' },
      { name: 'SQL', icon: 'SiSqlite' },
      { name: 'Bash/Shell', icon: 'SiGnubash' },
    ],
  },
  {
    category: 'Data Engineering',
    categoryVi: 'Kỹ thuật dữ liệu',
    skills: [
      { name: 'Apache Airflow', icon: 'SiApacheairflow' },
      { name: 'PySpark', icon: 'SiApachespark' },
      { name: 'dbt', icon: 'SiDbt' },
    ],
  },
  {
    category: 'Cloud & Data Platform',
    categoryVi: 'Nền tảng Cloud & Dữ liệu',
    skills: [
      { name: 'AWS', icon: 'FaAws' },
      { name: 'Snowflake', icon: 'SiSnowflake' },
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    categoryVi: 'DevOps & Hạ tầng',
    skills: [
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'Terraform', icon: 'SiTerraform' },
      { name: 'Git', icon: 'SiGit' },
      { name: 'Linux', icon: 'SiLinux' },
    ],
  },
];
