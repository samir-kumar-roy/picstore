const searchBtn = document.getElementById("search-btn");
const searchTerm = document.getElementById("search-term");
const searchGallery = document.querySelector("#seached-photos-gallery");
const gallery = document.querySelector("#gallery");
const key = "563492ad6f9170000100000166beef21b1ab492eb0919e453abc3021";
const url = "https://api.pexels.com/v1/curated?per_page=10";
const headerObj = {
    method: "GET",
    headers: {
        Accept: "Application/json",
        Authorization: key
    }
}
// At the very first search gallery is hidden
gallery.style.display = "flex";
searchGallery.style.display = "none";
function fetchPhotos(url, obj) {
    fetch(url, obj)
        .then(response => response.json())
        .then(photos => displayPhotos(photos))
}
// if search button is clicked
searchBtn.addEventListener("click", () => {
    alert(searchTerm.value);
    if (searchTerm.value !== "") {
        gallery.style.display = "none";
        searchGallery.style.display = "flex";
        let search_url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=10`;
        gallery.innerHTML = "";
        fetchPhotos(search_url, headerObj);
    }
})
// for all curated photos, without search button click
fetchPhotos(url, headerObj);
function displayPhotos(Photos) {
    const allPhotos = Photos.photos;
    console.log(allPhotos)

    for (const photo of allPhotos) {
        let gallaryImage = document.createElement("div");
        gallaryImage.classList.add("gallery-image");
        gallaryImage.innerHTML = `
                 <img src="${photo.src.large}" alt="${photo.alt}">
                    <div>
                        <p><span>Photographer:</span> <a href="${photo.photographer_url}" target="_blank">${photo.photographer}</a></p>
                        <a href="${photo.src.large}" target="_blank">Download</a>
                    </div>
        `
        // for appending the images either on searchGallery or on gallery
        if (searchGallery.style.display == "none") {
            gallery.appendChild(gallaryImage);
        } else {
            searchGallery.appendChild(gallaryImage);
        }



    }







}


