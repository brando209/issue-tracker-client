import React from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import './IssueFilterControl.css';

function IssueFilterControl(props) {
    const handleSelectGroup = (group) => {
        props.onSelect("group", group);
    }

    const handleSelectOrder = (order) => {
        props.onSelect("order", order);
    }

    const handleSelectFilter = (filter, event) => {
        const [filterKey, filterValue] = filter.split(" ");
        const newValues = props.filters[filterKey];
        newValues[filterValue] = !newValues[filterValue];
        const filters = { ...props.filters, [filterKey]: newValues };
        props.onSelect("filter", filters);
    }

    const clearFilters = () => {
        const filterKeys = Object.keys(props.filters);
        const filters = { ...props.filters };
        filterKeys.forEach(filterKey => {
            Object.keys(props.filters[filterKey]).forEach(value => {
                filters[filterKey][value] = false;
            });
        });
        props.onSelect("filter", filters);
    }
    
    const handleChange = () => {}

    return (
        <ButtonGroup>
            <DropdownButton className="m-1" variant="outline-primary" title="Group by" onSelect={handleSelectGroup}>
                <Dropdown.Item eventKey="none">None</Dropdown.Item>
                <Dropdown.Item eventKey="category">Category</Dropdown.Item>
                <Dropdown.Item eventKey="status">Status</Dropdown.Item>
                <Dropdown.Item eventKey="priority">Priority</Dropdown.Item>
            </DropdownButton>
            <DropdownButton className="m-1" variant="outline-primary" title="Order" onSelect={handleSelectOrder}>
                <Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
                <Dropdown.Item eventKey="desc">Desccending</Dropdown.Item>
            </DropdownButton>
            <DropdownButton className="filterDropdown m-1" variant="outline-primary" title="Filter" menuAlign="right" onSelect={handleSelectFilter}>
                <div className="filters">
                    <div className="dropdown-item-group">
                        <Dropdown.Header>Category</Dropdown.Header>
                        <Dropdown.Item eventKey="category bug">
                            <input type="checkbox" name="bug" id="checkbox-bug" checked={props.filters.category.bug} onChange={handleChange}/>
                            <label htmlFor="checkbox-bug">Bug</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="category feature">
                            <input type="checkbox" name="feature" id="checkbox-feature" checked={props.filters.category.feature} onChange={handleChange}/>
                            <label htmlFor="checkbox-feature">Feature</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="category task">
                            <input type="checkbox" name="task" id="checkbox-task" checked={props.filters.category.task} onChange={handleChange}/>
                            <label htmlFor="checkbox-task">Task</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="category other">
                            <input type="checkbox" name="other" id="checkbox-other" checked={props.filters.category.other} onChange={handleChange}/>
                            <label htmlFor="checkbox-other">Other</label>
                        </Dropdown.Item>
                    </div>
                    <div className="dropdown-item-group">
                        <Dropdown.Header>Priority</Dropdown.Header>
                        <Dropdown.Item eventKey="priority critical">
                            <input type="checkbox" name="critical" id="checkbox-critical" checked={props.filters.priority.critical} onChange={handleChange}/>
                            <label htmlFor="checkbox-critical">Critical</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority high">
                            <input type="checkbox" name="high" id="checkbox-high" checked={props.filters.priority.high} onChange={handleChange}/>
                            <label htmlFor="checkbox-high">High</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority regular">
                            <input type="checkbox" name="regular" id="checkbox-regular" checked={props.filters.priority.regular} onChange={handleChange}/>
                            <label htmlFor="checkbox-regular">Regular</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority low">
                            <input type="checkbox" name="low" id="checkbox-low" checked={props.filters.priority.low} onChange={handleChange}/>
                            <label htmlFor="checkbox-low">Low</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority trivial">
                            <input type="checkbox" name="trivial" id="checkbox-trivial" checked={props.filters.priority.trivial} onChange={handleChange}/>
                            <label htmlFor="checkbox-trivial">Trivial</label>
                        </Dropdown.Item>
                    </div>

                    <div className="dropdown-item-group">
                        <Dropdown.Header>Status</Dropdown.Header>
                        <Dropdown.Item eventKey="status unassigned">
                            <input type="checkbox" name="unassigned" id="checkbox-unassigned" checked={props.filters.status.unassigned} onChange={handleChange}/>
                            <label htmlFor="checkbox-unassigned">Unassigned</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status open">
                            <input type="checkbox" name="open" id="checkbox-open" checked={props.filters.status.open} onChange={handleChange}/>
                            <label htmlFor="checkbox-open">Open</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status inprogress">
                            <input type="checkbox" name="inprogress" id="checkbox-inprogress" checked={props.filters.status.inprogress} onChange={handleChange}/>
                            <label htmlFor="checkbox-inprogress">In-progress</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status resolved">
                            <input type="checkbox" name="resolved" id="checkbox-resolved" checked={props.filters.status.resolved} onChange={handleChange}/>
                            <label htmlFor="checkbox-resolved">Resolved</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status closed">
                            <input type="checkbox" name="closed" id="checkbox-closed" checked={props.filters.status.closed} onChange={handleChange}/>
                            <label htmlFor="checkbox-closed">Closed</label>
                        </Dropdown.Item>
                    </div>
                    <Dropdown.ItemText onClick={clearFilters}>Clear</Dropdown.ItemText>
                </div>
            </DropdownButton>
        </ButtonGroup>
    )
}

export default IssueFilterControl;