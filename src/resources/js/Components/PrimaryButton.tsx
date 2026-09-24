import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full border border-transparent bg-seafoam-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-seafoam-500 hover:scale-[1.02] focus:bg-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-300 focus:ring-offset-2 active:bg-seafoam-700 ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
