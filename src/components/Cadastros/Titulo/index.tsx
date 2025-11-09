const CadastroTitulo = ({ titulo, cancelar }: { titulo: string, cancelar: () => void }) => {
    return (<div className="py-6 px-7 border border-(--border-color) flex justify-between bg-[#00000033]">
        <h2 className="text-[20px] font-bold text-(--text-primary) flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            {titulo}
        </h2>
        <button onClick={cancelar} className="bg-transparent border-none text-(--text-secondary) cursor-pointer p-2 rounded-[10px] flex items-center justify-center hover:bg-(--alert-color) hover:text-(--red)" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>)
}

export default CadastroTitulo;
