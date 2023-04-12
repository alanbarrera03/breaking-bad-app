import { localHostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 * 
 * @param { String|Number } id 
 * @returns { Promise<User> }
 */

export const getUserById = async( id ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;

    const res = await fetch( url );

    const data = await res.json();

    // const users = await localHostUserToModel( ...data )

    const users = localHostUserToModel( data );

    // console.log( users );

    return users;

}