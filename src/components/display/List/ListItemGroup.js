import React, { useState } from 'react';
import ListItem from './ListItem';

function ListItemGroup({ name, value, items, render }) {
    const [collapse, setCollapse] = useState(false);
    return (
        <div className={"list-item-group " + name} onClick={() => setCollapse(prev => !prev)}>
            <div className="group-header">{value}</div>
            {
                collapse ? null :
                items && items.map((item, idx) => <ListItem key={`${value}-${idx}`} item={item} render={render} />)
            }
        </div>
    )
}

export default ListItemGroup;