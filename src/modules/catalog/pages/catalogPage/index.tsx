import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  LinearProgress,
} from "@mui/material";
import { getAll } from "modules/productManagement/services/products.services";
import Carousel from "react-material-ui-carousel";
import { ProductItem } from "modules/catalog/types";
import { useEffect, useState } from "react";
import { Product } from "modules/productManagement/types";
import { AnimatedContainer } from "core/components";

const PicForCarousel = (isSmall?: boolean) => {
  const randomNum = Math.floor(Math.random() * 1000);
  const width = isSmall ? 500 : 2000;
  const height = isSmall ? 300 : 400;
  return `https://picsum.photos/seed/${randomNum}/${width}/${height}`;
};

const toProductItem = (products: Product[]): ProductItem[] => {
  return products.map((product) => ({
    name: product.name,
    description: product.description,
    price: product.value,
    image: product.image,
  }));
};
export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (!products.length && !isLoading) {
      getAll()
        .then(({ data }) => {
          if (!data) return;
          setProducts(toProductItem(data.data));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) return <LinearProgress />;
  return (
    <AnimatedContainer maxWidth={"xl"} margin="0 auto" mt={3} px={5} boxSizing="border-box">
      <Typography variant="h4" align="left" color="text.secondary" sx={{ mr: 1 }}>
        Bienvenido a nuestra tienda de ropa
      </Typography>
      <Typography variant="h6" align="left" color="text.secondary" sx={{ mb: 2, mr: 1 }}>
        Aquí encontrarás todo lo que necesitas
      </Typography>
      <Carousel>
        <img src={PicForCarousel()} alt="1" width={2000} height={400} />
        <img src={PicForCarousel()} alt="2" width={2000} height={400} />
        <img src={PicForCarousel()} alt="3" width={2000} height={400} />
        <img src={PicForCarousel()} alt="3" width={2000} height={400} />
        <img src={PicForCarousel()} alt="3" width={2000} height={400} />
        <img src={PicForCarousel()} alt="3" width={2000} height={400} />
      </Carousel>

      <Typography variant="h5" align="left" color="text.secondary" sx={{ mb: 2, mr: 1, mt: 5 }}>
        Nuestros productos
      </Typography>
      <Divider />
      <Grid container spacing={2} my={4} rowGap={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 370, margin: "0 auto" }}>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <Typography variant="h6" align="right" color="text.secondary" sx={{ mb: 1, mr: 1 }}>
                ${product.price}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AnimatedContainer>
  );
};
