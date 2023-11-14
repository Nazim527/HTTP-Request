# Http-request 🌎🛜

Json server vasitəsi ilə posts adlı resurs yaradın. Daxili aşağıdakı struktur kimi olmalıdır:

```
{
  "posts": [
       { 
	      id: "1"
        title: "Today’s Weather",
        message: "Hello, I am looking for a new career opportunity and would appreciate your support.",
        isLiked: true,
	      date: 12/04/23
       },
       { 
	     id: "2"
        title: "My Health Condition",
        message: "Hello, I am looking for a new career opportunity and would appreciate your support.",
        isLiked: false,
	      date: 12/04/23
       },
     ]
}
```

## Tasks
1. Bütün postları ekranda figmadakı şəkildə göstərin. Bunun üçün `get` request etmək lazımdır
2. Daxilində Title, Message inputları olan modal yaradın və ekranda create post buttonuna klik etdikdə, həmin modal istifadəçiyə görsənsin.
3. İnputlar doldurulduqdan sonra, `post request` göndərilsin və yeni məhsul fake databasaya əlavə olunsun
4. Post cartının daxilində Edit və Delete və Like buttonları yaradın.
5. Edit buttonuna klik etdikdə, həmin postun bütün datalarının qeyd olunduğu modal ekrana gəlməlidir. Və həmin inputlarda hansısa hissəni dəyişdikdə, `patch request` göndərilməli, və məhsul update olunmaldır.
6. Delete buttonuna klik etdikdə, klik olunan məhsul silinsin.
7. Like butonuna basdıqda like butonu və like yazısı qırmızı rəng olmalıdır və 2ci dəfə basdıqda yenidən əvvəlki hala qayıtmalıdır.
8. Postu create etdikdə postun yaradıldığı vaxt cart da qeyd olunmalıdır.

Figma: <a href="https://www.figma.com/file/W4Vm3cRd2ayWuSIYpCh9wm/Untitled?type=design&node-id=0%3A1&t=w3BCICoLbNPnILc8-1">link</a>
