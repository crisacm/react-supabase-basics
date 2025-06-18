import { cn } from "../utils/Cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className="relative">
      <span className="absolute top-[3px] left-[3px] w-full h-full bg-[var(--color-secondary)]/40 rounded-2xl"></span>
      <div
        className={cn(
          "relative rounded-2xl bg-[var(--color-primary)] w-full max-w-md border border-gray-600",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface cardSectionProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: cardSectionProps) => {
  return (
    <div
      className={cn(
        "p-6 bg-[var(--color-secondary)]/50 rounded-t-2xl border-b-[1px] border-gray-600",
        className
      )}
    >
      {children}
    </div>
  );
};

const Body = ({ children, className }: cardSectionProps) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

const Footer = ({ children, className }: cardSectionProps) => {
  return (
    <div
      className={cn(
        "p-6 bg-[var(--color-secondary)]/50 rounded-b-2xl border-t-[1px] border-gray-600",
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
