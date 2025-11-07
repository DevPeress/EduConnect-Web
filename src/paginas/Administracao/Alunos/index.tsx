import Aside from "../../../components/Aside";
import Header from "../../../components/Header";

const AlunosAdmin = () => {
  return (
    <>
      <Aside />

      <main className="flex-1 ml-72 flex flex-col bg-(--bg-body)">
        <Header />
        <div className="py-2 px-8 max-w-[1600px] m-0 mx-auto w-full">
          <div className="mb-4">
            <h1 className="text-[28px] font-bold mb-1 text-(--text-primary)">
              Gerenciamento de Alunos
            </h1>
            <p className="text-[15px] text-(--text-secondary)">
              Visualize e gerencie informações dos estudantes
            </p>
          </div>

          <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <select className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px]">
                <option>Todas as turmas</option>
                <option>9º A</option>
                <option>9º B</option>
                <option>8º A</option>
                <option>8º B</option>
              </select>
              <select className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px]">
                <option>Todos os status</option>
                <option>Ativo</option>
                <option>Inativo</option>
                <option>Suspenso</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AlunosAdmin;
