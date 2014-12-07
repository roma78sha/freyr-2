<?php if ($modules) { ?>
<div id="column-left">
  <?php foreach ($modules as $key => $module) { ?>
  <div class="box left_<?php echo $key; ?>"><?php echo $module; ?></div>
  <?php } ?>
</div>
<?php } ?> 
