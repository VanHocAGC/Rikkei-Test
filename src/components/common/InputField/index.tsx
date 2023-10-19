import clsx from 'clsx';
import { FC, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { useToggle } from 'react-use';

import { FieldProps } from 'formik';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { TbAlertCircleFilled } from 'react-icons/tb';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  iconTitle?: ReactNode;
  value?: string;
  block?: boolean;
  width?: 'md' | 'lg' | 'base' | 'xl';
  inputClassName?: string;
  pattern?: 'base' | 'highlight';
  error?: ReactNode;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  arrayError?: boolean;
  hideMessage?: boolean;
}

const InputField: FC<IProps & FieldProps> = ({
  field,
  form,
  type,
  title,
  value,
  placeholder,
  width = 'xl',
  inputClassName,
  className,
  iconRight,
  iconLeft,
  error,
  arrayError,
  hideMessage,
  iconTitle,
  ...props
}) => {
  const { name } = field;
  const { errors, touched } = form;
  const [showError, setShowError] = useState<any>(() => {
    return errors[name] && touched[name];
  });
  const [showPassword, toggleShowPassword] = useToggle(false);
  useEffect(() => {
    setShowError(() => {
      return errors[name] && touched[name];
    });
    // eslint-disable-next-line
  },[errors[name],touched[name]]);
  return (
    <div className={clsx('flex flex-col relative', className)}>
      {title && (
        <div className="font-bold flex items-center text-[13px] text-primary mb-1">
          {iconTitle && <span className="mr-2">{iconTitle}</span>}
          <span>{title}</span>
        </div>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="absolute inset-y-0 left-1 flex items-center justify-center w-8">
            {iconLeft}
          </div>
        )}
        <input
          id={field.name}
          type={type === 'password' && showPassword ? 'text' : type}
          className={clsx(
            'rounded-md text-[color:var(--text-color-black)] px-1 py-[5px] placeholder-[#505470] border-gray-600 border-2',
            { 'pr-8': type === 'password' },
            { 'w-full': width === 'xl' },
            { 'w-[150px]': width === 'lg' },
            { 'w-[80px]': width === 'base' },
            { 'w-[52px]': width === 'md' },
            { 'hover:border-[color:var(--gray-7)]': !error },
            { 'border-[color:var(--red-err)]': showError || arrayError },
            { 'pl-6': iconLeft },
            inputClassName
          )}
          placeholder={placeholder}
          {...props}
          {...field}
        />
        {iconRight && (
          <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8">
            {iconRight}
          </div>
        )}
        {type === 'password' && (
          <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8">
            <button
              type="button"
              className="focus:outline-none text-neutral-500"
              onClick={toggleShowPassword}
            >
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
        )}
      </div>
      {showError && !hideMessage && (
        <div className="mt-1 text-sm text-red-500 font-medium flex items-center space-x-2">
          <TbAlertCircleFilled />
          <span>{errors[name]?.toString()}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;
