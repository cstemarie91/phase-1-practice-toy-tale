let addToy = false;

//let allToys = [];
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form');
  //console.log(formName);
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
});

  

  
  function renderToys(toys){
    const main = document.querySelector('#toy-collection')
    main.innerHTML= '';
  
      toys.forEach(toy => {
        const theToy = document.createElement('div');
        theToy.className = 'card';

        //const toyID = document.createElement('div')
        //toyID.textContent = `id: ${toy.id}`;
        
        const toyName = document.createElement('h2')
        toyName.textContent = toy.name;

        const toyImg = document.createElement('img')
        toyImg.src = toy.image
        toyImg.style.width = `200px`;

        const toyLikes = document.createElement('p')
        toyLikes.textContent = toy.likes
        let numOfLikes = toyLikes.textContent 
        
        const likeButton = document.createElement('button')
        likeButton.className = 'like-btn';
        likeButton.id = toy.id;
        likeButton.textContent = "Like ❤️"


           // theToy.appendChild(toyID);
        theToy.appendChild(toyName);
        theToy.appendChild(toyImg);
        theToy.appendChild(toyLikes);
        theToy.appendChild(likeButton);
        main.appendChild(theToy);


        function addLike(){
          numOfLikes++;
          toyLikes.textContent = numOfLikes;

  
        }
       likeButton.addEventListener('click', addLike);
      
      })
     
  }
    function fetchToys(){
      fetch('http://localhost:3000/toys')
      .then((resp) => resp.json())
      .then((data) => {
        renderToys(data);
        })
        .catch((error) => {
          console.error('Error fetching toys:', error);
        });;
      }
  form.addEventListener('submit', handleFormSubmit);
  
    function handleFormSubmit(event){
      event.preventDefault()
      const nameInput = document.querySelector('.add-toy-form input[name="name"]').value;
      const imageInput = document.querySelector('.add-toy-form input[name="image"]').value;
      fetch('http://localhost:3000/toys', {
  
        method: "POST",
        headers: {
           'content-type': 'application/json',
            'accept': 'application/json',
         },
       body:JSON.stringify({
        name: nameInput,
        image: imageInput,
        likes: 0,
         })
        })
      .then(response => response.json())
      .then(newToy => {
        fetchToys(); 
      })
      .catch(error => {
        console.error('Error adding toy:', error);
      })
      
      
      form.reset();
    }
  fetchToys();
    })
    
    
  
  
