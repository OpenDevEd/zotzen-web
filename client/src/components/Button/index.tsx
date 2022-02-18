import React from 'react';
import { Spin } from 'antd';
import classnames from 'classnames';

interface Props {
  block?: boolean;
  onClick?: () => void;
  title?: string;
  classes?: string | Array<string>;
  size?: 'small' | 'medium' | 'large';
  shadow?: boolean;
  loading?: boolean;
  children?: string | string[] | React.ReactElement | React.ReactElement[];
  buttonType: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  type?: 'primary' | 'success' | 'sedondary' | 'danger' | 'default';
  rounded?: boolean;
}

const CustomButton: React.FC<Props> = ({
  block,
  onClick,
  title,
  classes,
  type = 'primary',
  size,
  shadow,
  loading,
  children,
  buttonType = 'button',
  disabled,
  rounded = true,
}) => {
  const styles = classnames('p-2 font-medium  text-white px-3', classes, {
    rounded,
    'w-full': block,
    'p-3': size === 'large',
    'p-2': size === 'medium',
    'p-1': size === 'small',
    'shadow-xl': shadow,
    ...(disabled
      ? { 'bg-gray-300': true }
      : {
        'bg-red-primary': type === 'primary',
        'bg-opacity-0': type === 'default',
        'bg-blue-primary': type === 'sedondary',
      }),
  });
  return (
    <button
      className={styles}
      onClick={onClick}
      disabled={loading || disabled}
      type={buttonType}
    >
      <div>
        {loading ? (
          <Spin className="bg-transparent">{children || title}</Spin>
        ) : (
          children || title
        )}
      </div>
    </button>
  );
};

export default CustomButton;
