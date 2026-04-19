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
      { name: 'TypeScript', icon: 'SiTypescript' },
      { name: 'SQL', icon: 'SiSqlite' },
      { name: 'Bash/Shell', icon: 'SiGnubash' },
      { name: 'English (Professional)', icon: 'MdOutlineLanguage' },
    ],
  },
  {
    category: 'Cloud & AWS',
    categoryVi: 'Cloud & AWS',
    skills: [
      { name: 'AWS ECS', icon: 'FaAws' },
      { name: 'AWS S3', icon: 'FaAws' },
      { name: 'AWS Lambda', icon: 'FaAws' },
      { name: 'AWS DocumentDB', icon: 'FaAws' },
      { name: 'AWS MWAA', icon: 'FaAws' },
      { name: 'AWS EC2', icon: 'FaAws' },
    ],
    hasMore: true,
  },
  {
    category: 'Data Engineering & ML',
    categoryVi: 'Data Engineering & ML',
    skills: [
      { name: 'Apache Airflow', icon: 'SiApacheairflow' },
      { name: 'PySpark', icon: 'SiApachespark' },
      { name: 'PyTorch', icon: 'SiPytorch' },
      { name: 'TimeXer', icon: 'SiPytorch' },
      { name: 'MongoDB', icon: 'SiMongodb' },
      { name: 'Flask', icon: 'SiFlask' },
    ],
  },
  {
    category: 'Frontend & DevOps',
    categoryVi: 'Frontend & DevOps',
    skills: [
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'React', icon: 'SiReact' },
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'Terraform', icon: 'SiTerraform' },
      { name: 'Git', icon: 'SiGit' },
      { name: 'Linux', icon: 'SiLinux' },
    ],
  },
];
