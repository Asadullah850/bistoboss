import React from 'react';
import Cover from './Cover';
import MenuItems from '../PopulaeMenu/MenuItems';
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, coverImg, subTitle }) => {
    return (
        <div className="mt-4">
            {title && <Cover imgs={coverImg} title={title} subTitle={subTitle}></Cover>}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                {
                    items.map(item => <MenuItems
                        key={item._id}
                        item={item}
                    ></MenuItems>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className='w-64 mx-[36%] my-4 btn btn-primary bg-white border-b-4 hover:text-white text-yellow-600'>ORDER YOUR FAVOURITE FOOD</button>
            </Link>
        </div>
    );
};

export default MenuCategory;