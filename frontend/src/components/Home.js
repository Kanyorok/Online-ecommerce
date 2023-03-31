import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productAction";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useParams } from "react-router-dom";

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resPerPage } = useSelector((state) => state.products)
  const { keyword } = useParams();
  
  const Keyword = keyword

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts(Keyword, currentPage));


  }, [dispatch, Keyword, alert, currentPage, error])

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={" Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'>>'}
                prevPageText={'<<'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}


        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
