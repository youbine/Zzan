import gsap from "gsap";

export const clickinfo = (i, q) => {
  gsap
    .timeline()
    .to(q(".info")[i], {
      height: "79.7%",
    })
    .to(q(".close")[i], { display: "block", opacity: 1 }, 0)
    .to(q(".info h2")[i], { opacity: 1 }, 0)
    .to(q(".detail")[i], { opacity: 1 })
    .to(q(".health")[i], { opacity: 1 });
};
export const closeInfo = (i, q) => {
  gsap
    .timeline({ duration: 0.1 })
    .to(q(".detail")[i], { opacity: 0 }, 0)
    .to(q(".health")[i], { opacity: 0 }, 0)
    .to(q(".close")[i], { display: "none", opacity: 0 }, 0)
    .to(q(".info h2")[i], { opacity: 0 }, 0)
    .to(q(".info")[i], {
      height: "0%",
    });
};
