import { useState } from "react";

const useInput = (): {
  inputValue: string | null;
  setInputValue: React.Dispatch<React.SetStateAction<string | null>>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    setInputValue,
    handleInput,
  };
};

export default useInput;
