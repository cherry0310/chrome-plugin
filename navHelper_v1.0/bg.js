var tips=0;//设置全局变量
function showBadge(){
	$.ajax({ 
		type: "get", 
        url: "http://abc.ci123.com/admin/tech/question/wait_copy.php?rid="+Math.random, 
        dataType: "json", 
        success: function (data) { 		   
					//console.log(data.problem_num); 
					tips=data.problem_num;
					if(data.problem_num!=0){
						chrome.browserAction.setBadgeText ( { text: tips+""} );	
					}else{
						chrome.browserAction.setBadgeText ( { text:""} );	
					}
				}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
					if(data.problem_num!=0){
						chrome.browserAction.setBadgeText ( { text: tips+""} );	
					}else{
						chrome.browserAction.setBadgeText ( { text:""} );	
					}
				} 
    });
}
//每隔2s自动检测
var t=setInterval(showBadge,2000);


	


