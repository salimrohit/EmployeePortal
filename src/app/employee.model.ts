/* Instead of creating this variable in all component, we are creating one model and importing that model in all components that require this model */
export class EmployeeModel{
    id?:string
    username?:string
    email?:string
    status?:string

}