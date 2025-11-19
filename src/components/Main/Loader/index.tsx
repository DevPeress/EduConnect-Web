const Loader = () => {
  return (
    <div className="flex h-[835px] items-center justify-center">
      <div className="flex flex-col items-center justify-center select-none">
        <div className="w-35 h-35 border-10 border-[#d1d5db] border-t-[#3b82f6] rounded-full animate-spin mx-auto mb-10" />
        <h1 className="text-[20px] text-(--text-primary)">Carregando os Dados da Página</h1>
      </div>
    </div>
  );
};

export default Loader;
