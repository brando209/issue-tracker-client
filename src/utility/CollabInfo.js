export default class CollabInfo {
    constructor(collabArray) {
        this.collaborators = collabArray;
    }

    get(collabId) {
        return this.collaborators.find(collab => collab.id === collabId);
    }
}