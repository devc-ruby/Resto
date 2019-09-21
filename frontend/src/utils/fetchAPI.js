

export const placeSearching = async(body) =>{
    const rawResponse = await fetch('http://104.215.154.22:8080/places-searching', {
        method : 'POST',
        headers : {
            'X-Request-ID' : '123213123',
            'X-Caller'   : 'app',
            'Content-Type': 'application/json',    
        },
        body : JSON.stringify(body)
    });
    const content = await rawResponse.json();
    return content.data;
}
