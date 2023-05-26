import React from 'react';

const SectionTitel = ({subheader, header}) => {
    return (
        <div className='my-10 text-center'>
            <h4 className=' text-yellow-600'>{subheader}</h4>
            <h1 className=' my-4 text-4xl uppercase'>{header}</h1>
        </div>
    );
};

export default SectionTitel;