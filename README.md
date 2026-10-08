# DevVisual

Türkçe, dark mode, statik Git eğitim platformu. React + TypeScript + Vite + Tailwind CSS + Zustand + React Flow. Backend, hesap veya harici API yok.

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

## GitHub Pages

1. Bu klasörün içeriğini GitHub deposuna koyun ve `main` branch’ine gönderin.
2. Depoda **Settings → Pages → Source → GitHub Actions** seçin.
3. Dahil edilen `.github/workflows/deploy.yml` derler ve Pages’e yayınlar. Actions sekmesinden elle de başlatabilirsiniz.

Vite `base: './'` ve hash yönlendirmesi (`#/git`, `#/courses`) sayesinde proje ve kullanıcı Pages adreslerinde dosyalar ve sayfa yenileme çalışır. `dist/` bağımsız statik yayın çıktısıdır; dosyaları HTTP üzerinden servis edin. Canlı yayın için bir GitHub deposu ve Pages etkinleştirmesi gerekir.

## Yapı ve kapsam

- `src/modules/git/engine`: React’ten bağımsız, immutable Git motoru; working tree, index, commit snapshots, branch/HEAD, merge.
- `src/modules/git/lessons`: 60 dersin içerikleri, başlangıç durumları ve adımları. `curriculum.json` 55 yeni dersin açıklamalarını, işlemlerini, şema kartlarını, ipuçlarını ve kaynaklarını taşır; `lessons.ts` özgün beş grafik dersini bu içerikle birleştirir.
- `src/core/lesson-engine`: yeni modüllerde de kullanılabilecek sade ders tanımları.
- `src/stores`: ders akışı ve Zustand persistence.
- `src/modules/git/visualizations`: dahili durumdan üretilen commit grafiği ve adımlara ait açıklamalı kavram şemaları.
- `src/app/tr.ts`: ortak Türkçe arayüz metinleri; ders metinleri içerik katmanındadır.

Kapsam: kurulum, çalışma alanı/index/commit, branch/HEAD, stash, restore/reset/revert, reflog, detached HEAD, merge ve çakışma çözümü, remote/fetch/pull/push, kimlik doğrulama, ekip akışı, tag, rebase, interactive rebase, cherry-pick, force-with-lease, partial staging, arama/bisect/blame, revision ifadeleri, worktree, submodule/subtree, büyük depolar ve LFS, attributes, hooks/otomasyon, imzalar, geçmiş temizliği, depo aktarımı, Git nesneleri ve bakım/kurtarma. GitHub, CI, LFS ve filter-repo gibi ekosistem konuları ayrıca etiketlenir.

Gerçek Git/shell çalıştırılmaz. Dahili Git motoru özgün beş dersin commit ve dosya görsellerini üretir; diğer 55 ders önceden yazılmış örnek senaryolar ve kavram şemaları kullanır. Bunlar tam Git emülasyonu değildir. Terminal, hesap, SSH anahtarı veya uzak depo bağlantısı gerekmez. Kaydırmadan ders yönetimi masaüstü düzeninde sağlanır; dar mobil ekranda alanlar alt alta yerleşir. Gelecek modüller yalnızca katalogda “Yakında” bilgisi taşır.

Bağımlılıklar kurulum anındaki npm stable sürümlerine çözülmüş ve `package-lock.json` ile sabitlenmiştir. Doğrulama: TypeScript/üretim derlemesi; 60 dersin içerik bütünlüğü, durumların ileri/geri oluşturulması, tamamlama ve eski ilerleme geçişi ayrıca kontrol edildi. Kalıcı bir test çalıştırıcısı eklenmedi.

Kurulum kaynakları: [Vite Pages dağıtımı](https://vite.dev/guide/static-deploy.html), [React Flow](https://reactflow.dev/learn).
