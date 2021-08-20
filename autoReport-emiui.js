toast("By Tnxts")
toast("LCUCS企业微信自动填日报")
toast("本应用是模拟人手操作，因此需要打开无障碍功能")
sleep(1000);

var packageName = "com.tencent.wework";
launch(packageName);
sleep(3000);
var timeout=0;
var gongzuotai = className("android.widget.RelativeLayout").clickable(true).depth(9).indexInParent(2).findOnce();
//查找工作台
while(!gongzuotai && timeout<=5){
    gongzuotai = className("android.widget.RelativeLayout").clickable(true).depth(9).indexInParent(2).findOnce();
    sleep(1000);
    timeout++;
}
if(gongzuotai){
    toast("进入工作台");
    gongzuotai.click();
    timeout = 0;
    sleep(1000);
}
else{
    toast("未检查到工作台");
    exit();  
}
//查找工作日报
var gongzuoribao = className("android.widget.RelativeLayout").clickable(true).depth(11).indexInParent(5).findOnce();
while(!gongzuoribao && timeout<=5){
    className("android.widget.RelativeLayout").clickable(true).depth(11).indexInParent(5).findOnce();
    sleep(1000);
    timeout++;
}
if(gongzuoribao){
    toast("进入健康日报");
    gongzuoribao.click();
    timeout = 0;
    sleep(2000);
}
else{
    toast("未检查到工作日报");
    exit();
}
开始填日报
var currentLocation = className("android.view.View").clickable(true).depth(18).indexInParent(2).findOne();
if(currentLocation){
        currentLocation.click();
        sleep(3000);
    }
    else{
        toast("err:无法定位");
        exit();
    }
currentLocation = className("android.widget.ImageView").clickable(true).depth(9).indexInParent(0).findOnce(); //className("android.widget.ImageView").clickable(true).id("eao").findOnce();
if(currentLocation){
    currentLocation.click();
    sleep(2000);
    }
else{
    toast("err:无法定位1");
    exit();
}
// while(className("android.widget.ProgressBar").clickable(false).depth(9).indexInParent(1).findOnce())
// {
//     sleep(1000);
// }
currentLocation = className("android.widget.TextView").clickable(true).depth(9).indexInParent(0).text("确定").findOnce(); //className("android.widget.TextView").clickable(true).id("ist").findOnce();
if(currentLocation){
    currentLocation.click();
    sleep(2000);
}
else{
    toast("err:无法定位2");
    exit();
}

var dura = new Array(6,9,11,13,16,19);
var flag = 0;
for(let i=1;i<4;i++){
    measureTime(className("android.view.View").clickable(true).depth(18).indexInParent(2).findOnce(i),dura[flag],dura[flag+1]);
    flag+=2;
}
for(let i=0;i<3;i++){
    sleep(500);
    measureTemp(className("android.widget.EditText").clickable(true).depth(18).indexInParent(1).findOnce(i));
}
sleep(1000);

//近14天去过高风险地区？
className("android.view.View").clickable(true).depth(18).indexInParent(2).findOnce(4).click();
sleep(500);
choosen(className("android.widget.RelativeLayout").clickable(true).depth(5).indexInParent(1).findOnce()); 

sleep(500);
swipe(550,2000,550,100,1000);
//是否咳嗽/胸闷/发热/乏力
className("android.view.View").clickable(true).depth(18).indexInParent(2).findOnce(5).click();
sleep(500);
choosen(className("android.widget.RelativeLayout").clickable(true).depth(5).indexInParent(0).findOnce(0));
//当天接触的亲属有无以上症状
className("android.view.View").clickable(true).depth(18).indexInParent(2).findOnce(6).click();
sleep(500);
choosen(className("android.widget.RelativeLayout").clickable(true).depth(5).indexInParent(0).findOnce(0));
//是否接触过以下人员
className("android.view.View").clickable(true).depth(18).indexInParent(2).findOnce(7).click();
sleep(500);
choosen(className("android.widget.RelativeLayout").clickable(true).depth(5).indexInParent(1).findOnce(0));
//是否符合以下情况之一
className("android.view.View").clickable(true).depth(18).indexInParent(2).findOnce(8).click();
sleep(500);
choosen(className("android.widget.RelativeLayout").clickable(true).depth(5).indexInParent(1).findOnce(0));

sleep(500);
swipe(550,2000,550,100,1000);


//函数
//测量时间
function measureTime(pos,stime,etime){
    pos.click();
    sleep(1000);
    pos = className("android.widget.Button").clickable(true).depth(4).indexInParent(2).findOnce().click();
    sleep(1000);
    var moveButton = className("android.widget.LinearLayout").clickable(false).depth(6).indexInParent(0).findOnce().bounds();
    sleep(500);
    let time = className("android.widget.Button").clickable(true).depth(4).indexInParent(2).findOnce().getText();
    while(Number(time.substr(0,2)) < stime || Number(time.substr(0,2)) >= etime){
        sleep(1300);
        swipe(moveButton.centerX(),moveButton.top,moveButton.centerX(),moveButton.bottom,1250);
        time = className("android.widget.Button").clickable(true).depth(4).indexInParent(2).findOnce().getText();
    }
    let definite = className("android.widget.Button").clickable(true).depth(4).indexInParent(4).findOnce().click();
}

//体温
function measureTemp(pos){
    pos.click();
    pos.setText(roundFunc(36.5+(Math.random()*0.8-0.4),1));
    sleep(1000)
    pos = className("android.view.View").clickable(false).depth(18).indexInParent(0).text("早晨体温*").findOnce().bounds();
    click(pos.centerX(),pos.centerY());
}
function roundFunc(value,n){
    return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
}

//选择题
function choosen(chose)
{   
    chose.click();
    sleep(500);
}