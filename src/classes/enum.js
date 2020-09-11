// Direction fake enum
export const direction = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3,
}

// Command fake enum
export const commands = {
    PLACE: 'PLACE',
    MOVE: 'MOVE',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    REPORT: 'REPORT'
}

// gets us the next enum value in the right direction
export function TurnRight(dir){
    var length = Object.keys(direction).length;
    if(dir < length -1 ) return dir+1;
    return direction.NORTH;
}

// gets us the next enum value in the left direction
export function TurnLeft(dir){
    if(dir > 0 ) return dir-1;
    return direction.WEST;
}

// Get the enum value from a string
export function MapStringToEnum(stringToMap, enumeration){
    for (const property in enumeration) {
        if(stringToMap === property){
            return enumeration[property];
        }
    }
    return null;
}

// Get the string from the value
export function GetKeyFromValue(value, enumeration){
    var keys = Object.keys(enumeration);
    return keys[value];
}