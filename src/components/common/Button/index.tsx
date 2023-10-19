import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { ImSpinner2 } from 'react-icons/im';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  variant?: 'fill' | 'outline';
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: FC<IProps> = ({
  title,
  icon,
  variant = 'fill',
  disabled,
  loading,
  className,
  onClick = () => {},
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={clsx(
        {
          'bg-primary text-white': variant === 'fill',
        },
        {
          'text-primary border-primary': variant === 'outline',
        },
        ' flex justify-center items-center rounded-md h-[40px] px-6',
        className
      )}
      {...props}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {loading && <ImSpinner2 className="animate-spin" />}
      <span className={'text-md'}>{title}</span>
    </button>
  );
};

export default Button;
