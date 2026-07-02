import { icons, LucideProps } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'name'> {
  name: string;
}

export function Icon({ name, color, size, className, ...props }: IconProps) {
  // Convert kebab-case (e.g., "arrow-right") to PascalCase (e.g., "ArrowRight")
  const formattedName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const LucideIcon = icons[formattedName as keyof typeof icons] || icons[name as keyof typeof icons];

  if (!LucideIcon) {
    console.warn(`Lucide icon "${name}" does not exist.`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} {...props} />;
}
