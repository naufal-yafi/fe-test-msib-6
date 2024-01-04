import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, Container, Divider, Typography } from "@mui/material";
import TableListProduct from "./TableListProduct";

const ListProduct = () => {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Typography variant="h4">List Products</Typography>
      <Divider />

      <Button
        variant="contained"
        size="medium"
        color="success"
        startIcon={<AddBoxIcon />}
        href="/product/create"
      >
        Add Product
      </Button>

      <TableListProduct />
    </Container>
  );
};

export default ListProduct;
