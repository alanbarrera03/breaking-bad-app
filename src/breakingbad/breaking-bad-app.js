
/**
 * 
 * @returns { Object<Promise> } quote information
 */
const fetchQuote = async() => {

    const res = await fetch( 'https://api.breakingbadquotes.xyz/v1/quotes' );

    // console.log( res );

    const data = await res.json();

    console.log( data[0] );
    return data[0];

}


/**
 * 
 * @param { HTMLDivElement } element 
 */
export const BreakingbadApp = async( element ) => {

    // console.log( 'Hola mundo' );

    document.querySelector( '#app-title' ).innerHTML = 'Chingas a tu ma'

    element.innerHTML = 'Loading...';

    // await fetchQuote();

    const quoteLabel      = document.createElement( 'blockquote' );
    const authoLabel      = document.createElement( 'h3' );
    const nextQuoteButton = document.createElement( 'button' );
        nextQuoteButton.innerHTML = 'Next Quote';


    const renderQuote = ( data ) => {

        quoteLabel.innerHTML = data.quote;
        authoLabel.innerHTML = data.author;

        element.replaceChildren( quoteLabel, authoLabel, nextQuoteButton );

    }

    nextQuoteButton.addEventListener( 'click', async() => {

        element.innerHTML = 'Loading...';

        const quote = await fetchQuote();

        renderQuote( quote );

    } )

    fetchQuote().then( renderQuote );

}