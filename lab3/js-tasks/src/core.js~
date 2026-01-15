/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
	return (n|0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
	/*
	 * Correct code of the algorithm is written below:
	
	const even_numbers = [];
	for(let i = 2; i <= 20; i+=2)
	{
		even_numbers.push(i);
	}
	return even_numbers;
	*/
	return [2,4,6,8,10,12,14,16,18,20];
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
	let sum = 0;
	for(let i = 0; i <= n; i++)
	{
		sum += i;
	}
	return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
	if (n == 1) return 1;
	return recSumTo(n-1)+n;
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
	if (n < 0) return NaN;

	let fact = 1;
	for (let i = 1; i <= n; i++) {
		fact *= i;
	}
	
	return fact;
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
	let testVal = 1;
	do {
		if (n == testVal) {
			return true;
		}
		testVal *= 2;
	}
	while(testVal <= n);

	return false;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
	if(n == 1 || n == 2) return 1;
	let curr = 1;
	let prev = 1;
	for (let i = 3; i <= n; i++) {
		let newVal = curr+prev;
		prev = curr;
		curr = newVal;
	}
	return curr;
}
/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
	operatorFn = (operatorFn === undefined) ? ((a,b) => a) : operatorFn;
	let storedValue = initialValue;
	return function operation(operand) {
		storedValue = operatorFn(storedValue, operand);
		return storedValue;
	}
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
	let gen_step = (step === undefined) ? 1: step;
	let gen_val = (start === undefined) ? 0 : start;
	return function generator()
	{
		gen_val += gen_step;
		return gen_val - gen_step;
	}
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {

	if (firstObject === secondObject) return true;
	if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) return true;   
	if (firstObject == null || typeof firstObject != 'object') return false;   
	if (secondObject == null || typeof secondObject != 'object') return false;
	
	const firstKeys = Object.keys(firstObject);
	const secondKeys = Object.keys(secondObject);
	
	if (firstKeys.length != secondKeys.length) return false;

	for (let i = 0; i < firstKeys.length; ++i) {
		if(!secondKeys.includes(firstKeys[i]) || 
		   !deepEqual(firstObject[firstKeys[i]], secondObject[firstKeys[i]])) {
			return false;
		}
	}

	return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};


