const trashIcon = document.querySelector(".fa-trash")
var noFrameEnabled = false

photoContainers = document.querySelectorAll(".photo-container")
photoContainers.forEach((photoContainer) => {
  // get width, height from #main-space
  var mainSpaceWidth = document.querySelector("#main-space").offsetWidth * 0.5
  var mainSpaceHeight = document.querySelector("#main-space").offsetHeight * 0.5

  // place at random
  var left = Math.random() * mainSpaceWidth
  var top = Math.random() * mainSpaceHeight

  photoContainer.style.left = left + "px"
  photoContainer.style.top = top + "px"

  dragElement(photoContainer)
})

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0
  elmnt.onmousedown = dragMouseDown

  function removeOnTopFromOthers() {
    photosOnTop = document.querySelectorAll(".on-top")
    photosOnTop.forEach((photoOnTop) => {
      photoOnTop.classList.remove("on-top")
    })
  }

  function dragMouseDown(e) {
    //trash visible
    showTrashIcon()

    e = e || window.event
    e.preventDefault()

    elmnt.classList.toggle("clicked")
    removeOnTopFromOthers()
    elmnt.classList.toggle("on-top")

    elmnt.style.transform = "scale(1.03)"
    elmnt.style.boxShadow = "6.0px 12.0px 12.0px hsl(0deg 0% 0% / 0.31)"

    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // calc cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    //set the new position of the element
    elmnt.style.top = elmnt.offsetTop - pos2 + "px"
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px"
  }

  function closeDragElement() {
    //check if trash icon is being hovered, if so then delete elmnt
    if (trashIcon.matches(":hover")) {
      elmnt.classList.add("class", "hide") //for
      setTimeout(() => {
        elmnt.remove()
      }, 220) //milliseconds
    }

    // trash invisible
    hideTrashIcon()

    //stop moving when mouse button is released
    elmnt.classList.toggle("clicked")

    elmnt.style.transform = "scale(1)"
    elmnt.style.boxShadow = "2.0px 4.0px 4.0px hsl(0deg 0% 0% / 0.44)"

    document.onmouseup = null
    document.onmousemove = null
  }
}

function showTrashIcon() {
  trashIcon.style.opacity = 1
  trashIcon.style.zIndex = "100"
}
function hideTrashIcon() {
  // trashIcon.style.visibility = "hidden"
  trashIcon.style.opacity = 0
  trashIcon.style.zIndex = "-1"
}

//add photo
imgInp.onchange = (evt) => {
  const [file] = imgInp.files

  if (file) {
    var newPhotoURL = URL.createObjectURL(file)

    const newContent = document.createElement("div")
    newContent.classList.add("photo-container")
    newContent.innerHTML = `
    <img src="${newPhotoURL}" alt="your image" class="photo">`

    //if any element has .no-frame, spawn with .no-frame
    if (noFrameEnabled == true) {
      newContent.classList.add("no-frame")
    }
    const mainSpace = document.querySelector("#main-space")
    mainSpace.appendChild(newContent)
    dragElement(newContent)
  }
}

//frame on/off button, todo add popup explanation
const frameSelector = document.getElementById("frame-selector")

frameSelector.addEventListener("click", () => {
  photoContainers = document.querySelectorAll(".photo-container")
  photoContainers.forEach((photoContainer) => {
    photoContainer.classList.toggle("no-frame")
  })

  if (frameSelector.classList.contains("fa-solid")) {
    noFrameEnabled = true
    frameSelector.setAttribute("class", "fa-regular fa-square fa-2x")
  } else {
    frameSelector.setAttribute("class", "fa-solid fa-square fa-2x")
    noFrameEnabled = false
  }
})
