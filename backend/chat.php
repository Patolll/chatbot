<?php
    require_once 'config.php';
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);
    $userMessage = $input["message"];
    $openAiApiKey = $API_KEY;

    $data = [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'user', 'content' => $userMessage]
        ],
    ];

    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch,CURLOPT_HTTPHEADER,[
        'Content-type: application/json',
        'Authorization: Bearer ' . $openAiApiKey,
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    
    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        echo json_encode(['error' => curl_error($ch)]);
        exit;
    }

    curl_close($ch);
    $responseData = json_decode($response, true);

    $bot_message = $responseData['choices'][0]['message']['content'] ?? 'Sorry, I could not process your request.';
    echo json_encode(['response'=>$bot_message])
?>