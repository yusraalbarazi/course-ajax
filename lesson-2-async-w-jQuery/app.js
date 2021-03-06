/* eslint-env jquery */

(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;


        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 2850af8fc3ffd57dd4e77c96fdfdbc93881fc397403e66b00a25da196078ad30'
            }
        }).done(addImage)

        function addImage(images) {
            let htmlContent = '';

            const firstImage = images.results[0];
            htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption> ${searchedForText} by ${firstImage.user.name}</figcaption>
            <figure>`;
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }



        function addArticles(data) {
            let htmlContent = '';

            if (data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2> <p>${article.snippet}</p></li>`).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles"> No articles available</div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);

        }

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=6acf06b4339540e7a8c3bd040333bb57`

        }).done(addArticles)


    });
})();