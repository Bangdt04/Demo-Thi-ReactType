import React from 'react'
import Joi from "joi";
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FromData = {
    name : string,
    email : string,
    password : string,
    confirmPassword : string,
  }


const signupSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email({tlds: {allow : false}}),
  password: Joi.string().required().min(3),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),

});

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm <FromData>({
    resolver: joiResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const mutation = useMutation ({
    mutationFn : async (formData : FromData) => {
      const res = await axios.post(`http://localhost:3000/user`, formData);
      return res.data;
    },
    onSuccess :() => {
      alert('Đăng ký thành công');
      navigate("/signin");
    },
  });


  const onSubmit = (formData : FromData) => {
    mutation.mutate(formData);
  };
  return (
    <div className="container">
      <h1>Đăng ký</h1>

      <form onSubmit = {handleSubmit(onSubmit)} >
        <div className="form-group">
          <label htmlFor="name">Tên</label>
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
          <label htmlFor="price">Email</label>
          <input
            type="email"
            className="form-control"
            {...register('email', { required: true})}
          />
          {errors?.email && (
               <div className="form-text text-danger">
               {errors?.email?.message}
             </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Mật khẩu</label>
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

        <div className="form-group">
          <label htmlFor="image">Lặp lại mật khẩu</label>
          <input
            type="password"
            className="form-control"
            {...register('confirmPassword')}
          />
          {errors?.confirmPassword && (
               <div className="form-text text-danger">
               {errors?.confirmPassword?.message}
             </div>
          )}
        </div>
        
       
        
     
        <button type="submit" className="btn btn-primary mr-2">Đăng ký</button>
      </form>
    </div>
  );
};

export default Signup