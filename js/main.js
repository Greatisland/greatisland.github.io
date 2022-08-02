let inner = document.querySelectorAll(".inner"),
  pages = document.querySelectorAll(".page"),
  scrollBtn = document.querySelector(".scroll_btn"),
  sideBtn = document.querySelectorAll(".side_btn"),
  pageBtn = document.querySelectorAll(".page_btn"),
  designBtn = document.querySelectorAll(".design_btn"),
  viewMoveState = false, //페이지 상or하 상태변수
  gsapMoving = false //main_page 애니메이션 상태변수

// sub_title 변화
function subTitleFunc(title) {
  let subTitle = document.querySelector(".sub_title")
  if (title) {
    return (subTitle.textContent = title)
  }
  pages.forEach((ele, i) => {
    if (ele.classList.contains("on")) {
      switch (i) {
        case 0:
          subTitle.textContent = "Home"
          break
        case 1:
          subTitle.textContent = "Profile"
          break
        case 2:
          subTitle.textContent = "Skill"
          break
      }
    }
  })
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
          subTitleFunc("Project")
        }
      } else if (i === 1 && viewMoveState) {
        if (deltaY === -100) {
          pageScroll(0)
          subTitleFunc()
        }
      }
    })
  })
}
fullpageScroll()

//스크롤 이동 & footer 변화
function pageScroll(direction) {
  let borderBottom = document.querySelector(".outer_boder .bottom")

  btnChange()
  gsap.to(window, 0.7, {
    scrollTo: inner[direction].offsetTop,
  })
  direction == 0 ? (viewMoveState = false) : (viewMoveState = true)
  if (viewMoveState) {
    borderBottom.classList.add("on")
  } else if (!viewMoveState) {
    borderBottom.classList.remove("on")
  }
}

//스크롤 btn click
function scrollBtnClick() {
  scrollBtn.addEventListener("click", () => {
    if (!viewMoveState) {
      pageScroll(1)
      subTitleFunc("Project")
    } else if (viewMoveState) {
      pageScroll(0)
      subTitleFunc()
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
  let scrollArrow = document.querySelector(".scroll_btn .arrow"),
    sideArrowRight = document.querySelector(".side_btn.right .arrow"),
    sideArrowLeft = document.querySelector(".side_btn.left .arrow"),
    circles = document.querySelectorAll(".circle")

  designBtn.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (!viewMoveState && btn.classList.contains("scroll_btn")) {
        scrollArrow.style.top = "-4px"
      } else if (viewMoveState && btn.classList.contains("scroll_btn")) {
        scrollArrow.style.top = "-34px"
      }

      if (btn.classList.contains("side_btn")) {
        sideArrowRight.style.left = "-6px"
        sideArrowLeft.style.left = "36px"
      }
    })

    btn.addEventListener("mouseleave", () => {
      if (btn.classList.contains("scroll_btn")) {
        scrollArrow.style.top = "-16px"
      } else if (btn.classList.contains("side_btn")) {
        sideArrowRight.style.left = "-18px"
        sideArrowLeft.style.left = "48px"
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

//sub page home btn
function btnHome() {
  let btns = document.querySelectorAll(".home_btn")
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      gsapMoving = false
      mainReturn()
      pages.forEach((page) => {
        page.classList.remove("on")
      })
      pages[0].classList.add("on")
      if (viewMoveState) {
        pageScroll(0)
      }
      subTitleFunc()
    })
  })
}
btnHome()

//sub page간 이동
function btnSide() {
  let profile = document.querySelector(".profile"),
    skill = document.querySelector(".skill")

  sideBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (i === 0) {
        skill.classList.add("on")
        profile.classList.remove("on")
      } else if (i === 1) {
        skill.classList.remove("on")
        profile.classList.add("on")
      }
      subTitleFunc()
    })
  })
}
btnSide()

//main animation
function mainMouseSlide() {
  let backSlide = document.querySelector(".back_slide"),
    middleSlide = document.querySelector(".back_slide .middle_area"),
    moveSlide = document.querySelector(".back_slide .left_area"),
    main = document.querySelector(".main"),
    profile = document.querySelector(".profile"),
    skill = document.querySelector(".skill"),
    tl = gsap.timeline()

  pageBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      gsapMoving = true
      tl.to(moveSlide, 0.8, {
        width: 0,
      })
      tl.to(
        middleSlide,
        0.8,
        {
          width: "100%",
        },
        "<"
      )
      main.classList.remove("on")
      if (i === 0) {
        profile.classList.add("on")
      } else if (i === 1) {
        skill.classList.add("on")
      }
      subTitleFunc()
    })
  })
  backSlide.addEventListener("mousemove", (e) => {
    if (!gsapMoving) {
      let { clientX } = e
      gsap.to(moveSlide, 1, {
        width: clientX - 70,
      })
    }
  })
}
mainMouseSlide()

function mainReturn() {
  let middleSlide = document.querySelector(".back_slide .middle_area")
  middleSlide.style.width = "0px"
}
