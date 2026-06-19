import { ReactNode, useState, ElementType } from 'react';
import { cn } from '../../lib/cn';

interface PrimaryButtonProps {
  children: ReactNode;
  as?: 'a' | 'button';
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function AnimatedText({ text }: { text: string }) {
  return (
    <span className="relative overflow-hidden inline-flex flex-col h-[1.2em]">
      <span className="transition-transform duration-200 ease-out group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute top-full transition-transform duration-200 ease-out group-hover:-translate-y-full">
        {text}
      </span>
    </span>
  );
}

const sizeClasses = {
  sm: 'h-9 px-6 text-xs',
  md: 'h-10 px-7 text-sm',
  lg: 'h-12 px-9 text-sm font-medium',
};

export default function PrimaryButton({
  children,
  as: Tag = 'a',
  href,
  onClick,
  size = 'lg',
  className,
}: PrimaryButtonProps) {
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cn(
        'group inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-black leading-none transition-colors',
        sizeClasses[size],
        className
      )}
    >
      <AnimatedText text={typeof children === 'string' ? children : ''} />
    </Tag>
  );
}
