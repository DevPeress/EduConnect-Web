interface Img {
  foto: string;
  nome: string;
  data: string;
  registro?: string;
  tabela: boolean;
}

const ImgExibicao = ({ foto, nome, data, registro, tabela }: Img) => {
  return tabela ? (
    <div className="flex items-center gap-3">
      <img
        className="w-10 h-10 rounded-[50%] object-cover border-2 border-(--border-color)"
        src={foto}
        alt="Imagem da Pessoa"
      />
      <div>
        <p className="font-semibold">{nome}</p>
        <p className="text-[12px] text-(--text-muted)">
          {new Date(data + "T00:00:00").toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-3">
      <img
        className="w-35 h-35 rounded-[50%] object-cover border-2 border-(--border-color) mt-2"
        src={foto}
        alt="Imagem do Aluno"
      />
      <div className="px-5 border-b-2 border-(--border-color) text-[14px]">
        <span className="font-semibold text-(--primary-color) text-[13px]">
          {registro}
        </span>
      </div>
      <div className="text-center">
        <p className="font-semibold">{nome}</p>
        <p className="text-[12px] text-(--text-muted)">
          {new Date(data + "T00:00:00").toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  );
};

export default ImgExibicao;
