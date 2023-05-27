import React from 'react';
import Cover from './Cover';
import MenuItems from '../PopulaeMenu/MenuItems';

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
            { title && <Cover imgs={coverImg} title={title} ></Cover>}
            {
                items.map(item => <MenuItems
                    key={item._id}
                    item={item}
                ></MenuItems>)
            }
        </div>
    );
};

export default MenuCategory;