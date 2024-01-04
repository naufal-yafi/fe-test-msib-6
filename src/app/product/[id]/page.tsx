import FormUpdateProduct from "@modal/FormUpdateProduct";
import GrainIcon from "@mui/icons-material/Grain";
import HomeIcon from "@mui/icons-material/Home";
import {
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Typography,
} from "@mui/material";
import productService from "@service/productService";
import ProductType from "@type/product.type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Product Detail - FE Test ADS Digital Partner - Web NextJS | Muhammad Naufal Yafi'",
};

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const product: ProductType = await productService.getByID(params.id);

  return (
    <Container sx={{ mt: 5 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Product Detail
        </Typography>
      </Breadcrumbs>

      <Card variant="outlined" sx={{ mt: 5 }}>
        <CardContent>
          <Typography
            color="text.primary"
            fontWeight="700"
            variant="h3"
            component="h1"
            gutterBottom
          >
            {product.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Rp {product.price},00
          </Typography>
          <Typography variant="body2" component="p">
            {product.description}
          </Typography>
          <Typography variant="caption" component="p">
            <br />~{product.author}
          </Typography>
        </CardContent>
        <CardActions>
          <FormUpdateProduct
            id={product.id}
            title={product.title}
            description={product.description}
            price={`${product.price}`}
            author={product.author}
          />
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProductDetail;
