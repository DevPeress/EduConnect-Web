interface Img {
  foto: string;
  nome: string;
  data: string;
}

const ImgExibicao = ({ foto, nome, data }: Img) => {
  return (
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
  );
};

export default ImgExibicao;
