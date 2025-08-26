
// Minimal “router”. Changes the main section based on #/path
const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k,v);
  });
  (Array.isArray(children) ? children : [children]).filter(Boolean).forEach(c => {
    if (typeof c === "string") node.appendChild(document.createTextNode(c));
    else node.appendChild(c);
  });
  return node;
};

const app = document.getElementById("app");

function pageHome(){
  const wrap = el("section",{},[
    el("h2",{},["Goods Feed"]),
    el("div",{class:"grid"},[
      card("Laptop for sale","Good condition","Boosted"),
      card("Shoes","NLE 200"),
      card("Car","NLE 50,000")
    ])
  ]);
  return wrap;
}

function card(title,desc,badge){
  return el("article",{class:"card"},[
    el("h3",{},[
      title,
      badge ? el("span",{class:"badge"},[badge]) : null
    ]),
    el("p",{},[desc||""])
  ]);
}

function pageList(title, items){
  return el("section",{},[
    el("h2",{},[title]),
    el("div",{class:"list"}, items.map(i => el("div",{class:"item"},[i])))
  ]);
}

function pageServices(){
  return el("section",{},[
    el("h2",{},["Services"]),
    el("p",{class:"note"},["ID card is required before posting a Service listing."]),
    el("div",{class:"list"},[
      el("div",{class:"item"},["Plumbing"]),
      el("div",{class:"item"},["Electrician"]),
      el("div",{class:"item"},["Cleaning Service"])
    ]),
    el("div",{class:"form"},[
      el("h3",{},["Create Service Listing (demo)"]),
      el("label",{},["Title"]),
      el("input",{placeholder:"e.g., Plumbing"}),
      el("label",{},["Description"]),
      el("input",{placeholder:"Short details"}),
      el("label",{},["Upload ID (required)"]),
      el("input",{type:"file"}),
      el("div",{style:"height:8px"}),
      el("button",{class:"btn"},["Submit (demo)"])
    ])
  ]);
}

function pageAuth(){
  return el("section",{},[
    el("h2",{},["Sign in / Sign up"]),
    el("div",{class:"form"},[
      el("h3",{},["Email"]),
      el("label",{},["Email"]),
      el("input",{type:"email",placeholder:"you@example.com"}),
      el("label",{},["Password"]),
      el("input",{type:"password",placeholder:"••••••••"}),
      el("div",{style:"height:8px"}),
      el("div",{},[
        el("button",{class:"btn"},["Register"]),
        el("button",{class:"btn"},["Log in"])
      ])
    ]),
    el("div",{style:"height:12px"}),
    el("div",{},[
      el("a",{class:"btn gold",href:"#",onclick:(e)=>e.preventDefault()},["Continue with Google"]),
      el("a",{class:"btn gold",href:"#",onclick:(e)=>e.preventDefault()},["Continue with Facebook"]),
      el("a",{class:"btn gold",href:"#",onclick:(e)=>e.preventDefault()},["Continue with Apple"])
    ]),
    el("div",{style:"height:12px"}),
    el("div",{class:"form"},[
      el("h3",{},["Phone OTP"]),
      el("label",{},["Phone"]),
      el("input",{placeholder:"077xxxxxx"}),
      el("div",{style:"height:8px"}),
      el("button",{class:"btn"},["Request OTP"])
    ])
  ]);
}

function router(){
  const hash = (location.hash || "#/").toLowerCase();
  app.innerHTML = "";
  if (hash === "#/" || hash === "#/goods") app.appendChild(pageHome());
  else if (hash === "#/rentals") app.appendChild(pageList("Rentals",[
    "2BR Apartment - NLE 3,000/mo","Office Space - NLE 5,000/mo","Event Hall - NLE 2,000/day"
  ]));
  else if (hash === "#/services") app.appendChild(pageServices());
  else if (hash === "#/jobs") app.appendChild(pageList("Jobs",[
    "Driver Wanted","Software Developer","Teacher"
  ]));
  else if (hash === "#/bloggers") app.appendChild(pageList("Bloggers",[
    "Ad Slot Available","Register Your Blog","Boost Your Content"
  ]));
  else if (hash === "#/news") app.appendChild(pageList("News",[
    "Breaking: Market Updates","Local Event Coverage","Community Story"
  ]));
  else if (hash === "#/auth") app.appendChild(pageAuth());
  else app.appendChild(el("p",{},["Page not found"]));
}
window.addEventListener("hashchange", router);
window.addEventListener("load", router);