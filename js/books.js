

// function to get and process the typed text 
const searchBook = async () => {

    // resetting error messages
    const error = document.getElementById('error');

    error.textContent = '';

    // resetting result count message 
    const resultNumber = document.getElementById('result-number');
    resultNumber.style.display = 'none';

    // resetting result field 
    const searchResult = document.getElementById('search-result');

    searchResult.textContent = '';


    // get typed text from search box 
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;


    // check if search box is empty 
    if (searchText === '') {
        error.innerHTML = `        
            <h4 class="text-center text-warning">Search field cannot be empty.</h4>`;
    }
    else {

        // reset the search box 
        searchField.value = '';

        // start spinner 
        toggleSpinner("block");

        // get data from api 
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        const res = await fetch(url)
        const data = await res.json();

        // send data to check number of result available 
        countResults(data.docs, data.numFound, searchText);

        // send data to display results 
    }
}




// number of results showing 
const countResults = (allData, foundCount, searchText) => {


    // check if there is any result for the query 
    if (foundCount === 0) {
        const error = document.getElementById('error');
        error.innerHTML = `        
            <h4 class="text-center text-danger">No results found.</h4>
        `;
        toggleSpinner("none");

    }
    else {
        const resultNumber = document.getElementById('result-number');

        resultNumber.innerHTML = `<h6 class="text-center fs-6 fw-lighter">Showing <span class="fw-bold fst-italic">${allData.length}</span> books out of <span class="fw-bold fst-italic">${foundCount}</span> hits for <span class="text-dark fw-bold">"${searchText}"</span>.</h6>`;
        resultNumber.style.display = 'block';
        displaySearchResult(allData);

    }


}

// loading spinner function

const toggleSpinner = displayType => {
    const searchResult = document.getElementById('spinner');
    searchResult.style.display = displayType;
}

// display Search Result

const displaySearchResult = books => {

    const searchResult = document.getElementById('search-result');

    searchResult.textContent = '';

    toggleSpinner("none");

    books.forEach(book => {
        console.log(book.title);
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
            <div class="card">
                <img src=${book.cover_i === undefined ? "images/genericBookCover.jpg" : `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} class="card-img-top mx-auto  w-100" alt="${book.title} Photo">
                <div class="card-body">
                    <h4 class="card-title">${book.title}</h4>
                    <h5 class="card-title">Author - <span class="fst-italic">${book.author_name === undefined ? "Unknown/Anonymous Author" : book.author_name}</span> </h5>
                    <p class="card-text">First Published: ${book.first_publish_year}</p>
                    <p class="card-text">Publisher: ${book.publisher === undefined ? "Independent Publisher" : book.publisher[0]}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}