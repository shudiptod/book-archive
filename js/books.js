
const searchBook = async () => {

    const resultNumber = document.getElementById('result-number');
    resultNumber.style.display = 'none';

    toggleSpinner("block");
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`

    const res = await fetch(url)
    const data = await res.json();
    countResults(data.numFound);
    displaySearchResult(data["docs"]);


}

// number of results showing 
const countResults = count => {

    const resultNumber = document.getElementById('result-number');

    if (count > 9) {
        resultNumber.innerHTML = `<h6>Showing 9 of books out of ${count} search resuls</h6>`;
    }
    else {
        resultNumber.innerHTML = `<h6>Showing ${count} of books out of ${count} search resuls</h6>`;
    }
    resultNumber.style.display = 'block';
    console.log(resultNumber);
}

// loading spinner 

const toggleSpinner = displayType => {
    const searchResult = document.getElementById('spinner');
    searchResult.style.display = displayType;
}

// display Search Result

const displaySearchResult = books => {

    const searchResult = document.getElementById('search-result');

    searchResult.textContent = '';

    toggleSpinner("none");

    books.slice(0, 9).forEach(book => {
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top mx-auto  w-100" alt="${book.title} Photo">
                <div class="card-body">
                    <h4 class="card-title">${book.title}</h4>
                    <h5 class="card-title">Author - <span class="fst-italic">${book.author_name}</span> </h5>
                    <p class="card-text">First Published: ${book.first_publish_year}</p>
                    <p class="card-text">Publisher: ${book.publisher[0]}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}