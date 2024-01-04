import { Container } from "@mui/material";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  return <Container>{params.id}</Container>;
};

export default ProductDetail;
