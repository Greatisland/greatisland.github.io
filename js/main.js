let inner = document.querySelectorAll(".inner"),
  scrollBtn = document.querySelector(".scroll_btn"),
  sideBtn = document.querySelector(".side_btn"),
  designBtn = document.querySelectorAll(".design_btn"),
  viewMoveState = false //페이지 상or하 상태변수

function pageStateProps(state) {
  let subTitle = querySelector(".sub_title")
  // switch (state) {
  //   case
  // }
}

//main<->project 이동
function fullpageScroll() {
  inner.forEach((thisElement, i) => {
    thisElement.addEventListener("wheel", (e) => {
      e.preventDefault()
      let { deltaY } = e
      if (i === 0 && !viewMoveState) {
        if (deltaY === 100) {
          pageScroll(1)
          btnChange()
          viewMoveState = true
        }
      } else if (i === 1 && viewMoveState) {
        if (deltaY === -100) {
          pageScroll(0)
          btnChange()
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

//스크롤 btn 이동
function scrollBtnClick() {
  scrollBtn.addEventListener("click", () => {
    if (!viewMoveState) {
      pageScroll(1)
      btnChange()
      viewMoveState = true
    } else if (viewMoveState) {
      pageScroll(0)
      btnChange()
      viewMoveState = false
    }
  })
}
scrollBtnClick()

//btn style
function btnChange() {
  if (!viewMoveState) {
    scrollBtn.classList.add("bottom")
    scrollBtn.querySelector(".text").textContent = "Scroll main"
  } else if (viewMoveState) {
    scrollBtn.classList.remove("bottom")
    scrollBtn.querySelector(".text").textContent = "Scroll Project"
  }
}

// btn mouseover
function btnMouseOver() {
  let scrollArrow = document.querySelector(".scroll_btn .arrow")
  let sideArrow = document.querySelector(".side_btn .arrow")
  let circles = document.querySelectorAll(".circle")

  designBtn.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (!viewMoveState && btn.classList.contains("scroll_btn")) {
        scrollArrow.style.top = "-4px"
      } else if (viewMoveState && btn.classList.contains("scroll_btn")) {
        scrollArrow.style.top = "-34px"
      }

      if (btn.classList.contains("side_btn")) {
        sideArrow.style.left = "-6px"
      }
    })

    btn.addEventListener("mouseleave", () => {
      if (btn.classList.contains("scroll_btn")) {
        scrollArrow.style.top = "-16px"
      } else if (btn.classList.contains("side_btn")) {
        sideArrow.style.left = "-18px"
      }
    })
  })

  circles.forEach((circle) => {
    circle.addEventListener("mousemove", (e) => {
      gsap.to(circle, 0.4, {
        x: (e.offsetX / e.target.getBoundingClientRect().width) * 60 - 30,
        y: (e.offsetY / e.target.getBoundingClientRect().height) * 60 - 30,
        scale: 0.8,
        onComplete: back,
      })
    })

    function back() {
      gsap.to(circle, 0.2, {
        delay: 0.2,
        x: 0,
        y: 0,
        scale: 1,
      })
    }
  })
}
btnMouseOver()
