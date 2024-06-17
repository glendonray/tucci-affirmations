<?php
$link = "https://www.affirmations.dev";
$ch = curl_init($link);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($ch);
