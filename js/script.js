const form = document.forms.first
const add_form = document.forms.menu
const add_product = document.querySelector(".add-product")
const back = document.querySelector(".back")
const menu = document.querySelector(".menu")
const box = document.querySelector(".box")
let products = []

products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))


add_form.onsubmit = (event) => {
	event.preventDefault()

	let product = {
		id: Math.random(),
	}

	let fm = new FormData(event.target)
	fm.forEach((value, key) => {
		product[key] = value
	})

	if (!product.name) return
	if (!product.price) return

	products.push(product)
	reload(products)
	event.target.reset();
}

form.onsubmit = (event) => {
	event.preventDefault()
	filterProducts()
}


reload(products)
function reload(arr) {
	box.innerHTML = ""

	for (let item of arr) {
		const box_item = document.createElement("div")
		const item_title = document.createElement("h3")
		const item_price = document.createElement("span")
		const item_p = document.createElement("span")

		box_item.classList.add("box-item")

		item_title.textContent = item.name
		item_price.textContent = item.price
		item_p.textContent = "$"

		box.append(box_item)
		item_p.append(item_price)
		box_item.append(item_title, item_p)
	}
}


function filterProducts() {
	let minPrice = parseInt(document.getElementById('from').value);
	let maxPrice = parseInt(document.getElementById('to').value);

	let filtered = products.filter(product => product.price >= minPrice && product.price <= maxPrice).sort((a,b) => a.price - b.price);

	reload(filtered);
}
function close() {
	menu.classList.add("close")
	setTimeout(() => {
		menu.style.display = "none"
		menu.classList.remove("close")
	}, 500);
}
back.onclick = () => {
	close()
}
add_product.onclick = () => {
	menu.style.display = "flex"
	menu.classList.add("open")
}




