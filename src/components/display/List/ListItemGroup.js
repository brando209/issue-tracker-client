import React from 'react';
import ListItem from './ListItem';

function ListItemGroup({ name, value, items, render }) {
    return (
        <div className={"list-item-group " + name}>
            <div className="group-header">{value}</div>
            {
                items && items.map((item, idx) => <ListItem key={`${value}-${idx}`} item={item} render={render} />)
            }
        </div>
    )
}

export default ListItemGroup;