    const categoriesContainer = document.getElementById('categories-container');
    const newsContainer = document.getElementById('news-container');

    const loadCategories = ()=>{
        fetch('https://news-api-fs.vercel.app/api/categories')
        .then(res=> res.json())
        .then(data =>{
            
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
                <li id ='${cat.id}' class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${cat.title}</li>
            `
            })

            categoriesContainer.addEventListener('click', (e)=>{
                const allLi = document.querySelectorAll('li');
                allLi.forEach(li =>{
                    li.classList.remove('border-b-4');
                })

                if(e.target.localName === 'li'){
                    e.target.classList.add('border-b-4');
                    loadNewsByCategories(e.target.id);
                }
            })
    }

    const loadNewsByCategories = (categoryId)=>{
        // console.log(categoryId);
        fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.articles);
            showNewsByCategory(data.articles)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const showNewsByCategory = (articles) =>{
        // console.log(articles);
        newsContainer.innerHTML = '';
        articles.forEach(article =>{
            console.log(article);
            newsContainer.innerHTML += `
                
            <div class = "m-3 shadow-lg rounded-xl p-4">
                <div>
                <img src = "${article.image.srcset[5].url}"/> 
                </div>
                <h1>${article.title}<h1>
                <div class = "flex justify-between items-center text-sm">
                    <div>${article.time}</div>
                    <div>${article.datetime}</div>
                </div>
            </div>
                
            `
        })
    }


    loadCategories();
