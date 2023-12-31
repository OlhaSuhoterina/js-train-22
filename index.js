// Одиночка (Singleton) — це патерн програмування, який забезпечує,
// що клас має тільки один екземпляр і надає глобальну точку доступу до цього екземпляра.

// Клас OrderTracker відповідає за відстеження замовлень

class OrderTracker {
  static #instance = null;

  static #orders = [];

  static create() {
    if (!this.#instance) {
      this.#instance = new OrderTracker();
    }
    return this.#instance;
  }

  static add(item) {
    this.#orders.push(item);
  }

  static get() {
    return this.#orders;
  }
}

console.log("Завдання 1 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо єдиний екземпляр класу OrderTracker
const tracker = OrderTracker.create();

// Додаємо замовлення до списку
OrderTracker.add("Телефон");
OrderTracker.add("Ноутбук");

// Отримуємо список замовлень
const orders = OrderTracker.get();

// Виводимо список замовлень в консоль
console.log(orders);

// Фабрика (Factory) — це патерн програмування, який надає загальний клас для створення об'єктів, який враховує
// передані аргументи та вирішує який клас повинен мати об’єкт при створенні
// Клас Book описує книгу в магазині
class Book {
  constructor({ title, author, coverColor }) {
    this.title = title;
    this.author = author;
    this.coverColor = coverColor;
  }
  /**
   * Конструктор Book приймає об'єкт з параметрами
   * title - назва книги
   * author - автор книги
   * coverColor - колір обкладинки книги
   */
  describe() {
    return `Книга: ${this.title}, автор: ${this.author}, колір обкладинки: ${this.coverColor}`;
  }
  /**
   * Метод describe генерує опис книги
   *  Повертає рядок у форматі: "Книга: '{назва}', автор: '{автор}', колір обкладинки: '{колір}'"
   */
}

/**
 * Клас AudioBook описує аудіокнигу в магазині
 */
class AudioBook {
  constructor({ title, author, audioLength }) {
    this.title = title;
    this.author = author;
    this.audioLength = audioLength;
  }
  describe() {
    return `Аудіокнига:: ${this.title}, автор: ${this.author}, тривалість: ${this.audioLength}`;
  }
  /**
   * Конструктор AudioBook приймає об'єкт з параметрами
   * title - назва книги
   * author - автор книги
   * audioLength - тривалість аудіокниги
   */
  /**
   * 
     * Метод describe генерує опис аудіокниги
       Повертає рядок у форматі: "Аудіокнига: '{назва}', автор: '{автор}', тривалість: '{тривалість}'"
     */
}

/**
 * Клас ProductFactory використовується для створення об'єктів-продуктів.
 */

class ProductFactory {
  static TYPE = {
    BOOK: "book",
    AUDIOBOOK: "audiobook",
  };
  static createProduct(type, options) {
    switch (type) {
      case this.TYPE.BOOK:
        return new Book(options);
      case this.TYPE.AUDIOBOOK:
        return new AudioBook(options);
      default:
        throw new Error(`Такого типу продукту не існує: ${type}`);
    }
  }
  // TYPE - статична властивість, що визначає типи продуктів, які можуть бути створені.
  // {
  //   BOOK: "book",
  //   AUDIOBOOK: "audiobook",
  // }
  /**
   * Статичний метод createProduct використовується для створення об'єктів-продуктів, отримує
   * type - тип продукту, що має бути створений. Має бути одним зі значень властивості TYPE.
   * options - об'єкт з параметрами для конструктора продукту.
   *
   * В залежності від типу, повертає або екземпляр класу Book, або AudioBook.
   *
   *  Кидає помилку, якщо переданий тип не підтримується `Такого типу продукту не існує: ${type}`.
   */
}
console.log("Завдання 2 ====================================");
// Після виконання розкоментуйте код нижче

// Використовуємо ProductFactory для створення нової книги
const factoryBook = ProductFactory.createProduct(ProductFactory.TYPE.BOOK, {
  title: "Назва книги",
  author: "Автор книги",
  coverColor: "Синій",
});

// Виводимо в консоль опис нової книги
console.log(factoryBook.describe());

// Використовуємо ProductFactory для створення нової аудіокниги
const factoryAudiobook = ProductFactory.createProduct(
  ProductFactory.TYPE.AUDIOBOOK,
  {
    title: "Назва аудіокниги",
    author: "Автор аудіокниги ",
    audioLength: "5 годин",
  }
);

// Виводимо в консоль опис нової аудіокниги
console.log(factoryAudiobook.describe());

// Спробуємо створити продукт непідтримуваного типу
try {
  const factoryUnknown = ProductFactory.createProduct("comics", {});
} catch (error) {
  // Виводимо помилку в консоль
  console.error(error.message);
}

// Спостерігач (Observer) — це патерн програмування, який визначає залежність "один-багато" між об'єктами, так що зміна стану одного об'єкта
// призводить до автоматичного оновлення всіх залежних об'єктів
/**
 * Клас Customer представляє клієнта, що має можливість отримувати повідомлення по електронній пошті.
 * Клієнт ідентифікується своєю електронною адресою, яку використовується для відправки повідомлень.
 */
class Customer {
  constructor(email) {
    this.email = email;
  }
  sendEmail(message) {
    console.log(`${this.email} ${message}`);
  }
  /**
   * Конструктор для класу Customer. Приймає email - Електронна адреса клієнта.
   */
  /**
   * Метод відправки повідомлення клієнту по електронній пошті.Приймає message - повідомлення,та виводить в консоль ${this.email} ${message}.
   */
}

/**
 * Клас Product представляє продукт, який можна створювати.
 */
class Product {
  constructor(name) {
    this.name = name;
  }
  /**
   * Конструктор для класу Product.Приймає name - Назва продукту.
   */
}

/**
 * Клас Store представляє магазин, який може мати підписників і створювати нові продукти.
 * Магазин має назву і список підписників, які отримують повідомлення про нові продукти.
 */
class Store {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }
  subscribe(customer) {
    this.customers.push(customer);
  }
  unsubscribe(customer) {
    this.customers = this.customers.filter((sub) => sub !== customer);
  }
  /**
   * Конструктор для класу Store.Приймає name - Назва магазину, та створює пустий масив customers
   */
  /**
   * Метод subscribe для підписки клієнта на магазин. Приймає customer - Клієнт, який підписується.
   * Після виклику цього методу, клієнт буде отримувати повідомлення про нові продукти, через push додаємо клієнта до масиву.
   */
  /**
   * Метод unsubscribe для відписки клієнта від магазину.Приймає customer - Клієнт, який відписується.
   * Після виклику цього методу, клієнт більше не буде отримувати повідомлення про нові продукти, через filter прибираємо клієнта з масиву.
   */
  createProduct(name) {
    const product = new Product(name);
    this.sendNotify(product);
  }
  sendNotify(product) {
    this.customers.forEach((customer) => {
      customer.sendEmail(
        ` Новий продукт "${product.name}" в магазині ${this.name}!`
      );
    });
  }
  /**
   * Метод createProduct для створення нового продукту в магазині.Приймає name - Назва нового продукту.
   * Після виклику цього методу, новий продукт буде створено, а всі підписники отримають про це повідомлення через sendNotify.
   */
  /**
   * Метод для відправки повідомлень всім підписникам про новий продукт.Приймає product - Продукт, про який відправляється повідомлення.
   * Новий продукт "${product.name}" в магазині ${this.name}! за допомогою sendEmail.
   */
  // За допомогою forEach перебираємо масив customers
  // Для кожного елементу масиву викликаємо метод sendEmail з рядком `Новий продукт "${product.name}" в магазині ${this.name}!`
}

console.log("Завдання 3 ====================================");
// Після виконання розкоментуйте код нижче

const store = new Store("IT Supermarket");

const customer1 = new Customer("john@example.com");
const customer2 = new Customer("jane@example.com");
const customer3 = new Customer("alice@example.com");

store.subscribe(customer1);
store.subscribe(customer2);
store.subscribe(customer3);

store.createProduct("Новий ноутбук");

store.unsubscribe(customer1);

store.createProduct("Бездротові навушники");

// Декоратор (Decorator) — це патерн програмування, який додає нову функціональність до існуючих об'єктів, не змінюючи їхньої структури.
// Іншими словами, він дозволяє розширити функціональність об'єкта, не змінюючи сам об'єкт.

// Клас Drink представляє основний напій, який можна приготувати.
// Цей клас містить базову вартість напою (price=10) та його ім'я (name="Чай").
class Drink {
  name = "Чай";
  price = 10;
  prepare() {
    console.log(`Приготування ${this.name}`);
  }
  // Метод prepare() виводить в консоль рядок "Приготування {назва напою}"
}

// Клас HoneyDecorator є декоратором, який додає мед до напою.
class HoneyDecorator {
  constructor(drink, amount) {
    this.drink = drink;
    this.amount = amount;
  }
  get name() {
    return `${this.drink.name} з ${this.amount} г меду`;
  }
  get price() {
    const honeyPrice = 0.5;
    return this.drink.price + honeyPrice * this.amount;
  }
  prepare() {
    console.log(`Приготування ${this.name} з медом`);
  }
  // Конструктор приймає в якості параметрів базовий напій (drink) та кількість меду (amount), яку треба додати.
  // Getter для name повертає рядок `${this.drink.name} з ${this.amount} г меду`.
  // Getter для price розраховує загальну вартість напою, враховуючи базову вартість напою
  // і додаткову вартість меду, яку за замовчуванням встановлюємо на 0.5, і множимо на this.amount.
  // Метод prepare відповідає за приготування напою з медом.
  // Він виводить в консоль Приготування ${this.name} з медом
}
console.log("Завдання 4 ====================================");
// Після виконання розкоментуйте код нижче

// Створення об'єкту базового напою (чаю)
let tea = new Drink();
console.log(tea.name); // Виводить ім'я напою
console.log(tea.price); // Виводить вартість напою
tea.prepare(); // Готує напій

// Додавання декоратора меду до чаю
let honeyTea = new HoneyDecorator(tea, 2); // Додаємо 2 грами меду
console.log(honeyTea.name); // Виводить нову назву напою
console.log(honeyTea.price); // Виводить нову вартість напою
honeyTea.prepare(); // Готує напій з медом

// Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

// Клас Writer відповідає за роботу з текстом.
class Writer {
  #content = "";
  set content(content) {
    this.#content = content;
    this.#store();
  }
  get content() {
    return this.#content;
  }
  #store() {
    Version.create(this.content);
  }
  restore() {
    this.#content = Version.restore().content;
  }
  // Властивість #content представляє поточний текст. Вона ініціалізується порожнім рядком.
  // Сетер для властивості content. Він приймає значення newContent (новий текст),
  // який потрібно встановити як поточний текст. Кожен раз, коли присвоюється нове значення,
  // викликається метод #store(), який зберігає поточний стан тексту у версіях.
  // Метод гетер для властивості content, повертає this.#content.
  // Приватний метод #store використовується для зберігання поточного стану тексту.
  // Він викликає статичний метод класу Version, create, передаючи йому поточний текст як аргумент.
  // Метод restore відновлює попередній стан тексту, викликаючи статичний метод класу Version, restore.
  // Цей метод повертає останню збережену версію тексту, яку ми встановлюємо як поточний текст.
}

// Клас Version відповідає за створення та зберігання версій тексту.
class Version {
  constructor(content) {
    this.content = content;
  }
  static #versions = [];
  static create(content) {
    console.log(content);
    this.#versions.push(new Version(content));
  }
  static restore() {
    this.#versions.pop();
    return this.#versions[this.#versions.length - 1];
  }
  // В конструкторі класу Version приймається аргумент content та встановлює його.
  // Це вхідний аргумент, який представляє теку збережену версію тексту.
  // Властивість #versions це приватний статичний масив, пустий за замовчуванням, що зберігає всі створені версії.
  // Статичний метод create приймає аргумент content (текст версії) і створює новий екземпляр класу Version в який передає content .
  // Створений екземпляр додається до масиву версій versions.
  // Статичний метод restore видаляє останный элемент масиву,
  // та повертає останню збережену версію тексту з масиву версій this.#versions[this.#versions.length - 1] .
}
console.log("Завдання 5 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо новий екземпляр класу Writer
const writer = new Writer();

// Присвоюємо текст за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ланцюжок відповідальності (Chain of Responsibility) — це паттерн програмування, який дозволяє передавати запити послідовно через ланцюжок обробників, кожен з яких може обробити або передати запит далі.

//AuthProcessor клас для обробки аутентифікації.
class AuthProcessor {
  setNextProcessor(processor) {
    this.nextProcessor = processor;
    return processor;
  }
  validate(username, passkey) {
    if (this.nextProcessor) {
      return this.nextProcessor.validate(username, passkey);
    } else {
      return false;
    }
  }
  // setNextProcessor Метод, який приймає наступний обробник (processor) в ланцюгу.
  // Зберігає наступний обробник в поточному об'єкті.
  // Повертає переданий обробник, щоб дозволити подальше ланцюжкове викликання.
  //validate Метод для перевірки аутентифікації. Приймає ім'я користувача (username) і пароль (passkey).
  // Перевіряє, чи є наступний обробник в ланцюгу.
  // Якщо так, передає запит на перевірку аутентифікації наступному обробнику,this.nextProcessor.validate(username, passkey), та повертаємо результат.
  // Якщо наступного обробника немає, повертає false, сигналізуючи про невдалу аутентифікацію.
}

// TwoStepProcessor Клас обробника, який перевіряє двофакторний код. Наслідує базовий клас AuthProcessor.
class TwoStepProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (
      username === "john" &&
      passkey === "password" &&
      this.isValidTwoStepCode()
    ) {
      console.log("Вхід дозволено з двофакторною аутентифікацією");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
  isValidTwoStepCode() {
    return true;
  }
  // Метод для перевірки аутентифікації validate. Перевіряє ім'я користувача (username), пароль (passkey) і викликаємо метод isValidTwoStepCode().
  // Якщо username дорівнює "john", passkey дорівнює "password" та метод isValidTwoStepCode() повертає true, аутентифікація успішна.
  // Виводить повідомлення про успішну аутентифікацію: Вхід дозволено з двофакторною аутентифікацією, і повертає true.
  // Якщо дані не вірні, запит на аутентифікацію передається наступному обробнику в ланцюгу, super.validate(username, passkey).
  // isValidTwoStepCode Метод для перевірки двофакторного коду,який повертає true.
}

// RoleProcessor Клас обробника, який перевіряє ролі користувача. Наслідує базовий клас AuthProcessor.
class RoleProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (username === "guest") {
      console.log("Вхід дозволено з роллю гостя");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
  // validate Метод для перевірки аутентифікації. Перевіряє роль користувача.
  // Якщо роль користувача - гість (guest), аутентифікація успішна.
  // Виводить повідомлення про успішну аутентифікацію Вхід дозволено з роллю гостя, і повертає true.
  // Якщо роль не відповідає, запит на аутентифікацію передається наступному обробнику в ланцюгу.
}

// CredentialsProcessor Клас обробника, який перевіряє облікові дані користувача. Наслідує базовий клас AuthProcessor.
class CredentialsProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (username === "admin" && passkey === "admin123") {
      console.log("Вхід дозволено за обліковими даними");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
  //validate Метод для перевірки аутентифікації. Перевіряє облікові дані користувача.
  // Якщо облікові дані вірні, username=admin, та passkey=admin123, аутентифікація успішна.
  // Виводить повідомлення про успішну аутентифікацію Вхід дозволено за обліковими даними, і повертає true.
  // Якщо облікові дані не вірні, запит на аутентифікацію передається наступному обробнику в ланцюгу.
}

// Клас Builder для створення об'єкта ланцюга обробників.
class ProcessorBuilder {
  constructor() {
    this.firstProcessor = null;
    this.lastProcessor = null;
  }
  add(processor) {
    if (!this.firstProcessor) {
      this.firstProcessor = processor;
      this.lastProcessor = processor;
    } else {
      this.lastProcessor.setNextProcessor(processor);
      this.lastProcessor = processor;
    }
    return this;
  }

  create() {
    return this.firstProcessor;
  }
  // Конструктор який не приймає вхідні значення
  //Властивість firstProcessor, що зберігає перший обробник у ланцюгу, за замовчуванням дорівнює null.
  //Властивість lastProcessor, що зберігає останній обробник у ланцюгу, за замовчуванням дорівнює null.
  // Метод add для додавання нового обробника в ланцюг.
  // Якщо це перший обробник, він зберігається як перший і останній.
  // Якщо це не перший обробник, він додається в кінець ланцюга, і стає останнім.
  // Повертає this.
  // Метод create для створення ланцюга обробників.
  // Повертає перший обробник у ланцюгу.
}
console.log("Завдання 6 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо Builder для ланцюга обробників.
const processorBuilder = new ProcessorBuilder();

// Додаємо обробники в ланцюг за допомогою builder'а.
const processor = processorBuilder
  .add(new CredentialsProcessor())
  .add(new TwoStepProcessor())
  .add(new RoleProcessor())
  .create();

// Перевіряємо користувачів за допомогою нашого ланцюга обробників.
processor.validate("admin", "admin123"); // Вхід дозволено за обліковими даними
processor.validate("john", "password"); // Вхід дозволено з двоступінчастою аутентифікацією
processor.validate("guest", "guest123"); // Вхід дозволено з роллю гостя
processor.validate("user", "password"); // Вхід заборонено

// Міст (Bridge) — це паттерн програмування, який дозволяє розмістити абстракцію і реалізацію в окремі класи, дозволяючи їм мати незалежний функціонал

// Клас Participant представляє користувача, який може відправляти повідомлення.
class Participant {
  constructor(alias, communicator) {
    this.alias = alias;
    this.communicator = communicator;
  }
  dispatchMessage(text) {
    const preparedMessage = this.prepareMessage(text);
    this.communicator.dispatchMessage(preparedMessage);
  }
  prepareMessage(text) {
    return `[${this.alias}]: ${text}`;
  }
  // Конструктор приймає два параметри: alias, communicator
  // Метод dispatchMessage відправляє повідомлення за допомогою відповідного засобу комунікації.
  // Він приймає один параметр - text - текст повідомлення, яке потрібно відправити.
  // Метод prepareMessage приймає text та повертає  `[${this.alias}]: ${text}`
}

// Клас SMSCommunicator відповідає за відправку повідомлень через SMS.
class SMSCommunicator {
  static dispatchMessage(message) {
    console.log(`Відправлено SMS: ${message}`);
  }
  // Статичний метод transmit відправляє SMS.
  // Він приймає один параметр - message - текст повідомлення, яке потрібно відправити, та повертає `Відправлено SMS: ${message}`.
}

// Клас EmailCommunicator відповідає за відправку повідомлень через Email.
class EmailCommunicator {
  static dispatchMessage(message) {
    console.log(`Відправлено Email: ${message}`);
  }
  // Статичний метод transmit відправляє Email.
  // Він приймає один параметр - message - текст повідомлення, яке потрібно відправити та повертає `Відправлено Email: ${message}`.
}

console.log("Завдання 7 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо двох користувачів - Max та Linda - які відправляють повідомлення за допомогою різних засобів комунікації.
const max = new Participant("Max", SMSCommunicator);
const linda = new Participant("Linda", EmailCommunicator);

// Max відправляє повідомлення через SMS.
max.dispatchMessage("Hello!"); // Виведе: Відправлено SMS: [Max]: Hello!

// Linda відправляє повідомлення через Email.
linda.dispatchMessage("Hello!"); // Виведе: Відправлено Email: [Linda]: Hello!
