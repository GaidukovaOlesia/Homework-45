// Необходимо реализовать алгоритм запроса у банкомата:
//
// баланса на карте
// выдачи наличных
//
// Входящие данные:
// Для этого пишем функцию getMoney, которая:
//
// в качестве входящих аргументов принимает объекты userData и bankData.
//     возвращает Promise, в котором условием перехода в первый .then является ответ юзера на вопрос
//     'Посмотреть баланс на карте?’.
// Если юзер выбирает Да (Yes, Подтвердить), то вызываем функцию resolve(userData)
// В функции resolve, в зависимости от доступных пользователю валют (userData), предлагаем пользователю ввести валюту,
// по которой будет выведен баланс.
//     Если пользователь вводить в prompt название НЕдопустимой для него валюты, продолжаем запрашивать валюту,
//     пока не будет введена допустимая.
//     При вводе пользователем названия допустимой ему валюты – выводим данные о балансе по данной валюте в консоль,
//     например: ‘Баланс составляет: 1000 USD’.

// Если юзер выбирает Отмена (No), то взываем функцию reject({userData: userData, bankData: bankData})
// В функции reject, в зависимости от доступных пользователю валют (userData)
// и доступных валют в текущем банкомате bankData (с НЕ нулевым значением свойства max,
// что говорит об отсутствии в данный момент купюр этой валюты в банкомате), предлагаем пользователю ввести валюту,
// по которой будет произведено снятие наличных и сумму снятия.

//     Если пользователь вводить в prompt название НЕдопустимой для него и для банкомата валюты,
//     продолжаем запрашивать валюту, пока не будет введена допустимая.
//     Если пользователь вводить в prompt сумму превышающую max для данной валюты, выводим в консоль сообщение:
//     `Введенная сумма больше допустимой. Максимальная сумма снятия: …`
// Если пользователь вводить в prompt сумму меньше min для данной валюты, выводим в консоль сообщение:
// `Введенная сумма меньше допустимой. Минимальная сумма снятия: …`
// При вводе пользователем допустимой ему и текущему банкомату название валюты и сумму –
// выводим сообщение об успешном снятии наличных в консоль, например: ‘Вот Ваши денежки 200 USD 💵’.
// Финальное сообщение, которое вне зависимости от выбора операции должен получить юзер в консоли –
// 'Спасибо, хорошего дня 😊'

let userData = {
        'USD': 1000,
        'EUR': 900,
        'UAH': 15000,
        'BIF': 20000,
        'AOA': 100
    },
    bankData = {
        'USD': {
            max: 3000,
            min: 100,
            img: '💵'
        },
        'EUR': {
            max: 1000,
            min: 50,
            img: '💶'
        },
        'UAH': {
            max: 0,
            min: 0,
            img: '💴'
        },
        'GBP': {
            max: 10000,
            min: 100,
            img: '💷'
        }
    }
function getMoney(userData, bankData) {

return new Promise((resolve, reject) => {

    let balance = prompt("Посмотреть баланс на карте?");

    if (balance === "да") {
        resolve(userData)
    } else {
        reject(userData, bankData)
    }
})
}

getMoney(userData, bankData)
    .then(
        () => {
            getUserCurrency();
            return Promise.reject();
        },
        () => {
            return getUserMoney();
        })
    .then(
        currency => {
            let sum = +prompt("Введите сумму для снятия наличных");
            let currencyFlag = false;

            for (let key in bankData) {
                if (currency === key) {
                    currencyFlag = true;
                    if (sum > bankData[key].max) {
                        console.log(`Введенная сумма больше допустимой. Максимальная сумма снятия: ${bankData[key].max} ${currency}`);
                        console.log('Спасибо, хорошего дня 😊');
                        break;
                    } else if (sum < bankData[key].min) {
                        console.log(`Введенная сумма меньше допустимой. Минимальная сумма снятия: ${bankData[key].min} ${currency}`);
                        console.log('Спасибо, хорошего дня 😊');
                        break;
                    } else if (sum > bankData[key].min && sum < bankData[key].max ) {
                        console.log(`Вот ваши денежки ${sum} ${currency}`);
                        console.log('Спасибо, хорошего дня 😊');
                        break;
                    }
                }
            }
            if (currencyFlag === false) {
                console.log(`Данная валюта недоступна`);
                console.log('Спасибо, хорошего дня 😊');
            }
        },
        () => {

        }
    )


function checkUserCurrency(currency, userData) {
    let flag = false;

        for (let key in userData) {
            if (currency === key) {
                flag = true;
            }
        }
        return flag;
}

function getUserCurrency() {
    let currency = prompt ("Введите название валюты в формате USD, EUR, UAH, BIF, AOA!").toUpperCase();

        if (checkUserCurrency(currency, userData) === true) {
            console.log(`Баланс составляет: ${userData[currency]} ${currency}`);
            console.log('Спасибо, хорошего дня 😊');

        } else {
            getUserCurrency();
        }
}

function getUserMoney() {
    let currency = prompt ("Введите название валюты в формате USD, EUR, UAH, BIF, AOA!").toUpperCase();

    if (checkUserCurrency(currency, userData) === true) {
        return Promise.resolve(currency);
    } else {
        return Promise.reject(getUserMoney());
    }
}

