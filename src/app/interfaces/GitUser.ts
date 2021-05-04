export interface GitUser {
    name:string,
    email:string,
    username:string,
    reset_password:boolean,
    can_create_group:boolean,
    skip_confirmation:boolean
}