import { useAppSelector } from 'app/hooks';
import * as React from 'react';

export interface ProductListProps {}

export default function ProductList(props: ProductListProps) {
  const productInfo = useAppSelector((state) => state.product);
  return (
    <div className="border border-primary shadow rounded-md p-4 max-w-5xl w-full mx-auto z-10">
      {
        productInfo.productList.length===0?
        <p>No matching results were found</p>
        :<table className="w-full min-w-max table-auto text-left m-auto relative">
        <thead className="border-b-2 border-gray-300 rounded-md">
          <tr>
            <th className="bg-blue-gray-50/50 justify-around text-blue-900 px-2">
              Id
            </th>
            <th className="bg-blue-gray-50/50 justify-around text-blue-900 px-2">
              Name
            </th>
            <th className="bg-blue-gray-50/50 justify-around text-blue-900 px-2">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="">
          {productInfo.productList.map((item,index) => {
            return (
              <tr className={`my-2  ${index%2===0?"bg-slate-200":"bg-white"}`} key={item.id}>
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      }
    </div>
  );
}
