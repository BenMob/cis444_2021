access_token = undefined;

const renderPopup = (message, title) => {
    $("#popup-title").html(title)
    $("#popup-message").html(message)
    $("#popup-component").show()
}

const hidePopup = () => {
    $("#popup-component").hide()
}

const renderLogin = () =>{
    $("#login-component").show()
    $("#signup-component").hide()
    $("#bookstore-component").hide()
    $("#nav-auth").hide()
    $("#log-username").val("")
    $("#log-password").val("")
}

const renderSignUp = () => {
    $("#login-component").hide()
    $("#signup-component").show()
    $("#bookstore-component").hide()
    $("#nav-auth").hide()
    $("#sign-fname").val("")
    $("#sign-lname").val("")
    $("#sign-username").val("")
    $("#sign-password").val("")
}

const renderBooks = () => {
    fetch("/secure_api/books",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({access_token: access_token})
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.clear()
        console.log(data)
        if(data.status != 200){
            renderPopup(data.message, "Message")
        }else{
            access_token = data.access_token
            $("#login-component").hide()
            $("#signup-component").hide()
            $("#bookstore-component").show()
            $("#nav-auth").show()
            $("#book-shelf").empty()
            data.books.forEach(book => {
                div = createBookDiv(book.id, book.title, book.price, book.cover)
                $("#book-shelf").append(div)
            })
        }
    })
}

const handleLogin = (token) => {
    access_token = token;
    renderBooks();
}

const handleLogout = () => {
    access_token = undefined
    renderLogin()
}

const handleOrder = (id, title, price, cover) => {
    renderPopup(`You have ordered the book "${title}" for $${price}. Thank you for shopping with us.`, "Order placed successfuly!")
}

const createBookDiv = (id, title, price, cover) => {
    let order = {title: title, price: price, cover: cover}
    order = JSON.stringify(order)
    
    const div = `<div class="w3-card-4 w3-padding-16 w3-animate-top">                                                                                                                                                                                
          <div class="w3-container w3-center">                                                                                                                                                              
           <img src="${cover}" alt="book-cover" width="125" height="150" class="w3-center">
          </div>
          <div class="w3-container w3-center">                                                                                                                                                                                                           
          <p>${title}</p>                                                                                                                                                                                                                    
          <div class="buy-container">                                                                                                                                                                                                                   
            <strong>$${price}</strong>                                                                                                                
            <input type="button" value="Order" class="button" onclick="handleOrder('${id}', '${title}', '${price}', '${cover}')"></input>
          </div>                                                                                                                                                                                                                                         
         </div>                                                                                                                                                                                                                                          
        </div>`
    
    return div;
}

$(document).ready(() => {

    // Routing
    $("#nav-auth").on("click", handleLogout)
    $("#nav-register").on("click", renderSignUp)
    $("#nav-login").on("click", renderLogin)
    
    // Hide Popup and Show Login Page By Default
    hidePopup()
    renderLogin()

    // Handling Submissions
    $(document).on("submit", "#login-form", (event) => {
	event.preventDefault();
	
	let uname = $("#log-username").val()
	let pass = $("#log-password").val()
	let data = {username: uname, password: pass}
	
	fetch(`/open_api/login`,{
	    method: "POST",
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(data)})
	    .then((response) => {
		return response.json()
	    }).then((data) => {
		if(data.status !== 200){
		    renderPopup(data.message, "Message")
		    $("#log-username").val("")
		    $("#log-password").val("")
		}else{
		    handleLogin(data.access_token)
		}
	    })
	
	return false;
    })

    $(document).on("submit", "#signup-form", (event) => {
	event.preventDefault()
	
	let fname = $("#sign-fname").val()
	let lname = $("#sign-lname").val()
	let uname = $("#sign-username").val()
	let pass = $("#sign-password").val()
	let data = {first_name: fname, last_name: lname, username: uname, password: pass}

        fetch("/open_api/signup",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)})
            .then((response) => {
                return response.json()
            }).then((data) => {
                if(data.status !== 200){
		    renderPopup(data.message, "Message")
                    $("#sign-username").val("")
                    $("#sign-password").val("")
                }else{
		    renderPopup(data.message, "Welcome!!!")
		    $("#sign-fname").val("")
                    $("#sign-lname").val("")
                    $("#sign-username").val("")
                    $("#sign-password").val("")
                }
            })
	
        return false;
    })
})


