const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('food');
const mealDetailsContent = document.querySelector('.food-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get food list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(food => {
                    html += `
                    <div class = "food-item" data-id = "${food.idMeal}">
                        <div class = "food-img">
                            <img src = "${food.strMealThumb}" alt = "food">
                        </div>
                        <div class = "food-name">
                            <h3>${food.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Nothing Found";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the food
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(food) {
    console.log(food);
    food = food[0];
    let html = `
        <h2 class = "recipe-title">${food.strMeal}</h2>
        <p class = "recipe-category">${food.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${food.strInstructions}</p>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}