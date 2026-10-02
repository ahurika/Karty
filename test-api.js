fetch('http://localhost:3000/api/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'ekate2646@gmail.com',
    name: 'Ahurika',
    items: [{ productId: '6', quantity: 3 }]
  })
})
.then(res => res.json().then(data => ({ status: res.status, data })))
.then(console.log)
.catch(console.error);
