
import throttle from "lodash.throttle";

const scrollToTopBtn = document.querySelector(".up-link");
const rootElement = document.documentElement;

function handleScroll() {
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

  if ((rootElement.scrollTop / scrollTotal > 0.2)) {
    scrollToTopBtn.classList.remove("is-hidden");
    return
  } else {
    scrollToTopBtn.classList.add("is-hidden");
  }
}

const handleScrollThrottled = throttle(handleScroll, 500)

document.addEventListener("scroll", handleScrollThrottled);