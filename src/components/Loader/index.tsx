import type { ReactNode } from "react";

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center top-0 bottom-0 left-0 right-0 m-auto select-none">
      <div className="w-12 h-12 border-4 border-[#d1d5db] border-t-[#3b82f6] rounded-full animate-spin mx-auto mt-20 mb-10" />
      <h1 className="text-[15px] text-(--text-primary)">{children}</h1>
    </div>
  );
};

export default Loader;