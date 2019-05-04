//コンボボックスを初期化
var InitCombBox = function()
{
  var cbObj_value = [
    {val:"01", txt:"円"},
    {val:"02", txt:"正方形"},
    {val:"03", txt:"長方形"},
    {val:"03", txt:"三角形"}
    ];
  var cbObj = document.getElementById("cbObj");
  
  //連想配列をループ処理で値を取り出してセレクトボックスにセットする
  for(var i=0;i<cbObj_value.length;i++){
    let op = document.createElement("option");
    op.value = cbObj_value[i].val;  //value値
    op.text = cbObj_value[i].txt;   //テキスト値
    cbObj.appendChild(op);
  }
  
  cbObj.onclick = cb_changed;
};

//コントローラーを初期化
var InitController = function()
{
  var btns = [
    {val:"top", txt:"↑"},
    {val:"left", txt:"←"},
    {val:"right", txt:"→"},
    {val:"bottom", txt:"↓"},
    {val:"reset", txt:"reset"},
    {val:"auto", txt:"auto"}
    ];
  
  for(let i=0;i<btns.length;i++)
  {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.name = btns[i].val;
    btn.classList.add(btns[i].val);
    btn.innerHTML = btns[i].txt;
    btn.onclick = btn_clicked;
    document.getElementById('controller').appendChild(btn);

  }
  
};

var height= 0;
var width = 0;
var start_x = 10;
var start_y = 10;
var ctrlVal = 5;

var time = 1000;
var btn_clicked= function()
{
  var shapes = document.getElementById('cbObj');
  var idx = shapes.selectedIndex;
  controllObject(this.name,shapes[idx].text);

}

//controller処理
var isAuto = false;
var woo = new Array();
var controllObject = function(btnName,cbText)
{
  let isAuto = false;
    switch (btnName) {
    case "top":
      start_y -= ctrlVal;
      break;
    case "left":
      start_x -= ctrlVal;
      break;
    case "right":
      start_x += ctrlVal;
      break;
    case "bottom":
      start_y += ctrlVal;
      break;
    case "reset":
      start_x = 10;
      start_y = 10;
      break;
    case "auto":
      isAuto = !isAuto;
      
      if (isAuto)
      {
         var woo_item =  setInterval(auto_demo_triangle,100);
       woo.push(woo_item);
      }
       else
         clearInterval();
         
      break;
    default:
      break;
    
  }
  console.log(cbText);
  DrawOnCanvas(cbText);
}

//canvas上のオブジェクトをselectBoxの指定の通り変更する
var cb_changed = function()
{
  var target = this.selectedIndex;
 
  DrawOnCanvas( this[target].text);
  console.log(this[target].text+" is chosen");
  
}

//canvasに描画する
var DrawOnCanvas = function(shape)
{
  
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
  
    switch (shape) {
    case '円':
      ctx.beginPath();
      ctx.arc(70+start_x,70+start_y,50,0,Math.PI*2,true);
      ctx.fill();
      break;
    case '正方形':
      ctx.fillRect(start_x, start_y, 100, 100);
      break;
    case '長方形':
      ctx.fillRect(start_x, start_y, 150, 100);
      break;
    case '三角形':
      ctx.beginPath();
      ctx.moveTo(70+start_x,70+start_y);
      ctx.lineTo(100,75);
      ctx.lineTo(100,25);
      ctx.fill();
      break;
    
    default:
      break;
  }
    console.log(start_x);
  
}
// auto モード用
// truth be told, I don't make this func. I make auto-mode in upper func.
var auto_demo_triangle = function ()
{
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'green';
      
      ctx.beginPath();
      ctx.moveTo(70+start_x,70+start_y);
      ctx.lineTo(100,75);
      ctx.lineTo(100,25);
      ctx.fill();
      start_x += 1;
      start_y += 10;
}

