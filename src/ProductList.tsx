import axios from 'axios';
import React from 'react';
import { useQuery,useMutation ,useQueryClient} from '@tanstack/react-query';
import { Link } from 'react-router-dom';



type Product = {
  id?: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const ProductList = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products`);
      return res.data;
    },
    
  });

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const confirm = window.confirm("Bạn có chắc muốn xóa không?");
      if (confirm) {
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert("Xóa sản phẩm thành công");
      }
    },
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      })
    }
  })

  return (
    <div className="container my-4">
      <h2 className="mb-3">Quản lý sản phẩm</h2>
      <Link to="/products/add" className="btn btn-primary mb-3">
        Thêm
      </Link>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Số Thứ Tự</th>
              <th scope="col">Hình Ảnh</th>
              <th scope="col">Tên Sản Phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Mô Tả</th>
              <th scope="col">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product: Product, index: number) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={product.image} alt={product.name} width={50} />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Link to={`/products/${product.id}/edit`} className="btn btn-success">
                    Cập nhật
                  </Link>
                  <button className="btn btn-danger"
                    onClick={() => mutation.mutate(product.id!)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
