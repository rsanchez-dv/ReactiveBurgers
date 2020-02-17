import React from 'react';
import Classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [Classes.InputElement];
    if (props.invalid && props.shouldValidate) {
        inputClasses.push(Classes.Invalid);
    }
    switch (props.elementType){
        case('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')}
                                 {...props.elementConfig}
                                onChange={props.changed}
                                value={props.value}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
                                className={Classes.inputElement}
                                {...props.elementConfig}
                                onChange={props.changed}
                                value={props.value}/>;
            break;
        case('select'):
            inputElement = (
                <select
                className={Classes.InputElement}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            );
            break;
        default: 
            inputElement = <input
                            className={Classes.inputElement} 
                            {...props.elementConfig} 
                            onChange={props.changed}
                            value={props.value}/>
    }
    return (
        <div className={Classes.Input}>
            <label className={Classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
    
}

export default input;