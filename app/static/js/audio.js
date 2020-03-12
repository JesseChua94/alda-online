/**
 * Retrieves given user string from DOM element and sends it to the Alda server to create an mp3 file. 
 * Populates file path string on playback button in DOM.
 */
function onClick() {
    let aldaInput = document.getElementById("alda-input");
    let aldaCode = aldaInput.value;
    postAudio(aldaCode).then((file_path) => {
        let audio = document.getElementById("alda-audio");
        audio.setAttribute("src", file_path);
    });
}


/**
 * Takes an Alda formatted string and sends it to server to be 
 * converted into a mp3 file for playback.
 * @param {string} aldaCode - An Alda formatted string.
 * @returns {object} response - A response object from the server with
 * either the error that occurred or a string representing the file path for the mp3 file.
 */
function postAudio(aldaCode) {
    return fetch('/alda',
    {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'data': aldaCode})
    })
    .then(response => postAudioResponse(response))
    .catch(function(err) {
        console.log('Error with fetch', err);
    });
}


/**
 * Handle response from postAudio call and update DOM.
 * @param {obj} response - HTTP response object from server.
 */
function postAudioResponse(response) {
    if (response.status !== 200) {
        console.log('Error with Server');
        return; // #TODO return something here
    }

    response.json().then(function(data) {
        if (data['status'] !== 200) {
            console.log('Error with client input.');
            return; // #TODO return something here
        }
        return data['data'];
    });
}


/**
 * Updates HTML audio tag to play the most recent mp3 file.
 * @param {string} filePath - Path to the mp3 file on the server.
 * @returns {object} response - A response object of whether the DOM was 
 * updated successfully or not.
 */
function setAudioPath(filePath) {
    return;
}