const fileInput = document.querySelector("input"),
    downloadBtn = document.querySelector("button");


downloadBtn.addEventListener("click", e => {
    e.preventDefault(); //Preventing form from submitting
    downloadBtn.innerText = "Downloading file..."
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    //fetching file & returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        //URl.createObjURl creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; //passing tempUrl as href value of <a> tag
        // Passing file last name and extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag); //Adding <a> tag innside body
        aTag.click(); // clicking <a> tag so the file download
        aTag.remove(); // removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl); // removing tempurl from the document
        downloadBtn.innerText = "Download File"
    }).catch(() => {
        // catch method will call if any error comes during downloading
        downloadBtn.innerText = "Download File"
        alert("Failed to download file!");
    })
}