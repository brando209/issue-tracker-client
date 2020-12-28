import React, { useState, useRef, useEffect } from 'react';
import editIcon from '../../../images/edit-icon-png-small.png'

const withEdit = (WrappedComponent, type) => (
    ({ onEdit, name, ...props }) => {
        const [editing, setEditing] = useState(false);
        const [value, setValue] = useState(props.value);
        const inputRef = useRef();

        useEffect(() => {
            inputRef && inputRef.current && inputRef.current.focus();
        }, [editing]);

        const handleClick = () => {
            setEditing(true);
        }

        const handleKeyPress = (e) => {
            if(e.key === "Enter") {
                handleSubmit(e);
            }
        }

        const handleChange = (e) => {
            setValue(e.target.value);
        }

        const handleBlur = () => {
            setEditing(false)
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            onEdit({ [inputRef.current.name]: value });
            setEditing(false);
        }

        const inputComponent = () => {
            if(type === "text") {
                return (
                    <input 
                        ref={inputRef} 
                        name={name}
                        type={type} 
                        defaultValue={value} 
                        onChange={handleChange} 
                    />
                )
            } else if(type === "textarea") {
                return (
                    <textarea 
                        ref={inputRef}
                        name={name} 
                        defaultValue={value} 
                        rows={5}
                        cols={75}
                        onChange={handleChange} 
                        onKeyPress={handleKeyPress}
                    />
                )
            } else if(type === "select") {
                return (
                    <select
                        ref={inputRef}
                        name={name}
                        defaultValue={value}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    >
                        {
                            props.selectOptions && props.selectOptions.map((opt, idx) => (
                                <option key={idx} value={opt}>
                                    {opt}
                                </option>
                            ))
                        }
                    </select>
                )
            }
            return null;
        }
        
        return editing ? (
            <form onBlur={handleBlur} onSubmit={handleSubmit}>
                {inputComponent()}
            </form>
        ) : (
            <WrappedComponent {...props}>
                {props.children}
                <img 
                    alt=""
                    src={editIcon}
                    width="25"
                    height="25"
                    onClick={handleClick}
                />
            </WrappedComponent>
        )
    }
)

export default withEdit;