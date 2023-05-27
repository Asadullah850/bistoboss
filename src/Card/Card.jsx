import React from 'react';

const Card = ({item}) => {
    const { image, price, name, recipe } = item;
    return (
        <div className="card card-compact w-full text-left shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Recipe: {recipe}</p>
                <p>Price: <span className=' text-2xl'>$ {price}</span></p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary border-b-4 border-yellow-500 text-yellow-800 bg-white hover:text-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;