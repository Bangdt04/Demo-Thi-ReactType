import React from 'react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

const signinSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});

const Signin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: joiResolver(signinSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post('http://localhost:3000/user', formData); 
      return res.data;
    },
    onSuccess: () => {
      alert('Đăng nhập thành công');
      navigate('/products'); 
    },
  });

  const onSubmit = (formData: FormData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="container">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            {...register('email')}
          />
          {errors?.email && (
            <div className="form-text text-danger">
              {errors?.email?.message}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            {...register('password')}
          />
          {errors?.password && (
            <div className="form-text text-danger">
              {errors?.password?.message}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Signin;
