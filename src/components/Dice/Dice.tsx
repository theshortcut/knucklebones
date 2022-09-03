import { motion } from 'framer-motion';
import { dice, emptySlot, pip } from './Dice.css';

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

type Props = {
  value: DiceValue;
};

export const Dice = ({ value }: Props): JSX.Element => (
  <motion.div
    className={dice}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {Array(value)
      .fill(0)
      .map((_, i) => (
        <div className={pip} key={i} />
      ))}
  </motion.div>
);

export const EmptySlot = () => <div className={emptySlot} />;
