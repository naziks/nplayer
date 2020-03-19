<?php
require('vendor/id3/getid3.php');

if(!file_exists('../list/pic/')){
	mkdir('../list/pic/');
}

$a = new getID3;

$file_list = array_filter(scandir('../list/'), function($a){return !in_array($a, ['.','..','cache.json','pic']);});

$result = Array();
foreach ($file_list as $k => $file){
	echo "<div>$file</div>";
	$result[] = parse_tags($file);
}

echo "<pre>";
print_r($result);
echo "</pre>";

file_put_contents(__DIR__.'/../list/cache.json', json_encode($result));
echo 'Done!';

function parse_tags($filename){
	global $a;
	$r = $a->analyze("../list/$filename");
	$tags = array_pop($r['tags']);
	$tags = array_filter($tags, function($a){return in_array($a, ['title','artist','album']);}, ARRAY_FILTER_USE_KEY);
	foreach ($tags as $key => $v) {
		$tags[$key] = $v[0];
	}

	$tags['filename'] = "./list/$filename";

	// Process image
	$pic = !empty($r['comments']['picture']) ? $r['comments']['picture'][0] : [];

	if(!empty($pic)){
		$hash = md5($pic['data']);
		$ext = explode('/', $pic['image_mime'])[1];

		$image_path = "./list/pic/$hash.$ext";
		if(!file_exists(".$image_path")){
			file_put_contents(".$image_path", $pic['data']);
		}

		$pic['url'] = $image_path;


		unset($image_path);
		unset($hash);
		unset($ext);
		unset($pic['data']);

		$tags['picture'] = $pic;
	}
	// End with image

	return $tags;
}
