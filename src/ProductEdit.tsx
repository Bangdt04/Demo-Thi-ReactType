import React from 'react'
import Joi from "joi";
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

type FromData = {
  id? : number,
  name: string,
  price: number,
  image: string,
  description: string,
}


const productSchema = Joi.object({
  id : Joi.number(),
  name: Joi.string().required().min(3),
  price: Joi.number().required().min(0).positive(),
  image: Joi.string(),
  description: Joi.string(),

});

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FromData>({
    resolver: joiResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      description: "",
    },
  });

  useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      reset(res.data)
      return res.data;

    }
  })



  const mutation = useMutation({
    mutationFn: async (formData: FromData) => {
      const res = await axios.put(`http://localhost:3000/products/${formData?.id}`,formData);
      return res.data;
    },
    onSuccess: () => {
      alert('Cập nhật thành công');
      navigate("/products");
    },
  });


  const onSubmit = (formData: FromData) => {
    mutation.mutate(formData);
  };
  return (
    <div className="container">
      <h1>Cập nhật sản phẩm</h1>

      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            {...register('name', { required: true, minLength: 3 })}
          />
          {errors?.name && (
            <div className="form-text text-danger">
              {errors?.name?.message}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá sản phẩm</label>
          <input
            type="number"
            className="form-control"
            {...register('price', { required: true })}
          />
          {errors?.price && (
            <div className="form-text text-danger">
              {errors?.price?.message}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Ảnh sản phẩm</label>
          <input
            type="text"
            className="form-control"
            {...register('image')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả sản phẩm</label>
          <input
            type="text"
            className="form-control"
            {...register('description')}
          />
        </div>


        <button type="submit" className="btn btn-primary">Cập nhật sản phẩm</button>
      </form>
    </div>
  );
};

export default ProductEdit