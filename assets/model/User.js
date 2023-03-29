class User {
    constructor(username, password, name, age, address, profile_photo) {
        this.username = username;
        this.password = password;
        this.name = "";
        this.age = -1;
        this.address = "";
        this.profile_photo = "assets/img/user-logo.png";
        this.liked = [];
        this.cooked = new Map();

    }

    like(recipe) {
        if (this.liked.indexOf(recipe) === -1) {
            this.liked.push(recipe);
        }
    }

    dislike(recipe) {
        let index = this.liked.indexOf(recipe);
        if (index !== -1) {
            this.liked.splice(this.liked.indexOf(recipe), 1);
        }
    }


    isLiked(recipe) {
        return this.liked.indexOf(recipe) !== -1;
    }

    cooking(recipe) {
        this.cooked.set(recipe.title, recipe.cooked);
    }



}
