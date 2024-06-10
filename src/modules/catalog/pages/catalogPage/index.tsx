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
import PromoBufandas from "assets/images/promos/sale-bufandas.png";
import PromoEnvios from "assets/images/promos/sales-envios.png";
import PromoInternacional from "assets/images/promos/sales-internacional.png";
import PromoJueves from "assets/images/promos/sales-jueves.png";
import "./index.css";

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
    <AnimatedContainer
      maxWidth={"xl"}
      margin="0 auto"
      mt={3}
      px={5}
      boxSizing="border-box"
    >
      <Typography
        variant="h4"
        align="left"
        color="text.secondary"
        sx={{ mr: 1 }}
      >
        Bienvenido a nuestra tienda de ropa
      </Typography>
      <Typography
        variant="h6"
        align="left"
        color="text.secondary"
        sx={{ mb: 2, mr: 1 }}
      >
        Aquí encontrarás todo lo que necesitas
      </Typography>
      <Carousel animation="slide" navButtonsAlwaysVisible>
        <img src={PromoBufandas} alt="Promo 50% Bufandas" />
        <img src={PromoEnvios} alt="Promo en envios nacionales" />
        <img src={PromoInternacional} alt="Promo en envios internacionales" />
        <img src={PromoJueves} alt="Promo de los jueves" />
      </Carousel>

      <Typography
        variant="h5"
        align="left"
        color="text.secondary"
        sx={{ mb: 2, mr: 1, mt: 5 }}
      >
        Nuestros productos
      </Typography>
      <Divider />
      <Grid container spacing={2} my={4} rowGap={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 370, margin: "0 auto" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <Typography
                variant="h6"
                align="right"
                color="text.secondary"
                sx={{ mb: 1, mr: 1 }}
              >
                ${product.price}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AnimatedContainer>
  );
};
