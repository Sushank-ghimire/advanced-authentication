import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen overflow-x-hidden w-screen bg-gradient-to-r from-cyan-400 via-violet-400 mx-auto to-indigo-500">
      {children}
    </main>
  );
};

export default MainLayout;
