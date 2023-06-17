# Новостная лента Reddit

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width='30'/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width='30'/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"  width='30'/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" width='30'/>
          
          
Приложение, представляет собой аналог ранее написанного приложения [Зеркало Reddit c новостной лентой из 25 лучших постов](https://github.com/stepan10andreev/reddit-mirror).

Приложение также написано на [Next.js](https://nextjs.org/) с использованием [API Reddit](https://www.reddit.com/dev/api/) и протокола авторизации [OAuth2](https://github.com/reddit-archive/reddit/wiki/OAuth2).

Но в данном случае реализовано получение данных (Data Fetching) на стороне клиента (Client-side Fetching) с использованием [SWR](https://swr.vercel.app/ru) и соотвественно реализован :memo:`Бесконечный список` постов с кнопкой `Загрузить еще`.

Также реализовано открытие модального окна по клику на карточку поста. При перезагрузки/обновлении страницы с открытым модальным окном или при переходе сразу по ссылке с URL-адресом конкретного поста открывается страница с `карточкой поста с описанием` без модального окна и кнопкой `Go Home` c переходом на главную страницу с новостной лентой

[Описание приложения](https://github.com/stepan10andreev/reddit-mirror/blob/main/README.md)
