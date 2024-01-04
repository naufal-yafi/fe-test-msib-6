import TableListProduct from "@component/TableListProduct";
import { Container, Typography } from "@mui/material";

const ListProduct = () => {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Typography variant="h4">List Products</Typography>

      <TableListProduct />
    </Container>
  );
};

export default ListProduct;
