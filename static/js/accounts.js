
const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
// 현재 위치에 active를 줘라 
// css 효과로 active만 display됨
// 따라서 step에 따른 변화를 준다. (none과 block : css 참고)
let currentStep = formSteps.findIndex(step => {
  return step.classList.contains("active")
})

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
}

// html에 있는 data-next를 누를 경우 [currentstep]이 +1 처리되고
// 따라서 다음 인덱스에 [active]를 가져간다.
multiStepForm.addEventListener("click", e => {
  let incrementor
  if (e.target.matches("[data-next]")) {
    incrementor = 1
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1
  }

  if (incrementor == null) return

  const inputs = [...formSteps[currentStep].querySelectorAll("input")] //input에 유효성 검사할 것이 있는지 확인
  const allValid = inputs.every(input => input.reportValidity())
  if (allValid) {
    currentStep += incrementor // 모든 것이 유효한 경우(requires)에만 currentStep에 적용가능
    showCurrentStep()
  }
})

formSteps.forEach(step => {
  step.addEventListener("animationend", e => {
    formSteps[currentStep].classList.remove("hide")
    e.target.classList.toggle("hide", !e.target.classList.contains("active"))
  })
})

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep)
  })
}