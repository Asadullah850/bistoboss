import React from 'react';
import Card from '../../Card/Card';

const OrderTab = ({ items }) => {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
            {
                items.map(item => <Card item={item} key={item._id}></Card>)
            }
        </div>
    );
};

export default OrderTab;