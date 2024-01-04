import { Container, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Container sx={{ paddingTop: 10, paddingBottom: 8 }}>
        <Typography align="center">
          Created by{" "}
          <Link
            href="https://github.com/naufal-yafi/fe-test-msib-6"
            target="_blank"
          >
            Muhammad Naufal Yafi&apos;
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
