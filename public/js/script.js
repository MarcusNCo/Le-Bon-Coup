const btnLike = document.querySelectorAll('.iconFav')
btnLike.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const idAnnounce = e.target.classList[0].split('-')[1] // recup id annonce
    fetch(`http://localhost:8082/favorite/${idAnnounce}`)
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        if (data.result == 'deleted') {
          btn.classList.add('notLike')
          btn.classList.remove('isLike')
        } else {
          btn.classList.add('isLike')
          btn.classList.remove('notLike')
        }
      })
  })
})

const getFav = async () => {
  await fetch('http://localhost:8082/getFavUser')
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      btnLike.forEach((btn) => {
        if (data.length == 0) {
          btn.classList.add('notLike')
        } else {
          data.forEach((product) => {
            if (btn.classList[0].split('-')[1] == product.product_id) {
              btn.classList.add('isLike')
              btn.classList.remove('notLike')
            } else {
              btn.classList.add('notLike')
              btn.classList.remove('isLike')
            }
          })
        }
      })
    })
}
getFav()
