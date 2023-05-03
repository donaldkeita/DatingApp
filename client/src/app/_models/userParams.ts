import { User } from "./user";

/**
 * Why not interface, instead of using class?
 * Because the class gives the opportunity to work with constructor, where we can initialize
 * some values.
 * However, with interface we don't need to initialize values.
 */
export class UserParams {
    gender : string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 5;

    constructor(user : User) {
        this.gender = user.gender === 'female' ? 'male' : 'female'
    }
}