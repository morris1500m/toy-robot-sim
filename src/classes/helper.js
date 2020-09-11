// is positive int helper function
export function isNumeric(value) {return /^\d+$/.test(value);}

// helper function that adds item to element or replaces the current item in the element if it exists 
export function AppendOrReplace(element, thingToAppend){
    element.children.length ===0 ?  element.appendChild(thingToAppend) : element.replaceChild(thingToAppend,  element.children[0]);
}