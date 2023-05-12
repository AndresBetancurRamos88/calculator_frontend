# calculator

## Project setup
```
npm install
```
```
Create a ".env" file that contains the following variables:

VUE_APP_BASE_URL= backend base url Examlple https//:localhost:8080/
VUE_APP_CLIENT_ID= this secret is provied by the backend
VUE_APP_CLIENT_SECRET= this secret is provied by the backend
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy on AWS
```
Go to AWS S3 an create a bucket

Check the option "ACLs enabled"
Uncheck the option "Block all public access"
create the bucket

Go to your bucket in the properties tab and at the end edit "Static website hosting"
    - Static website hosting: Enable
    - Hosting type: Host a static website
    - Index document: index.html
    - save changes'
Go to your bucket and click on upload, then drag the files from the "dist" folder and drop them into the bucket
scoll down and in the "Access" for "Everyone" check "Read"

```
