"use client";

import useInput from "@hook/useInput";
import useShowModal from "@hook/useShowModal";
import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import productService from "@service/productService";
import { useRouter } from "next/navigation";
import { Fragment, SyntheticEvent, useEffect, useState } from "react";

const FormUpdateProduct = (props: {
  id: number | string | undefined;
  title: string | null;
  description: string | null;
  price: string | null;
  author: string | null;
}) => {
  const { show, handleShowModal } = useShowModal();
  const { show: showSnackBar, handleShowModal: handleSnackbar } =
    useShowModal();
  const [isError, setIsError] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const {
    inputValue: titleValue,
    setInputValue: setTitle,
    handleInput: handleTitle,
  } = useInput();
  const {
    inputValue: descValue,
    setInputValue: setDesc,
    handleInput: handleDesc,
  } = useInput();
  const {
    inputValue: priceValue,
    setInputValue: setPrice,
    handleInput: handlePrice,
  } = useInput();
  const {
    inputValue: authorValue,
    setInputValue: setAuthor,
    handleInput: handleAuthor,
  } = useInput();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setTitle(props.title);
    setDesc(props.description);
    setPrice(props.price);
    setAuthor(props.author);
  }, []);

  const resetInput = () => {
    setTitle(null);
    setDesc(null);
    setPrice(null);
    setAuthor(null);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const response = await productService.addProduct({
      title: titleValue,
      description: descValue,
      price: Number(priceValue),
      author: authorValue,
    });

    if (response[0] === 201) {
      setLoading(false);
      resetInput();
      router.refresh();
      handleShowModal();
      handleSnackbar();
    } else {
      setStatus(response[0]);
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
          Data updated successfully
        </Alert>
      </Snackbar>

      <Button variant="outlined" color="warning" onClick={handleShowModal}>
        Edit
      </Button>

      <Modal open={show} onClose={handleShowModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Product
          </Typography>

          {isError && <Alert severity="error">Error: {status}</Alert>}
          {loading && <Alert severity="info">Loading... Please Wait</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Name Product"
              variant="outlined"
              size="small"
              value={titleValue}
              onChange={handleTitle}
              style={{ width: "100%", marginTop: 15 }}
              required
            />

            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              size="small"
              value={descValue}
              onChange={handleDesc}
              style={{ width: "100%", marginTop: 15 }}
              multiline
              required
            />

            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              size="small"
              type="number"
              value={priceValue}
              onChange={handlePrice}
              style={{ width: "100%", marginTop: 15 }}
              required
            />

            <TextField
              id="outlined-basic"
              label="Author"
              variant="outlined"
              size="small"
              value={authorValue}
              onChange={handleAuthor}
              style={{ width: "100%", marginTop: 15 }}
              required
            />

            <Grid
              spacing={2}
              alignItems="end"
              style={{ marginTop: 20 }}
              container
            >
              <Grid item>
                <Button
                  variant="text"
                  color="warning"
                  onClick={handleShowModal}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="warning"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default FormUpdateProduct;
