import React,{ReactNode} from 'react';
import { cx } from 'utils';

export interface  FlexCenterProps {
  children:ReactNode,
  className?:string
}

export default function FlexCenter ({children,className}:  FlexCenterProps) {
  return (
    <div className={cx('flex justify-center items-center',className)}>
      {children}
    </div>
  );
}
