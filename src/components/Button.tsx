export function Button({
  handleClick,
  value,
}: {
  handleClick: () => void;
  value: string;
}) {
  return (
    <>
      <button className="req-btn" onClick={handleClick}>
        {value}
      </button>
    </>
  );
}
