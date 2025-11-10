import type { ReactNode } from "react";

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#d1d5db] border-t-[#3b82f6] rounded-full animate-spin mx-auto mt-20" />
      <h1 className="text-[13px] text-(--text-primary)">{children}</h1>
    </div>
  );
};

export default Loader;