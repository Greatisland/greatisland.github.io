let inner = document.querySelectorAll(".inner")
let viewMoveState = false //페이지 상or하 상태변수

//main<->project 이동
function fullpageScroll() {
  inner.forEach((thisElement, i) => {
    thisElement.addEventListener("wheel", (e) => {
      e.preventDefault()
      let { deltaY } = e
      if (i === 0 && !viewMoveState) {
        if (deltaY === 100) {
          pageScroll(1)
          scrollBtnChange()
          viewMoveState = true
        }
      } else if (i === 1 && viewMoveState) {
        if (deltaY === -100) {
          pageScroll(0)
          scrollBtnChange()
          viewMoveState = false
        }
      }
    })
  })
}
fullpageScroll()

//스크롤 이동
function pageScroll(direction) {
  gsap.to(window, 0.7, {
    scrollTo: inner[direction].offsetTop,
  })
}

let scrollBtn = document.querySelector(".scroll_btn")

//스크롤 btn 이동
function scrollBtnClick() {
  scrollBtn.addEventListener("click", () => {
    if (!viewMoveState) {
      pageScroll(1)
      scrollBtnChange()
      viewMoveState = true
    } else if (viewMoveState) {
      pageScroll(0)
      scrollBtnChange()
      viewMoveState = false
    }
  })
}
scrollBtnClick()

//스크롤 btn style
function scrollBtnChange() {
  if (!viewMoveState) {
    scrollBtn.classList.add("bottom")
    scrollBtn.querySelector(".text").textContent = "Scroll main"
  } else if (viewMoveState) {
    scrollBtn.classList.remove("bottom")
    scrollBtn.querySelector(".text").textContent = "Scroll Project"
  }
}

// 스크롤 btn mouseover
function scrollBtnMouseOver() {
  let arrow = scrollBtn.querySelector(".arrow")
  let circle = scrollBtn.querySelector(".circle")
  scrollBtn.addEventListener("mouseenter", () => {
    if (!viewMoveState) {
      arrow.style.top = "-4px"
    } else if (viewMoveState) {
      arrow.style.top = "-34px"
    }
  })
  scrollBtn.addEventListener("mouseleave", () => {
    arrow.style.top = "-16px"
    circle.style.transform = `translate(0,0)`
  })
  circle.addEventListener("mousemove", (e) => {
    circle.style.transform = `translate(${
      (e.offsetX / e.target.getBoundingClientRect().width) * 60 - 30
    }px,${(e.offsetY / e.target.getBoundingClientRect().height) * 60 - 30}px)`
  })
}
scrollBtnMouseOver()
