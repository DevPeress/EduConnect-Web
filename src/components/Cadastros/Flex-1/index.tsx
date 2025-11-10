import type { CadastroAlunoType, CadastroProfessorType } from "../../../types/types";

const CadastroFlex1 = ({ titulo, infos, setInfos, place }: { titulo: string, infos: CadastroAlunoType | CadastroProfessorType, setInfos: React.Dispatch<React.SetStateAction<CadastroAlunoType | CadastroProfessorType>>, place: string }) => {
    const Tipo = (dado: string) => {
        switch (dado) {
            case "Nome completo":
                return "nome";
            case "Endereço":
                return "endereco";
            default:
                return "";
        }
    }

    const tipo: string = Tipo(titulo);

    const TipoDiv = () => {
        switch (tipo) {
            case "nome":
                return (
                    <input value={infos[tipo]} onChange={(e) => setInfos((prevDados) => ({ ...prevDados, [tipo]: e.target.value }))} type="text" className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="nome" name="nome" placeholder={place} required />
                )
            case "endereco":
                return (
                    <input value={infos[tipo]} onChange={(e) => setInfos((prevDados) => ({ ...prevDados, [tipo]: e.target.value }))} type="textarea" className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="endereco" name="endereco" placeholder={place} required />
                )
        }
    }

    return (
        <div className="grid grid-cols-1 gap-5 mb-5">
            <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor={tipo}>{titulo} <span className="text-(--red) ml-0.5">*</span></label>
                {TipoDiv()}
            </div>
        </div>
    )
}

export default CadastroFlex1;
