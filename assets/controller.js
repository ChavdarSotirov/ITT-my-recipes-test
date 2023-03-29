(function (){
    let homePage = document.getElementById('all-recipes')
    let likedRecipes = document.getElementById('favorites')
    let createRecipe = document.getElementById('create-recipe')
    let myProfile = document.getElementById('my-profile');
    let results = document.getElementById('results');

    let navIcon = document.getElementById("user-profile-img")

    //pages
    let loginPage = document.getElementById("loginPage");
    let registerPage = document.getElementById("registerPage");
    //login buttons
    let loginButton = document.getElementById("login");
    let goToRegButton = document.getElementById("goToRegister");
    //login form fields
    let errorText = document.querySelector("p.error");
    let loginUsername = document.getElementById("loginUsername");
    let loginPassword = document.getElementById("loginPassword");
    //register buttons
    let registerButton = document.getElementById("register");
    let goToLoginButton = document.getElementById("goToLogin");
    //register form fields
    let regUsername = document.getElementById("regUsername");
    let regPassword1 = document.getElementById("regPassword1");
    let regPassword2 = document.getElementById("regPassword2");
    let regErrorText = document.getElementById("regError");

    homePage.style.display = "none";
    likedRecipes.style.display = "none";
    createRecipe.style.display = "none";
    myProfile.style.display = "none";
    registerPage.style.display = "none";
    errorText.style.display = "none";
    regErrorText.style.display = "none";
    navIcon.style.display = "none";

    let user;


    //add itemCollection
    let manager = new RecipeManager();

    //add allitems to itemcollection
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        let newItem = new Recipe(
            obj.title,
            obj.href,
            obj.ingredients,
            obj.thumbnail
        )
        manager.add(newItem);
        
    }

    loginButton.addEventListener("click", function(event){
        event.preventDefault();
        let username = loginUsername.value.trim();
        let password = loginPassword.value.trim();
        if(userStorage.existsUser(username)){
            if(userStorage.validateUser(username, password)){
                errorText.style.display = "none";
                loginPage.style.display = "none";
                navIcon.style.display = "block";
                user = new User(userStorage.users.filter(e => e.username === username)[0]);
                window.addEventListener("load", changeHash)
                window.addEventListener("hashchange", changeHash);
                
            }
        }
        else {
            errorText.style.display = "block";
        }
    });

    goToRegButton.addEventListener("click", function(event){
        event.preventDefault();
        loginPage.style.display = "none";
        registerPage.style.display = "block";
    });
    
    goToLoginButton.addEventListener("click", function(event){
        event.preventDefault();
        registerPage.style.display = "none";
        loginPage.style.display = "block";
    });

    registerButton.addEventListener("click", function(event){
        event.preventDefault();
        if(regUsername.value.trim() && regPassword1.value.trim()){
            if(regPassword1.value.trim() !== regPassword2.value.trim()){
                regErrorText.style.display = "block";
                regErrorText.innerHTML = "Passwords missmatch";
            }
            else if(userStorage.existsUser(loginUsername)){
                regErrorText.style.display = "block";
                regErrorText.innerHTML = "User already exists";
            }
            else {
                userStorage.addUser(regUsername.value.trim(), regPassword1.value.trim());
                regErrorText.style.display = "block";
                regErrorText.style.color = "green";
                regErrorText.innerHTML = "User ADDED!";
            }
        }
        else {
            regErrorText.style.display = "block";
            regErrorText.innerHTML = "You have to enter values in all fields!";
        }
    });
    

    function changeHash() {
        let hash = location.hash.slice(1);
        switch(hash){
            case "allRecipes":
                homePage.style.display = "block";
                likedRecipes.style.display = "none";
                createRecipe.style.display = "none";
                myProfile.style.display = "none";
                print(manager.allItems, results);
                break;
            case "favorites":
                homePage.style.display = "none";
                likedRecipes.style.display = "flex";
                createRecipe.style.display = "none";
                myProfile.style.display = "none";
                print(user.liked, likedRecipes);
                console.log(user.liked);
                break;
            case "createRecipe":
                homePage.style.display = "none";
                likedRecipes.style.display = "none";
                createRecipe.style.display = "block";
                myProfile.style.display = "none";
                break;

            case "myProfile":
                homePage.style.display = "none";
                likedRecipes.style.display = "none";
                createRecipe.style.display = "none";
                myProfile.style.display = "flex";
                break;
            default:
                homePage.style.display = "block";
                likedRecipes.style.display = "none";
                createRecipe.style.display = "none";
                myProfile.style.display = "none";
                print(manager.allItems, results);
                break;
        }
    }

    function print(what, where) {
        where.innerHTML = "";
        for (let i = 0; i < what.length; i++) {
            let recipe = what[i];

            let div = document.createElement('div');
            div.classList.add('recipe');

            let img = document.createElement('img');
            img.src = recipe.picture;
            img.alt = "recipe";
            img.addEventListener('click', function(event){
                window.open(recipe.href)
            })

            let h2 = document.createElement('h2');
            h2.innerHTML = "" + recipe.title;

            let paragraph = document.createElement('p');
            paragraph.innerHTML = "" + recipe.ingredients;

            let buttLike = document.createElement('button');
            let buttCreate = document.createElement('button')
            buttCreate.innerText = "Сготви";

            buttCreate.addEventListener('click', function () {
                user.cooking(recipe);
                recipe.cooked += 1;
                console.log(user.cooked);
            })

            if (user.isLiked(recipe)) {
                buttLike.innerText = "Премагни от любими";
                buttLike.addEventListener('click', function () {
                    user.dislike(recipe);
                    changeHash();
                });
            }else{
                buttLike.innerText = "Добави в любими";
                buttLike.addEventListener('click', function () {
                    user.like(recipe);
                    changeHash();
                });
            }

            div.append(img, h2, paragraph, buttLike, buttCreate);
            where.append(div);
            
        }
    }

    let select = document.getElementById('pet-select');

    function createSelect(items, where){
        let all_ingridients = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let ingred = item.ingredients.split(", ");
            for (let j = 0; j < ingred.length; j++) {
                if(all_ingridients.indexOf(ingred[j]) < 0){
                    all_ingridients.push(ingred[j]);
                };
            }

        }
        for(var index = 0; index < all_ingridients.length; index++) {
            var opt = all_ingridients[index];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }

    }

    createSelect(manager.allItems)

    let search = document.getElementById('search');
    search.addEventListener('keyup', function (event) {
        let value = event.target.value;
        if (value.length > 0){
            let filtered = manager.search(value);
            print(filtered, results);
        } else {
            changeHash();
        }
            
    })

    select.addEventListener('change', function(event){
        let value = event.target.value;
        if (value.length > 0){
            let filtered = manager.search_select(value);
            print(filtered, results);
        } else {
            changeHash();
        }
    })

    let buttSubmit = document.getElementById('submit-butt');
    buttSubmit.addEventListener('click', function(){
        let title = document.getElementById('submit-butt');
        let href = document.getElementById('submit-butt');
        let ingredi = document.getElementById('submit-butt');
        let picture = document.getElementById('picture');
        
        if (title.value.length > 0 || href.value.length > 0 || ingredi.value.length > 0 || picture.value.length > 0) {
            let obj = new Recipe(title.value, href.value, ingredi.value, picture.value);
            manager.addToStart(obj);
            alert("Създадохте рецепта")
        } else {
            alert("Въведете всички полета!")
        }

    })

    let buttSubmitUser = document.getElementById('user-png-logo');

    buttSubmitUser.addEventListener('click', function(){
        let name = document.getElementById('name');
        let age = document.getElementById('age');
        let address = document.getElementById('address');
        let pictureUser = document.getElementById('picture-user');
        let imgBox = document.getElementById('user-profile-img');

        
        if (title.value.length > 0 || age.value.length > 0 || address.value.length > 0 || pictureUser.value.length > 0) {
            user.name = name.value;
            user.age = age.value;
            user.address = address.value;
            user.profile_photo = pictureUser.value;
            imgBox.src = pictureUser.value;
            alert("Променихте профила си!")
            
        } else {
            alert("Въведете всички полета!")
        }
    })

    let tableCreate = function (items) {
        let div = document.getElementById('table-cooked');
        for (let i = 0; i < items.length; i++) {
            let oneRecipe = items[i];
            if (oneRecipe.cooked > 0){
                let divTable = document.createElement('div');
                let h2 = document.createElement('h2');
                let pp = document.createElement('p');

                h2.innerText = oneRecipe.title;
                pp.innerText = oneRecipe.cooked

                divTable.append(h2, pp);
                div.append(divTable)
            }
            
        }
    }
    tableCreate(manager.allItems)
})();