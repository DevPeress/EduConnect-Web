const ProfessoresCard = () => {
  return (
    <div className="w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 bg-[#10B9811A] text-(--green)">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
  );
};

export default ProfessoresCard;
