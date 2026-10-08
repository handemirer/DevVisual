# DevVisual

Türkçe, dark mode, statik Git ve C# eğitim platformu. React + TypeScript + Vite + Tailwind CSS + Zustand + React Flow. Backend, hesap veya harici API yok.

## Çalıştırma

Node.js 22.12+ (veya Node.js 24 LTS) kullanın.

```sh
npm ci
npm run dev
```

Üretim derlemesi ve yerel önizleme:

```sh
npm run build
npm run preview
```

## Kullanım

Ana sayfadan Git öğrenme yoluna girin. Öğrenme yolu 5 seviyede 60 ders, 184 görsel adım ve 295 örnek işlem içerir. Her seviyede 12 ders bulunur: Başlangıç, Temel kullanım, Orta, İleri ve Uzmanlık. Yan menüden seviye seçebilir veya tüm seviyelerde ders adı ve komutla arama yapabilirsiniz. Dersler, açıklamalar okunarak ve görseller incelenerek takip edilir. Temel örneklerde commit grafiği, branch/HEAD etiketleri ve dosya alanları o ana ait görünümü otomatik gösterir. Diğer derslerde kavram şemaları, adımın nesnelerini ve sonucunu özetler; şemanın üzerindeki işlem çubuğunda komutlar sırayla incelenebilir. “Bu adımda ne oldu?” bölümü değişimi açıklar. Terminal veya görev tamamlama gerektirmez.

Önceki/Sonraki düğmeleriyle ilerleyin; geri döndüğünüzde önceki adıma ait görünüm geri gelir. Oynat/duraklat düğmesi adımları 7 saniyede bir ilerletir. Dosyalar görünümü salt okunurdur. Sağdaki Anlatım / Komutlar / İpuçları sekmeleri ekran içinde yönetilir. Komutlar sekmesi, dersin hazırlığı ve o ana kadarki adımların işlemlerini sırasıyla gösterir; dosya düzenlemeleri Git komutlarından ayrı açıklanır. Her dersteki ipuçları ilgili işlemin sınırlarını, dosyaları korumayı ve olası hatalardan kurtulmayı açıklar; ilgili kaynak belgelere bağlanır. Grafikte güncel adımın komutları, commit noktalarında ve bağlantılarda kayıtları oluşturan komutlar görünür. Commit noktalarına tıklayarak mesajları ve parent bağlantılarını inceleyebilirsiniz. “Dersi baştan oku” mevcut dersi ilk adıma döndürür ve tamamlandı işaretini korur. Üst çubuktaki “İlerlemeyi sıfırla” düğmesi veya yardım menüsü, mevcut dersin, seçilen seviyenin ya da tüm Git derslerinin ilerlemesini sıfırlayabilir. Pencere etkilenecek ders ve tamamlandı işareti sayısını gösterir; Vazgeç seçeneği hiçbir ilerlemeyi değiştirmez. Seçili kapsam sıfırlanınca ilk dersinin ilk adımına dönülür; diğer kapsamlardaki ilerleme korunur.

Son adıma ulaşılan ders tamamlandı olarak işaretlenir. Son adımdaki “Dersi tamamla” düğmesi dersin kazanımlarını ve toplam ilerlemeyi gösteren bitirme ekranını açar; devam düğmesi sıradaki tamamlanmamış derse gider. 60 dersin tümü tamamlandığında “Bu konudaki tüm dersleri tamamladınız!” ekranı ve beş seviyenin özeti görünür. Son derse atlamak tek başına tüm yolu tamamlamaz. Tamamlanan yolun bitirme ekranı yan menüden yeniden açılabilir. Ders/adım ve tamamlanan dersler localStorage içinde tutulur; görseller bu bilgilerden yeniden oluşturulur. Önceki sürümün öğrenme ilerlemesi korunur. Sunucuya veri gönderilmez. Tarayıcı verilerini silmek ilerlemeyi de siler.

## C# öğrenme yolu

Katalogdaki **C# · Derinlemesine uzmanlık** kartı veya üst menüden `#/csharp` yoluna girin. Genişletilen müfredat **15 seviye, 57 ders grubu ve 556 konu** içerir. İlk 10 seviye ve 466 konu korunmuştur. Yeni seviyeler: tasarım kalıpları ve uygulama mimarisi; ASP.NET Core ve güvenli API; EF Core ve veri mühendisliği; güvenilir servisler ve dağıtık sistemler; test, gözlemlenebilirlik ve üretim mühendisliği. Seviye başına konu sayıları: 54, 50, 57, 34, 41, 41, 53, 54, 45, 37, 18, 18, 18, 18 ve 18. Kapsamın okunabilir kaydı [docs/csharp-mufredat.md](docs/csharp-mufredat.md) içindedir.

Her konu ayrı açıklanır. Her ders grubunda **gerçek hayat senaryosu, açıklamalı kod örneği, üç önemli ipucu, alıştırma, kontrol ölçütleri ve kaynak bağlantıları** bulunur. Toplam 171 ipucu ve 15 seviye projesi vardır. Yeni 15 derste hata üretme ve düzeltme alıştırmaları, kontrol ölçütleri, açıklamalı kod ve resmî kaynaklar bulunur. Önkoşul sırası kapsam kaydında belirtilmiştir. Konu menüsü, seviye filtresi ve tüm seviyelerde başlık/açıklama/kod/ipucu/senaryo araması kullanılabilir. Anlatım, Kod örneği, Önemli ipuçları ve Uygulama görünümleri ders içeriğini ayırır. Seviye özeti bütün projeleri ve kontrol ölçütlerini gösterir.

“Okundu işaretle” veya “Oku ve ilerle” mevcut konuyu kaydeder. Ders ancak bütün konuları okundu işaretlendiğinde tamamlanır; son konuya atlamak yeterli değildir. Önceki düğmesi kayıtları değiştirmez. Ders/konu ve okuma işaretleri `devvisual-csharp-v1` localStorage kaydında, Git’ten ayrı saklanır. Yenilemede kaldığınız konu açılır; mevcut ders, seviye veya tüm C# kapsamını sıfırlamak için etkilenecek kayıt sayısını gösteren pencere kullanılabilir. Okuma tamamlanması uygulamalı yeterlilik belgesi değildir; projeler ayrıca yapılmalıdır.

Kod örnekleri tarayıcıda çalıştırılmaz. Yerel denemeler için uygun .NET SDK gerekir; Roslyn, BenchmarkDotNet, EF Core, hosting, resilience ve xUnit örnekleri ek paket, unsafe örneği proje ayarı ister. Web örnekleri ASP.NET Core projesi gerektirir; kısmi bileşenler ve demo sınırları kod yorumlarında açıklanır. Yeni backend konuları eğitim içeriğidir; platform statik çalışmaya devam eder. Bazı örnekler tam program yerine bir tip/metot veya teşhis komutu gösterir. Ortama bağlı byte ve süre sonuçlarına sabit değer atanmamıştır. Bu çalışma ortamında .NET SDK bulunmadığından C# örnekleri yerel derleyiciyle çalıştırılmadı; web uygulamasının TypeScript/üretim derlemesi, içerik kapsamı ve ilerleme davranışı doğrulandı.

```sh
npm run check:csharp
npm run build
```

Kapsam kontrolü 15 seviye ve 556 konu başlığını bağımsız kapsam kaydıyla karşılaştırır; açıklama, senaryo, ipucu, kod, uygulama ve kaynak alanlarının varlığını kontrol eder. İlerleme kontrolü gerçek tarayıcı verisine dokunmadan seçim sınırlarını, yinelenen kayıtları, kapsamlı sıfırlamayı, kayıt normalizasyonunu, eski ilerlemenin yeni seviyelerle birlikte korunmasını ve Git izolasyonunu doğrular.

## GitHub Pages

1. Bu klasörün içeriğini GitHub deposuna koyun ve `main` branch’ine gönderin.
2. Depoda **Settings → Pages → Source → GitHub Actions** seçin.
3. Dahil edilen `.github/workflows/deploy.yml` derler ve Pages’e yayınlar. Actions sekmesinden elle de başlatabilirsiniz.

Vite `base: './'` ve hash yönlendirmesi (`#/git`, `#/csharp`, `#/courses`) sayesinde proje ve kullanıcı Pages adreslerinde dosyalar ve sayfa yenileme çalışır. `dist/` bağımsız statik yayın çıktısıdır; dosyaları HTTP üzerinden servis edin. Canlı yayın için bir GitHub deposu ve Pages etkinleştirmesi gerekir.

## Yapı ve kapsam

- `src/modules/git/engine`: React’ten bağımsız, immutable Git motoru; working tree, index, commit snapshots, branch/HEAD, merge.
- `src/modules/git/lessons`: 60 dersin içerikleri, başlangıç durumları ve adımları. `curriculum.json` 55 yeni dersin açıklamalarını, işlemlerini, şema kartlarını, ipuçlarını ve kaynaklarını taşır; `lessons.ts` özgün beş grafik dersini bu içerikle birleştirir.
- `src/modules/csharp`: 15 seviyenin içerik verisi, ders/katalog arayüzü ve responsive düzen.
- `src/stores/useCSharp.ts`: Git’ten bağımsız konu bazlı okuma ilerlemesi.
- `docs/csharp-mufredat.md`: ilk 466 konuyu ve yeni 90 konuyu içeren kapsam kaydı.
- `scripts/check-csharp*.mjs`: içerik bütünlüğü ve ilerleme doğrulaması.
- `src/core/lesson-engine`: yeni modüllerde de kullanılabilecek sade ders tanımları.
- `src/stores`: ders akışı ve Zustand persistence.
- `src/modules/git/visualizations`: dahili durumdan üretilen commit grafiği ve adımlara ait açıklamalı kavram şemaları.
- `src/app/tr.ts`: ortak Türkçe arayüz metinleri; ders metinleri içerik katmanındadır.

Kapsam: kurulum, çalışma alanı/index/commit, branch/HEAD, stash, restore/reset/revert, reflog, detached HEAD, merge ve çakışma çözümü, remote/fetch/pull/push, kimlik doğrulama, ekip akışı, tag, rebase, interactive rebase, cherry-pick, force-with-lease, partial staging, arama/bisect/blame, revision ifadeleri, worktree, submodule/subtree, büyük depolar ve LFS, attributes, hooks/otomasyon, imzalar, geçmiş temizliği, depo aktarımı, Git nesneleri ve bakım/kurtarma. GitHub, CI, LFS ve filter-repo gibi ekosistem konuları ayrıca etiketlenir.

Gerçek Git/shell çalıştırılmaz. Dahili Git motoru özgün beş dersin commit ve dosya görsellerini üretir; diğer 55 ders önceden yazılmış örnek senaryolar ve kavram şemaları kullanır. Bunlar tam Git emülasyonu değildir. Terminal, hesap, SSH anahtarı veya uzak depo bağlantısı gerekmez. Kaydırmadan ders yönetimi masaüstü düzeninde sağlanır; dar mobil ekranda alanlar alt alta yerleşir. Gelecek modüller yalnızca katalogda “Yakında” bilgisi taşır.

Bağımlılıklar kurulum anındaki npm stable sürümlerine çözülmüş ve `package-lock.json` ile sabitlenmiştir. Doğrulama: TypeScript/üretim derlemesi; 60 dersin içerik bütünlüğü, durumların ileri/geri oluşturulması, tamamlama ve eski ilerleme geçişi ayrıca kontrol edildi. Kalıcı bir test çalıştırıcısı eklenmedi.

Kurulum kaynakları: [Vite Pages dağıtımı](https://vite.dev/guide/static-deploy.html), [React Flow](https://reactflow.dev/learn).
