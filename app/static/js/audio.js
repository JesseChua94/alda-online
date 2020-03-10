/**
 * Retrieves given user string from DOM element and sends it to the Alda server to create an mp3 file. 
 * Populates file path string on playback button in DOM.
 */
function onClick() {
    let aldaInput = document.getElementById("alda-input");
    let data = aldaInput.value;
    //let data = getAudio(aldaInput.value);
    fetch('/alda',
    {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'data': data})
    }).then(() => {

    })
    .catch((err) => {})
        
    return;
}


/**
 * Takes an Alda formatted string and sends it to server to be 
 * converted into a mp3 file for playback.
 * @param {string} aldaCode - An Alda formatted string.
 * @returns {object} response - A response object from the server with
 * either the error that occurred or a string representing the file path for the mp3 file.
 */
function getAudio(aldaCode) {
    
    return;
}

/**
 * Updates HTML audio tag to play the most recent mp3 file.
 * @param {string} filePath - Path to the mp3 file on the server.
 * @returns {object} response - A response object of whether the DOM was 
 * updated successfully or not.
 */
function setAudio(filePath) {
    return;
}