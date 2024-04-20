import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { categoryData } from '../Data/Data.js';
import AllCards from '../components/AllCards.js';

const CategoryRest = () => {
  const { name } = useParams();
  const [category, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryData({ categoryName: name });
        setCategoryData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name]); // Fetch data whenever name changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ width: "80%", margin: "auto", minHeight: "100vh", padding: "0 20px",
   
    overflowX: "hidden",
    overflowY: "auto" }}>
      <div style={{
        color: "#282c3f",
        paddingTop: "60px",
        paddingBottom: "8px",
        display: "-ms-flexbox",
        display: "flex",
        msFlexAlign: "center",
        alignItems: "center",
        msFlexPack: "justify",
        justifyContent: "space-between",
        maxWidth: "1260px",
        minWidth: "1260px",
        paddingLeft: "16px",
      }}>
        <div>
        <div style={{ fontSize: "40px", fontWeight: 600 }}>{name}</div>
        <div>Dive into these delicious & flavoursome noodles for a perfect meal</div>
      </div></div>
      <div><AllCards heading={"Restaurants to explore"} data={category} categoryName = {name}/></div>
    </div>
  );
};

export default CategoryRest;
