const btnLike = document.querySelectorAll('.iconFav')
btnLike.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const idAnnounce = e.target.classList[0].split('-')[1] // recup id annonce
    fetch(`http://localhost:8082/favorite/${idAnnounce}`).then((data) => {
      console.log(data)
    })
  })
})
const productId = fetch('http://localhost:8082/getFavUser')
  .then((data) => {
    return data.json()
  })
  .then((data) => {
    btnLike.forEach((btn) => {
      data.forEach((product) => {
        console.log(btn.classList[0].split('-')[1])
        console.log(product.product_id)
        if (btn.classList[0].split('-')[1] == product.product_id) {
          btn.classList.add('isLike')
          btn.classList.remove('notLike')
        } else {
          btn.classList.add('notLike')
          btn.classList.remove('isLike')
        }
      })
    })
  })
