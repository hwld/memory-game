import { ReactNode } from "react";

export const Board: React.VFC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-3/4 bg-slate-600 flex flex-wrap justify-center rounded-md p-10 ${className}`}
    >
      {children}
    </div>
  );
};
