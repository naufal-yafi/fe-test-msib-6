import ModalFormAddProduct from "@modal/FormAddProduct";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import productService from "@service/productService";
import ProductType from "@type/product.type";
import { Fragment } from "react";

const TableListProduct = async () => {
  const products: ProductType[] = await productService.getAll();

  return (
    <Fragment>
      <ModalFormAddProduct />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name Product</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>#</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products?.map((product: ProductType) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.author}</TableCell>
                <TableCell>
                  <Button>Delete</Button>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TableListProduct;
