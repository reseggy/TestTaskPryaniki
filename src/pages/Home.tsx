import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slices/dataSlice";
import { RootState, AppDispatch } from "../store/store";

import TableData from "../components/common/TableData";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <TableData data={data} />;
};

export default Home;
