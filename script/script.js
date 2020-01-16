
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const customer = document.getElementById('customer'),
    freelancer = document.getElementById('freelancer'),
    blockCustomer = document.querySelector('#block-customer'),
    blockFreelance = document.querySelector('#block-freelancer'),
    blockChoice = document.getElementById('block-choice'),
    btnExit = document.getElementById('btn-exit'),
    formCustomer = document.getElementById('form-customer'),
    ordersTable = document.getElementById('orders'),
    modalOrder = document.getElementById('order_read'),
    modalOrderActive = document.getElementById('order_active');

  const orders = []; 

  const renderOrders = () => {
    ordersTable.textContent = '';

    orders.forEach((order, i) => {


      ordersTable.innerHTML += `
        <tr class="order" data-number-order="${i}">
          <td>${i+1}</td>
          <td>${order.title}</td>
          <td class="${order.currency}"></td>
          <td>${order.deadline}</td>
        </tr>`;
    });

  };

  const handlerModal = (event) => {
    const target = event.target;
    const modal = target.closest('.order-modal');
    const order = orders[modal.id];

    if (target.closest('.close') || target === modal) {
      modal.style.display = 'none';
    }

    if (target.classList.contains('get-order')) {
      order.active = true;
      modal.style.display = 'none';
      renderOrders();
    }

  };

  const openModal = (numberOrder) => {
    const order = orders[numberOrder];

    const { title, firstName, email, phone, description, amount, 
      currency, deadline, active } = order;
     
    const modal = active ? modalOrderActive : modalOrder;
      
    const firstNameBlock = modal.querySelector('.firstName'),
        titleBlock = modal.querySelector('.modal-title'),
        emailBlock = modal.querySelector('.email'),
        descriptionBlock = modal.querySelector('.description'),
        deadlineBlock = modal.querySelector('.deadline'),
        currencyBlock = modal.querySelector('.currency_img'),
        countBlock = modal.querySelector('.count'),
        phoneBlock = modal.querySelector('.phone');
    
    modal.id = numberOrder;
    titleBlock.textContent = title;
    firstNameBlock.textContent = firstName;
    emailBlock.textContent = email;
    emailBlock.href = 'mailto:' + email;
    descriptionBlock.textContent = description;
    deadlineBlock.textContent = deadline;
    currencyBlock.className = 'currency_img';
    currencyBlock.classList.add(currency);
    countBlock.textContent = amount;
    phoneBlock ? phoneBlock.href = 'tel:' + phone : '';


    modal.style.display = 'flex';

    modal.addEventListener('click', handlerModal);
    
  };

  ordersTable.addEventListener('click', event => {
    const target = event.target;
    const targetOrder = target.closest('.order');

    if (targetOrder) {
      openModal(targetOrder.dataset.numberOrder);
    }
  });

  customer.addEventListener('click', () => {
    blockChoice.style.display = 'none';
    blockCustomer.style.display = 'block';
    btnExit.style.display = 'block';
  });

  freelancer.addEventListener('click', () => {
    blockChoice.style.display = 'none';
    renderOrders();
    blockFreelance.style.display = 'block'; 
    btnExit.style.display = 'block';
  });

  btnExit.addEventListener('click', () => {
    blockFreelance.style.display = 'none'; 
    blockCustomer.style.display = 'none';
    btnExit.style.display = 'none';
    blockChoice.style.display = 'block';
  });


  formCustomer.addEventListener('submit', (event) => {
    event.preventDefault();

    const obj = {};


    [...formCustomer.elements].forEach((elem) => {


 
    if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) ||
            elem.tagName === 'TEXTAREA'){

                obj[elem.name] = elem.value;

            }


    });

    formCustomer.reset();


    orders.push(obj);
    
  });


});