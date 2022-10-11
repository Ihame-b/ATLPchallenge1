class Contact {
    constructor(names,address,email,phone){
      this.names=names
      this.address=address
      this.email=email
      this.phone=phone
    }
  }
  
  class Design{  
    static displayContact(){ 
    const contacts = Store.getContact()
    contacts.forEach((contacts)  => Design.addContactToList(contacts) );
    }
    
    static addContactToList(contacts){
      const list =document.querySelector("#book-list")
      const row =document.createElement('tr')
      row.innerHTML =`
      <td>${contacts.names}</td>
      <td>${contacts.address}</td>
      <td>${contacts.email}</td>
      <td>${contacts.phone}</td>
      <td><a href="#" class="btn btn-danjer btn-sm delete">X</a></td>
      `
      list.appendChild(row);   
    } 
    
    static clearField(){
    document.querySelector('#names').value = ''
    document.querySelector('#address').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#phone').value = ''
                      }
    
    static showAlert(message, className){
      const div = document.createElement('div')
      div.className=`alert alert-${className}`
      div.appendChild(document.createTextNode(message))
      const container = document.querySelector('.container')
      const form =document.querySelector('#book-form')
      container.insertBefore(div, form)   
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    
    static deleteContact(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
      }
    }
    
  }
  
  document.addEventListener('DOMContentLoaded', Design.displayContact)
  
  document.querySelector("#book-form").addEventListener('submit', (e) =>{ e.preventDefault();  
    
  const names= document.querySelector('#names').value
  const address= document.querySelector('#address').value
  const email= document.querySelector('#email').value
  const phone= document.querySelector('#phone').value
  
  if(names==="" || address==="" || email==="" || phone===""){
   Design.showAlert("please fill in all field","danger");
  }else{
  const contact =new Contact(names,address,email,phone)
  Design.addContactToList(contact)
  Store.addContact(contact)
  Design.showAlert('Contact Added', 'success')  
  Design.clearField()
  }
  } );
  
  document.querySelector("#book-list").addEventListener('click', (e) =>{ 
  Design.deleteContact(e.target)
  Store.removeContact(e.target.parentElement.previousElementSibling.textContent);  
  Design.showAlert('Contact Added', 'success') 
  });
  
  class Store {
    static getContact() {
      let contacts;
      if(localStorage.getItem('contacts') === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
      }
  
      return contacts;
    }
  
    static addContact(contact) {
      const contacts = Store.getContact();
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    static removeContact(email) {
      const contacts = Store.getContact();
  
      contacts.forEach((contact, index) => {
        if(contact.email === email) {
          contacts.splice(index, 1);
        }
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  
  
  