
const testCompatibility = () => {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Success! All the File APIs are supported.
        return true;
    } else {
        alert('The File APIs are not fully supported in this browser.');
        return false;
    }
}

// const handleFileSelect = ((evt) => {

//     let files = evt.target.files; // FileList object

//     let output = [];
//     files.forEach(file => {
//         output.push(`<li>${file.name}</li>`);
//     })



//     // Recoger valores de los inputs



// });

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    console.log(files);

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

$("#files").change(handleFileSelect);
