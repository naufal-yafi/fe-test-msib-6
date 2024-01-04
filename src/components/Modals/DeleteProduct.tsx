"use client";

import useShowModal from "@hook/useShowModal";
import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import productService from "@service/productService";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const DeleteProduct = (props: {
  id: number | string | undefined;
  nameProduct: string | null;
}) => {
  const { show, handleShowModal } = useShowModal();
  const { show: showSnackBar, handleShowModal: handleSnackbar } =
    useShowModal();
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmitDeleteProduct = async () => {
    setLoading(true);

    const response = await productService.deleteProduct(props.id);

    if (response === 200) {
      setLoading(false);
      router.refresh();
      handleShowModal();
      handleSnackbar();
    } else {
      setStatus(response);
      setIsError(true);
      handleSnackbar();
    }
  };

  const style = {
    position: "absolute",
    borderRadius: ".8rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        onClose={handleSnackbar}
      >
        <Alert severity="success" onClose={handleSnackbar}>
          Data deleted successfully
        </Alert>
      </Snackbar>

      <Button
        variant="text"
        color="error"
        style={{ marginRight: 8 }}
        onClick={handleShowModal}
      >
        Delete
      </Button>

      <Modal open={show} onClose={handleShowModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to remove {props.nameProduct}?
          </Typography>

          {isError && <Alert severity="error">Error: {status}</Alert>}
          {loading && <Alert severity="info">Loading... Please Wait</Alert>}

          <Grid
            spacing={2}
            alignItems="end"
            style={{ marginTop: 20 }}
            container
          >
            <Grid item>
              <Button
                variant="text"
                color="error"
                onClick={handleSubmitDeleteProduct}
                disabled={loading}
              >
                Yes
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                disabled={loading}
                onClick={handleShowModal}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default DeleteProduct;
