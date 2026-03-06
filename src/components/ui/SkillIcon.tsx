import {
  SiPython,
  SiPostgresql,
  SiOpenjdk,
  SiGnubash,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiDbt,
  SiDatabricks,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiLinux,
  SiTerraform,
  SiGithubactions,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  SiPython,
  SiPostgresql,
  SiOpenjdk,
  SiGnubash,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiDbt,
  SiDatabricks,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiLinux,
  SiTerraform,
  SiGithubactions,
  FaAws,
};

interface SkillIconProps {
  iconName: string;
  className?: string;
}

export default function SkillIcon({ iconName, className = '' }: SkillIconProps) {
  const Icon = iconMap[iconName];
  if (!Icon) return <FaAws className={className} />;
  return <Icon className={className} />;
}
