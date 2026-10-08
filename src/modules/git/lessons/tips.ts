export interface LessonTip { title: string; text: string; code?: string; source: string; }
const tip = (title: string, text: string, page: string, code?: string): LessonTip => ({ title, text, code, source: `https://git-scm.com/docs/${page}` });
const staging = tip('Add sonrasındaki değişiklikler', 'git add dosyanın o anki halini hazırlar. Sonra dosyayı tekrar düzenlersen yeni hali için yeniden add gerekir. Commit’e girecek içeriği git diff --staged ile kontrol et.', 'git-add', 'git diff --staged');
const stash = tip('Yarım kalan işi stash ile sakla', 'Branch değiştirmeden önce commit yapabilir veya işi geçici saklayabilirsin. -u yeni, takip edilmeyen dosyaları da saklar. Doğru branch’e döndüğünde git stash apply ile geri al; çakışma çıkabilir. Apply stash kaydını silmez.', 'git-stash', 'git stash push -u -m "Yarım kalan iş"');
export const lessonTips: Record<string, LessonTip[][]> = {
  'git-nedir': [
    [tip('Git ile GitHub farklıdır', 'Git bilgisayarında çalışan sürüm kontrol sistemidir. GitHub Git depolarını barındıran, PR ve inceleme gibi ekip araçları sağlayan bir hizmettir. Yerel commit için GitHub hesabı gerekmez.', 'git'), tip('Depo başlatmak kayıt almak değildir', 'git init mevcut dosyaları commit’e almaz. Dosyanın geçmişte saklanması için önce add, sonra commit gerekir.', 'git-init')],
    [tip('Durumu okumak dosyaları değiştirmez', 'git status yalnızca bilgi verir. “Untracked” dosya henüz takip edilmiyor; “modified” dosya değişmiş demektir. Hangi içeriğin değiştiğini git diff ile inceleyebilirsin.', 'git-status', 'git status\ngit diff')],
    [staging, tip('Hazırlanan dosyayı geri çıkar', 'Yanlış dosyayı hazırladıysan onu staging’den çıkarabilirsin; çalışma dosyasındaki düzenleme korunur. İlk commit henüz yoksa aşağıdaki komut yalnızca hazırlık kaydını kaldırır.', 'git-rm', 'git rm --cached README.md')],
    [tip('Commit yalnızca hazırlanan hali saklar', 'Staging dışında kalan değişiklikler bu commit’e dahil olmaz. Yeni commit eski kaydı ezmez; geçmişe yeni bir anlık görüntü ekler.', 'git-commit')],
  ],
  'ilk-commit': [
    [tip('İlk kurulumda kimlik gerekebilir', 'Gerçek Git commit için ad ve e-posta ister. Bu dersin örnek deposunda bunlar hazır kabul edilir. Aşağıdaki ayarlar yalnızca bulunduğun depoya uygulanır.', 'git-config', 'git config user.name "Adın"\ngit config user.email "sen@example.com"')],
    [staging],
    [tip('Her şeyi istemeden kaydetme', 'git add . bulunduğun dizin ve altındaki değişiklikleri hazırlar. Önce git status, ardından git diff --staged ile seçimi incele. Parola ve .env dosyalarını geçmişe ekleme.', 'git-add', 'git status\ngit diff --staged')],
    [tip('Temiz çalışma ağacı ne demek?', 'Takip edilen dosyalarda bekleyen değişiklik olmaması demektir. Dosyalar silinmez; içerikleri son commit ile aynıdır. Bu durum ayrıca uzak depoya gönderildiği anlamına gelmez.', 'git-status')],
  ],
  'branchler': [
    [tip('Branch açmak branch değiştirmez', 'git branch feature yalnızca yeni işaretçiyi oluşturur. Oluşturup hemen geçmek için git switch -c feature kullanılabilir; branch zaten varsa git switch feature gerekir.', 'git-switch', 'git switch -c feature')],
    [stash, tip('Dosyanın üzerine yazılmasını önle', 'Normal git switch, kaydedilmemiş değişikliklerin üzerine yazacaksa işlemi durdurur. Zorlamak yerine önce commit veya stash yap. Bu görsel örnekte branch değişimleri temiz çalışma ağacıyla yapılır.', 'git-switch')],
    [tip('Yeni dosya henüz geçmişte değil', 'Editörde dosya oluşturmak Git işlemi değildir. Takip edilmeyen dosyaları git diff göstermez; git status ile görürsün. Stash’e yeni dosyaları da katmak için -u gerekir.', 'git-stash')],
    [staging, tip('Main neden yerinde kaldı?', 'Commit yalnızca bulunduğun branch’i ilerletir. main bu kaydı otomatik almaz; değişiklikleri daha sonra merge ile birleştirebilirsin.', 'git-merge')],
  ],
  'commitler': [
    [tip('Commit kimliği içeriği tanımlar', 'Grafikte ID’ler okunabilirlik için kısaltılır. Bu eğitim örnek kimlikler üretir; gerçek Git kimliği commit verisinden hesaplar. git log geçmişi yalnızca okur.', 'git-log')],
    [tip('Eski içerik kaybolmaz', 'Düzenleme çalışma dosyasını değiştirir. Önceden commit alınmış hali geçmişte kalır. Henüz commit veya stash yapılmamış yeni düzenlemeler ise geçmişte saklanmaz.', 'git-diff', 'git diff notlar.md')],
    [staging],
  ],
  'merge': [
    [tip('Hangi branch’e birleşiyor?', 'git merge feature, feature’ı bulunduğun branch’e birleştirir. Önce git status ile main üzerinde olduğunu doğrula. Fast-forward yalnızca işaretçiyi ilerletir.', 'git-merge', 'git status\ngit merge feature')],
    [stash],
    [tip('Farklı dosyalar, bağımsız değişiklikler', 'Bu örnekte ui.md ve api.md farklı dosyalar; iki değişiklik birlikte korunur. Gerçek Git aynı dosyanın farklı bölümlerini de çoğunlukla birleştirebilir. Aynı bölüme uyumsuz düzenlemeler çakışabilir.', 'git-merge')],
    [tip('Çakışmada bir tarafı körlemesine ezme', 'Gerçek Git çakışırsa dosyadaki işaretleri incele, iki taraftan gereken içeriği koruyup işaretleri kaldır. Ardından dosyayı hazırla ve commit yap. Bu örnekte farklı dosyalar birleştiği için çakışma yok.', 'git-merge', 'git add <çözülen-dosya>\ngit commit -m "Çakışma çözüldü"'),
     tip('Birleşimden vazgeçmek', 'Devam eden, henüz commit alınmamış bir merge’i git merge --abort ile iptal edebilirsin. Merge öncesinde temiz çalışma ağacı kullan; önceden kaydedilmemiş değişikliklerin geri yüklenmesi her durumda garanti değildir.', 'git-merge', 'git merge --abort')],
  ],
};
