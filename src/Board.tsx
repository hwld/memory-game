import { ReactNode } from "react";

export const Board: React.VFC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-min bg-slate-500 grid grid-cols-[repeat(5,min-content)] rounded-md p-10 ${className}`}
    >
      {children}
    </div>
  );
};
