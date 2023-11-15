//! Modal create
const createBtn = document.querySelector("#create_btn");
const content = document.querySelector(".content");
const modul = document.querySelector(".modul")
const cancel_btns = document.querySelectorAll(".cancel")
const modulEdit = document.querySelector('.modul_edit')

createBtn.addEventListener('click', () => {
    modul.style.display = "block"
    content.style.filter = "blur(3px)"
})

//? Modul cancel
cancel_btns.forEach((cancel_btn) => {
    cancel_btn.addEventListener('click', () => {
        modul.style.display = "none";
        modulEdit.style.display = "none"
        content.style.filter = "none"
    })
})

//! database item show

const BASE_URL = "http://localhost:3000/"

async function getDataPosts() {
    const data = await fetch(`${BASE_URL}posts`)
    const response = await data.json()

    if(response.length > 0) {
        return response
    }
}

//? send Data 
async function sendUserData(userObj) {
    await fetch(`${BASE_URL}posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj)
    })
}

//? Patch Data
async function PatchData(editUser,id) {
    await fetch(`${BASE_URL}posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser)
    })
}

//? Delete Data
async function deleteData(id) {
    await fetch(`${BASE_URL}posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

//? Like Data 
async function likeData(likeUser,id) {
    await fetch(`${BASE_URL}posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(likeUser)
    })
}

//! End databasa 

//! Create data get UI
async function getUserUI () {
    const dataUI = await getDataPosts()
    dataUI.forEach((user) => {
        content.innerHTML += `
          <div class="box" data-id="${user.id}">
              <div class="box_header">
                  <h6>${user.title}</h6>
                  <div class="date">${user.date}</div>
              </div>
              <div class="box_text">
                  <p>${user.message }</p> <span ${(user.message.length > 110) ? 'style="display: block"' : 'style="display: none"'} class='see-more'>... See More</span>
              </div>
              <div class="box_footer">
                  <div class="like footer_icon ${(user.isLiked == true) ? 'active' : ''}" data-id ="${user.isLiked}"><span class="material-symbols-outlined">
                      thumb_up
                  </span><p>Like</p></div>
                  <div class="edit footer_icon" id = "edit_btn"><span class="material-symbols-outlined">
                      edit_square
                  </span><p>Edit</p></div>
                  <div class="delete footer_icon"><span class="material-symbols-outlined">
                      delete
                  </span><p>Delete</p></div>
              </div>
          </div>
          `
        })
    //! Edit item 
    const editBtn = document.querySelectorAll("#edit_btn")
    editItem(editBtn)
    
    //? Delete item
    const deleteItems = document.querySelectorAll('.delete')
    deleteItem(deleteItems)

    //? Like button
    const likeBtn = document.querySelectorAll(".like")
    likeItemChange(likeBtn)

    //? see-more buton 
    const seeMoreBtn = document.querySelectorAll('.see-more')
    seeMoreBtn.forEach((span) => {
        span.addEventListener('click', () => {
            const boxText = span.parentElement; // Get the .box_text element
            boxText.classList.toggle('full-height');    
            span.textContent = boxText.classList.contains('full-height') ? '... see less' : '... see more';
        })
    })
}
getUserUI()

//! Create post dataBase
const form = document.querySelector("form")
const inputTitle = document.querySelector("#input_title")
const inputMsg = document.querySelector("#input_message")

form.addEventListener("submit", (e) => {
  
    //?Date create content
    let date = new Date()
    let ContentDate = (date.getDay() - 1) + "/" + (1 + date.getMonth()) + "/" + date.getFullYear()
    if(inputTitle.value.length > 0 || inputMsg.value.length > 0) {
        let obj = {
            id: Math.round(Math.random() * 100),
            title: `${inputTitle.value}`,
            message: `${inputMsg.value}`,
            isLiked: false,
            date: `${ContentDate}`
        }
        
        sendUserData(obj)
    } else {
        alert("You cannot enter an empty value.")
    }
})

//!Edit item database
const editForm = modulEdit.querySelector("form")
const editHead = modulEdit.querySelector("h3")
const modulTitleInp = modulEdit.querySelector('#input_title');
const modulMesagInp = modulEdit.querySelector('#input_message');

function editItem(item) {
    item.forEach((edit) => {
        
        edit.addEventListener("click", (e) => {
           const itemName = edit.parentElement.parentElement.querySelector('h6').innerHTML
           const itemMessage = edit.parentElement.parentElement.querySelector('p').innerHTML
           editHead.textContent = `Edit ${itemName} Post`;

           //? Edit Input value 
           modulTitleInp.value = itemName
           modulMesagInp.value = itemMessage

           modulEdit.style.display = "block"
           content.style.filter = "blur(3px)" 
           const itemID = edit.parentElement.parentElement.dataset.id;
            
           editForm.addEventListener("submit", (e) => {

                let editDate = new Date()
                let nowEditDate = (editDate.getDay() - 1) + "/" + (1 + editDate.getMonth()) + "/" + editDate.getFullYear()
                let obj = {
                    title: `${(modulTitleInp.value.length > 0) ? modulTitleInp.value : "You didn't edit"}`,
                    message: `${(modulMesagInp.value.length > 0) ? modulMesagInp.value : "You didn't edit"}`,
                    date: `${nowEditDate}`
                }
                PatchData(obj, itemID)
            })
        })
    })
}

//! Delete Item
function deleteItem(itemsDelet) {
    itemsDelet.forEach((itemDelet) => {
        itemDelet.addEventListener('click', () => {
            const confirmDelete = confirm("Are you sure you want to delete?")
            if(confirmDelete) {
                const deletItemId = itemDelet.parentElement.parentElement.dataset.id
                
                deleteData(deletItemId)
                window.location.reload()
            } 
        })
    })
}

//! Like Item
function likeItemChange(likeItems) {
    likeItems.forEach((item) => {
        item.addEventListener('click', (e) => {

            const likeBtnId = item.parentElement.parentElement.dataset.id
            const isLikedVal = item.dataset.id;
            
            if(isLikedVal == "false") {
                let objLike = {
                    isLiked: true
                }
                likeData(objLike, likeBtnId)
            } else {
                let objLike = {
                    isLiked: false
                }
                likeData(objLike, likeBtnId)
            }
        })
    })
}
