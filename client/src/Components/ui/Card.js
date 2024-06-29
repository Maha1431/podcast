function Card({ item, imgLength, imgSrc, onClick, alone, className }) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer gap-5 p-2 border border-slate-400 rounded-xl shadow-lg ${className}`}
    >
      <img height={imgLength} width={imgLength} src={imgSrc} />
      <div
        className={`font-bold flex flex-col justify-center ${
          alone ? "text-xs" : "text-sm"
        }`}
      >
        <div>Upload</div>
        <div>{item}</div>
      </div>
    </div>
  );
}

export default Card;
