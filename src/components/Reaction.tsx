import { useState } from 'react';
import './Reaction.css';

const Reaction = ({ src }: { src: string }) => {
  const [selected, toggle] = useState<boolean>(false);

  return (
    <button
      type="button"
      className="reaction"
      aria-selected={selected}
      onClick={() => toggle(!selected)}>
      <img src={src} alt="" />
    </button>
  );
};

export default Reaction;
