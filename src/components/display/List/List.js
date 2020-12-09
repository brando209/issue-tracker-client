import React from 'react';
import './List.css';

function List({ listItems, render }) {

    return (
        <div className="list-container">

            {
                listItems ? listItems.map((item, key) => <div className="list-item" key={key}>{render(item)}</div>) : null
            }

        </div>
    )
}

export default List;