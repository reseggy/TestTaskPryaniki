import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" color="error" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography variant="h6" gutterBottom>
        Возможно, неправильно введён адрес или страница была удалена.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default NotFound;
