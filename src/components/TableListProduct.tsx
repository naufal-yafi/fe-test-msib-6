import FormAddProduct from "@modal/FormAddProduct";
import FormUpdateProduct from "@modal/FormUpdateProduct";
import {
  Divider,
  Link,
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
import DeleteProduct from "./Modals/DeleteProduct";

const TableListProduct = async () => {
  const products: ProductType[] = await productService.getAll();

  const COUNT_PRODUCT = products.length;

  return (
    <Fragment>
      <FormAddProduct />

      <Divider sx={{ mt: 5 }} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
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
            {COUNT_PRODUCT === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Product data is empty, let&apos;s create a new one...
                </TableCell>
              </TableRow>
            ) : (
              <>
                {products?.map((product: ProductType) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Link href={`/product/${product.id}`}>
                        {product.title}
                      </Link>
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.author}</TableCell>
                    <TableCell>
                      <DeleteProduct
                        id={product.id}
                        nameProduct={product.title}
                      />
                      <FormUpdateProduct
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        price={`${product.price}`}
                        author={product.author}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TableListProduct;
