import { ArrowLeft, MessageSquareText } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const ICONS: Record<string, React.FC> = {
  "text-message-icon": MessageSquareText,
  "settings-panel-back-button": ArrowLeft
}

const generateID = (): string => {
  const newUUID = uuidv4()
  return newUUID 
};

export const getIconForId = (id: string): React.FC | null => {
  const IconComponent = ICONS[id];
  if (!IconComponent) {
    console.warn(`Icon "${id}" not found`);
    return null;
  }
  return IconComponent
};

export {
  generateID
};

