import { motion } from "framer-motion";

interface Props {
  color: string;
  size: string;
  delay?: string;
  top: string;
  left: string;
}

// Helper to generate random numbers within a range
const getRandomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const FloatingShapes = ({ color, size, delay = "0", left, top }: Props) => {
  const randomX = [0, getRandomInRange(100, 300), 0];
  const randomY = [0, getRandomInRange(100, 300), 0];
  const randomRotate = [0, getRandomInRange(180, 360)];

  return (
    <motion.div
      animate={{
        x: randomX,
        y: randomY,
        rotate: randomRotate,
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay: parseFloat(delay),
      }}
      style={{ top, left, position: "absolute" }}
      className={`${color} ${size} opacity-20 blur-lg rounded-full z-20`}
      aria-hidden={true}
    />
  );
};

export default FloatingShapes;
