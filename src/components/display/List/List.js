import React from 'react';
import { groupBy, orderBy, values, includes, take } from 'lodash';

import ListItem from './ListItem'
import ListItemGroup from './ListItemGroup';
import './List.css';

function List({ listItems, groupKey = null, groupValues = null, orderBy = 'asc', filter = null, render }) {

    const groupedItems = groupBy(listItems, (value) => value[groupKey]);

    const listComponents = () => {
        if(groupKey && groupValues) {
            const groupComponents = [];
            groupValues.forEach(value => {
                const values = groupedItems[value];
                groupComponents.push(<ListItemGroup key={`${groupKey}=${value}`} name={groupKey} value={value} items={values} render={render}/>);
            })
            return orderBy === 'desc' ? groupComponents.reverse() : groupComponents;
        }

        return listItems && listItems.map((item, idx) => <ListItem item={item} key={idx} keyValue={idx} render={render} />);
    }

    return (
        <div className="list-container">
            { listComponents() }
        </div>
    )
}

export default List;