import { useState } from "react";

const useShowModal = (): {
  show: boolean;
  handleShowModal: () => void;
} => {
  const [show, setShow] = useState<boolean>(false);

  const handleShowModal = () => {
    setShow(!show);
  };

  return {
    show,
    handleShowModal,
  };
};

export default useShowModal;
