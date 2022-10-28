import React from "react";
import AdminLayouts from "../../../components/admin/AdminLayouts";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

const ProductsPage = () => {
  return (
    <AdminLayouts title={"All Products"}>
      <h2>ghggjgjgjghjgjgjgj</h2>
    </AdminLayouts>
  );
};

export default ProductsPage;
