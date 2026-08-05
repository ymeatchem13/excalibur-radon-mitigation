import type { ComponentType } from "react";
import {
  Building2,
  ClipboardCheck,
  Gauge,
  Hammer,
  Home,
  KeyRound,
  type LucideProps,
} from "lucide-react";

export const serviceIcons: Record<string, ComponentType<LucideProps>> = {
  gauge: Gauge,
  home: Home,
  clipboard: ClipboardCheck,
  hammer: Hammer,
  building: Building2,
  key: KeyRound,
};
