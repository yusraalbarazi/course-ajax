///unsplash: 2850af8fc3ffd57dd4e77c96fdfdbc93881fc397403e66b00a25da196078ad30


(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        //searchedForText = 'cake';
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 2850af8fc3ffd57dd4e77c96fdfdbc93881fc397403e66b00a25da196078ad30');
        unsplashRequest.send()

        function addImage() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const firstImage = data.results[0];
            htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption> ${searchedForText} by ${firstImage.user.name}</figcaption>
            <figure>`;
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }


        function addArticles() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            if (data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2> <p>${article.snippet}</p></li>`).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles"> No articles available</div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);

        }
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=6acf06b4339540e7a8c3bd040333bb57`);
        articleRequest.send();


    });
})();