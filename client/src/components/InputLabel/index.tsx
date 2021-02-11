import React from 'react';
import classnames from 'classnames';
interface Props {
  label: string;
  children: React.ReactChild | React.ReactChildren;
  hasValue?: boolean;
  classes?: string | Array<string>;
}
export default ({ label, children, hasValue, classes }: Props) => {
  return (
    <div className={classnames('floating-form', classes)}>
      <div
        className={classnames('floating-label rounded', {
          'input-has-value': hasValue,
        })}
      >
        {children}
        <span className="highlight"></span>
        <label className="px-1 py-0">{label}</label>
      </div>
    </div>
  );
};
