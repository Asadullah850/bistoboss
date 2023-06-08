import React from 'react';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async';
import SectionTitel from '../../Titel/SectionTitel';
import { useForm } from 'react-hook-form';
import useAxiosSerous from '../../../hooks/useAxiosSerous';


const image_hosting_token = import.meta.env.VITE_IMAGE_TOKEN;

const AdItem = () => {
    const [axiosSecure] = useAxiosSerous();
    const { register,reset, handleSubmit, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const onSubmit = data => {
        const fromData = new FormData();
        fromData.append('image', data.image[0]);
        fetch(img_hosting_url, {
            method: "POST",
            body: fromData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url;
                    const { name, price, category, recipe } = data;
                    const newItem = {name, price: parseFloat(price), category, recipe , image: imgUrl}
                    console.log(newItem);
                    axiosSecure.post('/menu', newItem)
                    Swal.fire({
                        title: 'You want add menu',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Save',
                        denyButtonText: `Don't save`,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        axiosSecure.post(`/menu`, newItem)
                        .then( data => {
                            console.log('after posting new menu item', data.data);
                            if (data.data.acknowledged) {
                                if (result.isConfirmed) {
                                    Swal.fire('Saved!', '', 'success')
                                  }
                            }
                        })
                      })
                  
                }
                reset()
            })
    };

    return (
        <div className='w-[90%]'>
            <Helmet>
                <title>Bistro | Add Item</title>
            </Helmet>
            <SectionTitel subheader={" ---What's new?---"} header={'ADD AN ITEM'} ></SectionTitel>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-xl" htmlFor="">Recipe name</label> <br />
                    <input className='w-[95%] mx-auto border border-yellow-600 p-3 rounded-lg' type="text" placeholder="Recipe name*" {...register("name", { required: true })} /> <br />
                    <div className="flex">
                        <div className="">
                            <label className="text-xl" htmlFor="">Price</label> <br />
                            <input className='w-[95%] mx-auto border border-yellow-600 p-3 rounded-lg' type="number" placeholder="Price" {...register("price", { required: true })} />
                        </div>
                        <div className="mx-5">
                            <label className="text-xl" htmlFor="">Category</label> <br />
                            <select defaultValue={'Pick One'} className=' w-full border border-yellow-600 p-3 rounded-lg' {...register("category", { required: true })}>
                                <option disabled>Pick One</option>
                                <option value="salad">salad</option>
                                <option value="drinks">drinks</option>
                                <option value="popular">popular</option>
                                <option value="dessert">dessert</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="offered">offered</option>
                                <option value="deshi">deshi</option>
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <label className="text-xl" htmlFor="">Image</label> <br />
                        <input type="file" {...register("image", { required: true })} class="file-input file-input-bordered file-input-warning w-full max-w-xs" />
                    </div>
                    <label className="text-xl" htmlFor="">Recipe Details</label> <br />
                    <textarea className='w-[95%] mx-auto border border-yellow-600 p-2 rounded-lg' {...register("recipe", { required: true })} /> <br />

                    <input className='btn mx-[10%] my-2' type="submit" />
                </form>
            </div>

        </div>
    );
};

export default AdItem;