const loadnews = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const newscat = data.data;
    console.log(newscat)
    const btnContainer = document.getElementById('button-container');
    newscat.forEach((category) => {
        const div =document.createElement('div');
        div.innerHTML=`
        <button onclick="handleLoadNews('${category.category_id}')" class="btn mr-2  px-8 mt-2 w-24">${category.category}</button>
        `
        btnContainer.appendChild(div)

    })
 
};




const handleLoadNews = async (category_id) =>{
    const response = await  fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    const news = data.data
    const cardContainer =document.getElementById('card-container')
    cardContainer.textContent ='';
    const noImage =document.getElementById('no-image')
    if(news.length === 0){
        noImage.classList.remove('hidden');
    } else{
        noImage.classList.add('hidden');
    }
    
   
  
   
    news.forEach((news) =>{
        console.log(news)
         const div = document.createElement('div');
         const times = news.others.posted_date
         function hourMin(total){
         const hour = Math.floor(total/3600);
         const minute = Math.floor((total%3600)/ 60);
         return `${hour} hrs ${minute} min ago`
         }
         
         const somoyy = hourMin(times)   
         const nnn =news.others.views
         
  
         
         div.innerHTML =`
                <div class="card bg-base-100">
                    <div class="h-[250px] relative">
                        <img src="${news.thumbnail}" class="h-[100%] w-[100%] rounded-lg" />  
                        
                        <p ><span  class="${times >= 1?'bg-black':'' }  text-white py-1 absolute rounded-md px-2 bottom-[5%] right-[5%]">${news.others.posted_date > 1 ? somoyy : ''}</span></P>
                    </div>
                    <div class="flex mt-6 ">
                        <div class="w-12 h-12 ">
                           <img class=" rounded-full h-[100%] w-[100%]" src="${news.authors[0].profile_picture}"/>
                        </div>
                        <div class="ml-4">
                            <h1 class="text-2xl font-bold">${news.title}</h1>
                            <div class=" flex mt-2">
                                <p class="mr-2"> ${news.authors[0].profile_name}</P>
                                <p><span>${news.authors[0].verified==true?"<img src='images/u.svg'/>" : ''}</span></p>

                            </div>
                            <p class="mt-1">${nnn} views</p>
                        </div>
                    </div>
                </div>
         `
        cardContainer.appendChild(div) ;   
       
    })  
    
}


document.getElementById('blog').addEventListener('click', function(){
    window.location = "blog.html"
})






loadnews()
handleLoadNews(1000)