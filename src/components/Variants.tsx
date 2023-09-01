import { ChangeEvent, ChangeEventHandler } from 'react';

export type VariantsState = {
  [key: string]: string;
};

const Variants = ({
  variants,
  value,
  variantsKey,
  current,
  setCurrentVariant,
}: {
  variants: string[];
  value: string;
  variantsKey: string;
  current: VariantsState;
  setCurrentVariant: React.Dispatch<React.SetStateAction<VariantsState>>;
}) => {
  const handleChangeVariant: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentVariant({ ...current, [variantsKey]: event.target.value });
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
