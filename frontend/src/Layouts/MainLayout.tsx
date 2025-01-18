import React from "react";
import FloatingShapes from "../components/FloatingShapes";

interface Props {
  children: React.ReactNode;
}

const getRandomPercentage = () => `${Math.floor(Math.random() * 101)}%`;

const MainLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen overflow-x-hidden w-screen bg-gradient-to-br via-green-900 to-emerald-900 from-gray-900 text-white">
      <section className="relative">
        {children}
        {[...Array(10)].map((_, index) => (
          <FloatingShapes
            key={index}
            color={
              [
                "bg-pink-400",
                "bg-blue-400",
                "bg-yellow-400",
                "bg-purple-400",
                "bg-red-400",
                "bg-indigo-400",
              ][index]
            }
            size={
              [
                "w-28 h-28",
                "w-36 h-36",
                "w-36 h-36",
                "w-24 h-24",
                "w-25 h-25",
                "w-42 h-42",
              ][index]
            }
            delay={["0", "0.75", "1.5", "0.3", "0.75", "1.5"][index]}
            top={getRandomPercentage()}
            left={getRandomPercentage()}
          />
        ))}
      </section>
    </main>
  );
};

export default MainLayout;
