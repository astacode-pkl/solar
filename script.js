document.addEventListener("DOMContentLoaded", () => {
  initPageInteractions();
  initEnergyModules();
});

function initPageInteractions() {
  const video = document.getElementById("heroVideo");
  const overlay = document.querySelector(".overlay");
  const heroText = document.querySelector(".hero-text");

  const showOverlay = () => {
    overlay?.classList.remove("hidden");
    heroText?.classList.remove("hidden");
    overlay?.classList.add("show");
    heroText?.classList.add("show");
  };

  if (video) {
    video.addEventListener("ended", showOverlay);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      showOverlay();
      if (video) {
        video.style.animation = "none"; 
        video.style.clipPath = "inset(0 0 0 0)";
      }
    }
  });
}

function initEnergyModules() {
  const energyPower = document.getElementById("energy-power");
  if (!energyPower) return;

  const DOMElements = {
    energyPower,
    energyDesc: document.getElementById("energy-desc"),
    heavyTitle: document.getElementById("heavy-title"),
    addPowerContainer: document.querySelector(".add-power-container"),
    modules: Array.from(document.querySelectorAll(".power-wrapper")).map(
      (wrapper) => ({
        wrapper,
        img: wrapper.querySelector("img"),
        plusIcon: wrapper.querySelector(".plus-icon"),
      })
    ),
    appliances: {
      washer: [document.getElementById("washer")],
      lightHeavy: ["air", "dishwasher", "oven"].map((id) =>
        document.getElementById(id)
      ),
      pool: [document.getElementById("pool")],
      heavy: ["vehicle", "pump"].map((id) => document.getElementById(id)),
    },
  };
  DOMElements.appliances.all = Object.values(DOMElements.appliances).flat();

  const CONFIG = {
    BASE: {
      power: "3kW/5kWh",
      desc: "1 Power Module + 1 Battery Module",
      mod1State: "short",
      mod1Icon: "+",
      mod2State: "hidden",
      enabledAppliances: [],
      showAddBtn: false,
    },
    LEVEL_1: {
      power: "9kW/15kWh",
      desc: "1 Power Module + 3 Battery Modules",
      mod1State: "full",
      mod1Icon: "x",
      mod2State: "hidden",
      enabledAppliances: ["washer", "lightHeavy"],
      showAddBtn: true,
    },
    LEVEL_2: {
      power: "12kW/30kWh",
      desc: "1 Power Module + 6 Battery Modules",
      mod1State: "full",
      mod1Icon: "",
      mod2State: "short",
      enabledAppliances: ["washer", "lightHeavy", "pool"],
      showAddBtn: true,
    },
    LEVEL_3: {
      power: "18kW/30kWh",
      desc: "2 Power Modules + 6 Battery Modules",
      mod1State: "full",
      mod1Icon: "",
      mod2State: "full",
      enabledAppliances: ["washer", "lightHeavy", "pool", "heavy"],
      showAddBtn: false,
    },
  };

  let currentState = "BASE";
  let addMoreBtn = null;
  const [mod1, mod2] = DOMElements.modules;

  const setDisabled = (el, disabled) => el?.classList.toggle("disabled", disabled);

  const render = () => {
    const stateConfig = CONFIG[currentState];

    DOMElements.energyPower.textContent = stateConfig.power;
    DOMElements.energyDesc.textContent = stateConfig.desc;

    setDisabled(DOMElements.heavyTitle, true);
    DOMElements.appliances.all.forEach((el) => setDisabled(el, true));
    stateConfig.enabledAppliances.forEach((groupKey) => {
      setDisabled(DOMElements.heavyTitle, false);
      DOMElements.appliances[groupKey].forEach((el) => setDisabled(el, false));
    });

    mod1.img.src = stateConfig.mod1State === "full" ? "assets/img/power-2.webp" : "assets/img/power.webp";
    mod1.plusIcon.textContent = stateConfig.mod1Icon;
    mod1.plusIcon.classList.toggle("hidden-icon", !stateConfig.mod1Icon);

    mod2.wrapper.classList.toggle("hidden", stateConfig.mod2State === "hidden");
    if (stateConfig.mod2State !== "hidden") {
      mod2.img.src = stateConfig.mod2State === "full" ? "assets/img/power-2.webp" : "assets/img/power-1.jpg";
      mod2.plusIcon.textContent = "x";
      mod2.plusIcon.classList.remove("hidden-icon");
    } else {
      mod2.plusIcon.classList.add("hidden-icon");
    }

    if (stateConfig.showAddBtn) {
      if (!addMoreBtn) {
        addMoreBtn = document.createElement("div");
        addMoreBtn.className = "plus-icon extra-plus";
        addMoreBtn.textContent = "+";
        addMoreBtn.addEventListener("click", handleAddMoreClick);
        DOMElements.addPowerContainer.appendChild(addMoreBtn);
      }
      DOMElements.addPowerContainer.style.display = "block";
    } else {
      if (addMoreBtn) {
        addMoreBtn.remove();
        addMoreBtn = null;
      }
      DOMElements.addPowerContainer.style.display = "none";
    }
  };

  const setState = (newState) => {
    currentState = newState;
    render();
  };

  const handleMod1Click = () => {
    if (currentState === "BASE") setState("LEVEL_1");
    else if (currentState === "LEVEL_1") setState("BASE");
  };

  const handleMod2Click = () => {
    if (currentState === "LEVEL_2") setState("LEVEL_1");
    else if (currentState === "LEVEL_3") setState("LEVEL_2");
  };

  const handleAddMoreClick = () => {
    if (currentState === "LEVEL_1") setState("LEVEL_2");
    else if (currentState === "LEVEL_2") setState("LEVEL_3");
  };

  mod1.img.addEventListener("click", handleMod1Click);
  mod1.plusIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    handleMod1Click();
  });

  mod2.plusIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    handleMod2Click();
  });

  render();
}