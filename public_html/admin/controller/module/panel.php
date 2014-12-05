<?php // module: Visual Manage modules : "Freyr"
	  // version: 2.0 Alpha (версия, только для тестирования)
	  // autor: Copyright © Шуляк Роман, ноябрь 2014г.   mail: roma78sha@gmail.com  home-page: http://r.konotop.info  load: https://opencartforum.com/index.php?app=core&module=search&do=user_activity&search_app=downloads&mid=678008
class ControllerModulepanel extends Controller {
	private $error = array(); 
	
	public function index() {
		$this->load->language('module/panel');

		$this->document->setTitle($this->language->get('heading_title_fix'));
		$this->document->addScript('view/javascript/sha/visual-freyr.js');
		$this->data['text_no_results'] = $this->language->get('text_no_results');
		$this->data['heading_title'] = $this->language->get('heading_title_fix');
		$this->data['button_save'] = $this->language->get('button_save');
		$this->data['button_cancel'] = $this->language->get('button_cancel');
		
		$this->data['action'] = $this->url->link('module/panel', 'token=' . $this->session->data['token'], 'SSL');
		$this->data['cancel'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');
		// $this->data['iframelink'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');
		
		$this->load->model('setting/setting');
		$this->load->model('setting/extension');
				
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && ($this->validate())) {

		  if(isset($this->request->get["newinst"])) {
			if($this->request->get["newinst"] == 1) {
			  $this->model_setting_setting->editSetting($this->request->get["panmod"], $this->request->post);
			}
		  } else {
			foreach ($this->request->post as $key => $post_item) {
			  $this->model_setting_setting->editSettingValue($this->request->get["panmod"], $key, $post_item);
			}
		  }
		  $this->session->data['success'] = $this->language->get('panel_success').'&nbsp;&nbsp;&nbsp;<a class="button" href="'.$this->data['action'].'" style="font-style:italic;font-weight:bold">вернуться к Freyr!</a>';
		}

 		if (isset($this->error['warning'])) {
			$this->data['error_warning'] = $this->error['warning'];
		} else {
			$this->data['error_warning'] = '';
		}
		
		function mySort($a, $b){
			return ((int)$a["sort_order"] - (int)$b["sort_order"]);
		}

		$extensions = $this->model_setting_extension->getInstalled('module');
		
		foreach ($extensions as $key => $value) {
			if (!file_exists(DIR_APPLICATION . 'controller/module/' . $value . '.php')) {
				$this->model_setting_extension->uninstall('module', $value);

				unset($extensions[$key]);
			}
		}
		// смотрим файлы модулей т.е. какие есть модули
		$files = glob(DIR_APPLICATION . 'controller/module/*.php'); // var_dump($files);

		// схемы
		$sql = "SELECT * FROM " . DB_PREFIX . "layout ORDER BY layout_id";		

		$query = $this->db->query($sql);
		$this->data['layouts'] = $query -> rows;

		$this->load->model('design/banner');
		
		$banners = $this->model_design_banner->getBanners();
		$this->data['banners'] = $banners;
		
		$this->load->model('localisation/language');
		
		$languages = $this->model_localisation_language->getLanguages();
		$this->data['languages'] = $languages;

 		$panel = array();
		$this->data['extensions'] = array();
		$this->data['settingsModuleAll'] = array();
		$this->data['ext_others'] = array();
		$this->data['pnAllHeadingTitle'] = array();

		if ($files) {
		  $settingsModuleAll = "";
		  
		  foreach ($files as $keys => $file) {
		  
			$collect_module = array();
			// только название модуля
			$extension = basename($file, '.php');
			$this->load->language('module/' . $extension);

			$edit = '';
			$edit = $this->url->link('module/' . $extension . '', 'token=' . $this->session->data['token'], 'SSL');
			if (in_array($extension, $extensions)) {	
			  $uninstal = $this->url->link('extension/module/uninstall', 'token=' . $this->session->data['token'] . '&extension=' . $extension, 'SSL');
			  $isInstall = NULL;
			} else {
			  $isInstall = $this->url->link('extension/module/install', 'token=' . $this->session->data['token'] . '&extension=' . $extension, 'SSL');
			}

			// если присутствует в настройках
			$in_config = $this->config->get($extension.'_module');

			if ($in_config) {
			
			  $in_config = array_values($in_config);  // var_dump($in_config); var_dump("+++");
			
			  $settingsModuleAll[$extension] = $in_config;

			  // пересобрать массив
			  $i_item = 0;
			  foreach ($in_config as $item => $module) {
				$i_item++;
				$collect_module[$i_item] = $module;

				// проверка, что-бы не было ошибки
				$so_error = (int)$module["sort_order"];
				if (!$so_error) $module["sort_order"] = 0;
				
				// какой по счёту (не сортировка)
				// вставить в массив. для сохранения перед пересортировкой его номер id
				$collect_module[$i_item]['id'] = $i_item;
				// и id переведенный в букву
				$collect_module[$i_item]['id_let'] = numInLet($i_item - 1);
				
				// дополнительные настройки
				// русское и английское назваеие
				$collect_module[$i_item]['name_ru'] = $this->language->get('heading_title');
				$collect_module[$i_item]['name_en'] = $extension;
				// название (heading_title) из catalog
				$ttt = pLoadCatalogLanguage($languages[$this->config->get('config_admin_language')]['directory'], $extension);
				$collect_module[$i_item]['title_catalog'] = $ttt;// var_dump($ttt);
				// ссылка
				$collect_module[$i_item]['edit_href'] = $edit;
				
			  }
			  // массив 
			  foreach ($collect_module as $item => $module) {
				$panel[$module["layout_id"]][$module["position"]][] = $module;
			  }

			  // пересортируем по sort_order
			  if (count($panel) > 0) {
			  foreach ($panel as $l_id => $layout) {
				foreach ($layout as $p_name => $position) {
				  usort($position, 'mySort');
				  $panel[$l_id][$p_name] = $position;
				}
			  }
			  }

			}

			$t_name = $this->language->get('heading_title');
			$this->data['settingsModuleAll'] = $settingsModuleAll;
			$this->data['extensions'][] = array(
				'name'   => $t_name,
				'eng_name'   => $extension,
				'is_install'   => $isInstall,
				
				'all_extention' => $in_config
			);
			
			$this->data['pnAllHeadingTitle'][$extension]["ru"] = $t_name;
			$this->data['pnAllHeadingTitle'][$extension]["new"] = false;

		  }
		  
		  // упорядочить по layout_id
		  ksort($panel);
		  // финальный массив 
		  $this->data['panel'] = $panel;
		  
		}

		// стандартные и дополнительные (модули слева)
		foreach ($this->data['extensions'] as $key => $value) {
		  if($value["eng_name"] != "banner" && $value["eng_name"] != "carousel" && $value["eng_name"] != "category" && $value["eng_name"] != "affiliate" && $value["eng_name"] != "account" && $value["eng_name"] != "featured" && $value["eng_name"] != "slideshow" && $value["eng_name"] != "bestseller" && $value["eng_name"] != "filter" && $value["eng_name"] != "google_talk" && $value["eng_name"] != "information" && $value["eng_name"] != "latest" && $value["eng_name"] != "special" && $value["eng_name"] != "store" && $value["eng_name"] != "welcome") {
			if($value["eng_name"] != "panel") {
			  $this->data['ext_others'][] = $value;
			}
			unset($this->data['extensions'][$key]);
		  }
		}
		
		require_once(DIR_APPLICATION."controller/module/panel_file/panel_create_new.php");


		$this->template = 'module/panel.tpl';
		$this->children = array(
			'common/header',
			'common/footer'
		);

		$this->response->setOutput($this->render());
	}
	
	private function validate() {
		if (!$this->user->hasPermission('modify', 'module/panel')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}
			
		if (!$this->error) {
			return TRUE;
		} else {
			return FALSE;
		}	
	}

}

function compareIn($a, $b) {
  if ($a["sort"] == $b["sort"]) {return 0;}
  return ($a["sort"] < $b["sort"]) ? -1 : 1;
}
// из числа в букву
function numInLet($i) {
 if($i > -1 && $i < 25) {
  $abcde = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y');
  return $abcde[$i];
 } else {
  return "Z";
 }
}
/* ========================================================================================== */
// получить title из catalog 
function pLoadCatalogLanguage($dirname,$filename) {
		$file = DIR_CATALOG . 'language/' . $dirname . '/module/' . $filename . '.php';// var_dump($file);

		  // только название файла
		  $basename = basename($file, '.php');
		  if (file_exists($file)){
			$_ = array();
			
			require($file);
			
			$catalogheadingtitle = $_['heading_title'];// var_dump($catalogheadingtitle);
			
			unset($_);
			
			return $catalogheadingtitle;
		  } else {
			return false;
			// trigger_error('Error: Could not load language ' . $filename . '!');
		  }
}

?>