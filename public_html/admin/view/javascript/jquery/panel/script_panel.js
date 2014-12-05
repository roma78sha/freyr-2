// module: Visual Manage modules : "Freyr"
// version: 2.0 Alpha (версия, только для тестирования)
// autor: Copyright © Шуляк Роман, ноябрь 2014г.   mail: roma78sha@gmail.com  home-page: http://r.konotop.info  load: https://opencartforum.com/index.php?app=core&module=search&do=user_activity&search_app=downloads&mid=678008 
var $gElmNew, gNowSettings = {}, gRunningNameEn = "", gNameRu = "", panRunningCount = -1, panLineName = [], formURL = "", gTitle = "";
var iddrag = $('#dragg');
// g... - значит глобальные                      

/* READY */
$(document).ready(function () {

	// если вообще нет ни одного модуля
	if(!window.gModuleArr){gModuleArr = {}}
	
	// исправляем нумерацию
	for(var item in gModuleArr){
	  if(gModuleArr[item][0] || !gModuleArr[item][1]){
		var t = {};
		n = 0;
		for(var i in gModuleArr[item]){
		  n++;
		  t[n] = gModuleArr[item][i];
		}
		gModuleArr[item] = t;
	  }
	}

	$("#box_panel").disableSelection();
	$('#tabs_panel > a').tabs();

	$("#accordion").accordion({autoHeight:false});

	var $tabs = $('#tabs_panel');
	var $tab_items = $("a", $tabs).droppable({
      accept: "div.connectedSortable > div",
      hoverClass: "ui-state-hover",
      drop: function(event, ui) {
        var $item = $(this);
        var $list = $($item.find("a").attr("href"))
          .find(".connectedSortable"); 
 
        ui.draggable.hide("slow", function() {
          $tabs.tabs("option", "active", $tab_items.index($item));
          $(this).appendTo($list).show("slow");
        });
      }
    });

});

// установить настройки (возвращает types - массив с названиями настроек по глобальному имени)
function pSetSettings() {
  // если стандартные и без доп настроек
  if (gRunningNameEn == "account" || gRunningNameEn == "affiliate" || gRunningNameEn == "category" || gRunningNameEn == "filter" || gRunningNameEn == "information") {
	var types = ["status"];
	// return false;
  // если стандартные с доп настройками
  } else if (gRunningNameEn == "banner") {
	var types = ["banner_id", "width", "height", "status"];
  } else if (gRunningNameEn == "bestseller" || gRunningNameEn == "latest" || gRunningNameEn == "special") {
	var types = ["limit", "image_width", "image_height", "status"];
  } else if (gRunningNameEn == "carousel") {
	var types = ["banner_id", "limit", "scroll", "width", "height", "status"];
  } else if (gRunningNameEn == "featured") {
	// Рекомендуемые
	th_href = $gElmNew.attr('data-href');
	$("#go_to").html("<a href='"+th_href+"' target='_blank'>Перейти к выбору<br />рекомендуемых продуктов</a>").addClass("show");
	var types = ["limit", "image_width", "image_height", "status"];
  } else if (gRunningNameEn == "google_talk") {
	// google_talk
	th_href = $gElmNew.attr('data-href');
	$("#go_to").html("<a href='"+th_href+"' target='_blank'>Перейти к дополнительным настройкам</a>").addClass("show");
	var types = ["status"];
	// return;
	// да нет 
  } else if (gRunningNameEn == "slideshow") {
	var types = ["banner_id", "width", "height", "status"];
  } else if (gRunningNameEn == "store") {
	// Магазин
	th_href = $gElmNew.attr('data-href');
	$("#go_to").html("<a href='"+th_href+"' target='_blank'>Перейти к дополнительным настройкам</a>").addClass("show");
	var types = ["status"];
	// да нет
  } else if (gRunningNameEn == "welcome") {
	// Приветствие
	var types = ["description", "status"];
  }

  return types;
}


/* ====================================================================================== */
/* редактирование "на лету"                                                               */
/* ====================================================================================== */
function pEditingFly(th, name_edit, sort_edit, top_sett){

  if(top_sett){
	
  }else{
  // взять эллемент модуля (div)
  $gElmNew = $(th).parents("div.module").clone();
  // 
  if(sort_edit < 1) sort_edit = $gElmNew.attr("data-id");
  }
  
  // глобальные
  gRunningNameEn = name_edit;
  panRunningCount = sort_edit;
  
  // получить из массива русский заголовок "heading_title"
  gNameRu = gAllHeadingTitle[gRunningNameEn].ru;
  
  // заголовок
  gTitle = "<span><input type='text' id='title_input' name='title_input' value='" + gNameRu + "' size='30' /></span><span id='text_redact_title'>" + gNameRu + "&nbsp;</span><span id='redact_title' class='ui-icon ui-icon-pencil' onclick='pChangeTitle();'></span>";
  
  // настройки
  types = [];
  for(var item in gModuleArr[gRunningNameEn][panRunningCount]){
  
  t = typeof(gModuleArr[gRunningNameEn][panRunningCount][item]);

	// если настройка не одна из "стандартных" то расставляем значения
	// и если не расширенная настройка (например языки)
	if(item != "layout_id" && item != "position" && item != "sort_order" && item != "status" && t != "object"){
	
	  types.push(item);
	  $("#setting_" + item + " :input").attr('value', gModuleArr[gRunningNameEn][panRunningCount][item]);
	  
	// визуально вкл/выкл 
	} else if(item == "status" && !top_sett) {

	  // если включен
	  if(parseInt(gModuleArr[gRunningNameEn][panRunningCount][item]) == 1){ 
		$("#panel_create_new").removeClass("translucent");
		// $("#status_panel_module").removeClass("off").attr("title", "Модуль ВКЛЮЧЁН!");
		$gElmNew.removeClass("translucent");
		$("input#i_setting_status").attr("value", 1);
	  // если выключен
	  } else {
		$("#panel_create_new").addClass("translucent");
		// $("#status_panel_module").addClass("off").attr("title", "Модуль выключен");
		$gElmNew.addClass("translucent");
		$("input#i_setting_status").attr("value", 0);
	  }
	  types.push(item);
	  $("#setting_" + item + " :input").attr('value', gModuleArr[gRunningNameEn][panRunningCount][item]);

	// расширенная
	} else if(t == "object") {
	  
	  // взять все инпуты
	  t_inp = $("#setting_" + item + " :input");
	  // перебрать
	  $(t_inp).each(function(indx, element){
		t_attr = 0;
		t_attr = $(element).attr("data-name-two");
		// тогда в качестве имени выставляем номерки
		$(element).attr("name", t_attr);
		$(element).attr("value", htmlspecialchars_decode(gModuleArr[gRunningNameEn][panRunningCount][item][t_attr], 3));
	  });
	  types.push(item);
	  
	}

  }
  
  top_sett ? pjsTopSett(types) : panDialogShow(types)
  
}
// ИНИЦИАЛИЗАЦИЯ ДОПОЛНИТЕЛЬНЫХ НАСТРОЕК
function saveMoreSettings(types) {
  // t_serialize1 = $( "form#panel_create_new :input" ).serializeArray();
  // panSettings1 = toObject(t_serialize1);

  t_panSettings = {};
  gNowSettings = {};
  for(var item in types){
	if (!types.hasOwnProperty(item)) continue;
	t_serialize = $("#setting_" + types[item] + " :input").serializeArray();
	if(t_serialize.length > 1){
	  
	  for(var item1 in t_serialize){
		if (!t_serialize.hasOwnProperty(item1)) continue;
		if (!window.gNowSettings[types[item]]) gNowSettings[types[item]] = {};
		gNowSettings[types[item]][t_serialize[item1].name] = htmlspecialchars_decode(t_serialize[item1].value);
	  }
	  
	} else {
	  gNowSettings[t_serialize[0].name] = parseInt(t_serialize[0].value);
	}
  }
}

// обновление сортировки
function updateSort() {
  panelmaket = $("div.panelmaket");
  panelmaket.each(function(indx, element){
	module = $(element).find("#panel_maket_left > div.module");
	reassignSort(module);
	module = $(element).find("#panel_maket_right > div.module");
	reassignSort(module);
	module = $(element).find("#panel_maket_top > div.module");
	reassignSort(module);
	module = $(element).find("#panel_maket_bottom > div.module");
	reassignSort(module); 
  });
}

function panSendForms(num, t_all_count, pan_progres){
  // прогрес
  $("#progressbar").progressbar({value: num*pan_progres});
  
  // выбрать все с указанным именем
  var postData = [];
  postData = panRebuildArrayName(panLineName[num]);
  
  var panFormURLsend = formURL + "&panmod=" + panLineName[num];
  $.ajax({
	url: panFormURLsend,
	type: "POST",
	data: postData,
	success:function(data, textStatus, jqXHR) {
	// alert("data: return data from server");
	  
	  // следующий
	  num++;
	  // проверяем не закончилось ли количество также проверяем существует ли в массиве очереди
	  if(num <= t_all_count && typeof(panLineName[num]) != "undefined"){
		panSendForms(num, t_all_count, pan_progres);
		return;
	  } else {
		window.location.reload();
		return;
	  }

	},
	error: function(jqXHR, textStatus, errorThrown) {
	  //if fails
	  alert("ошибка сохранения!");
	}
  });
  return;
}

// выбрать передаваеммый массив по имени 
// плюс добавка к url если только что установленный
function panRebuildArrayName(elementName){
  var tPd = {};
  t_name = elementName + "_module";
  for(var item1 in gModuleArr[elementName]){
	for(var item2 in gModuleArr[elementName][item1]){
	  t = gModuleArr[elementName][item1][item2];
	  if(typeof(t) == "object"){
		for(var item3 in t){
		  gModuleArr[elementName][item1][item2][item3] = htmlspecialchars_decode(t[item3], 3);
		}
	  }
	}
  }
  tPd[t_name] = gModuleArr[elementName];
  if(tPd[t_name].href){
	formURL += tPd[t_name].href;
	delete tPd[t_name].href;
  } 
  return tPd;
}
// конвертировать в объект
function toObject(toObject_a) {
  toObject_o = {};
  $.each(toObject_a, function (index, value) {
	toObject_o[value.name] = value.value; 
  });
  return toObject_o;
}
// цепляем закрытие по клику вне окна, именно этому окну
function pCloseDialog(t){
	$('body').on("click", ".ui-widget-overlay", function() {
      //Close the dialog
      $(t).dialog("close");
	});
}

/* ============================================================================================= */
function htmlspecialchars_decode(string, quote_style) {
  //       discuss at: http://phpjs.org/functions/htmlspecialchars_decode/
  //      original by: Mirek Slugen
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      bugfixed by: Mateusz "loonquawl" Zalega
  //      bugfixed by: Onno Marsman
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //         input by: ReverseSyntax
  //         input by: Slawomir Kaniecki
  //         input by: Scott Cariss
  //         input by: Francois
  //         input by: Ratheous
  //         input by: Mailfaker (http://www.weedem.fr/)
  //       revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //        example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
  //        returns 1: '<p>this -> &quot;</p>'
  //        example 2: htmlspecialchars_decode("&amp;quot;");
  //        returns 2: '&quot;'

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString()
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') {
    // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}