import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {

    currentPage: 0,
    users: [],

}

const loadNextPage = async() => {

    const users = await loadUsersByPage( state.currentPage + 1);

    if ( users.length === 0 ) return

    state.currentPage += 1;

    state.users = users;

    // throw new Error( 'No implementado' );

}

const loadPreviousPage = async() => {

    if ( state.currentPage === 1 ) return

    const users = await loadUsersByPage( state.currentPage - 1 );

    state.users = users;

    state.currentPage -= 1;
    // throw new Error( 'No implementado' );

}


/**
 * 
 * @param { User } updatedUser 
 */
const onUserChanged = async( updatedUser ) => {

    let wasFound = false;

    state.users = state.users.map( user => {

        if ( user.id === updatedUser.id ) {

            wasFound = true;

            return updatedUser;

        }

        return user;

    } );

    if ( state.users.length < 10 && !wasFound ) {

        state.users.push( updatedUser );

    }

}

const reloadPage = async() => {

    const users = await loadUsersByPage( state.currentPage );

    if ( users.length === 0 ) {

        await loadPreviousPage();

        return;

    }

    state.users = users;

}


export default {

    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns { User[] }
     */

    getUsers: () => [ ...state.users ],
    getCurrentPage: () => state.currentPage

}