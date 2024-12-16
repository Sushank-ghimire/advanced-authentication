import { useEffect, useRef } from "react";

interface UseTitleProps {
  title: string;
}

const useTitle = ({ title }: UseTitleProps) => {
  const titleRef = useRef(document.title);

  // Change the title whenever the title changes
  useEffect(() => {
    document.title = title;

    // Cleanup function to restore the original title on unmount
    return () => {
      document.title = titleRef.current;
    };
  }, [title]);
};

export default useTitle;
