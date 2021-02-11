import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { isEmpty } from '../../utils';

interface Props {
  disabled?: boolean;
  children: string | string[] | React.ReactElement | React.ReactElement[];
  to?: string;
  className?: string;
  count?: number;
}
const CustomLink: React.FC<Props> = ({
  disabled = false,
  children,
  to,
  className,
  count,
}) => {
  if (!disabled && !isEmpty(to)) {
    return (
      <Link to={to || ''} className={classnames(className, 'relative')}>
        {count && count > 0 && (
          <div className="absolute top-0 right-0 bg-red-primary w-4 h-4 text-xs rounded-full text-white flex flex-row justify-center items-center">
            {count}
          </div>
        )}
        {children}
      </Link>
    );
  }
  return <span className={className}>{children}</span>;
};

export default CustomLink;
