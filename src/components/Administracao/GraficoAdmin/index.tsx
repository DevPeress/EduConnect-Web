const GraficoAdmin = () => {
  return (
    <div className="p-6">
      <div className="m-6 p-6 bg-(--bg-input) rounded-[10px]">
        <svg width="100%" height="200" viewBox="0 0 600 200">
          <polyline
            points="0,150 60,140 120,145 180,120 240,130 300,100 360,110 420,80 480,90 540,60 600,70"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
          />
          <polyline
            points="0,180 60,170 120,165 180,150 240,155 300,140 360,135 420,120 480,115 540,100 600,95"
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
      <div className="flex gap-6 justify-center">
        <div className="flex items-center gap-2 text-[13px] text-(--text-secondary)">
          <span
            className="w-3 h-3 rounded-[3px]"
            style={{ background: "#3b82f6" }}
          ></span>
          <span className="">Média Geral</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-(--text-secondary)">
          <span
            className="w-3 h-3 rounded-[3px]"
            style={{ background: "#10b981" }}
          ></span>
          <span className="">Meta</span>
        </div>
      </div>
    </div>
  );
};

export default GraficoAdmin;
