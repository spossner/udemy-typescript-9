class Project {
    constructor(public title:string, public description:string, public people:number) {
    }

    validate(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const errors: string[] = [];
            if (!this.title) {
                errors.push("title must not be empty");
            } 
            if (!this.description) {
                errors.push("description must not be empty");
            }
            if (this.people < 1 || this.people > 10) {
                errors.push("people must be between 1 and 10");
            }
            resolve(errors);
        })
    }
}
export default Project;