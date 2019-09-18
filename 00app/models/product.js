const fs = require('fs');
const path = require('path');

// const products = [];

const pth = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {

    fs.readFile(pth, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(pth, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(pth, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static fetchAll(cb) {

        getProductsFromFile(cb);
        // return products;
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(pth, JSON.stringify(updatedProducts), err =>{
                if (!err){
                    
                }
            });
          
        });
    }
};