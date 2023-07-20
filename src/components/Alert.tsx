import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  text: string;
}

const icons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
};

const Alert = ({ type = 'info', text }: AlertProps) => {
  const [hidden, toggle] = useState<boolean>(false);
  const Icon = icons[type];

  return (
    <div
      className={clsx(
        'alert',
        `alert-${type}`,
        'cursor-pointer',
        'mt-2',
        hidden && 'hidden'
      )}
      onClick={() => toggle(true)}>
      <Icon className="pointer-events-none h-6 w-6 shrink-0 stroke-current" />
      <span className="pointer-events-none">{text}</span>
      <XMarkIcon className="pointer-events-none h-5 w-6 shrink-0 stroke-current" />
    </div>
  );
};

export default Alert;
