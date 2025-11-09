/* eslint-disable @typescript-eslint/no-explicit-any */
const CadastroFlex1 = ({ titulo, infos, setInfos, place }: { titulo: string, infos: any, setInfos: (prevDados: any) => void, place: string }) => {
    return (
        <div className="grid grid-cols-1 gap-5 mb-5">
            <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="m">{titulo} <span className="text-(--red) ml-0.5">*</span></label>
                <input value={infos.nome} onChange={(e) => setInfos((prevDados: any) => ({ ...prevDados, nome: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" type="text" id="nome" name="nome" placeholder={place} required />
            </div>
        </div>
    )
}

export default CadastroFlex1;
