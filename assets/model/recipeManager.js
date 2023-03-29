class RecipeManager{
    constructor(){
        this.allItems = [];
    }

    // search
    search(text){
        if (typeof text === "string" && text.trim().length > 0) { 
            text = text.toLowerCase();

            // let filtered = [];
            // for (let i = 0; i < this.allItems.length; i++) {
            //     let item = this.allItems[i];
            //     if (item.title.toLowerCase().includes(text)) {
            //             filtered.push(item);
            //     }
            // }
            // return filtered;

            return this.allItems.filter(e => e.title.toLowerCase().includes(text))
            
        }
    }

    search_select(text){
        if (typeof text === "string" && text.trim().length > 0) {
            text = text.toLowerCase();

            // let filtered = [];
            
            // for (let i = 0; i < this.allItems.length; i++) {
            //     let item = this.allItems[i];
            //     if (item.ingredients.toLowerCase().includes(text)) {
            //             filtered.push(item);
            //     }
            // }
            // return filtered;

            return this.allItems.filter(e => e.ingredients.toLowerCase().includes(text))
            
        }
    }

    
    //add
    add(item){
        if(item instanceof Recipe){
            if(this.allItems.indexOf(item) === -1){
                this.allItems.push(item);
            }
        }
    }

    addToStart(item){
        if(item instanceof Recipe){
            if(this.allItems.indexOf(item) === -1){
                this.allItems.unshift(item);
            }
        }
    }
}