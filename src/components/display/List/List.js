import React from 'react';
import { groupBy, mapValues, pickBy, includes } from 'lodash';

import ListItem from './ListItem'
import ListItemGroup from './ListItemGroup';
import './List.css';

function List({ listItems, groupKey = null, groupValues = null, orderBy = 'asc', filter = null, searchText = "", searchKeys = [], render }) {
    // Maps property keys of 'filter' prop to an array containing the values that are not being filtered out
    const allowedValues = mapValues(filter, (obj) => {
        const selectedFilters = pickBy(obj, (value) => value === true);
        return Object.keys(selectedFilters);
    });
    
    const filteredItems = listItems && listItems.filter(item => {
        const allowedKeys = Object.keys(allowedValues);
        let isAllowed = true;
        // Filter out items based on the current filter
        for(let key of allowedKeys) {
            if(includes(allowedValues[key], item[key]) === false) {
                isAllowed = false;
            }
        }
        // Also, filter out items not matching the current search (item['searchKeys'] !== 'searchText')
        if(isAllowed && searchText !== "") {
            for(let key of searchKeys) {
                console.log("Checking", item[key], "for", searchText);
                if(includes(item[key].toLowerCase(), searchText.toLowerCase()) === true) {
                    console.log("PASS")
                    isAllowed = true;
                    break;
                }
            }
        }
        return isAllowed;
    });

    const groupedItems = groupBy(filteredItems, (value) => value[groupKey]);

    const listComponents = () => {
        let listComponentArray;
        if(groupKey && groupValues) {
            const groupComponents = [];
            groupValues.forEach(value => {
                const values = groupedItems[value];
                groupComponents.push(<ListItemGroup key={`${groupKey}=${value}`} name={groupKey} value={value} items={values} render={render}/>);
            })
            listComponentArray = orderBy === 'desc' ? groupComponents.reverse() : groupComponents;
        } else {
            listComponentArray = filteredItems && filteredItems.map((item, idx) => <ListItem item={item} key={idx} keyValue={idx} render={render} />);
        }

        return listComponentArray;
    }

    return (
        <div className="list-container">
            { listComponents() }
        </div>
    )
}

export default List;