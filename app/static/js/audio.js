/**
 * Retrieves given user string from DOM element and sends it to the Alda server to create an mp3 file. 
 * Populates file path string on playback button in DOM.
 */
async function onClick() {
    let aldaInput = document.getElementById("alda-input");
    let aldaCode = aldaInput.value;
    try {
        const data = await postAudio(aldaCode);
        if (data['status'] !== 200) {
            console.log('Error with client input.');
            return; // #TODO return something here
        }

        let audio = document.getElementById("alda-audio");
        audio.setAttribute("src", data['data']);
    } catch(error) {
        console.log("Error processing request: " + error.toString());
    }
}


/**
 * Takes an Alda formatted string and sends it to server to be 
 * converted into a mp3 file for playback.
 * @param {string} aldaCode - An Alda formatted string.
 * @returns {object} response - A response object from the server with
 * either the error that occurred or a string representing the file path for the mp3 file.
 */
async function postAudio(aldaCode) {
    const response = await fetch('/alda', 
                                    {
                                        method: 'post',
                                        headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({'data': aldaCode})
                                });

    if (response.status !== 200) {
        console.log('Error with Server');
        return; // #TODO return something here
    }

    return await response.json();
}