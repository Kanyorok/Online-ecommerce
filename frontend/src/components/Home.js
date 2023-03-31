import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productAction";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useParams } from "react-router-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resPerPage } = useSelector((state) => state.products)
  const { keyword } = useParams();

  const Keyword = keyword

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([100, 10000])

  useEffect(() => {

    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts(Keyword, currentPage, price));


  }, [dispatch, Keyword, alert, currentPage, error, price])

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
              {keyword ? (
                <Fragment>
                  <div className="col-16 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          100: `Ksh. 100`,
                          10000: `Ksh. 10,000`,
                        }}
                        min={100}
                        max={10000}
                        defaultValue={[100, 10000]}
                        tipFormatter={(value) => `Ksh.${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4}/>
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} col={4}/>
                ))
              )}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={">>"}
                prevPageText={"<<"}
                firstPageText={"First"}
                lastPageText={"Last"}
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
