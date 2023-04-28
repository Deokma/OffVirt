// const canvas = document.getElementById("office-canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth * 2;
// canvas.height = window.innerHeight * 2;
//
// const ballRadius = 10;
// let x = canvas.width / 2;
// let y = canvas.height / 2;
//
// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
//
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
// }
//
// setInterval(draw, 10);
//
// const moveLeftButton = document.getElementById("move-left");
// const moveRightButton = document.getElementById("move-right");
// const moveUpButton = document.getElementById("move-up");
// const moveDownButton = document.getElementById("move-down");
//
// canvas.addEventListener('click', function(e) {
//     x = e.clientX;
//     y = e.clientY;
// });
//
// document.addEventListener('keydown', function(event) {
//     if (event.code === 'KeyA' && x > canvas.width / 4) {
//         x -= 10;
//         canvas.style.left = (-(x - canvas.width / 2)) + 'px';
//     } else if (event.code === 'KeyD' && x < (canvas.width / 4) * 3) {
//         x += 10;
//         canvas.style.left = (-(x - canvas.width / 2)) + 'px';
//     } else if (event.code === 'KeyW' && y > canvas.height / 4) {
//         y -= 10;
//         canvas.style.top = (-(y - canvas.height / 2)) + 'px';
//     } else if (event.code === 'KeyS' && y < (canvas.height / 4) * 3) {
//         y += 10;
//         canvas.style.top = (-(y - canvas.height / 2)) + 'px';
//     }
// });
//
// // Создаем новое приложение Pixi
// const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
// document.getElementById('game').appendChild(app.view);
//
// // Создаем графический объект круга
// const circle = new PIXI.Graphics();
// circle.beginFill(0xDE3249);
// circle.drawCircle(0, 0, 50);
// circle.endFill();
//
// // Добавляем круг на сцену
// app.stage.addChild(circle);
//
// // Добавляем событие клика мыши на сцену
// app.stage.interactive = true;
// app.stage.on('click', moveCircle);
//
// // Функция для плавного перемещения круга к указанному месту
// function moveCircle(event) {
//     const targetX = event.data.global.x;
//     const targetY = event.data.global.y;
//     const distance = Math.sqrt((targetX - circle.x) * (targetX - circle.x) + (targetY - circle.y) * (targetY - circle.y));
//     const duration = distance / 100; // Скорость перемещения
//     const tween = new TWEEN.Tween({ x: circle.x, y: circle.y })
//         .to({ x: targetX, y: targetY }, duration * 1000)
//         .easing(TWEEN.Easing.Quadratic.InOut)
//         .onUpdate(function () {
//             circle.x = this.x;
//             circle.y = this.y;
//         })
//         .start();
// }
//
// // Функция для анимации кадров с помощью TWEEN.js
// function animate() {
//     requestAnimationFrame(animate);
//     TWEEN.update();
// }
// animate();
const app = new PIXI.Application({ width: 2000, height: 1000, backgroundColor: 0xFFC0CB });
document.body.appendChild(app.view);

// Создаем графический объект для поля
const field = new PIXI.Graphics();
field.beginFill(0xFFFFFF);
field.drawRect(0, 0, app.view.width, app.view.height);
field.endFill();
app.stage.addChild(field);

// Создаем графический объект для игрока
const player = new PIXI.Graphics();
const color = Math.floor(Math.random() * 0xFFFFFF);
player.beginFill(color);
player.drawCircle(0, 0, 20);
player.endFill();
player.x = app.view.width / 2;
player.y = app.view.height / 2;
app.stage.addChild(player);

// Обрабатываем событие клика мышью на игровом поле
field.interactive = true;
field.on('mousedown', (event) => {
// Вычисляем расстояние от текущей позиции игрока до целевой точки
    const distance = Math.sqrt((event.data.global.x - player.x) ** 2 + (event.data.global.y - player.y) ** 2);
    // Вычисляем время, которое потребуется для перемещения игрока к целевой точке
    const speed = 200; // скорость перемещения в пикселях в секунду
    const time = distance / speed;

// Изменяем позицию игрока с помощью TweenMax
    TweenMax.to(player, time, {
        x: event.data.global.x,
        y: event.data.global.y,
        onUpdate: () => {
            // Определяем положение игрока на экране
            const playerX = player.x - app.view.width / 2;
            const playerY = player.y - app.view.height / 2;

            // Определяем размеры поля
            const fieldWidth = field.width;
            const fieldHeight = field.height;

            // Определяем границы поля
            const minX = app.view.width / 2;
            const minY = app.view.height / 2;
            const maxX = fieldWidth - app.view.width / 2;
            const maxY = fieldHeight - app.view.height / 2;

            // Вычисляем координаты камеры
            let cameraX = playerX;
            let cameraY = playerY;

            // Проверяем, не выходит ли камера за границы поля
            if (cameraX < minX) {
                cameraX = minX;
            } else if (cameraX > maxX) {
                cameraX = maxX;
            }

            if (cameraY < minY) {
                cameraY = minY;
            } else if (cameraY > maxY) {
                cameraY = maxY;
            }

            // Обновляем позицию камеры
            app.stage.position.set(-cameraX + app.view.width / 2, -cameraY + app.view.height / 2);
        }
    });

// Отправляем запрос на сервер с новыми координатами
    fetch('/update-player', {
        method: 'POST',
        body: JSON.stringify({x: player.x, y: player.y}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});