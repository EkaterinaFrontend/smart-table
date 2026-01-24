import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);
export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        if(elements[elementName]) {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                .map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        }
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        console.log(data, state, action)
        if(action && action.name === 'clear'){
            const input = (action.parentElement.querySelector('input'))
            input.value = ''
            // const parent = action.target.parentElement;
            // const input = parent ? parent.querySelector('input,select') : null;

            // if(input){
            //     input.value = '';

            //     const fieldName = action.target.dataset.field;
            //     if(fieldName && state) {
            //         state[fieldName] = '';
            //     }
            // }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
        
    }
}