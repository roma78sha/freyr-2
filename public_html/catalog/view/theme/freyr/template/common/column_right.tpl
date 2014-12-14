<?php if ($modules) { ?>
<div id="column-right">
  <?php foreach ($modules as $key => $module) { ?>
  <div class="box right_<?php echo $key; ?>"><?php echo $module; ?></div>
  <?php } ?>
</div>
<?php } ?>