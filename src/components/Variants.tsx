const Variants = ({
  variants,
  value,
  setCurrentVariant,
}: {
  variants: string[];
  value: string;
  setCurrentVariant: React.Dispatch;
}) => {
  const handleChangeVariant: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentVariant(event.target.value);
  };

  return (
    <ul className="flex gap-2">
      {variants.map((variant, i) => (
        <li key={i}>
          <label className="label">
            <input
              type="radio"
              value={variant}
              className="radio"
              onChange={handleChangeVariant}
              checked={value === variant}
            />
            {variant}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Variants;
