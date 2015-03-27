
var hits =14962; 
if( hits == 0) {
document.getElementById("Hits").innerHTML= ""; 
if(document.getElementById("showHits")!=null) 
{ 
document.getElementById("showHits").innerHTML= ""; 
}
} 
else { 
	document.getElementById("Hits").innerHTML= "&nbsp;&nbsp;人气：<font color=\"red\"> " + hits + " </font>次"; 
		if(document.getElementById("showHits")!=null) 
		{ 
		document.getElementById("showHits").innerHTML= "本篇文章被<span class=\"f12_red\"> " + hits + " </span>人阅读，"; 
		} 

}