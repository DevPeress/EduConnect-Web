/* eslint-disable @typescript-eslint/no-explicit-any */
const CadastroFlex2 = ({ opcao1, opcao2, infos, setInfos }: { opcao1: string, opcao2: string, infos: any, setInfos: (prevDados: any) => void }) => {
    const Tipo = (dado: string) => {
        switch (dado) {
            case "Matrícula":
                return "matricula";
            case "Status":
                return "status";
            case "Data de Nascimento":
                return "nasc";
            case "Turma":
                return "turma";
            case "E-mail":
                return "email";
            case "Telefone":
                return "telefone";
            default:
                return "";
        }
    }

    const tipo1: string = Tipo(opcao1);
    const tipo2: string = Tipo(opcao2);

    const TipoDiv = (Escolhas: string) => {
        switch (Escolhas) {
            case "nasc":
                return (
                    <input value={infos[tipo2]} onChange={(e) => setInfos((prevDados: any) => ({ ...prevDados, [tipo2]: e.target.value }))} type="date" className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="nasc" name="nasc" required />
                )
            case "email":
                return (
                    <input value={infos[tipo2]} onChange={(e) => setInfos((prevDados: any) => ({ ...prevDados, [tipo2]: e.target.value }))} type="email" className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="email" name="email" required />
                )
            case "telefone":
                return (
                    <input value={infos[tipo2]} onChange={(e) => setInfos((prevDados: any) => ({ ...prevDados, [tipo2]: e.target.value }))} type="text" className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="telefone" name="telefone" required />
                )
            case "status":
                return (
                    <select value={infos[tipo2]} onChange={(e) => setInfos((prevDados: any) => ({ ...prevDados, [tipo2]: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="status" name="status" required>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                        <option value="Suspenso">Suspenso</option>
                    </select>
                )
            case "turma":
                return (
                    <select value={infos[tipo2]} onChange={(e) => setInfos((prevDados: any) => ({ ...prevDados, [tipo2]: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="turma" name="turma" required>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                        <option value="Suspenso">Suspenso</option>
                    </select>
                )
        }
    }

    return (
        <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor={tipo1}>{opcao1} <span className="text-(--red) ml-0.5">*</span></label>
                {TipoDiv(tipo1)}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor={tipo2}>{opcao2} <span className="text-(--red) ml-0.5">*</span></label>
                {TipoDiv(tipo2)}
            </div>
        </div>
    )
}

export default CadastroFlex2;
