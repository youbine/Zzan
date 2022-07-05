import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { users } from "../base";

export default function Login() {
  const navigate = useNavigate();
  const ref = useRef();
  const q = gsap.utils.selector(ref);
  const formRef = useRef();

  useEffect(() => {
    gsap.utils.toArray(".slideTexts").forEach((line, i) => {
      const links = line.querySelectorAll("span"),
        tl = horizontalLoop(links, {
          repeat: -1,
          speed: 1 + i * 0.5,
          reversed: i ? true : false,
          paddingRight: parseFloat(
            gsap.getProperty(links[0], "marginRight", "px")
          ),
        });
      links.forEach((link) => {
        link.addEventListener("mouseenter", () =>
          gsap.to(tl, { timeScale: 0, overwrite: true })
        );
        link.addEventListener("mouseleave", () =>
          gsap.to(tl, { timeScale: i ? -1 : 1, overwrite: true })
        );
      });
    });
  }, []);
  const horizontalLoop = (items, config) => {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    const toIndex = (index, vars) => {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() && index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    };
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  };

  const openLogin = () => {
    gsap
      .timeline()
      .to(q("form"), {
        bottom: "3%",
        width: "50%",
      })
      .to(q("form"), {
        gridTemplateColumns: "0.8fr 1fr 1fr 0.7fr",
        gridTemplateRows: "1fr",
      })
      .to(q("input"), {
        display: "block",
        width: "90%",
        opacity: 1,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = e.target.id.value;
    let pw = e.target.pw.value;
    users
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          //check password
          if (doc.data().pw === pw) {
            localStorage.setItem("id", userId)
            navigate("/main");
          } else {
            alert("password is wrong");
          }
        } else {
          //if there is no username, make new doc
          users.doc(userId).set({ pw: pw, favorite: [] });
          localStorage.setItem("id", userId)
          navigate("/main");
        }
      });
  };

  return (
    <div ref={ref} className="login">
      <div className="login __pic"></div>
      <div className="login __text">
        <div>
          <h2>enjoy your</h2>
          <h2>find your</h2>
        </div>
        <h1>drink</h1>
      </div>
      <div className="slideTexts">
        <span>margarita</span>
        <span>cocktail</span>
        <span>mojito</span>
        <span>tequila</span>
        <span>martini</span>
        <span>margarita</span>
        <span>cocktail</span>
        <span>mojito</span>
        <span>tequila</span>
        <span>martini</span>
      </div>

      <form className="login__form" ref={formRef} onSubmit={handleSubmit}>
        <span onClick={openLogin} className="signIn">
          sign in
        </span>

        <input
          type="text"
          placeholder="name"
          name="id"
          required
          minLength="2"
        />

        <input
          type="password"
          autoComplete="on"
          placeholder="pw"
          name="pw"
          required
          minLength="5"
        />

        <input type="submit" className="submit" value="login" />
      </form>
    </div>
  );
}
