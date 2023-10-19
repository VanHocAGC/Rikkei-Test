import Skeleton from 'components/common/Skeleton';
import Title from 'components/common/Title';
import HomeFilter from './homeFilter';
import FlexCenter from 'components/common/center';
import { useEffect, useState } from 'react';
import CustomPagination from 'components/common/CustomPanigation';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getCategoryList,
  getProductList,
  getProductListByCategory,
} from 'features/product/productSlide';
import { DEFAULT_PAGE, LIMIT } from 'constants/index';
import { ISelect } from 'interfaces';
import ProductList from './productList';
import { SelectOptionToString, SelectOptionToValue, UrlToArray } from 'utils';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const productInfo = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<Array<ISelect>>(() =>
    searchParams.get('categories')
      ? UrlToArray(searchParams.get('categories'))
      : []
  );
  const [currentPage, setCurrentPage] = useState(() =>
    searchParams.get('page') ? Number(searchParams.get('page')) : DEFAULT_PAGE
  );
  const location = useLocation();
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', encodeURIComponent(page));
    setSearchParams(searchParams);
  };
  const handleFilter = () => {
    searchParams.set(
      'categories',
      encodeURIComponent(SelectOptionToString(selectedCategory))
    );
    setSearchParams(searchParams);
  };
  useEffect(() => {
    dispatch({
      type: getCategoryList().type,
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (selectedCategory.length !== 0) {
      dispatch({
        type: getProductListByCategory().type,
        payload: {
          page: currentPage,
          limit: LIMIT,
          listCategory: SelectOptionToValue(selectedCategory),
        },
      });
    } else {
      dispatch({
        type: getProductList().type,
        payload: {
          page: currentPage,
          limit: LIMIT,
        },
      });
    }
    // eslint-disable-next-line
  }, [location]);
  return (
    <section className="p-4">
      <FlexCenter className="flex-col gap-y-3">
        <Title name="Hot Product" />
        <HomeFilter
          selected={selectedCategory}
          onSelect={(select) => setSelectedCategory(select)}
          onFilter={() => handleFilter()}
        />
        {productInfo.isLoading ? <Skeleton /> : <ProductList />}
        {productInfo.total > LIMIT && !productInfo.isLoading && (
          <CustomPagination
            current={currentPage}
            pageSize={LIMIT}
            total={productInfo.total}
            onChange={(value) => handleChangePage(value)}
          />
        )}
      </FlexCenter>
    </section>
  );
}
