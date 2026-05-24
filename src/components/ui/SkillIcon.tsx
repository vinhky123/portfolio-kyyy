import {
  SiPython,
  SiSqlite,
  SiGnubash,
  SiApachespark,
  SiApacheairflow,
  SiDbt,
  SiSnowflake,
  SiDocker,
  SiGit,
  SiLinux,
  SiTerraform,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  SiPython,
  SiSqlite,
  SiGnubash,
  SiApachespark,
  SiApacheairflow,
  SiDbt,
  SiSnowflake,
  SiDocker,
  SiGit,
  SiLinux,
  SiTerraform,
  FaAws,
};

interface SkillIconProps {
  iconName: string;
  className?: string;
}

export default function SkillIcon({ iconName, className = '' }: SkillIconProps) {
  const Icon = iconMap[iconName] ?? FaAws;
  return <Icon className={className} />;
}
