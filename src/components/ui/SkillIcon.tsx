import {
  SiPython,
  SiSqlite,
  SiGnubash,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiDbt,
  SiSnowflake,
  SiDocker,
  SiGit,
  SiLinux,
  SiTerraform,
  SiGithubactions,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { MdOutlineLanguage } from 'react-icons/md';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  SiPython,
  SiSqlite,
  SiGnubash,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiDbt,
  SiSnowflake,
  SiDocker,
  SiGit,
  SiLinux,
  SiTerraform,
  SiGithubactions,
  FaAws,
  MdOutlineLanguage,
};

interface SkillIconProps {
  iconName: string;
  className?: string;
}

export default function SkillIcon({ iconName, className = '' }: SkillIconProps) {
  const Icon = iconMap[iconName] ?? FaAws;
  return <Icon className={className} />;
}
