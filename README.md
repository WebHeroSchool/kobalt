# JavaScript Best Practices by Nadir Begiyev :)__

### 1. Использовать строгое сравнение.
+ #### Операторы нестрогого равенства/неравенства (`==` или `!=`) будут приводить значения к одному типу перед сравнением. При использовании же операторов строгого равенства/неравенства (`===` или `!==`) сравнение производится не только по значениям, но и по типам сравниваемых данных
```
  0 == "";        // true
  1 == "1";       // true
  1 == true;      // true

  0 === "";       // false
  1 === "1";      // false
  1 === true;     // false
```

---

### 2. Оптимизировать циклы
+ #### Циклы могут работать весьма быстро, если описывать их правильно. Одна из самых распространённых ошибок - вычисление длинны массива на каждой итерации цикла:

```
const names = ['George', 'Ringo', 'Paul', 'John'];
for (let i = 0; i < names.length; i++){
  doSomeThingWith(names[i]);
}
```

+ #### Избежать этого можно просто вынеся длинну массива в отдельную переменную:

```
const names = ['George', 'Ringo', 'Paul', 'John'];
let j = names.length;
for (let i = 0; i < j; i++){
  doSomeThingWith(names[i]);
}
```

Или даже так:

```
const names = ['George', 'Ringo', 'Paul', 'John'];
for (let i = 0, j = names.length; i < j; i++){
  doSomeThingWith(names[i]);
}
```

---

### 3. Воздействовать на классы DOM-елементов, а не их инлайн-стили.
+ #### Если нужно сделать отдельные элементы страницы интерактивными, то правильнее будет воздействовать на список классов этих элементов, чем напрямую обращаться к их стилям. Данный подход позволяет:

+ #### Создать несколько паттернов (.css-классов) и однообразно воздействовать на разные DOM-элементы;
+ #### Быстрее редактировать/отлаживать необходимые параметры, тк они находятся в одном месте и не дублируются в JS-коде;
+ #### Снизить вероятность "сломать" всю вёрстку из-за разной приоритетности стилей;
+ #### Сократить количество кода и повысить его читабельность.
+ #### Как пример - визуализация валидации пустой строки ввода текста (Граница должна стать красного цвета):

**Bad practice**

```
  const f = document.getElementById('mainform');
  const inputs = f.getElementsByTagName('input');
  for (let i = 0, j = inputs.length; i < j; i++){
    if (inputs[i].className === 'mandatory' && inputs.value === ''){
        inputs[i].style.borderColor = '#f00';
        inputs[i].style.borderStyle = 'solid';
        inputs[i].style.borderWidth = '1px';
    }
  }
```

**Good practice**

CSS:
```
  .error {
    border: 1px solid red;
  }
```

  JS:
```
  const f = document.getElementById('mainform');
  const inputs = f.getElementsByTagName('input');
  for (let i = 0, j = inputs.length; i < j; i++){
    if (inputs[i].className === 'mandatory' && inputs.value === ''){
        inputs[i].classList.add('error');
    }
  }
```

---
  
  ### 4. Массивы
  + #### Для создания массива используйте литеральную нотацию. eslint: `no-array-constructor`
  ```
  // плохо
  const items = new Array();

  // хорошо
  const items = [];
  Для добавления элемента в массив используйте Array#push вместо прямого присваивания.
  const someStack = [];

  // плохо
  someStack[someStack.length] = 'abracadabra';

  // хорошо
  someStack.push('abracadabra');
  Для копирования массивов используйте оператор расширения ... .
  // плохо
  const len = items.length;
  const itemsCopy = [];
  let i;

  for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
  }

  // хорошо
  const itemsCopy = [...items];
  ```
  
  ---
  
  ## 5. Функции
 + #### Используйте функциональные выражения вместо объявлений функций. eslint: `func-style`
> Почему? У объявлений функций есть подъём. Это означает, что можно использовать функцию до того, как она определена в файле, но это вредит читабельности и поддержке. Если вы обнаружили, что определение функции настолько большое или сложное, что мешает понимать остальную часть файла, то, возможно, пришло время извлечь его в отдельный модуль. Не забудьте явно назвать функциональное выражение, независимо от того, подразумевается ли имя из содержащейся переменной (такое часто бывает в современных браузерах или при использовании компиляторов, таких как Babel). Это помогает точнее определять место ошибки по стеку вызовов. (Обсуждение)

```
  // плохо
  function foo() {
    // ...
  }

  // плохо
  const foo = function () {
    // ...
  };

  // хорошо
  // лексическое имя, отличное от вызываемой(-ых) переменной(-ых)
  const foo = function uniqueMoreDescriptiveLexicalFoo() {
    // ...
  };
```
  + #### Оборачивайте в скобки немедленно вызываемые функции. eslint: `wrap-iife`
  + #### Почему? Немедленно вызываемая функция представляет собой единый блок. Чтобы чётко показать это — оберните функцию и вызывающие скобки в ещё одни скобки. Обратите внимание, что в мире с модулями вам больше не нужны немедленно вызываемые функции.

**// Немедленно вызываемая функция:**
```
  (function () {
    console.log('Welcome to the Internet. Please follow me.');
  }());
```
  Никогда не объявляйте функции в нефункциональном блоке (`if`, `while`, и т.д.). Вместо этого присвойте функцию переменной. Браузеры позволяют выполнить ваш код, но все они интерпретируют его по-разному. eslint: `no-loop-func`

---

### 6. Стрелочные функции
+ #### Когда вам необходимо использовать анонимную функцию (например, при передаче встроенной функции обратного вызова), используйте стрелочную функцию. eslint: `prefer-arrow-callback, arrow-spacing`
> Почему? Таким образом создаётся функция, которая выполняется в контексте this, который мы обычно хотим, а также это более короткий синтаксис.

> Почему бы и нет? Если у вас есть довольно сложная функция, вы можете переместить эту логику внутрь её собственного именованного функционального выражения.
```
// плохо
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// хорошо
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```
+ #### Если тело функции состоит из одного оператора, возвращающего выражение без побочных эффектов, то опустите фигурные скобки и используйте неявное возвращение. В противном случае, сохраните фигурные скобки и используйте оператор return. eslint: `arrow-parens, arrow-body-style`
> Почему? Синтаксический сахар. Когда несколько функций соединены вместе, то это лучше читается.
```
// плохо
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// хорошо
[1, 2, 3].map((number) => `A string containing the ${number + 1}.`);

// хорошо
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});
```

---

### 7. Свойства
+ #### Используйте точечную нотацию для доступа к свойствам. eslint: `dot-notation`
```
const luke = {
  jedi: true,
  age: 28,
};

// плохо
const isJedi = luke['jedi'];

// хорошо
const isJedi = luke.jedi;
Используйте скобочную нотацию [], когда название свойства хранится в переменной.
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
Используйте оператор ** для возведения в степень. eslint: no-restricted-properties.
// плохо
const binary = Math.pow(2, 10);

// хорошо
const binary = 2 ** 10;
```

---

### 8. Переменные
+ #### Всегда используйте const или let для объявления переменных. Невыполнение этого требования приведёт к появлению глобальных переменных. Необходимо избегать загрязнения глобального пространства имён. eslint: `no-undef prefer-const`
```
// плохо
superPower = new SuperPower();

// хорошо
const superPower = new SuperPower();
```
+ #### Используйте объявление const или let для каждой переменной или присвоения. eslint: `one-var`
>Почему? Таким образом проще добавить новые переменные. Также вы никогда не будете беспокоиться о перемещении ; и , и об отображении изменений в пунктуации. Вы также можете пройтись по каждому объявлению с помощью отладчика, вместо того, чтобы прыгать через все сразу.

+ #### В первую очередь группируйте const, а затем `let`.
>Почему? Это полезно, когда в будущем вам понадобится создать переменную, зависимую от предыдущих.

---

### 9. Операторы сравнения и равенства
+ #### Используйте `===` и `!==` вместо `==` и `!=`. eslint: `eqeqeq`
+ #### Условные операторы, такие как if, вычисляются путём приведения к логическому типу `Boolean` через абстрактный метод `ToBoolean` и всегда следуют следующим правилам:
+ #### `Object` соответствует true
+ #### `Undefined` соответствует false
+ #### `Null` соответствует false
+ #### `Boolean` соответствует значению булева типа
+ #### `Number` соответствует false, если +0, -0, or NaN, в остальных случаях true
+ #### `String` соответствует false, если строка пустая '', в остальных случаях true
```
if ([0] && []) {
  // true
  // Массив (даже пустой) является объектом, а объекты возвращают true
}
Используйте сокращения для булевских типов, а для строк и чисел применяйте явное сравнение.
// плохо
if (isValid === true) {
  // ...
}

// хорошо
if (isValid) {
  // ...
}

// плохо
if (name) {
  // ...
}

// хорошо
if (name !== '') {
  // ...
}

// плохо
if (collection.length) {
  // ...
}

// хорошо
if (collection.length > 0) {
  // ...
}
```

---

### 10. Блоки
+ #### Используйте фигурные скобки, когда блок кода занимает несколько строк. eslint: `nonblock-statement-body-position`
```
// плохо
if (test)
  return false;

// хорошо
if (test) return false;

// хорошо
if (test) {
  return false;
}
Если блоки кода в условии if и else занимают несколько строк, расположите оператор else на той же строчке, где находится закрывающая фигурная скобка блока if. eslint: brace-style
// плохо
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// хорошо
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```
