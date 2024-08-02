interface ButtonOutlineProps {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
}

function OutlineButton({ children, className, disabled }: ButtonOutlineProps) {
  return (
    <button
      disabled={disabled}
      className={`font-medium tracking-wide py-2 px-5 sm:px-8 border text-white bg-[#31572C] outline-none rounded-l-full rounded-r-full capitalize hover:bg-[#376331] hover:text-white-500 transition-all hover:shadow-orange ${className}`}
    >
      {children}
    </button>
  );
}

export default OutlineButton;
