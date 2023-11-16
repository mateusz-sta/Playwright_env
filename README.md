## Instalacja danego etapu

1. Pobierz całe repozytorium
2. Rozpakuj je i przenieś do folderu z projektami (np. `Projects`)
3. Przejdź do katalogu danego etapu (możesz go otworzyć w Visual Studio Code) np. `/S01_wprowadzenie/L01_pierwszy_test/`
4. Jeśli znajduje się w nim plik `package.json` możesz odtworzyć dany etap

- uruchom w katalogu etapu konsolę
- wykonaj polecenie `npm install` aby zainstalować zależności
- wykonaj polecenie `npx playwright install` aby pobrać aktualne przeglądarki
- uruchom testy `npx playwright test`

## Komendy

- `npm init playwright@latest` - instalowanie pakietu playwright (należy wybrać TypeScript)
- `npx playwright codegen https://demo-bank.vercel.app/` - automatycznie generowanie testu (strona przykładowa)
- `npx playwright test` - uruchomienie testu w terminalu (test to folder w którym znajdują siętesty do uruchomienia)
- `npx playwright show-report` - raport z wykonanych testów
- `npx playwright test --headed` - uruchomienie testu + wyświetlanie go w GUI
- `npx playwright test --ui` - uruchamianie konsoli testów GUI
- `npx playwright --version` - sprawdzenie wersji Playwright
- `npm install -D @playwright/test@latest` - aktualizacja do najnowszej wersji

## Playwright snippets

- Import testów i asercji

```javascript
import { test, expect } from '@playwright/test';
```

- Nazwa zbioru testów

```javascript
test.describe('Test collection', () => {});
```

- Nazwa testu:

```javascript
test('Test name', async ({ page }) => {});
```

- Przejście na daną stronę wykonywania testu

```javascript
await page.goto('https://www.example.com/');
```

- Lokalizowanie/odwołanie się do atrybutu ID

```javascript
await page.getByTestId('login-input');
```

- Lokalizowanie/odwołanie się do lokatora CSS (id, klasa itd.)

```javascript
await page.locator('login-input');
```

- Uzupełnianie pola tekstem

```javascript
 .fill('')
```

- Odklikanie/oddalenie od danego elementu

```javascript
 .blur('')
```

## Aninimizacja danych

- Utwórz folder `/test-data z plikiem` `login.data.ts`
- Utwórz poniżej obiekt `const` przetrzymujący wartości zmiennej

```javascript
export const loginData = {
  login: 'login123',
  password: 'password123',
};
```

- Do pliku z testem dodaj plik umożliwiający export wartości zmiennych do testu. Wartość w nawiasach zawierać ma tylko nazwę zmiennej to eksportu, pojedyńcze wartości należy usunąć z nawiasów

```javascript
import { loginData } from '../test-data/login.data';
```

- W teście w którym dodajesz zmienne musisz sprecyzować skąd mają być one zaciągane. Zmienna const o nazwie login -> zaciągana ze zmiennej LoginData -> o wartości login

```javascript
const login = loginData.login;
const password = loginData.password;
```

## Wykonywanie testów

- Przejdź do pliku `/playwright.config.ts` odszukaj `workers: process.env.CI ? 1 : undefined,` Wartość `undefined` oznacza, że testy wykonywane są przez jeden rdzeń procesora. Zmieniając wartość należy uwzględnić spowolnienie pracy komputera

## Page Object Model

- Utwórz folder `/test-data` dodaj nowy plik `login.page.ts`
- W pliku dodaj klasy np. logowanie
- Do pliku wklej poniższy kod - nawigacja folderu z testami

```javascript
import { Page } from '@playwright/test';
```

- Jako body wklej klasę, można to zrobić wpisując `class` i wybierając drugą wartość z podpowiedzi

```javascript
class name {
  constructor(parameters) {}
}
```

- Poniżej znajduje się przykładowa klasa, która przechowuje wartości niezbędne do zalogowania się

```javascript
export class LoginPage {
constructor(private page: Page) {}
loginInput = this.page.getByTestId('login-input');
passwordInput = this.page.getByTestId('password-input');
loginButton = this.page.getByTestId('login-button');
}
```

- `LoginPage` - nazwa klasy
- `loginInput` - nazwa wartości, która odnośi się do selektora (login)
- `passwordInput` - nazwa wartości, która odnosi się do selektora (password)
- `loginButton` - nazwa wartości, która odnosi się do selektora (button)
- Jeśli klasa jest już kompletna w naszym teście musimy wkleić na samą górę kod, który pozwoli na zaciąganie danych z klasy

```javascript
import { LoginPage } from '../pages/login.page';
```

- Odwołanie się do klasy i jej wartości w teście, wartości te wklejamy w sekcję `beforeeach` zaraz po odwołaniu się do adresu `url`

```javascript
const loginPage = new LoginPage(page);
await loginPage.loginInput.fill(login);
await loginPage.passwordInput.fill(password);
await loginPage.loginButton.click();
```
