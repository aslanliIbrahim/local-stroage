window.onload = function () {
    const iconcart = document.querySelector('.navbar-brand')
    const cartBox = document.querySelector('.cartBox')
    const cartCloseBtn = document.querySelector('.fa-close')
    iconcart.addEventListener("click", function () {
        cartBox.classList.add('active')
    })
    cartCloseBtn.addEventListener("click", function () {
        cartBox.classList.remove('active')
    })
    const attToCart = document.getElementsByClassName('attToCart')
    let items = [];
    for (let i = 0; i < attToCart.length; i++) {
        attToCart[i].addEventListener("click", function (e) {
            if (typeof (Storage) !== 'undefined') {
                const item =
                {
                    id: i,
                    model: e.target.parentElement.children[0].textContent,
                    // price:e.target.parentElement.children[1].children[0].textContent,
                    no: 1
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.no = item.no + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    window.location.reload();
                }
            } else {
                console.log('ekm saam')
            }
        })
    }
    const navbarbrands = document.querySelector('.navbar-brand sup');
    let no = 0
    JSON.parse(localStorage.getItem('items')).map(data => {
        no = no + data.no;
    });
    navbarbrands.innerHtml = no;

    const cardBoxTable = cartBox.querySelector('table');
    let tableData = '';
    tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
    if (JSON.parse(localStorage.getItem('items'))[0] === null) {
        tableData += '<tr><td colspan="5">No items found</td></tr>'
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
            tableData += '<tr><th>' + data.id + '</th><th>' + data.name + '</th><th>' + 
            data.no + '</th><th>' + data.price + '</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
        });
        
    }
    cardBoxTable.innerHTML = tableData;
}