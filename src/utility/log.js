export const projectLogItemText = (logAction, logCreatedBy, logCollaborator, logDate) => {
    let text = "";
    switch(logAction) {
        case 'INSERT':
            text += logCreatedBy.userName;
            text += " created this project - ";
            text += logDate;
            break;
        case 'UPDATE':
            text += logCreatedBy.userName;
            text += " updated this project - ";
            text += logDate;
            break;
        case 'ADD_COLLAB':
            text += logCreatedBy.userName;
            text += " added ";
            text += logCollaborator.userName;
            text += " to this project - ";
            text += logDate;
            break;
        case 'REMOVE_COLLAB':
            text += logCreatedBy.userName;
            text += " removed ";
            text += logCollaborator.userName;
            text += " from this project - ";
            text += logDate;
            break;
        case 'DELETE':
            text += logCreatedBy.userName;
            text += " deleted this project - ";
            text += logDate;
            break;
        default:
            break;
    }
    return text;
}