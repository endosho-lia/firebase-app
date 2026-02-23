// menu.js
export function createMenu(currentPage) {
  const header = document.createElement("div");
  header.className = "header";

  // タイトル
  const title = document.createElement("h1");
  title.textContent = currentPage;
  header.appendChild(title);

  // ハンバーガー
  const toggle = document.createElement("div");
  toggle.className = "menu-toggle";
  toggle.innerHTML = "&#9776;";
  header.appendChild(toggle);

  // ドロップダウンメニュー
  const dropdown = document.createElement("div");
  dropdown.className = "menu-dropdown";

  const items = [
    {name:"メニューに戻る", page:"menu.html"},
    {name:"レジ管理", page:"register.html"},
    {name:"日報管理", page:"report.html"},
    {name:"相見積表", page:"quote.html"},
    {name:"PL", page:"pl.html"},
    {name:"設定", page:"setting.html"},
    {name:"ログアウト", page:"logout"}
  ];

  items.forEach(item=>{
    const div = document.createElement("div");

    if(item.name === currentPage){
      div.className = "current";
      div.textContent = item.name;
    } else if(item.page === "logout"){
      div.textContent = item.name;
      div.addEventListener("click", async ()=>{
        const { getAuth, signOut } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
        const auth = getAuth();
        await signOut(auth);
        location.replace("index.html");
      });
    } else {
      div.textContent = item.name;
      div.addEventListener("click", ()=> location.href = item.page);
    }
    dropdown.appendChild(div);
  });

  header.appendChild(dropdown);
  document.body.prepend(header);

  // ハンバーガー開閉
  toggle.addEventListener("click", ()=>{
    dropdown.style.display = dropdown.style.display==="flex" ? "none" : "flex";
  });
  document.addEventListener("click",(e)=>{
    if(!toggle.contains(e.target) && !dropdown.contains(e.target)){
      dropdown.style.display="none";
    }
  });
}