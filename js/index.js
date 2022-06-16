let startBtn = document.querySelector('.start');
let fightBtn = document.querySelector('.fight');

class Unit {
    constructor(name, health, damage, armor, speed, img) {
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.armor = armor;
        this.speed = speed;
        this.img = img;
    }
}

class Game {
    static createFighters() {
        const fighter1 = new Unit('Scorpion', 300, 15, 2, 1.7, 
        'https://cdn-prod.mortalkombat.com/roster/scorpion/body.png');
        const fighter2 = new Unit('Noob Saibot', 290, 20, 1, 2, 
        'https://cdn-prod.mortalkombat.com/roster/noob-saibot/body.png');
        const fighter3 = new Unit('Kung Lao', 290, 20, 3, 2, 
        'https://cdn-prod.mortalkombat.com/roster/kung-lao/body.png');
        const fighter4 = new Unit('Baraka', 260, 30, 1, 2.2, 
        'https://cdn-prod.mortalkombat.com/roster/baraka/body.png');
        const units = [fighter1, fighter2, fighter3, fighter4];
        for (const unit in units) {
            let character = units[unit];
            document.querySelector('.characters-list').innerHTML += 
            `<div class="card"><img class="image" src=${character.img} alt="character-${unit}">
            <h3 class="name">${character.name}</h3><p>Health: <span class="health">${character.health}</span></p>
            <p>Damage: <span class="damage">${character.damage}</span></p><p>Armor: <span class="armor">
            ${character.armor}</span></p><p>Speed: <span class="speed">${character.speed}</span></p></div>`;
        }  
        startBtn.classList.add('hidden');  
        let cards = document.querySelectorAll('.card');
        function addEnemy(){
            const rand = Math.round(Math.random() * (units.length - 1));
            const enemy = units[rand];
            document.querySelector('.characters-list').innerHTML += 
            `<div class="card enemy"><img class="image" src=${enemy.img} alt="character-${rand}">
            <h3 class="name">${enemy.name}</h3><p>Health: <span class="health">${enemy.health}</span></p>
            <p>Damage: <span class="damage">${enemy.damage}</span></p><p>Armor: <span class="armor">${enemy.armor}
            </span></p><p>Speed: <span class="speed">${enemy.speed}</span></p></div>`;
            fightBtn.classList.remove('hidden');
        }
        function removeOther() {
            cards.forEach(card => {
                if(card.classList.contains('unpicked')) {
                card.classList.add('hidden');
                }
            })
            addEnemy();
        }
        cards.forEach(card => {
            card.classList.add('unpicked');
            card.addEventListener('click', () => {
              card.classList.add('picked');
              card.classList.remove('unpicked');
              removeOther();
            });
        });
    }
    static fight() {
        const char1 = document.querySelector('.picked');
        const char2 = document.querySelector('.enemy');
        const myHealth = document.querySelector('.picked .health');
        const myDamage = document.querySelector('.picked .damage');
        const myArmor = document.querySelector('.picked .armor');
        const mySpeed = document.querySelector('.picked .speed');
        const enemyHealth = document.querySelector('.enemy .health');
        const enemyDamage = document.querySelector('.enemy .damage');
        const enemyArmor = document.querySelector('.enemy .armor');
        const enemySpeed = document.querySelector('.enemy .speed');
        let me = document.querySelector('.picked .name');
        let enemy = document.querySelector('.enemy .name');
        let winner;
        let fightTimer = setInterval(() => {
            if (myHealth.innerHTML === '0' || myHealth.innerHTML < '0') {
                clearInterval(fightTimer);
                winner = enemy.innerHTML;
                char1.classList.add('hidden');
                document.querySelector('.battle-field').innerHTML = `<h1 class="winMsg">${winner} WINS</h1>`
                alert(`Winner is ${winner}`);
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
            if (enemyHealth.innerHTML === '0' || enemyHealth.innerHTML < '0') {
                clearInterval(fightTimer);
                winner = me.innerHTML;
                char2.classList.add('hidden');
                document.querySelector('.battle-field').innerHTML = `<h1 class="winMsg">${winner} WINS</h1>`
                alert(`Winner is ${winner}`);
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }

            let myHealthValue = myHealth.innerHTML - 
            Math.floor(parseFloat(enemyDamage.innerHTML) * parseFloat(enemySpeed.innerHTML) 
            - parseFloat(myArmor.innerHTML));

            let enemyHealthValue = enemyHealth.innerHTML - 
            Math.floor(parseFloat(myDamage.innerHTML) * parseFloat(mySpeed.innerHTML) 
            - parseFloat(enemyArmor.innerHTML));

            myHealth.innerHTML = myHealthValue > 0 ? myHealthValue : 0;
            enemyHealth.innerHTML = enemyHealthValue > 0 ? enemyHealthValue : 0;
        }, 1000)
    }
}

class Display {
    startGame() {
        startBtn.addEventListener('click', () => {
            alert('Choose your fighter');
            Game.createFighters();
        })
        fightBtn.addEventListener('click', () => {
            Game.fight();
        })
    }
}

let start = new Display();
start.startGame();
