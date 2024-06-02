import { v4 as uuidv4 } from 'uuid';
import { ICONS } from "./constants";
import { IconName } from './types/icons';

const generateID = (): string => {
  const newUUID = uuidv4()
  return newUUID 
};

export const getIcon = (name: IconName): React.FC | null => {
  const IconComponent = ICONS[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return IconComponent
};

export {
  generateID
};

