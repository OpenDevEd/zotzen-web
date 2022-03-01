import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import InputLabel from '../InputLabel';

interface Props extends InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label: string;
}
const CustomInput: React.FC<Props> = ({
  value,
  onChange,
  error,
  label,
  ...rest
}) => (
  <div className="magnetic-form">
    <InputLabel label={label}>
      <Input
        className="floating-input rounded-md"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </InputLabel>
    <span className="leading-none text-red-600">{error}</span>
  </div>
);

export default CustomInput;
