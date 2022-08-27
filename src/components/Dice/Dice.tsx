import { dice, pip } from './Dice.css';

type Props = {
  value: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Dice = ({ value }: Props): JSX.Element => (
  <div className={dice}>
    {Array(value)
      .fill(0)
      .map((_, i) => (
        <div className={pip} key={i} />
      ))}
  </div>
);
