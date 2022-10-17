const fs = require("fs")
let products = []
let categories = []

module.exports.initialize = ()=> {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/products.json", 'UTF-8', (err, data) => {
            if (err) {
                reject("No results returned")
                return
            }
            try {
                products = JSON.parse(data)
            }
            catch (err) {
                console.log("Error because of " + err)
            }
        })

        fs.readFile("./data/categories.json", 'UTF-8', (err, data)=> { 
            if (err) {
                reject("No results returned")
                return

            }
            try {
                categories = JSON.parse(data)
            }
            catch (err) {
                console.log("Error because of " + err)
            }
        })
        
        resolve()
    })
}

module.exports.getAllProducts = ()=> {
    return new Promise(function(resolve, reject){
        if (products.length == 0){
            reject("No results returned")
            return
        }
 
        resolve(products)
    })
}

module.exports.getPublishedProducts = ()=> {
    return new Promise(function(resolve, reject) {
      let published = products.filter(
        function(product){ return product.published == true}
        )
      if (published.length == 0) {
        reject("No results returned")
        return
      }
      resolve(published)
    })
  }

module.exports.getCategories = ()=> {
    return new Promise(function(resolve, reject){
        if (categories.length == 0){
            reject("No results returned")
            return
        }
 
        resolve(categories)
    })
}

module.exports.addProduct = (productData) => {
    return new Promise(function(resolve, reject){
        productData.published = (productData.published) ? true : false;
        productData.id = products.length + 1;
        products.push(productData);

        resolve();
    })
}

module.exports.getProductsByCategory = function (category) {
    return new Promise(function (resolve, reject) {
        var productsCategory = [];

        for (let i = 0; i < products.length; i++) {

            if (products[i].category == category) {
                productsCategory.push(products[i]);
            }
        }

        if (productsCategory.length == 0) {
            reject("No result returned");
            return;
        }
        resolve(productsCategory);
    });
}

module.exports.getProductsByMinDate = function (minDateStr) {
    return new Promise(function (resolve, reject) {
        var pdtMinDate = [];

        for (let i = 0; i < products.length; i++) {
            if (new Date(products[i].productDate) >= new Date(minDateStr)) {
                console.log("The productDate value is greater than minDateStr")
                pdtMinDate.push(products[i]);
            }
        }
        if (pdtMinDate.length == 0) {
            reject("No result returned");
            return;
        }
        resolve(pdtMinDate);
    });
  
}

module.exports.getproductById = function (id) {
    return new Promise(function (resolve, reject) {
        var productId = [];
        
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                productId.push(products[i]);
            }
        }

        if (productId.length == 0) {
            reject("No result returned");
            return;
        }
        resolve(productId);
    });
}

