document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu');
    const modal = document.getElementById('modal');
    const modalName = document.getElementById('modal-name');
    const modalDesc = document.getElementById('modal-desc');
    const sizeSelect = document.getElementById('size');
    const qtyInput = document.getElementById('qty');
    const addToCartBtn = document.getElementById('add-to-cart');
    const closeModal = document.querySelector('.close');
    const notification = document.getElementById('notification');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartIcon = document.querySelector('.cart-icon');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const placeOrderBtn = document.getElementById('place-order');
    const cartCount = document.getElementById('cart-count');

    let cart = [];
    let currentItem = null;

    const menu = [
        {
            category: 'Pizza',
            items: [
                { name: 'Chicken Tikka Pizza', desc: 'You Enjoy Flavour Of Traditional Chicken Tikka, Onion, Tomato, Bell Pepper, Special Tikka Sauce', prices: { R: 599, M: 939, L: 1399, XL: 1999, XXL: 2199 }, image: 'https://placehold.co/300x200?text=Chicken+Tikka+Pizza' },
                { name: 'Chicken Fajita Pizza', desc: 'And Those Who Love Chicken Fajita, Special Fajita Pizza With Chicken Fajita, Onion, Tomato, Bell Pepper, Cheese, Sauce', prices: { R: 599, M: 939, L: 1399, XL: 1999, XXL: 2199 }, image: 'https://placehold.co/300x200?text=Chicken+Fajita+Pizza' },
                { name: 'Chicken Supreme Pizza', desc: 'Mouthwatering Loaded Of Chicken Fajita, Smoke Chicken, Sausage, Onion, Black Olives, Mushroom, Tomato, Capsicum', prices: { R: 599, M: 939, L: 1399, XL: 1999, XXL: 2199 }, image: 'https://placehold.co/300x200?text=Chicken+Supreme+Pizza' },
                { name: 'Hot N Spicy Chicken Grilled Pizza', desc: 'Jalapeno, Tomato, Onion, Smoked Chicken Beef Pepperoni', prices: { R: 699, M: 999, L: 1599, XL: 2599, XXL: 2699 }, image: 'https://placehold.co/300x200?text=Hot+N+Spicy+Chicken+Grilled+Pizza' },
                { name: 'Turkish Smoked Beef Pizza', desc: 'Turkish Smoked Beef, Jalapeno, Onion, Smoked Beef Pepperoni', prices: { R: 699, M: 999, L: 1599, XL: 2599, XXL: 2699 }, image: 'https://placehold.co/300x200?text=Turkish+Smoked+Beef+Pizza' },
                { name: 'Hot Chicken Pepperoni Pizza', desc: 'Our Best Hot Chicken Pepperoni, Mushroom, Bell Pepper And Load Of Cheese', prices: { R: 599, M: 939, L: 1399, XL: 1999, XXL: 2199 }, image: 'https://placehold.co/300x200?text=Hot+Chicken+Pepperoni+Pizza' },
                { name: 'Cheese Melt Pizza', desc: 'A Fully 100% Mozzarella Cheese Special, Base Of Cheese', prices: { R: 599, M: 939, L: 1399, XL: 1999, XXL: 2199 }, image: 'https://placehold.co/300x200?text=Cheese+Melt+Pizza' },
                { name: 'Vegi Delight', desc: 'A Fairy Culinary Combination Of Tomato, Mushroom, Corn And Load Of, Bell Pepper, Black Olive, Sweet Cheese', prices: { R: 599, M: 939, L: 1399, XL: 1999, XXL: 2199 }, image: 'https://placehold.co/300x200?text=Vegi+Delight' },
                { name: 'Hawaiian Pizza', desc: 'Smoke Grilled, Pineapple, Onion, Tomato, Cheese', prices: { R: 649, M: 999, L: 1599, XL: 1999, XXL: 2299 }, image: 'https://placehold.co/300x200?text=Hawaiian+Pizza' }
            ]
        },
        {
            category: 'Special Pizza',
            items: [
                { name: 'Crown Crust Pizza', desc: '', prices: { M: 1199, L: 1699, XL: 2599, XXL: 3299 }, image: 'https://placehold.co/300x200?text=Crown+Crust+Pizza' },
                { name: 'Stuffed Crust Pizza', desc: '', prices: { M: 1199, L: 1699, XL: 2599, XXL: 3299 }, image: 'https://placehold.co/300x200?text=Stuffed+Crust+Pizza' },
                { name: 'Kabab Crust Pizza', desc: '', prices: { M: 1199, L: 1699, XL: 2599, XXL: 3299 }, image: 'https://placehold.co/300x200?text=Kabab+Crust+Pizza' },
                { name: 'Malai Boti Pizza', desc: '', prices: { M: 1199, L: 1699, XL: 2599, XXL: 3299 }, image: 'https://placehold.co/300x200?text=Malai+Boti+Pizza' },
                { name: 'Special Stuffed White Sauce Pizza', desc: '', prices: { M: 1299, L: 999, XL: 2499, XXL: 2999 }, image: 'https://placehold.co/300x200?text=Special+Stuffed+White+Sauce+Pizza' }
            ]
        },
        {
            category: 'Burgers',
            items: [
                { name: 'Zinger Burger', desc: '', prices: { '': 429 }, image: 'https://placehold.co/300x200?text=Zinger+Burger' },
                { name: 'Zinger Tawara Burger', desc: '', prices: { '': 589 }, image: 'https://placehold.co/300x200?text=Zinger+Tawara+Burger' },
                { name: 'Mighty Zinger Patties Burger', desc: '', prices: { '': 549 }, image: 'https://placehold.co/300x200?text=Mighty+Zinger+Patties+Burger' },
                { name: 'Chicken Petty Burger', desc: '', prices: { '': 299 }, image: 'https://placehold.co/300x200?text=Chicken+Petty+Burger' },
                { name: 'Smoked House Grilled Burger (Chicken N Beef)', desc: '', prices: { '': 429 }, image: 'https://placehold.co/300x200?text=Smoked+House+Grilled+Burger' },
                { name: 'Big Grilled Burger (Chicken N Beef)', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Big+Grilled+Burger' },
                { name: 'Jalapeno Grilled Burger (Chicken)', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Jalapeno+Grilled+Burger' },
                { name: 'Sriacha Grilled Burger (Chicken)', desc: '', prices: { '': 449 }, image: 'https://placehold.co/300x200?text=Sriacha+Grilled+Burger' },
                { name: 'Mushroom Hangover Grilled Burger (Chicken/Beef)', desc: '', prices: { '': 549 }, image: 'https://placehold.co/300x200?text=Mushroom+Hangover+Grilled+Burger' },
                { name: 'Smash Grilled Burger (Single Patty With Cheese)', desc: '', prices: { '': 550 }, image: 'https://placehold.co/300x200?text=Smash+Grilled+Burger' },
                { name: 'Smash Double Patty With Double Cheese', desc: '', prices: { '': 899 }, image: 'https://placehold.co/300x200?text=Smash+Double+Patty' },
                { name: 'Carnivores Special K Topping N Cheese', desc: '', prices: { '': 949 }, image: 'https://placehold.co/300x200?text=Carnivores+Special' }
            ]
        },
        {
            category: 'Sandwich',
            items: [
                { name: 'American Club Sandwich', desc: 'Three Layers Fresh Bread With Grilled Cheese Tomato', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=American+Club+Sandwich' },
                { name: 'Mexican Chicken Grilled Sandwich', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Mexican+Chicken+Grilled+Sandwich' },
                { name: 'Panini Grilled Sandwich', desc: 'Panini Chicken Melt Tomato Onion Special Sauce', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Panini+Grilled+Sandwich' }
            ]
        },
        {
            category: 'Pasta',
            items: [
                { name: 'Alfardo Pasta', desc: '', prices: { '': 699 }, image: 'https://placehold.co/300x200?text=Alfardo+Pasta' },
                { name: 'Baked Pasta', desc: '', prices: { '': 549 }, image: 'https://placehold.co/300x200?text=Baked+Pasta' }
            ]
        },
        {
            category: 'Chicken Broast',
            items: [
                { name: '2 Pc With Fries Special Band', desc: 'With Arabic Garlic Sauce', prices: { '': 699 }, image: 'https://placehold.co/300x200?text=2+Pc+Chicken+Broast' },
                { name: '(Half) 4 Pc With 3fries Special 2 Band', desc: 'With Arabic 2 Garlic Sauce', prices: { '': 1399 }, image: 'https://placehold.co/300x200?text=Half+Chicken+Broast' },
                { name: '(Full) 8 Pc Big With 3 Fries Special Band With 3 Arabic Garlic Sauce', desc: '', prices: { '': 2399 }, image: 'https://placehold.co/300x200?text=Full+Chicken+Broast' }
            ]
        },
        {
            category: 'Wraps',
            items: [
                { name: 'Turkish Jalapino Grilled Wrap', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Turkish+Jalapino+Grilled+Wrap' },
                { name: 'Italian Pari Pari Grilled Wrap', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Italian+Pari+Pari+Grilled+Wrap' },
                { name: 'Burrito Chicken Grilled Wrap', desc: '', prices: { '': 549 }, image: 'https://placehold.co/300x200?text=Burrito+Chicken+Grilled+Wrap' },
                { name: 'Arabic Bbq Chicken Grilled Wrap', desc: '', prices: { '': 449 }, image: 'https://placehold.co/300x200?text=Arabic+Bbq+Chicken+Grilled+Wrap' },
                { name: 'Turkish Crispy Zinger Wrap', desc: '', prices: { '': 449 }, image: 'https://placehold.co/300x200?text=Turkish+Crispy+Zinger+Wrap' }
            ]
        },
        {
            category: 'Shawarma & Paratha Rolls',
            items: [
                { name: 'Turkish Chicken Shawarma', desc: '', prices: { '': 299 }, image: 'https://placehold.co/300x200?text=Turkish+Chicken+Shawarma' },
                { name: 'Turkish Chicken Platter', desc: '', prices: { '': 599 }, image: 'https://placehold.co/300x200?text=Turkish+Chicken+Platter' },
                { name: 'Turkish Beef Shawarma', desc: '', prices: { '': 449 }, image: 'https://placehold.co/300x200?text=Turkish+Beef+Shawarma' },
                { name: 'Chicken Paratha Roll', desc: '', prices: { '': 249 }, image: 'https://placehold.co/300x200?text=Chicken+Paratha+Roll' },
                { name: 'Peri Pari Chicken Paratha Roll', desc: '', prices: { '': 299 }, image: 'https://placehold.co/300x200?text=Peri+Pari+Chicken+Paratha+Roll' },
                { name: 'Jalapino Chicken Paratha Roll', desc: '', prices: { '': 299 }, image: 'https://placehold.co/300x200?text=Jalapino+Chicken+Paratha+Roll' },
                { name: 'Crispy Paratha Roll', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Crispy+Paratha+Roll' },
                { name: 'Stuffed Cheese Paratha Roll', desc: '', prices: { '': 550 }, image: 'https://placehold.co/300x200?text=Stuffed+Cheese+Paratha+Roll' }
            ]
        },
        {
            category: 'Wings',
            items: [
                { name: 'Crispy Hot Wing (5pc)', desc: '', prices: { '': 299 }, image: 'https://placehold.co/300x200?text=Crispy+Hot+Wing' },
                { name: 'Pari Pari Baked Wings (6pc)', desc: '', prices: { '': 449 }, image: 'https://placehold.co/300x200?text=Pari+Pari+Baked+Wings' },
                { name: 'Garlic Baked Wing (6pc)', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Garlic+Baked+Wing' },
                { name: 'Jalapino Baked Stick Wings (5pc)', desc: '', prices: { '': 449 }, image: 'https://placehold.co/300x200?text=Jalapino+Baked+Stick+Wings' },
                { name: 'Crispy Drum Stick', desc: '', prices: { '': 329 }, image: 'https://placehold.co/300x200?text=Crispy+Drum+Stick' },
                { name: 'Chicken Nuggets (5pc)', desc: '', prices: { '': 350 }, image: 'https://placehold.co/300x200?text=Chicken+Nuggets' }
            ]
        },
        {
            category: 'Fries',
            items: [
                { name: 'Salted Fries', desc: '', prices: { R: 249, L: 479 }, image: 'https://placehold.co/300x200?text=Salted+Fries' },
                { name: 'Masala Fries', desc: '', prices: { R: 249, L: 479 }, image: 'https://placehold.co/300x200?text=Masala+Fries' },
                { name: 'Batter Crunchy Fries', desc: '', prices: { R: 299, L: 579 }, image: 'https://placehold.co/300x200?text=Batter+Crunchy+Fries' },
                { name: 'Mayo Garlic Fries', desc: '', prices: { R: 349, L: 679 }, image: 'https://placehold.co/300x200?text=Mayo+Garlic+Fries' },
                { name: 'Jalapeno Fries', desc: '', prices: { R: 349, L: 679 }, image: 'https://placehold.co/300x200?text=Jalapeno+Fries' },
                { name: 'Loaded Pizza Fries', desc: '', prices: { R: 449, L: 799 }, image: 'https://placehold.co/300x200?text=Loaded+Pizza+Fries' },
                { name: 'Loaded Crack Crunchy Fries', desc: '', prices: { R: 449, L: 799 }, image: 'https://placehold.co/300x200?text=Loaded+Crack+Crunchy+Fries' }
            ]
        },
        {
            category: 'Chinese',
            items: [
                { name: 'Chicken Fried Rice', desc: '', prices: { '': 599 }, image: 'https://placehold.co/300x200?text=Chicken+Fried+Rice' },
                { name: 'Egg Fried Rice', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Egg+Fried+Rice' },
                { name: 'Vegetable Rice', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Vegetable+Rice' },
                { name: 'Chicken Chowmein', desc: '', prices: { '': 599 }, image: 'https://placehold.co/300x200?text=Chicken+Chowmein' },
                { name: 'Vegi Chowmein', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Vegi+Chowmein' },
                { name: 'Chicken Manchurian With Rice', desc: '', prices: { '': 799 }, image: 'https://placehold.co/300x200?text=Chicken+Manchurian+With+Rice' },
                { name: 'Chicken Chilli Dry With Rice', desc: '', prices: { '': 799 }, image: 'https://placehold.co/300x200?text=Chicken+Chilli+Dry+With+Rice' }
            ]
        },
        {
            category: 'Biryani',
            items: [
                { name: 'Beef Biryani (Half)', desc: '', prices: { '': 599 }, image: 'https://placehold.co/300x200?text=Beef+Biryani+Half' },
                { name: 'Beef Biryani (Full)', desc: '', prices: { '': 1049 }, image: 'https://placehold.co/300x200?text=Beef+Biryani+Full' }
            ]
        },
        {
            category: 'Soup',
            items: [
                { name: 'Chicken Corn Soup', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Chicken+Corn+Soup' },
                { name: 'Hot And Sour', desc: '', prices: { '': 449 }, image: 'https://placehold.co/300x200?text=Hot+And+Sour' },
                { name: 'Special Soup', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Special+Soup' }
            ]
        },
        {
            category: 'Shakes',
            items: [
                { name: 'Chocolate (Mars, Snickers, Kitkat etc)', desc: '', prices: { '': 599 }, image: 'https://placehold.co/300x200?text=Chocolate+Shake' },
                { name: 'Oreo Shake', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Oreo+Shake' },
                { name: 'Caramel Shake', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Caramel+Shake' },
                { name: 'Mango Shake', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Mango+Shake' },
                { name: 'Apple Shake', desc: '', prices: { '': 499 }, image: 'https://placehold.co/300x200?text=Apple+Shake' },
                { name: 'Banana Shake', desc: '', prices: { '': 299 }, image: 'https://placehold.co/300x200?text=Banana+Shake' }
            ]
        },
        {
            category: 'Mocktails',
            items: [
                { name: 'Mint Margarita', desc: '', prices: { '': 350 }, image: 'https://placehold.co/300x200?text=Mint+Margarita' },
                { name: 'Peach Ice Tea', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Peach+Ice+Tea' },
                { name: 'Lemon Ice Tea', desc: '', prices: { '': 399 }, image: 'https://placehold.co/300x200?text=Lemon+Ice+Tea' }
            ]
        },
        {
            category: 'Combos',
            items: [
                { name: 'Combo 1', desc: '1 Zinger Burger 1 Fries 1 Drink 500ml', prices: { '': 650 }, image: 'https://placehold.co/300x200?text=Combo+1' },
                { name: 'Combo 2', desc: '2 Zinger Burger 2 Fries 1 Drink 500ml', prices: { '': 1300 }, image: 'https://placehold.co/300x200?text=Combo+2' },
                { name: 'Combo 3', desc: '2 Zinger Combo 2 Chicken Paratha Roll 2 Fries 1 Drink 1ltr', prices: { '': 1850 }, image: 'https://placehold.co/300x200?text=Combo+3' },
                { name: 'Combo 4', desc: '4 Zinger Combo 2 Chicken Pc 2 Fries 1 Drink 1ltr', prices: { '': 2650 }, image: 'https://placehold.co/300x200?text=Combo+4' },
                { name: 'Combo 5', desc: '2 Turkish Shawarma 10 Hot Crispy Wings 2 Fries 1 Drink 500ml', prices: { '': 1730 }, image: 'https://placehold.co/300x200?text=Combo+5' },
                { name: 'Combo 6', desc: '1 Smash Beef Burger 1 Fries 1 Drink', prices: { '': 800 }, image: 'https://placehold.co/300x200?text=Combo+6' },
                { name: 'Combo 7', desc: '1 Chicken Grilled Loaded Fries 1 Drink 500ml', prices: { '': 850 }, image: 'https://placehold.co/300x200?text=Combo+7' },
                { name: 'Combo 8', desc: '1 Turkish Chicken Platter 1 Chicken Crispy Wrap 1 Drink 500ml', prices: { '': 1130 }, image: 'https://placehold.co/300x200?text=Combo+8' },
                { name: 'Combo 9', desc: '4 Zinger Burger\'s 2 Patty Burger 2 Fries 1 ltr', prices: { '': 2780 }, image: 'https://placehold.co/300x200?text=Combo+9' },
                { name: 'Combo 10', desc: '2 Grilled Chicken Jalapeno Chicken 2 Fries 1 Drink 500ml', prices: { '': 1300 }, image: 'https://placehold.co/300x200?text=Combo+10' },
                { name: 'Pizza Combo 1', desc: '2 Small Pizza 1 500ml Drink', prices: { '': 1250 }, image: 'https://placehold.co/300x200?text=Pizza+Combo+1' },
                { name: 'Pizza Combo 2', desc: '2 Medium Pizza 2 Fries 1 ltr Drink', prices: { '': 2300 }, image: 'https://placehold.co/300x200?text=Pizza+Combo+2' },
                { name: 'Pizza Combo 3', desc: '2 Large Pizza 10 Wings 1 Drinks 1.5 ltr', prices: { '': 3600 }, image: 'https://placehold.co/300x200?text=Pizza+Combo+3' },
                { name: 'Pizza Combo 4', desc: '1 Extra Large Pizza 10 Nuggets 1 Drink 1.5 ltr', prices: { '': 2750 }, image: 'https://placehold.co/300x200?text=Pizza+Combo+4' }
            ]
        },
        {
            category: 'Family Combos',
            items: [
                { name: 'Family Combo', desc: '5 Zinger Burgers 2 Chicken Shawarma 2 Crispy Wrap 2 Baked Pasta 4 Fries 1 Drink 1.5 Ltr', prices: { '': 5600 }, image: 'https://placehold.co/300x200?text=Family+Combo' },
                { name: 'Large Family Combo', desc: '2 Large Pizza 1 Loaded Crack Fries 2 Chicken grilled 2 Chicken 1.5 ltr', prices: { '': 4100 }, image: 'https://placehold.co/300x200?text=Large+Family+Combo' },
                { name: 'Sweet Family Combo', desc: '2XL Pizza 4 Zinger Burger 2 Loaded Fries 2 Smash Beef Burger 2 Drink 1.5ltr', prices: { '': 8300 }, image: 'https://placehold.co/300x200?text=Sweet+Family+Combo' }
            ]
        },
        {
            category: 'Cold Drinks',
            items: [
                { name: 'Pepsi', desc: 'Refreshing soft drink', prices: { Small: 70, Medium: 100, Large: 200 }, image: 'https://placehold.co/300x200?text=Pepsi' },
                { name: 'Coca-Cola', desc: 'Refreshing soft drink', prices: { Small: 70, Medium: 100, Large: 200 }, image: 'https://placehold.co/300x200?text=Coca-Cola' },
                { name: '7Up', desc: 'Refreshing soft drink', prices: { Small: 70, Medium: 100, Large: 200 }, image: 'https://placehold.co/300x200?text=7Up' }
            ]
        }
    ];

    // Render menu
    menu.forEach(cat => {
        const section = document.createElement('section');
        section.classList.add('category');
        section.innerHTML = `<h2>${cat.category}</h2><div class="items"></div>`;
        const itemsContainer = section.querySelector('.items');
        cat.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            const pricesStr = Object.entries(item.prices).map(([size, price]) => `${size || 'Regular'}: ${price} PKR`).join(', ');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p class="desc">${item.desc}</p>
                    <p class="prices">${pricesStr}</p>
                    <button class="add-btn">Add to Cart</button>
                </div>
            `;
            card.querySelector('.add-btn').addEventListener('click', () => {
                if (Object.keys(item.prices).length === 1) {
                    const size = Object.keys(item.prices)[0];
                    const price = item.prices[size];
                    cart.push({ name: item.name, size, qty: 1, price });
                    updateCart();
                    notification.textContent = 'Added to cart!';
                    notification.style.display = 'block';
                    setTimeout(() => notification.style.display = 'none', 3000);
                } else {
                    openModal(item);
                }
            });
            itemsContainer.appendChild(card);
        });
        menuContainer.appendChild(section);
    });

    // Modal
    function openModal(item) {
        currentItem = item;
        modalName.textContent = item.name;
        modalDesc.textContent = item.desc;
        sizeSelect.innerHTML = '';
        Object.entries(item.prices).forEach(([size, price]) => {
            const option = document.createElement('option');
            option.value = size;
            const displaySize = size || 'Regular';
            option.textContent = `${displaySize} - ${price} PKR`;
            sizeSelect.appendChild(option);
        });
        qtyInput.value = 1;
        modal.style.display = 'block';
    }

    closeModal.addEventListener('click', () => modal.style.display = 'none');

    addToCartBtn.addEventListener('click', () => {
        const size = sizeSelect.value;
        const qty = parseInt(qtyInput.value);
        const price = currentItem.prices[size];
        cart.push({ name: currentItem.name, size, qty, price });
        updateCart();
        modal.style.display = 'none';
        notification.textContent = 'Added to cart!';
        notification.style.display = 'block';
        setTimeout(() => notification.style.display = 'none', 3000);
    });

    // Cart
    cartIcon.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            const displaySize = item.size ? item.size : '';
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `${index + 1}. ${item.name}${displaySize ? ' - ' + displaySize : ''} x `;
            nameSpan.style.flex = '1';
            nameSpan.style.overflow = 'hidden';
            nameSpan.style.textOverflow = 'ellipsis';
            nameSpan.style.whiteSpace = 'nowrap';

            const minusBtn = document.createElement('button');
            minusBtn.classList.add('qty-btn');
            minusBtn.textContent = '-';
            minusBtn.addEventListener('click', () => {
                item.qty--;
                if (item.qty <= 0) {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            const qtySpan = document.createElement('span');
            qtySpan.textContent = item.qty;
            qtySpan.style.margin = '0 5px';

            const plusBtn = document.createElement('button');
            plusBtn.classList.add('qty-btn');
            plusBtn.textContent = '+';
            plusBtn.addEventListener('click', () => {
                item.qty++;
                updateCart();
            });

            const priceSpan = document.createElement('span');
            priceSpan.textContent = ` = ${item.qty * item.price}`;
            priceSpan.style.marginLeft = '5px';

            li.appendChild(nameSpan);
            li.appendChild(minusBtn);
            li.appendChild(qtySpan);
            li.appendChild(plusBtn);
            li.appendChild(priceSpan);
            cartItemsList.appendChild(li);
            total += item.qty * item.price;
        });
        const delivery = 50;
        const grandTotal = total + delivery;
        cartTotal.innerHTML = `Total: ${total} PKR<br>Delivery: ${delivery} PKR<br>G. Total: ${grandTotal} PKR`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }

    placeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) return alert('Cart is empty!');
        let message = 'Order:\n';
        let total = 0;
        cart.forEach((item, index) => {
            const displaySize = item.size ? ' - ' + item.size : '';
            const subtotal = item.qty * item.price;
            message += `${index + 1}. ${item.name}${displaySize} x ${item.qty} = ${subtotal}\n`;
            total += subtotal;
        });
        const delivery = 50;
        const grandTotal = total + delivery;
        message += `\nTotal: ${total} PKR\nDelivery: ${delivery} PKR\nGrand Total: ${grandTotal} PKR`;
        const url = `https://wa.me/923302300003?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        cart = [];
        updateCart();
        cartDropdown.style.display = 'none';
    });

    // Carousel
    const carouselImages = document.querySelectorAll('.carousel img');
    let currentIndex = 0;
    setInterval(() => {
        carouselImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % carouselImages.length;
        carouselImages[currentIndex].classList.add('active');
    }, 3000); // Change every 3 seconds

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!cartIcon.contains(e.target)) {
            cartDropdown.style.display = 'none';
        }
    });
});