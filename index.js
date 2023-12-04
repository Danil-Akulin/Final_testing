const express = require('express');
const opn = require('opn');
const fs = require('fs');
const app = express();
const port = 3000;

let currentMessage = 'new email';

app.get('/', (req, res) => {
    res.redirect('http://gmail.com');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);

    // Открываем браузер после запуска сервера
    opn(`http://localhost:${port}`);

    // Подписываемся на оповещения о новом email (пример, такого API нет, реальная реализация может быть разной)
    // Вместо этого участка кода используйте код для подключения к API вашей электронной почты
    subscribeToNewEmail((newEmail) => {
        if (newEmail) {
            // Генерируем случайное число от 0 до 1
            const randomValue = Math.random();
            
            currentMessage = randomValue < 0.5 ? 'new email' : 'no new email';

            // Записываем текст в файл
            const filePath = 'C:\\Users\\Danil Akulin\\Desktop\\Final_testing\\log.txt';
            fs.writeFile(filePath, currentMessage, { flag: 'a' }, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log(`Text "${currentMessage}" written to ${filePath}`);
                }
            });

            // Обновляем страницу
            opn(`http://localhost:${port}`);
        }
    });
});

// Обработчик завершения процесса
process.on('SIGINT', () => {
    // Выполняем завершающие действия перед выходом
    const filePath = 'C:\\Users\\Danil Akulin\\Desktop\\Final_testing\\log.txt';

    fs.writeFile(filePath, currentMessage, { flag: 'a' }, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Final text "${currentMessage}" written to ${filePath}`);
        }

        // Завершаем процесс
        process.exit();
    });
});

function subscribeToNewEmail(callback) {
    // Ваш код для подписки на новые электронные письма
    // Это может быть использование API электронной почты, WebSocket, Polling и т.д.
    // Функция callback(newEmail) вызывается, когда появляется новое письмо.
    // Передайте в эту функцию данные нового письма.
}
