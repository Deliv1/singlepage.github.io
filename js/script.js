//BASKET

(()=> {
	const cartBtn = document.querySelectorAll(".store-item");
	cartBtn.forEach((btn)=> {
		btn.addEventListener("click", (event)=> {

		if(event.target.parentElement.classList.contains("store-item")) {
			let fullPath = event.target.src;
			let pos = fullPath.indexOf("img") + 3;
			let partPath = fullPath.slice(pos);

			const item = {};
			item.img = `img-cart${partPath}`;
			let name = event.target.parentElement.parentElement.children[2].textContent;
			item.name = name;
			
			let price = event.target.parentElement.parentElement.children[1].textContent;
			let finalPrice = price.slice(0, -3).trim();
			item.price = parseInt(finalPrice);
			
			const cartItem = document.createElement("div");
			cartItem.classList.add(
				"cart-item",
				"clearfix"
			)

			cartItem.innerHTML = `
				<button class="remove-product" type="button" title="Убрать с корзины"></button>
				<div class="selected-item">
					<img src="${item.img}" width="33" height="33" alt="Пломбир с апельсиновым джемом">
				</div>
				<div class="product-name">
					<span>${item.name}</span>
				</div>
				<div class="prise-product">1.5 кг <span>х 200руб.</span></div>
				<div class="sum"><span class="cart-item-price">${item.price}</span> руб.</div>
			`
			const cartBox = document.getElementById("cart-box");
			const total = document.querySelector(".total");
			cartBox.insertBefore(cartItem, total);

			//~~~~~~~~~~~~~~~~~~

			
			showTotals();
			removeElement(showTotals);
			}
		});
	});
	const showTotals = ()=> {
		const total = [];
		const items = document.querySelectorAll(".cart-item-price");
		const basket = document.getElementById("basket");
		const itemCount = document.getElementById("item-count");

		items.forEach((item)=> {
			total.push(parseInt(item.textContent));
		});
		const totalMoney = total.reduce((total, item)=> {
			total += item;
			return total;
		}, 0)

		const finalMoney = totalMoney;

		if(total.length == 1) {
			const trash = document.querySelector(".trash-empty");
			trash ? trash.parentNode.removeChild(trash) : false;

			basket.children[1].textContent = "Товар"
			basket.classList.add("full-cart");

		} else if (total.length >= 2) {
			basket.children[1].textContent = "Товара";
		}

		document.getElementById("total").textContent = finalMoney;
		document.getElementById("item-count").textContent = total.length;
		document.getElementById("total").textContent = finalMoney;
	}
	
	const removeElement = (count)=> {
		const remove = document.querySelectorAll(".remove-product");
		
		
		
		for(let i = 0; i < remove.length; i++) {
			
			remove[i].onclick = ()=> {
				const cartBox = document.getElementById("cart-box")
				const cartItems = document.querySelectorAll(".cart-item");
				const basket = document.getElementById("basket");
				const elem = remove[i].parentElement;
				elem.remove();
				count();
				if(cartItems.length == 1) {
					basket.children[0].textContent = " ";
					basket.children[1].textContent = "Пусто";
					basket.classList.remove("full-cart");
					
					const empty = document.createElement("h2");
					
					empty.classList.add("trash-empty");
					cartBox.insertBefore(empty, cartBox.firstChild);
					empty.textContent = "Корзина пуста.";
				}
			}
		}

	}
removeElement(showTotals);

})();

const result = document.getElementById("checkout");
result.addEventListener("click", ()=> {
	const sum = document.getElementById("total");
	const finalSum = sum.textContent;
	console.log(`Cумма заказа на: ${parseInt(finalSum)} руб.`);
})


//POPUP


const link = document.querySelector(".button-show");
const popup = document.querySelector(".feedback-block");
const overlay = document.querySelector(".modal-overlay");
const close = popup.querySelector(".feedback-close");

link.addEventListener("click", (event)=> {
	event.preventDefault();
	popup.classList.add("modal-content-show");
	overlay.classList.add("modal-overlay-show");
});
close.addEventListener("click", (event)=> {
	event.preventDefault();
	popup.classList.remove("modal-content-show");
	overlay.classList.remove("modal-overlay-show");
});
overlay.addEventListener("click", (event)=> {
	event.preventDefault();
	popup.classList.remove("modal-content-show");
	overlay.classList.remove("modal-overlay-show");
});
