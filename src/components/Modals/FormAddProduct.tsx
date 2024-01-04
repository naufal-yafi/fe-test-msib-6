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
import { Fragment, SyntheticEvent, useState } from "react";
import styleModals from "./styleModals";

const FormAddProduct = () => {
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

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        onClose={handleSnackbar}
      >
        <Alert severity="success" onClose={handleSnackbar}>
          Data added successfully
        </Alert>
      </Snackbar>

      <Button
        variant="contained"
        size="medium"
        color="info"
        onClick={handleShowModal}
        sx={{ mt: 2 }}
      >
        Add Product
      </Button>

      <Modal open={show} onClose={handleShowModal}>
        <Box sx={styleModals.boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Product
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
              sx={styleModals.typographyStyle}
              required
            />

            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              size="small"
              value={descValue}
              onChange={handleDesc}
              sx={styleModals.typographyStyle}
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
              sx={styleModals.typographyStyle}
              required
            />

            <TextField
              id="outlined-basic"
              label="Author"
              variant="outlined"
              size="small"
              value={authorValue}
              onChange={handleAuthor}
              sx={styleModals.typographyStyle}
              required
            />

            <Grid spacing={2} alignItems="end" sx={{ mt: 3 }} container>
              <Grid item>
                <Button
                  variant="text"
                  color="info"
                  onClick={handleShowModal}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="info"
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

export default FormAddProduct;
