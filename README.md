# ECOMMERCE APP

## UI

1. Login
![login ui](./_media/login.png?raw=true)

1. Sign up
![sign up ui](./_media/signup.png?raw=true)

1. Homa page
![Home page](./_media/homepage.png?raw=true)

1. Single product
![Single product](./_media/single_product.png?raw=true)

1. Admin
![Admin ui](./_media/admin.png?raw=true)

## [GET SERVER FOR APP](https://github.com/DiepVanTy-2409/ecommerce_server) 

## Setup project

```
npm install
```

## Create .env file 
```
VITE_CREATE_PRODUCT=http://localhost:5000/product/create
VITE_UPDATE_PRODUCT=http://localhost:5000/product/update
VITE_DELETE_PRODUCT=http://localhost:5000/product/delete/
VITE_SEARCH_PRODUCT=http://localhost:5000/product/search/
VITE_GET_ALL_PRODUCTS=http://localhost:5000/product/
VITE_PUBLIC_FOLDER=http://localhost:5000/images/
VITE_LOGIN=http://localhost:5000/auth/login
VITE_REGISTER=http://localhost:5000/auth/register
VITE_IS_ADMIN=http://localhost:5000/auth/is-admin
VITE_CATEGORY=http://localhost:5000/category/
VITE_UPLOAD=http://localhost:5000/upload
VITE_LIMIT_LOAD_PRODUCTS=8
```

## Run app
```
npm dev
```








