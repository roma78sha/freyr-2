<?php echo $header; ?>
<link type="text/css" href="view/stylesheet/panel.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="view/javascript/jquery/ui/themes/redmond/jquery-ui-1.9.2.custom.min.css" />
<script type="text/javascript" src="view/javascript/jquery/panel/script_panel.js"></script>
<?php // module: Visual Manage modules : "Freyr"
	  // version: 2.0 Alpha (версия, только для тестирования)
	  // autor: Copyright © Шуляк Роман, ноябрь 2014г.   mail: roma78sha@gmail.com  home-page: http://r.konotop.info  load: https://opencartforum.com/index.php?app=core&module=search&do=user_activity&search_app=downloads&mid=678008 ?>

<?php $panModuleAll = json_encode($settingsModuleAll); ?>
<?php $pAllHeadingTitle = json_encode($pnAllHeadingTitle); ?>
<script type="text/javascript"><!--
  var gModuleArr = <?php echo $panModuleAll; ?>; 
  var gAllHeadingTitle = <?php echo $pAllHeadingTitle; ?>;
  var freyrModulesInPosition = <?php echo json_encode($panel); ?>;
//--></script>

<div id="content">
<?php if ($error_warning) { ?>
<div class="warning"><?php echo $error_warning; ?></div>
<?php } ?>
<div id="box_panel" class="box">
	<div id="top_panel">
	  <div class="general-buttons"><a href="http://r.konotop.info/" title="Проверить версию" class="button_home" target="_blank">2.0</a></div>
	  <div id="control-elements"></div>
	  <div id="control-elements-apply" style="display:none" onclick="pjsSave()">Ок</div>
	  <div class="buttons"><a id="progressbar" onclick='submitAll("<?php echo $action; ?>")' class="button"><span><?php echo $button_save; ?></span></a>&nbsp;&nbsp;<a onclick="location = '<?php echo $cancel; ?>';" class="button"><span>Отменить</span></a></div>
	  <div id="change-buttons"><span class="change-circle" onclick="pjsBuild(this);"><span></span></span><span class="change-circle-title">Режим просмотра</span></div>
	</div>
	
	<div id="content-freyr">
	  <iframe id="iframe-freyr" src="/"></iframe>
	  <div id="above-freyr"></div>
	</div>
	  <div id="notice_container">
		<div class="notice notice_1">Перетащите новый эллемент в одну из позиций!</div>
		<div class="notice" id="notice_2" title=""><div id="control_panel_module"><div id="delete_panel_module" onclick="pDeleteModule();"><span class="ui-icon ui-icon-trash"></span></div></div><div class="notice-title"></div><form id="panel_create_new"><?php echo $panel_create_new; ?></form><form id="panel_others_settings" action="<?php echo $action; ?>&panelchangetitle=1"></form></div>
		<div class="notice" id="notice_3" title=""><br /><span></span><br /><br />Модуль ещё не установлен!<br /></div>
		<div class="notice" id="notice_4" title="">Вы действительно хотите удалить модуль?</div>
	  </div>
	<div class="clr"></div>
</div>
<?php echo $footer; ?>
