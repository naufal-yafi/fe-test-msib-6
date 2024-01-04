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
import styleModals from "./styleModals";

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
        sx={{ mr: 2 }}
        onClick={handleShowModal}
      >
        Delete
      </Button>

      <Modal open={show} onClose={handleShowModal}>
        <Box sx={styleModals.boxStyle}>
          <Typography variant="h6" fontWeight="500" component="h2">
            Are you sure you want to delete
          </Typography>
          <Typography variant="h6" component="h2">
            &quot;{props.nameProduct}&quot;
          </Typography>

          {isError && <Alert severity="error">Error: {status}</Alert>}
          {loading && <Alert severity="info">Loading... Please Wait</Alert>}

          <Grid spacing={2} alignItems="end" sx={{ mt: 2 }} container>
            <Grid item>
              <Button
                variant="text"
                color="error"
                onClick={handleSubmitDeleteProduct}
                disabled={loading}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                disabled={loading}
                onClick={handleShowModal}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default DeleteProduct;
