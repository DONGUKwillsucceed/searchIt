import { ISlider } from "../Interfaces";

export default function Slider() {
  const slider: HTMLElement | null = document.getElementById("slider");
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  slider?.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    console.log("yes");
  });
  slider?.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider?.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider?.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 10; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });
}
