const categoriesContainer = document.getElementById('categories-container');

const loadCategories = ()=>{
    fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res=> res.json())
    .then(data =>{
        console.log(data.categories);
        const categories = data.categories;
        showCategories(categories);
    })
    .catch(err=>{
        console.log(err);
    })
}

const showCategories = (categories) =>{
    categories.forEach(cat =>{
            categoriesContainer.innerHTML += `
             <li id ='${cat.id}' class="hover:border-b-4 hover:border-red-600 cursor-pointer">${cat.title}</li>
        `
        })
}
loadCategories();