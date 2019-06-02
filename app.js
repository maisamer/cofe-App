const cafeList = document.querySelector('#cafe-list');
var form = document.querySelector('#add-cafe-form')
function rendeCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

db.collection('coffee').get().then((snapshot)=>{
    snapshot.docs.forEach(element => {
        rendeCafe(element);
    });
});

// add data
form.addEventListener('submit' ,(e)=>{
    e.preventDefault(); // do not reload page
    db.collection('coffee').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value='';
    form.city.value='';
})