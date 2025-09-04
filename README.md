# 📧 EmailJS Kurulum Rehberi

Bu portföy sitesinde gerçek email gönderme özelliği için EmailJS kullanılmıştır.

## 🚀 EmailJS Kurulumu

### 1. EmailJS Hesabı Oluşturun
- [EmailJS.com](https://www.emailjs.com/) adresine gidin
- Ücretsiz hesap oluşturun

### 2. Email Servisi Ekleyin
- Dashboard'da "Email Services" bölümüne gidin
- Gmail, Outlook, Yahoo vb. email servisinizi ekleyin
- Service ID'yi kopyalayın

### 3. Email Template Oluşturun
- "Email Templates" bölümüne gidin
- Yeni template oluşturun
- Şu değişkenleri kullanın:
  ```
  {{from_name}} - Gönderen ismi
  {{from_email}} - Gönderen email
  {{subject}} - Konu
  {{message}} - Mesaj içeriği
  ```
- Template ID'yi kopyalayın

### 4. Script.js Dosyasını Güncelleyin
`script.js` dosyasında şu değerleri güncelleyin:

```javascript
const EMAIL_CONFIG = {
    serviceID: 'your_service_id', // EmailJS Service ID'nizi buraya yazın
    templateID: 'your_template_id', // EmailJS Template ID'nizi buraya yazın
    userID: 'your_user_id' // EmailJS User ID'nizi buraya yazın (Public Key)
};
```

Ve email adresinizi güncelleyin:
```javascript
to_email: 'your_email@example.com' // Kendi email adresinizi buraya yazın
```

### 5. Test Edin
- Sitenizde contact formunu doldurun
- Email gelip gelmediğini kontrol edin

## 📱 WhatsApp Kurulumu

Script.js dosyasında telefon numaranızı güncelleyin:
```javascript
const whatsappNumber = '905555555555'; // Kendi numaranızı yazın (ülke kodu + numara)
```

## 🎨 Dark Mode
Siteniz otomatik olarak dark/light mode destekliyor. Kullanıcılar sağ üstteki butona tıklayarak tema değiştirebilir.

## 📱 Responsive Tasarım
Site mobil, tablet ve desktop cihazlarda mükemmel çalışır.

## 🚀 Canlı Yayına Alma

### GitHub Pages
1. GitHub'da yeni repository oluşturun
2. Dosyalarınızı upload edin
3. Settings > Pages bölümünden GitHub Pages'i aktifleştirin

### Netlify
1. [Netlify.com](https://netlify.com) hesabı oluşturun
2. Dosyalarınızı drag & drop ile yükleyin
3. Otomatik deploy olacak

### Vercel
1. [Vercel.com](https://vercel.com) hesabı oluşturun
2. GitHub repo'nuzu bağlayın
3. Otomatik deploy olacak

## 🔧 Özelleştirme

### Renkler
`style.css` dosyasında CSS variables kullanılmıştır:
```css
:root {
    --primary-color: #3498db; /* Ana renk */
    --secondary-color: #2c3e50; /* İkincil renk */
    /* ... diğer renkler */
}
```

### İçerik
- `index.html` dosyasında kişisel bilgilerinizi güncelleyin
- Projelerinizi portfolio bölümünde düzenleyin
- Modal'lardaki proje detaylarını güncelleyin

## 📞 Destek
Herhangi bir sorunuz olursa WhatsApp butonuna tıklayarak iletişime geçebilirsiniz!

---
*Bu portföy sitesi modern web teknolojileri ile geliştirilmiştir.*
