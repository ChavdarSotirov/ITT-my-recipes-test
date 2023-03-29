let userStorage = (function(){
    class UserStorage{
                
        constructor(){
            if(!localStorage.getItem("users")){
                let users = [
                    new User("pesho", "1234", "Pesho", 23, "Sofia"),
                    new User("gosho", "123", "Gosho", 22, "Sofia")
                ]
                localStorage.setItem("users", JSON.stringify(users));
            }
            this.users = JSON.parse(localStorage.getItem("users"));
        }

        addUser(username, password) {
            if(!this.existsUser(username)){
                this.users.push(new User(username, password));
                localStorage.setItem("users", JSON.stringify(this.users));
            }
        }

        existsUser(username){
            return this.users.some( u => u.username === username);
        }

        validateUser(username, password){
            return this.users.some( u => u.username === username && u.password === password);
        }
    }
    return new UserStorage();
})();