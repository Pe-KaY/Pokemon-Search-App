const animation = () => {
  const img = document.getElementById("sprite")
  const btn = document.getElementById("search-button")
  const input = document.getElementById("search-input")

  const animfunc = () => {
    img.classList.add("pokeanim")
    btn.disabled = true
    setTimeout(() => {
      img.classList.remove("pokeanim")
      img.removeAttribute("class")
      btn.disabled = false
    }, 3500)
  }
  btn.addEventListener("click", animfunc)
  input.addEventListener("keydown", (e) => {
    if (e.keyCode === "Enter") {
      animfunc()
    }
  })
}

export default animation
