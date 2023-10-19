import { FC, useId } from 'react';
import ReactSelect, { Props } from 'react-select';
import makeAnimated from 'react-select/animated';

interface IProps extends Props {
  name: string;
  title?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  height?: string;
  inputClassName?: string;
}
const animatedComponents = makeAnimated();

const Select: FC<IProps> = ({
  name,
  title,
  placeholder = '',
  className = '',
  error,
  height,
  inputClassName,
  ...props
}) => {
  return (
    <div className={`w-full flex items-center gap-x-4 ${className}`}>
      {title && (
        <div className="text-lg text-[#5B5F7B] mb-2 font-semibold">{title}</div>
      )}
      <ReactSelect
        instanceId={useId()}
        className={`${inputClassName} absolute top-0 left-0 w-[100%] min-w-[250px] z-20`}
        classNamePrefix="select"
        menuPlacement="auto"
        name={name}
        isMulti
        components={animatedComponents}
        styles={{
          control: (base, state) => ({
            ...base,
            boxShadow: 'none',
            borderColor: error
              ? 'rgb(239 68 68)'
              : state.isFocused
              ? '#E4E6EE'
              : 'var(--primary-3)',
            '&:hover': {
              borderColor: error ? 'rgb(239 68 68)' : 'var(--primary-4)',
            },
            height: height ? height : '40px',
          }),
        }}
        placeholder={placeholder}
        {...props}
      />
      {!!error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default Select;
