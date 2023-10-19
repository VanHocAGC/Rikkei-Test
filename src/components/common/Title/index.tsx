import * as React from 'react';
import FlexCenter from '../center';

export interface ITitleProps {
  name: string;
}

export default function Title({ name }: ITitleProps) {
  return (
    <FlexCenter>
      <h1 
        className="w-fit text-3xl text-primary text-center 
          border-b-[3px] border-b-primary py-2 px-4 uppercase font-semibold my-4">
        {name}
      </h1>
    </FlexCenter>
  );
}
