interface ButtonProps {
  label: string;
  disabled?: boolean;
  large?: boolean;
  primary?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  disabled = false,
  large = false,
  primary = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg p-2 font-semibold ${
        primary
          ? 'bg-sky-600 hover:bg-sky-800 text-neutral-200'
          : 'bg-neutral-400 hover:bg-neutral-500 text-black'
      } ${large ? 'text-4xl' : ''} ${
        disabled
          ? 'cursor-not-allowed bg-slate-700 text-slate-600 hover:bg-slate-700'
          : 'cursor-pointer'
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
