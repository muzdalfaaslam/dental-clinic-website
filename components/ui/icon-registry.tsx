import {
  Bot,
  Calendar,
  Clock,
  FileText,
  Globe,
  Images,
  MapPin,
  MessageSquare,
  Palette,
  PhoneCall,
  Repeat,
  Search,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

/**
 * Central icon registry. Content config references icons by string key (keeping
 * config pure data with no React imports); components resolve them here. All icons
 * are thin-stroke Lucide line icons — recolored to sage/gold via `currentColor`
 * and Tailwind text classes at the call site. No clip-art (brief §5).
 */
export const ICONS = {
  bot: Bot,
  calendar: Calendar,
  clock: Clock,
  fileText: FileText,
  globe: Globe,
  images: Images,
  mapPin: MapPin,
  messageSquare: MessageSquare,
  palette: Palette,
  phoneCall: PhoneCall,
  repeat: Repeat,
  search: Search,
  smartphone: Smartphone,
  sparkles: Sparkles,
  users: Users,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

export function getIcon(key: IconKey): LucideIcon {
  return ICONS[key];
}
