const cafeList = document.querySelector('#cafe-list');
var form = document.querySelector('#add-cafe-form')
function rendeCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;
    cross.textContent='x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id'); // get id fton li
        db.collection('coffee').doc(id).delete();
    })
}

db.collection('coffee').where('city','>=',"helwan").get().then((snapshot)=>{
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