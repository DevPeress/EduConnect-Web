/* eslint-disable @typescript-eslint/no-explicit-any */
const CadastroFlex2 = ({ opcao1, opcao2, infos, setInfos }: { opcao1: string, opcao2: string, infos: any, setInfos: (prevDados: any) => void }) => {
    return (
        <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="matricula">{opcao1} <span className="text-(--red) ml-0.5">*</span></label>
                <input className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" type="text" id="matricula" name="matricula" required />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="status">{opcao2} <span className="text-(--red) ml-0.5">*</span></label>
                <select value={infos.status} onChange={(e) => setInfos((prevDados: any) => ({ ...prevDados, status: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="status" name="status" required>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Suspenso">Suspenso</option>
                </select>
            </div>
        </div>
    )
}

export default CadastroFlex2;
