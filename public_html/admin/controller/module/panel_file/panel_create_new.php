<?php // module: Visual Manage modules : "Freyr"
	  // version: 2.0 Alpha (версия, только для тестирования)
	  // autor: Copyright © Шуляк Роман, октябрь 2014г.   mail: roma78sha@gmail.com
	  // смотрите полное описание на / for details, please http://r.konotop.info freyr 2
	  // load: https://opencartforum.com/index.php?app=core&module=search&do=user_activity&search_app=downloads&mid=678008

  $panel_create_new = '
	<div id="setting_banner_id"><span>Баннер:&nbsp;</span>
	  <select name="">';

	  foreach($banners as $banner) {
		  $panel_create_new .= '<option value="'.$banner['banner_id'].'">'.$banner["name"].'</option>';
	  }

  $panel_create_new .= '</select></div>
	<div id="setting_limit"><span>Лимит:&nbsp;</span><input id="i_setting_limit" type="text" data-type="limit" name="" value="5" size="3" /></div>
	<div id="setting_scroll"><span>Прокрутка:&nbsp;</span><input id="i_setting_scroll" type="text" data-type="scroll" name="scroll" value="3" size="3" /></div>
	<div id="setting_width"><span>Размеры (Ш x В):&nbsp;</span><input id="i_setting_width" type="text" data-type="width" name="" value="80" size="3" /></div>
	<div id="setting_height"><input id="i_setting_height" type="text" data-type="height" name="" value="80" size="3" /></div>
	<div id="setting_image_width"><span>Изображение (Ш х В):&nbsp;</span><input id="i_setting_image_width" type="text" data-type="image_width" name="" value="80" size="3" /></div>
	<div id="setting_image_height"><input id="i_setting_image_height" type="text" data-type="image_height" name="" value="80" size="3" /></div>

	<div id="go_to"></div>
	
	<div id="setting_description">
	  <div class="accordion_div">';
	  
  foreach ($languages as $language) {
	$panel_create_new .= 
		'<h3>'.$language["name"].'&nbsp;&nbsp;&nbsp;<img src="view/image/flags/'.$language['image'].'" title="'.$language['name'].'" /></h3>
		<div id="setting_description_'.$language['language_id'].'">
		  <div class="form">
		  <div>Приветственное сообщение:</div>
			<textarea data-name-two="'.$language['language_id'].'" data-type="description" name=""></textarea>
		  </div>
		</div>';
  }
		
  $panel_create_new .= '</div><div id="setdescription_open" class="invisible" onclick="pjsOpenText(this)">Text</div></div><div id="settings"></div>';
  $panel_create_new .= '
	<div id="setting_status">
	  <input id="i_setting_status" type="hidden" data-type="status" name="" value="1">
	</div>
  ';
  $panel_create_new .= '
	<script type="text/javascript">
	  $(document).ready(function () {$("div.accordion_div").accordion({autoHeight:false})});
	</script>
  ';
  
$this->data['panel_create_new'] = $panel_create_new;
 ?>