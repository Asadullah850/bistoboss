import React from 'react';

const MenuItems = ({ item }) => {
    const { image, price, name, recipe } = item;
    // console.log(price);
    return (
        <div className='flex space-x-3'>
                <div className="">
                    <img className=' rounded-b-full rounded-e-full h-28 w-28' src={image} alt="" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="w-[80%]">
                        <p>{name}</p>
                        <p >{recipe}</p>
                    </div>
                    <p className=' text-yellow-500'>$ {price}</p>
                </div>
            </div>
    );
};

export default MenuItems;