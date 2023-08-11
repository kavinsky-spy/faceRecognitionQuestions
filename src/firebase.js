

// // Initialize Firebase with your credentials
// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const crudForm = document.getElementById('crud-form');
// const tableBody = document.getElementById('table-body');

// // Function to display data in the table
// function displayData(doc) {
//     const tr = document.createElement('tr');
//     tr.setAttribute('data-id', doc.id);
//     tr.innerHTML = `
//         <td>${doc.data().name}</td>
//         <td>${doc.data().email}</td>
//         <td>
//             <button class="edit-btn">Edit</button>
//             <button class="delete-btn">Delete</button>
//         </td>
//     `;
//     tableBody.appendChild(tr);

//     // Edit and Delete button event listeners
//     const editBtn = tr.querySelector('.edit-btn');
//     const deleteBtn = tr.querySelector('.delete-btn');
    
//     editBtn.addEventListener('click', () => {
//         // Handle edit logic here
//         const id = tr.getAttribute('data-id');
//         const name = doc.data().name;
//         const email = doc.data().email;
//         // Update the form with the selected data
//         document.getElementById('name').value = name;
//         document.getElementById('email').value = email;
//         // Handle update logic when form is submitted
//         crudForm.onsubmit = (e) => {
//             e.preventDefault();
//             db.collection('users').doc(id).update({
//                 name: document.getElementById('name').value,
//                 email: document.getElementById('email').value
//             });
//             // Clear the form
//             crudForm.reset();
//         };
//     });
    
//     deleteBtn.addEventListener('click', () => {
//         // Handle delete logic here
//         const id = tr.getAttribute('data-id');
//         db.collection('users').doc(id).delete();
//         tr.remove();
//     });
// }

// // Fetch and display existing data
// db.collection('users').get().then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         displayData(doc);
//     });
// });

// // Form submission event listener
// crudForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     db.collection('users').add({
//         name: crudForm.name.value,
//         email: crudForm.email.value
//     });
//     crudForm.reset();
// });