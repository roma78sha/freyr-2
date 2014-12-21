var gjsiframe, gjstitle, gcentertopwidth = 0, gcentertopheight = false, gcenterbottom = false, gcenterfather = false;
/* 
// MODULE: visual mange: "Freyr 2.0" Alpha (версия, только для тестирования)
// AUTOR: Copyright © Шуляк Роман, ноябрь 2014г.
// CONTACT: mail: roma78sha@gmail.com  
//          home-page: http://r.konotop.info
//          git: https://github.com/roma78sha/freyr-2
//          load: https://opencartforum.com/index.php?app=core&module=search&do=user_activity&search_app=downloads&mid=678008
 */

// ready
$(document).ready(function () {

  // сброс по клику на верхней панели
  $('#top_panel').click(function(){second_passed()});

  // через 2 секунды автосброс и автоопределение управляемых модулей
  /* setTimeout(function(){pjsBuild();second_passed()}, 2000) */
  
  // fix не сбрасывается если внутри перетаскиваемого div есть js
  $("#above-freyr").on('click', function(){
	pjsCover(false)
  });

});

/* попытка определения модулей */
function pjsBuild(th){
  // весь необходимый DOM, для visualisation
  gjsiframe = $("#iframe-freyr");
  // 
  top.document.getElementById('iframe-freyr').height = document.body.scrollHeight+700+"px";

  // 
  /*   win = document.getElementById('iframe-freyr').contentWindow;
  element = win.document.getElementsByTagName('body'); */

  // все заголовки
  gjstitle = $(gjsiframe).contents().find("div.box div.box-heading");

  $("#top_panel").addClass("redact");
  $(th).addClass("on");
  $("span.change-circle-title").text("Режим редактирования");
  
  // отключить все ссылки
  $(gjsiframe).contents().find("body").on('click', function(e){e.preventDefault()});
 
  // для freyr2 (временно)
  $("#panel_create_new").appendTo("#control-elements");
  
  
  // позициии
  var ppositions = {
	'column_left' : { 'name': "left", 'id': "#column-left"},
	'column_right' : { 'name': "right", 'id': "#column-right"},
	'content_top' : { 'name': "top", 'id': "#content-top"},
	'content_bottom' : { 'name': "bottom", 'id': "#content-bottom"}
  }

  // обнуляем // n_banner = 0;n_slideshow = 0;n_carousel = 0;n_welcome = 0;
  var numer = {
	'banner': 0,
	'slideshow': 0,
	'carousel': 0,
	'welcome': 0
  }

  for(var pposition in ppositions){

	var check = false, check1 = false;

	// freyrModulesInPosition массив модулей, расположен по позициям
	// ПОМЕЧАЕМ
	for(var num in freyrModulesInPosition[1][pposition]){
	
		// в php массив freyrModulesInPosition специально сортируется по sort_order, поэтому (num) это строго порядок сортировки
		
		m = freyrModulesInPosition[1][pposition][num];

		// 1) метки
		if(panelLabels(ppositions[pposition].name, num)){
			// нашелся по меткам
			// но не подчищается массив gjstitle
		}else{
			// 2) ищем по классам
			switch (m.name_en){
			case "banner":
			  // Отмечаем баннеры
			  // pjsMarkBoxBaner(n_banner,m)
			  pjsMarkBoxBaner(numer[m.name_en],m)
			  numer[m.name_en]++
			  break
			case "category":
			case "store":
			case "featured":
			case "affiliate":
			case "bestseller":
			case "account":
			case "special":
			  // Отмечаем по title
			  pjsMarkBoxTitle(m)
			  break
			case "welcome":
			  pjsMarkBoxWelcome(numer[m.name_en],m)
			  numer[m.name_en]++
			  break
			case "slideshow":
			  // Отмечаем slideshow
			  pjsMarkBoxSlideshow(numer[m.name_en],m)
			  numer[m.name_en]++
			  break
			case "carousel":
			  // Отмечаем carousel
			  pjsMarkBoxCarousel(numer[m.name_en],m)
			  numer[m.name_en]++
			  break
			default:
			  // alert('Я таких значений не знаю')
			}
		}

		// подготавливаем ширину центральной части
		if(!check && m.position == "content_top"){
		  gcentertopwidth = $(gjsiframe).contents().find("."+m.name_en+"_"+m.id).outerWidth();
		  check = true;
		}
		// последний блок из content_top
		if(m.position == "content_top"){
		  gcentertopheight = "."+m.name_en+"_"+m.id;
		}
		// любой из нижних (а точнее первый)
		if(!check1 && m.position == "content_bottom"){
		  gcenterbottom = "."+m.name_en+"_"+m.id;
		  check1 = true;
		}

	}
  }
  
  // исправление если ошибка
  gcentertopwidth > 1100 ? gcentertopwidth = 1100 : false;
  gcentertopwidth < 100 ? gcentertopwidth = 100 : false;
  
  // найти и пометить наборы, те, что потом будут sortable (по стандартным/предустановленным позициям)
  for(var n in ppositions){

	// поиск эллемента с текущим классом
	t = $(gjsiframe).contents().find(ppositions[n].id);

	// если нашелся блок с таким классом
	if(t.length > 0){
	  $(t).addClass("connected_sortable")
	}

  }
  
  // TOP
  if(gcentertopheight){
	// разделитель
	$(gjsiframe).contents().find(gcentertopheight).after("<div id='separator-center' style='width:"+gcentertopwidth+"px;'><div style='cursor:row-resize;text-align:center;background:#EEE;margin:5px 0 0;'>TOP</div><div style='cursor:row-resize;height:0;border-top:3px dashed #F00'></div><div style='cursor:row-resize;text-align:center;background:#EEE;margin:0 0 5px;'>BOTTOM</div></div>");

	gcenterfather = $(gjsiframe).contents().find(gcentertopheight).parent();
  }else if(gcenterbottom){
	// разделитель
	$(gjsiframe).contents().find(gcenterbottom).before("<div id='separator-center' style='width:"+gcentertopwidth+"px;'><div style='cursor:row-resize;text-align:center;background:#EEE;margin:5px 0 0;'>TOP</div><div style='cursor:row-resize;height:0;border-top:3px dashed #F00'></div><div style='cursor:row-resize;text-align:center;background:#EEE;margin:0 0 5px;'>BOTTOM</div></div>");

	gcenterfather = $(gjsiframe).contents().find(gcenterbottom).parent();
  }
  
  // 
  $(gjsiframe).contents().find(gcenterfather).addClass("connected_sortable");

  t = $(gjsiframe).contents().find(".connected_sortable");

  $(t).each(function(indx){
	// heights.push($(this).height());

	  // делаем перетаскиваемыми
	  $(this).sortable({
		// helper:'clone',
		cursor:"move",
		cursorAt:{bottom:0},
		// revert:true,
		items:".freyr",
		tolerance:"pointer",
		zIndex: 99999,
		// поместили сюда элемент из другого (связанного) набора
		/* receive: function(event, ui) {
		  // инициализация основных настроек
		  pjsSavePosition(event, ui);
		}, */
		// поменялась сортировка
		update: function(event, ui) {
		  // инициализация основных настроек
		  pjsSavePosition(event, ui);
		},
		connectWith:$(gjsiframe).contents().find("div.connected_sortable"),// "#column-left, #column-right, #content, #content-top, #content-bottom",
		placeholder:"ui-state-highlight",
		forcePlaceholderSize:true,
		activate: function(event, ui) {
		  // 
		  
		  
		  $(this).find(".reg-freyr").removeClass("reg-freyr").css("outline","none");
		  $(ui.item).addClass("reg-freyr").css("outline","dashed");
		  pEditingFly(false, $(ui.item).attr("data-nameen"), $(ui.item).attr("data-id"), true);
		},
		start: function(event, ui) {
		  window.clearTimeout(pjsTimeout);
		},
		beforeStop: function(event, ui) {
		  pjsCover(false);
		}
	  }).disableSelection().mousedown(function(eventObject){
		pjsCover(true);
	  });

	  // подчищаем массив
	  delete ppositions[pposition];

  });
  
  // приостанавливаем некоторые js
  var t = $(gjsiframe).contents().find(".nivoSlider");
  // var t1 = $(t).attr('nivo');
  $(t).off('**');
  // $(t).data("nivo").stop();

}

// ****************************************************************************************************
// *****************                   Отметка эллементов (Labels)                    *****************
// ****************************************************************************************************
// отметка любого из модулей
function panelAllMarkBox(modul){
  $(modul).addClass("freyr "+m.name_en+"_"+m.id).attr("data-nameen", m.name_en).attr("data-id", m.id);
}
function pjsMarkBoxBaner(n_banner, m){
  $(gjsiframe).contents().find("#banner"+n_banner).addClass("freyr "+m.name_en+"_"+m.id).attr("data-nameen", m.name_en).attr("data-id", m.id);
}
function pjsMarkBoxTitle(m){
  $(gjstitle).each(function(indx, element){
  if(m.title_catalog==$(element).text()){
	box = $(element).parent(".box");
	$(box).addClass("freyr "+m.name_en+"_"+m.id).attr("data-nameen", m.name_en).attr("data-id", m.id);

	delete gjstitle[indx];
	// прекратить перебор
	return false;
  }
  });
}
function pjsMarkBoxWelcome(num,m){
  t = $(gjsiframe).contents().find("div.welcome");
/*   if($(t).length > 1){ */
	
/* 	t1 = $(t).next("p,.box-content"); */
/*   }else{ */
	t1 = $(t[num]).next("p,.box-content");
/*   } */
/*   t1 = $(t).next("p,.box-content"); */
  $(t1).attr("style","font-size:small");
  // $(t).append("<div class='wrapper_welcome_content'></div>");
  $(t[num]).append($(t1)).addClass("freyr "+m.name_en+"_"+m.id).attr("data-nameen", m.name_en).attr("data-id", m.id);
}
function pjsMarkBoxSlideshow(num){
  $(gjsiframe).contents().find("#slideshow"+num).parent(".slideshow").addClass("freyr "+m.name_en+"_"+m.id).attr("data-nameen", m.name_en).attr("data-id", m.id);
}
function pjsMarkBoxCarousel(num){
  $(gjsiframe).contents().find("#carousel"+num).addClass("freyr "+m.name_en+"_"+m.id).attr("data-nameen", m.name_en).attr("data-id", m.id);
}

// ****************************************************************************************************
// *****************                                                                  *****************
// ****************************************************************************************************
function pjsTopSett(listOfSettings){
  // скрытие и очистка блоков :input на верхней панели
  pjsHideTopSet();

  // включаем необходимые блоки и вставляем имена
  // собираться потом будут только те у которых есть имена
  if(listOfSettings){// types
  listOfSettings.forEach(function(item, i, arr){
	// 
	$("#setting_" + item).addClass("show");

	// сколько внутри input
	t_inp = $("#setting_" + item + " :input");
	
	// если не один, значит расширение например на языки
	if(t_inp.length > 1){
	  $(t_inp).each(function(indx, element){
		t_attr = 0;
		t_attr = $(element).attr("data-name-two");
		// тогда в качестве имени выставляем номерки
		$(element).attr("name", t_attr);
		// $(element).attr("name", item + "[" + t_attr + "]");
	  });
	} else {
	  $(t_inp).attr("name", item);
	}
	
  });
  }

	// если есть в глобальных заголовок то добавим
	// if(gTitle != "") $("div.notice-title").html(gTitle);

  if(listOfSettings.length > 0){
	
	$("#control-elements-apply").show();
  }
	
}

// запись надстроек модуля (ОК: на верхней панели)
function pjsSave(){
  // 
  pjsTopSettingsSave(types);
  // скрытие и очистка блоков :input на верхней панели
  pjsHideTopSet();
}

function pjsSavePosition(event, ui) {
  uielm = ui.item.context;

  // определить позицию (column_left, column_right, content_top, content_bottom)
  t_class = $(uielm).attr("class");
  t_ind = $(uielm).index();
  t_elm = $(uielm).parent(".connected_sortable");
  t_ind1 = $(t_elm).find("#separator-center").index();

  t_left = $(uielm).parent("#column-left");
  t_right = $(uielm).parent("#column-right");
  
  // определение position
  // сначала есть ли в top или bottom
  if(t_ind1 > -1){
	if(t_ind > t_ind1){
	  t_position = "content_bottom";
	  t_sort = t_ind1 - t_ind;
	}else{
	  t_position = "content_top";
	  t_sort = t_ind+1;
	}
	// t_position = t_ind > t_ind1 ? "content_bottom" : "content_top";
  // значит в левой или правой
  }else if(t_left.length > 0){
	t_position = "column_left";
	t_sort = t_ind;
  }else if(t_right.length > 0){
	t_position = "column_right";
	t_sort = t_ind;
  }

  // определить англ.название и id перемещаемого старого эллемента
  t_name = $(uielm).attr("data-nameen");
  t_id = $(uielm).attr("data-id");

  // перезапись
  gModuleArr[t_name][t_id].position = t_position;
  // gModuleArr[t_name][t_id].layout_id = t_lid;
  gModuleArr[t_name][t_id].sort_order = t_sort;
}

// СОХРАНЕНИЕ
function submitAll(formURLall) {

  formURL = formURLall;

  $("#progressbar span").attr("style", "color:#f00").html("Подождите");

  // определяем колличество "форм"
  t_all_count = Object.keys(gModuleArr).length;
  
  // создаем очередь из названий
  panLineName = [];
  for (var element in gModuleArr){
	panLineName.push(element);
  }
  
  // прогрес
  pan_progres = Math.ceil(100/t_all_count);
  
  // первая отправка формы
  panSendForms(0, t_all_count, pan_progres);
  return;
}

// ****************************************************************************************************
// *****************                              Общие                               *****************
// ****************************************************************************************************
var checkMod;
function panelLabels(name,num){
  t = "."+name+"_"+num;
  checkMod = $(gjsiframe).contents().find(t);
  if(checkMod.length != 1) return false; // не нашли такого блока

  panelAllMarkBox(checkMod);
  return true; // т.е. нашли модуль
}

// заглушка
function pjsCover(state){
  // state ? state = true : return;
  if (state){
    $("#above-freyr").show();
	pjsTimeout = setTimeout(function() {
	  $("#above-freyr").hide();
	  // $("#column-left").sortable("refreshPositions");
	}, 1400);
  }else{
	$("#above-freyr").hide();
  }
}

// сброс всех позиций
function second_passed() {
  $("html, body").animate({scrollTop: 119}, 500)
  $("#content-freyr iframe").contents().find("html, body").animate({ scrollTop: 0 }, 500)// .find("div").sortable("refreshPositions")
  return false
}

function pjsOpenText(th){
  $("#control-elements #setting_description div.accordion_div").show();
  $(th).hide();
}

// скрытие и очистка блоков :input на верхней панели
function pjsHideTopSet(){
  // очистить name настроек
  $("#panel_create_new select, #panel_create_new input, #panel_create_new textarea").attr("name", "");
  
  // скрыть все доп.настройки
  $("#panel_create_new > div").removeClass("show");
  
  // спрятать кнопку ok
  $("#control-elements-apply").hide();
  
  // большой блок приветствия
  $("#control-elements #setting_description div.accordion_div").hide();
  $("#control-elements #setting_description #setdescription_open").show();
}

function pjsTopSettingsSave(types){
  
  // записать дополнительные настройки
  saveMoreSettings(types);

  for(var item in gNowSettings){
	gModuleArr[gRunningNameEn][panRunningCount][item] = gNowSettings[item];
  }
  types = [];

}