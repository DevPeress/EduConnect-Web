import type { ReactNode } from "react";

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="w-20 h-20 border-4 border-[#d1d5db] border-t-[#3b82f6] rounded-full animate-spin mx-auto mb-10" />
      <h1 className="text-[15px] text-(--text-primary)">{children}</h1>
    </div>
  );
};

export default Loader;