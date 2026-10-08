# C# eğitim kapsamı

Bu kapsam ilk 10 seviyeyi ve derin uzmanlık için eklenen 5 uygulama mühendisliği seviyesini içerir. Toplam 15 seviye, 57 ders ve 556 konu vardır. İlk 466 konunun kimlikleri ve içerikleri korunmuştur. Başlıklar uygulamadaki kalıcı konu kimlikleriyle eşlenmiştir.

## Seviye 1 — Programlama ve C# temelleri

### Programın yapısı ve çalıştırılması

- `calistirma-01` — C# ile .NET arasındaki ilişki
- `calistirma-02` — SDK ve geliştirme ortamı kurulumu
- `calistirma-03` — İlk konsol uygulaması
- `calistirma-04` — Proje, kaynak dosya ve giriş noktası
- `calistirma-05` — Top-level statements ve klasik Main metodu
- `calistirma-06` — Programın derlenmesi ve çalıştırılması
- `calistirma-07` — Debug ve Release yapılandırmaları
- `calistirma-08` — Derleyici hataları ve warning mesajlarını okuma
- `calistirma-09` — Debugger, breakpoint, adım adım çalıştırma ve değişken inceleme

### Değişkenler ve temel tipler

- `temel-tipler-01` — Değişken tanımlama, başlatma ve atama
- `temel-tipler-02` — Sabitler ve const
- `temel-tipler-03` — Sayısal tipler, bool, char ve string
- `temel-tipler-04` — Açık tip bildirimi ve var
- `temel-tipler-05` — Tiplerin değer aralıkları
- `temel-tipler-06` — İkili sayı sistemi
- `temel-tipler-07` — Signed ve unsigned gösterim
- `temel-tipler-08` — Two’s complement
- `temel-tipler-09` — Floating-point hassasiyeti ve yuvarlama
- `temel-tipler-10` — NaN, pozitif ve negatif infinity
- `temel-tipler-11` — float, double ve decimal seçimi

### Operatörler ve dönüşümler

- `operator-donusum-01` — Aritmetik, karşılaştırma ve mantıksal operatörler
- `operator-donusum-02` — Atama, artırma ve azaltma operatörleri
- `operator-donusum-03` — Bit operatörleri ve bit kaydırma
- `operator-donusum-04` — İşlem öncelikleri ve ilişkilendirme
- `operator-donusum-05` — Kısa devre değerlendirme
- `operator-donusum-06` — Örtük ve açık tip dönüşümleri
- `operator-donusum-07` — Casting, parsing ve TryParse
- `operator-donusum-08` — Sayısal taşmalar
- `operator-donusum-09` — checked ve unchecked

### Kontrol akışı ve metotlar

- `akis-metotlar-01` — if, else ve switch
- `akis-metotlar-02` — for, while, do-while ve foreach
- `akis-metotlar-03` — İç içe koşullar ve döngüler
- `akis-metotlar-04` — break, continue ve return
- `akis-metotlar-05` — Metot tanımlama ve çağırma
- `akis-metotlar-06` — Parametreler ve dönüş değerleri
- `akis-metotlar-07` — Metot aşırı yükleme
- `akis-metotlar-08` — İsimlendirilmiş ve isteğe bağlı parametreler
- `akis-metotlar-09` — params temelleri
- `akis-metotlar-10` — Yerel fonksiyonlar
- `akis-metotlar-11` — Özyineleme
- `akis-metotlar-12` — Kapsam ve değişkenlerin yaşam süresine giriş

### Temel veri işlemleri

- `temel-veri-01` — Konsoldan veri alma ve çıktı üretme
- `temel-veri-02` — String işlemleri ve biçimlendirme
- `temel-veri-03` — Escape karakterleri
- `temel-veri-04` — Interpolated, verbatim ve raw string ifadeleri
- `temel-veri-05` — Tek boyutlu, çok boyutlu ve jagged diziler
- `temel-veri-06` — İndeksler ve aralıklar
- `temel-veri-07` — Enum temelleri ve flags
- `temel-veri-08` — Tarih, saat ve süre işlemleri
- `temel-veri-09` — Unicode, UTF-16, Unicode scalar value ve Rune
- `temel-veri-10` — Kültüre bağlı parsing ve biçimlendirme
- `temel-veri-11` — Kültüre bağlı ve ordinal string karşılaştırma
- `temel-veri-12` — Exception ve hata ayıklama temelleri
- `temel-veri-13` — İsimlendirme, yorumlar ve okunabilir kod

### Uygulama: Metin analiz aracı

- Metin al; kelime ve satır sayılarını üret
- Farklı kültürlerde sayısal parsing dene
- Hatalı girdiyi TryParse ile işle
- Breakpoint ile akışı takip et

## Seviye 2 — Tip sistemi ve nesne tasarımı

### Sınıflar ve nesneler

- `sinif-nesne-01` — Sınıf, nesne, alan ve metot
- `sinif-nesne-02` — Constructor ve constructor overload
- `sinif-nesne-03` — this ve base
- `sinif-nesne-04` — Constructor chaining
- `sinif-nesne-05` — Nesne başlatıcılar
- `sinif-nesne-06` — Primary constructors
- `sinif-nesne-07` — Property ve indexer
- `sinif-nesne-08` — Auto-properties ve backing fields
- `sinif-nesne-09` — Erişim belirleyiciler
- `sinif-nesne-10` — static, readonly, const, init ve required
- `sinif-nesne-11` — Nested types ve partial tipler/üyeler
- `sinif-nesne-12` — Namespace, using, alias ve global using

### Tip ve kopyalama davranışları

- `kopyalama-01` — Değer tipleri ve referans tipleri
- `kopyalama-02` — Atama, kopyalama ve nesne paylaşımı
- `kopyalama-03` — Parametre aktarım semantiği
- `kopyalama-04` — struct, class, record class ve record struct
- `kopyalama-05` — readonly struct
- `kopyalama-06` — default(T) ve sıfırlama
- `kopyalama-07` — Struct constructor davranışları
- `kopyalama-08` — Mutable struct kaynaklı kopyalama hataları
- `kopyalama-09` — Shallow copy ve deep copy
- `kopyalama-10` — İç içe değişebilir nesneler
- `kopyalama-11` — Boxing ve unboxing
- `kopyalama-12` — Nesne kimliği ve değer eşitliği
- `kopyalama-13` — Değişmezlik ve with ifadeleri

### Başlatılma ve nesne yönelimli davranışlar

- `baslatma-polimorfizm-01` — Alanların ve constructor’ların çalıştırılma sırası
- `baslatma-polimorfizm-02` — Base constructor başlatılması
- `baslatma-polimorfizm-03` — Static constructor ve static initialization
- `baslatma-polimorfizm-04` — beforefieldinit
- `baslatma-polimorfizm-05` — Kapsülleme, kalıtım ve çok biçimlilik
- `baslatma-polimorfizm-06` — virtual, override, abstract ve sealed
- `baslatma-polimorfizm-07` — Overload, override ve new ile üye gizleme
- `baslatma-polimorfizm-08` — Interface ve explicit implementation
- `baslatma-polimorfizm-09` — Default interface members
- `baslatma-polimorfizm-10` — Static abstract ve static virtual interface members
- `baslatma-polimorfizm-11` — Composition ve inheritance seçimi

### Null, eşitlik ve desenler

- `null-esitlik-pattern-01` — Nullable değer tipleri
- `null-esitlik-pattern-02` — Nullable reference types
- `null-esitlik-pattern-03` — Null akış analizi
- `null-esitlik-pattern-04` — ?., ??, ??= ve null-forgiving !
- `null-esitlik-pattern-05` — Equals ve GetHashCode
- `null-esitlik-pattern-06` — IEquatable<T> ve IComparable<T>
- `null-esitlik-pattern-07` — Özel equality comparer ve ordering comparer
- `null-esitlik-pattern-08` — Eşitlik ve hash sözleşmeleri
- `null-esitlik-pattern-09` — Dictionary anahtarlarının değişmesi
- `null-esitlik-pattern-10` — Tuple, isimlendirilmiş tuple ve deconstruction
- `null-esitlik-pattern-11` — Deconstruct ve discard
- `null-esitlik-pattern-12` — Type, property, positional, relational ve list patterns
- `null-esitlik-pattern-13` — Pattern birleştirme
- `null-esitlik-pattern-14` — Switch expressions

### Uygulama: Değişmez sipariş modeli

- Class, struct ve record sürümlerini karşılaştır
- İç içe koleksiyonda shallow copy etkisini göster
- Dictionary anahtarları için eşitlik tasarla

## Seviye 3 — C# diline ileri düzey hâkimiyet

### Generics ve tip bağlama

- `generic-baglama-01` — Generic tipler ve metotlar
- `generic-baglama-02` — Generic constraints
- `generic-baglama-03` — Tip çıkarımı
- `generic-baglama-04` — Covariance ve contravariance
- `generic-baglama-05` — Hedef tipe bağlı ifadeler
- `generic-baglama-06` — Dönüşüm öncelikleri
- `generic-baglama-07` — Üye arama ve overload resolution
- `generic-baglama-08` — Overload resolution priority
- `generic-baglama-09` — Definite assignment
- `generic-baglama-10` — Reachability analizi
- `generic-baglama-11` — Değerlendirme sırası

### Delegate, lambda ve event

- `delegate-event-01` — Delegate tanımlama ve method groups
- `delegate-event-02` — Action, Func ve Predicate
- `delegate-event-03` — Anonymous methods ve lambda ifadeleri
- `delegate-event-04` — Closure ve değişken yakalama
- `delegate-event-05` — Static lambda
- `delegate-event-06` — Lambda parametrelerinde modifier kullanımı
- `delegate-event-07` — Event tanımlama ve abonelik yönetimi
- `delegate-event-08` — Custom event accessors
- `delegate-event-09` — Delegate ile event arasındaki farklar

### Genişletme ve özel dil davranışları

- `extension-pattern-01` — Extension metotları
- `extension-pattern-02` — Extension members ve extension blocks
- `extension-pattern-03` — Extension property ve statik genişletme üyeleri
- `extension-pattern-04` — Operatör aşırı yükleme
- `extension-pattern-05` — Kullanıcı tanımlı implicit ve explicit dönüşümler
- `extension-pattern-06` — Kullanıcı tanımlı bileşik atama operatörleri
- `extension-pattern-07` — Pattern tabanlı foreach, using, await ve deconstruction

### Koleksiyonlar, iterator ve LINQ

- `linq-iterator-01` — List, Dictionary, HashSet, Queue ve Stack
- `linq-iterator-02` — Sıralı, salt okunur ve immutable koleksiyonlar
- `linq-iterator-03` — Uygun koleksiyonu seçme
- `linq-iterator-04` — IEnumerable<T> ve IEnumerator<T>
- `linq-iterator-05` — Özel enumerator geliştirme
- `linq-iterator-06` — Iterator metotları ve yield
- `linq-iterator-07` — Collection expressions ve collection builders
- `linq-iterator-08` — params collections
- `linq-iterator-09` — LINQ query syntax ve method syntax
- `linq-iterator-10` — Filtreleme, sıralama, dönüştürme ve toplama
- `linq-iterator-11` — Gruplama ve birleştirme
- `linq-iterator-12` — Select ve SelectMany
- `linq-iterator-13` — Deferred execution ve materialization
- `linq-iterator-14` — IEnumerable ile IQueryable farkı
- `linq-iterator-15` — Expression trees

### Metadata ve modern dil özellikleri

- `metadata-modern-01` — Attributes ve özel attribute geliştirme
- `metadata-modern-02` — Reflection
- `metadata-modern-03` — dynamic ve dinamik bağlama
- `metadata-modern-04` — Nullable analizini yönlendiren attributes
- `metadata-modern-05` — Caller information
- `metadata-modern-06` — CallerArgumentExpression
- `metadata-modern-07` — Interpolated string handlers
- `metadata-modern-08` — ref struct interface uygulamaları
- `metadata-modern-09` — allows ref struct anti-constraint
- `metadata-modern-10` — field destekli properties
- `metadata-modern-11` — Partial properties, indexers, constructors ve events
- `metadata-modern-12` — Null-conditional assignment
- `metadata-modern-13` — Unbound generic tiplerle nameof
- `metadata-modern-14` — Span için örtük dönüşümler
- `metadata-modern-15` — Dil sürümleri, uyumluluk ve sürüme bağlı davranışlar

### Uygulama: Generic API ve iterator

- Generic constraints belirle
- Özel iterator ve event geliştir
- LINQ ve expression tree örnekleri kur
- Derlenir mi ve ne çıktı verir soruları hazırla

## Seviye 4 — Bellek modeli ve kaynak yönetimi

### Belleğin yapısı

- `bellek-yapisi-01` — Stack, heap ve stack frame
- `bellek-yapisi-02` — Nesne ömrü ve referansların yaşam süresi
- `bellek-yapisi-03` — Değer tiplerinin neden her zaman stack üzerinde olmadığı
- `bellek-yapisi-04` — Managed heap, native heap ve toplam process belleği
- `bellek-yapisi-05` — Reserved memory, committed memory ve working set
- `bellek-yapisi-06` — Sanal bellek, fiziksel RAM ve paging
- `bellek-yapisi-07` — Thread stack’lerinin maliyeti
- `bellek-yapisi-08` — JIT kodu ve runtime metadata maliyetleri
- `bellek-yapisi-09` — Nesne yerleşimi, object header, hizalama ve padding
- `bellek-yapisi-10` — Referans içeren struct’lar
- `bellek-yapisi-11` — Struct kopyalama maliyetleri

### Allocation ve nesne canlılığı

- `allocation-canlilik-01` — Boxing, unboxing ve gizli allocation
- `allocation-canlilik-02` — String değişmezliği ve interning
- `allocation-canlilik-03` — String oluşturma ve StringBuilder maliyetleri
- `allocation-canlilik-04` — Dizilerin ve koleksiyonların kapasite yönetimi
- `allocation-canlilik-05` — Closure ve delegate allocation
- `allocation-canlilik-06` — Iterator ve async kaynaklı allocation
- `allocation-canlilik-07` — Kod kapsamı ile GC açısından canlı kalma süresi
- `allocation-canlilik-08` — Bellek kullanımı, allocation hızı ve canlı nesne miktarı
- `allocation-canlilik-09` — Belleği tutmak ile sürekli yeni bellek ayırmak
- `allocation-canlilik-10` — Pooling’in allocation ve tutulan bellek üzerindeki etkisi

### Hatalar ve kaynak temizliği

- `kaynak-exception-01` — try, catch, finally ve throw
- `kaynak-exception-02` — Exception filters
- `kaynak-exception-03` — Özel exception tasarımı
- `kaynak-exception-04` — Exception yönetim stratejileri
- `kaynak-exception-05` — Managed ve unmanaged kaynaklar
- `kaynak-exception-06` — IDisposable ve using
- `kaynak-exception-07` — IAsyncDisposable ve await using
- `kaynak-exception-08` — Dispose pattern
- `kaynak-exception-09` — Finalizer ve SafeHandle
- `kaynak-exception-10` — Kaynak sızıntılarını önleme
- `kaynak-exception-11` — Başarı ve hata sonuçlarını modelleme
- `kaynak-exception-12` — OutOfMemoryException
- `kaynak-exception-13` — Kapasite, adres alanı ve parçalanma kaynaklı bellek sorunları

### Uygulama: Allocation ve kaynak ömrü laboratuvarı

- Boxing ve string allocation örneklerini ölç
- Using ile dosya ömrünü sınırla
- Process belleğini managed heap ile karşılaştır

## Seviye 5 — Garbage collector ve bellek teşhisi

### GC’nin temel mekanikleri

- `gc-mekanik-01` — GC roots ve erişilebilirlik
- `gc-mekanik-02` — Nesne grafiği
- `gc-mekanik-03` — Generation 0, 1 ve 2
- `gc-mekanik-04` — Small Object Heap
- `gc-mekanik-05` — Large Object Heap
- `gc-mekanik-06` — Pinned Object Heap
- `gc-mekanik-07` — Marking, sweeping ve compaction
- `gc-mekanik-08` — Allocation fast path ve allocation context
- `gc-mekanik-09` — Allocation bütçeleri ve GC tetiklenmesi
- `gc-mekanik-10` — Nesne terfisi ve uzun ömürlü nesneler
- `gc-mekanik-11` — Write barriers ve card tables
- `gc-mekanik-12` — Nesiller arası referans takibi
- `gc-mekanik-13` — GC suspension, safe points ve duraklama nedenleri

### GC çeşitleri ve yapılandırma

- `gc-ayar-01` — Workstation GC ve server GC
- `gc-ayar-02` — Background GC
- `gc-ayar-03` — GC latency modes
- `gc-ayar-04` — No-GC region ve kullanım sınırları
- `gc-ayar-05` — GC.Collect ve kullanım sınırları
- `gc-ayar-06` — GC heap limitleri
- `gc-ayar-07` — Kısıtlı bellek ortamlarında GC davranışı
- `gc-ayar-08` — DATAS ve uygulama boyutuna uyarlanma
- `gc-ayar-09` — GC sonrası belleğin işletim sistemine geri verilmesi

### Finalization ve referans türleri

- `gc-referans-01` — Finalization queue
- `gc-referans-02` — Finalization’ın nesne ömrüne etkisi
- `gc-referans-03` — Nesne resurrection
- `gc-referans-04` — GC.KeepAlive
- `gc-referans-05` — GCHandle türleri
- `gc-referans-06` — Pinning ve fragmentation
- `gc-referans-07` — Weak references
- `gc-referans-08` — ConditionalWeakTable
- `gc-referans-09` — Ephemeron mantığı
- `gc-referans-10` — Native memory pressure
- `gc-referans-11` — GC.AddMemoryPressure

### Bellek sorunlarını araştırma

- `gc-leak-01` — Managed memory leak
- `gc-leak-02` — Event abonelikleriyle tutulan nesneler
- `gc-leak-03` — Static referanslar ve sınırsız cache
- `gc-leak-04` — Closure kaynaklı retention
- `gc-leak-05` — GC ölçümleri
- `gc-leak-06` — Heap dump inceleme
- `gc-leak-07` — Nesneleri tutan referans zincirleri
- `gc-leak-08` — Normal GC davranışı ile bellek sızıntısını ayırt etme

### Uygulama: Bellek sızıntısı dedektifliği

- Event, static cache ve closure sızıntılarını üret
- Heap dump al ve gcroot incele
- Düzeltme sonrası canlı nesne sayısını karşılaştır

## Seviye 6 — Belleği verimli kullanan C#

### Referanslar ve yaşam süresi kuralları

- `ref-guvenlik-01` — ref, out ve in
- `ref-guvenlik-02` — Ref locals ve ref returns
- `ref-guvenlik-03` — ref readonly
- `ref-guvenlik-04` — readonly struct ve defensive copies
- `ref-guvenlik-05` — ref struct
- `ref-guvenlik-06` — Ref fields
- `ref-guvenlik-07` — scoped
- `ref-guvenlik-08` — Referans güvenliği ve escape kuralları
- `ref-guvenlik-09` — Async ve iterator içinde ref kullanım sınırları

### Span ve buffer işlemleri

- `span-buffer-01` — Span<T> ve ReadOnlySpan<T>
- `span-buffer-02` — Memory<T> ve ReadOnlyMemory<T>
- `span-buffer-03` — Slicing ve kopyalamadan veri işleme
- `span-buffer-04` — stackalloc ve kullanım sınırları
- `span-buffer-05` — Inline arrays
- `span-buffer-06` — Fixed-size buffers
- `span-buffer-07` — MemoryMarshal
- `span-buffer-08` — CollectionsMarshal
- `span-buffer-09` — Unsafe

### Sahiplik ve pooling

- `sahiplik-pool-01` — Buffer ownership ve borrowing
- `sahiplik-pool-02` — Kullanım süresi sözleşmeleri
- `sahiplik-pool-03` — IMemoryOwner<T> ve sahiplik aktarımı
- `sahiplik-pool-04` — ArrayPool<T> ve MemoryPool<T>
- `sahiplik-pool-05` — Buffer tekrar kullanımı
- `sahiplik-pool-06` — Object pooling
- `sahiplik-pool-07` — Buffer’ın zamanından önce iade edilmesi
- `sahiplik-pool-08` — Use-after-return ve double-return
- `sahiplik-pool-09` — Temizlenmemiş buffer sorunları
- `sahiplik-pool-10` — NativeMemory ile allocation/free eşleştirmesi

### Verimli veri işleme

- `verimli-veri-01` — ArrayBufferWriter<T>
- `verimli-veri-02` — IBufferWriter<T>
- `verimli-veri-03` — Pipelines
- `verimli-veri-04` — ReadOnlySequence<T> ve SequenceReader<T>
- `verimli-veri-05` — Düşük allocation ile parsing ve biçimlendirme
- `verimli-veri-06` — UTF-8 ve byte işlemleri
- `verimli-veri-07` — Binary veri okuma ve yazma
- `verimli-veri-08` — Endianness ve BinaryPrimitives
- `verimli-veri-09` — Streaming ile büyük veri işleme
- `verimli-veri-10` — Cache sınırları ve bellek bütçeleri
- `verimli-veri-11` — Array-of-structs ve struct-of-arrays
- `verimli-veri-12` — FrozenDictionary ve FrozenSet
- `verimli-veri-13` — Immutable koleksiyonların maliyetleri

### Uygulama: Streaming binary parser

- Span ile header parse et
- Endianness’i açık belirle
- Parçalı girdiyi streaming işle
- Pool buffer’ının sahipliğini tanımla

## Seviye 7 — Async, concurrency ve bellek görünürlüğü

### Asenkron programlama

- `async-akis-01` — Task, Task<T>, async ve await
- `async-akis-02` — Async metotların state machine dönüşümü
- `async-akis-03` — I/O ve CPU ağırlıklı işlerin ayrımı
- `async-akis-04` — Async lambda
- `async-akis-05` — Continuation davranışı
- `async-akis-06` — Synchronization context
- `async-akis-07` — Execution context
- `async-akis-08` — ConfigureAwait
- `async-akis-09` — AsyncLocal<T> ve ThreadLocal<T>
- `async-akis-10` — Context akışı
- `async-akis-11` — CancellationToken
- `async-akis-12` — Cancellation callback yarışları ve kaynak temizliği
- `async-akis-13` — Asenkron exception akışı
- `async-akis-14` — WhenAll ve WhenAny
- `async-akis-15` — Async streams ve IAsyncEnumerable<T>
- `async-akis-16` — await foreach
- `async-akis-17` — Asenkron kaynak temizliği

### İleri async altyapısı

- `async-altyapi-01` — ValueTask ve ValueTask<T>
- `async-altyapi-02` — ValueTask kullanım kısıtları ve yanlış kullanımlar
- `async-altyapi-03` — TaskCompletionSource<T>
- `async-altyapi-04` — Continuation’ların çalıştırılma biçimi
- `async-altyapi-05` — Custom awaiter ve awaitable tasarımı
- `async-altyapi-06` — IValueTaskSource<T>
- `async-altyapi-07` — ManualResetValueTaskSourceCore<T>
- `async-altyapi-08` — TaskScheduler
- `async-altyapi-09` — Özel scheduling

### Thread ve senkronizasyon

- `thread-kilit-01` — Thread ve ThreadPool
- `thread-kilit-02` — ThreadPool starvation
- `thread-kilit-03` — Sync-over-async problemleri
- `thread-kilit-04` — Race condition
- `thread-kilit-05` — Deadlock ve livelock
- `thread-kilit-06` — lock ve Monitor
- `thread-kilit-07` — System.Threading.Lock
- `thread-kilit-08` — Interlocked
- `thread-kilit-09` — SemaphoreSlim
- `thread-kilit-10` — ReaderWriterLockSlim
- `thread-kilit-11` — SpinWait
- `thread-kilit-12` — Thread-safe koleksiyonlar

### Bellek modeli ve paralellik

- `bellek-paralellik-01` — C#/.NET bellek modeli
- `bellek-paralellik-02` — Atomiklik, görünürlük ve işlem sıralaması
- `bellek-paralellik-03` — volatile
- `bellek-paralellik-04` — Memory barriers
- `bellek-paralellik-05` — Compare-and-swap döngüleri
- `bellek-paralellik-06` — Lock-free ve wait-free farkı
- `bellek-paralellik-07` — ABA problemi
- `bellek-paralellik-08` — False sharing
- `bellek-paralellik-09` — Paylaşılan durumu azaltma
- `bellek-paralellik-10` — Channels ve producer–consumer modeli
- `bellek-paralellik-11` — Backpressure
- `bellek-paralellik-12` — Bounded concurrency
- `bellek-paralellik-13` — Adalet ve contention ölçümü
- `bellek-paralellik-14` — Parallel işlemler
- `bellek-paralellik-15` — PLINQ ve paralelleştirme maliyetleri

### Uygulama: Sınırlı eş zamanlı işleyici

- Bounded channel kur
- Cancellation ve temizlemeyi tasarla
- Race condition örneğini düzelt
- Async state machine IL çıktısını incele

## Seviye 8 — CLR, JIT ve düşük seviye çalışma

### Derlemeden yürütmeye

- `il-jit-01` — C# → IL → makine kodu
- `il-jit-02` — CLR’nin görevleri
- `il-jit-03` — Assembly ve metadata
- `il-jit-04` — Tip yükleme
- `il-jit-05` — IL okuma
- `il-jit-06` — Derleyicinin ürettiği kodu inceleme
- `il-jit-07` — JIT compilation
- `il-jit-08` — Tiered compilation
- `il-jit-09` — Dynamic PGO
- `il-jit-10` — ReadyToRun
- `il-jit-11` — JIT ve AOT karşılaştırması
- `il-jit-12` — Native AOT
- `il-jit-13` — Trimming
- `il-jit-14` — Reflection ve dinamik kod üretimi sınırlamaları

### Runtime ve JIT mekanikleri

- `jit-mekanik-01` — Method tables
- `jit-mekanik-02` — Virtual ve interface dispatch
- `jit-mekanik-03` — Constrained calls
- `jit-mekanik-04` — Generic tiplerin çalışma zamanındaki temsili
- `jit-mekanik-05` — Generic code sharing ve specialization
- `jit-mekanik-06` — Inlining
- `jit-mekanik-07` — Devirtualization
- `jit-mekanik-08` — Bounds-check elimination
- `jit-mekanik-09` — Escape analysis
- `jit-mekanik-10` — Sürüme bağlı allocation optimizasyonları
- `jit-mekanik-11` — Exception handling maliyetleri

### Assembly yükleme

- `assembly-yukleme-01` — AssemblyLoadContext
- `assembly-yukleme-02` — Dependency resolution
- `assembly-yukleme-03` — Type identity
- `assembly-yukleme-04` — Collectible assembly yükleme
- `assembly-yukleme-05` — Assembly unload
- `assembly-yukleme-06` — Unload işlemini engelleyen referanslar

### CPU ve veri yerleşimi

- `cpu-veri-01` — CPU cache
- `cpu-veri-02` — Locality
- `cpu-veri-03` — Veri yerleşimi
- `cpu-veri-04` — SIMD
- `cpu-veri-05` — Vector<T>
- `cpu-veri-06` — Hardware intrinsics
- `cpu-veri-07` — x64 ve ARM64 farkları
- `cpu-veri-08` — Platforma bağlı davranışlar

### Unsafe ve native interoperability

- `native-interop-01` — Unsafe kod
- `native-interop-02` — Pointer ve pointer arithmetic
- `native-interop-03` — fixed
- `native-interop-04` — Function pointers
- `native-interop-05` — StructLayout
- `native-interop-06` — Packing ve blittability
- `native-interop-07` — ABI ve calling conventions
- `native-interop-08` — Native interop
- `native-interop-09` — Marshalling
- `native-interop-10` — Native bellek ömrü
- `native-interop-11` — LibraryImport
- `native-interop-12` — Reverse P/Invoke
- `native-interop-13` — UnmanagedCallersOnly
- `native-interop-14` — Native callback ve delegate yaşam süresi
- `native-interop-15` — Reflection.Emit ve dinamik kod üretimi

### Uygulama: Runtime ve interop incelemesi

- IL ve disassembly incele
- Native kaynak sahipliğini tasarla
- Collectible assembly yükle ve unload sorununu üret
- JIT ve AOT kısıtlarını karşılaştır

## Seviye 9 — Ölçüm, profiling ve optimizasyon

### Performans hedefleri ve benchmark

- `benchmark-01` — Çalışma süresi, throughput, latency ve bellek hedefleri
- `benchmark-02` — BenchmarkDotNet
- `benchmark-03` — Güvenilir benchmark hazırlama
- `benchmark-04` — Warmup ve JIT etkileri
- `benchmark-05` — Dead-code elimination
- `benchmark-06` — Benchmark varyansı
- `benchmark-07` — Dağılımlar ve ölçüm belirsizliği
- `benchmark-08` — Ortalama, p95 ve p99 gecikme
- `benchmark-09` — Cold start ve steady state
- `benchmark-10` — Uzun süreli soak testleri

### CPU ve bellek ölçümü

- `cpu-bellek-olcum-01` — Allocation miktarı ve allocation hızı
- `cpu-bellek-olcum-02` — GC süresi ve pause ölçümü
- `cpu-bellek-olcum-03` — CPU sampling
- `cpu-bellek-olcum-04` — Trace inceleme
- `cpu-bellek-olcum-05` — Heap analizi
- `cpu-bellek-olcum-06` — Heap snapshot karşılaştırma
- `cpu-bellek-olcum-07` — Retention analizi
- `cpu-bellek-olcum-08` — Managed allocation ile native bellek artışını ayırt etme
- `cpu-bellek-olcum-09` — Bellek ile hız arasındaki ödünleşimler

### Teşhis araçları

- `teshis-araclari-01` — dotnet-counters
- `teshis-araclari-02` — dotnet-trace
- `teshis-araclari-03` — dotnet-dump
- `teshis-araclari-04` — Profiler kullanımı
- `teshis-araclari-05` — SOS
- `teshis-araclari-06` — dumpheap
- `teshis-araclari-07` — gcroot
- `teshis-araclari-08` — clrstack
- `teshis-araclari-09` — syncblk
- `teshis-araclari-10` — Thread dump inceleme
- `teshis-araclari-11` — Deadlock ve starvation teşhisi
- `teshis-araclari-12` — EventPipe
- `teshis-araclari-13` — ETW
- `teshis-araclari-14` — Özel EventSource olayları

### İleri optimizasyon analizi

- `optimizasyon-analizi-01` — Disassembly üzerinden benchmark sonuçlarını açıklama
- `optimizasyon-analizi-02` — Hardware counters
- `optimizasyon-analizi-03` — Cache miss
- `optimizasyon-analizi-04` — Branch misprediction
- `optimizasyon-analizi-05` — LINQ maliyetlerini ölçme
- `optimizasyon-analizi-06` — Koleksiyon maliyetlerini ölçme
- `optimizasyon-analizi-07` — String işlemlerini ölçme
- `optimizasyon-analizi-08` — Async maliyetlerini ölçme
- `optimizasyon-analizi-09` — Microbenchmark sonuçlarını gerçek iş yükünde doğrulama
- `optimizasyon-analizi-10` — Optimizasyon öncesi ve sonrası doğruluk kontrolü
- `optimizasyon-analizi-11` — Performans regresyonlarını otomatik takip etme
- `optimizasyon-analizi-12` — Darboğaz bulma ve kanıta dayalı optimizasyon

### Uygulama: Profiler raporu

- CPU, allocation ve GC trace topla
- Cold start ve steady-state ayır
- Heap snapshot karşılaştır
- Önce-sonra raporu hazırla

## Seviye 10 — Dil, derleyici ve kütüphane mühendisliği

### Dil ve kaynak kod araştırması

- `dil-arastirma-01` — C# dil spesifikasyonunu okuma
- `dil-arastirma-02` — Belirsiz dil davranışlarını spesifikasyonla çözme
- `dil-arastirma-03` — Dil spesifikasyonu, IL ve runtime kaynak kodunu birlikte inceleme
- `dil-arastirma-04` — Runtime kaynak kodunu inceleme
- `dil-arastirma-05` — Temel kütüphane kaynak kodunu inceleme
- `dil-arastirma-06` — Runtime davranışını minimal örnekle yeniden üretme
- `dil-arastirma-07` — Zor bellek, concurrency ve performans hatalarını teşhis etme

### Roslyn ve geliştirme araçları

- `roslyn-01` — Roslyn syntax tree
- `roslyn-02` — Semantic model
- `roslyn-03` — Symbol API
- `roslyn-04` — Operation tree
- `roslyn-05` — Control-flow analizi
- `roslyn-06` — Analyzer geliştirme
- `roslyn-07` — Code fix geliştirme
- `roslyn-08` — Incremental source generator geliştirme
- `roslyn-09` — Analyzer ve source generator testleri
- `roslyn-10` — Analyzer ve source generator performansı
- `roslyn-11` — Reflection ile üretilen kodun maliyetlerini karşılaştırma

### İleri API ve kütüphane tasarımı

- `kutuphane-api-01` — İleri generic tasarımı
- `kutuphane-api-02` — Generic math
- `kutuphane-api-03` — Allocation davranışı açık API tasarımı
- `kutuphane-api-04` — Kaynak ve bellek sahipliği açık API tasarımı
- `kutuphane-api-05` — Nullable annotations ile sözleşme tasarımı
- `kutuphane-api-06` — Generic constraints ile sözleşme tasarımı
- `kutuphane-api-07` — Source compatibility
- `kutuphane-api-08` — Binary compatibility
- `kutuphane-api-09` — Public API değişikliklerinin overload resolution’a etkisi
- `kutuphane-api-10` — AOT uyumlu kütüphane geliştirme
- `kutuphane-api-11` — Trimming uyumlu kütüphane geliştirme
- `kutuphane-api-12` — Reflection gereksinimlerini bildiren annotations
- `kutuphane-api-13` — Allocation bütçesi olan kütüphane geliştirme
- `kutuphane-api-14` — Performans bütçesi olan kütüphane geliştirme

### Uzman düzeyinde doğrulama

- `uzman-dogrulama-01` — Property-based testing
- `uzman-dogrulama-02` — Fuzzing
- `uzman-dogrulama-03` — Concurrency stres testleri
- `uzman-dogrulama-04` — Kaynak sahipliği ve yaşam süresi hatalarını doğrulama
- `uzman-dogrulama-05` — Doğruluk, bellek ve performansı birlikte değerlendirme

### Uygulama: Analyzer ve performans bütçeli kütüphane

- Roslyn analyzer ve code fix geliştir
- Incremental source generator ekle
- AOT/trimming uyumunu doğrula
- Fuzzing, concurrency ve performans testleri kur


Yeni seviyeler için önerilen önkoşullar: Seviye 11 için 2–3, seviye 12 için 7 ve 11, seviye 13 için LINQ ve 11–12, seviye 14 için 7 ve 11–13, seviye 15 için 9 ve 11–14. Konuları okumakla yetinme; her projede hata senaryosunu üret, düzelt ve kanıtını kaydet.

## Seviye 11 — Tasarım kalıpları ve uygulama mimarisi

### SOLID ve tasarım kalıplarını problem üzerinden seçme

- `tasarim-kaliplari-01` — SOLID ve değişim eksenleri
- `tasarim-kaliplari-02` — Strategy ve politika bileşimi
- `tasarim-kaliplari-03` — Factory ve nesne oluşturma sınırı
- `tasarim-kaliplari-04` — Decorator ve çapraz kesen davranışlar
- `tasarim-kaliplari-05` — Observer ve abonelik ömrü
- `tasarim-kaliplari-06` — Refactoring ve soyutlama maliyeti

### Dependency Injection, scope ve yapılandırma

- `di-yasam-01` — Composition root ve constructor injection
- `di-yasam-02` — Transient, scoped ve singleton yaşam süreleri
- `di-yasam-03` — Captive dependency ve scope doğrulaması
- `di-yasam-04` — BackgroundService içinde async scope
- `di-yasam-05` — Options pattern ve başlangıç doğrulaması
- `di-yasam-06` — Container sahipliği ve disposable bağımlılıklar

### Clean Architecture, DDD ve CQRS sınırları

- `domain-mimari-01` — Katman bağımlılıkları ve ports/adapters
- `domain-mimari-02` — Entity, value object ve invariant
- `domain-mimari-03` — Aggregate ve transaction sınırı
- `domain-mimari-04` — Domain events ve integration events
- `domain-mimari-05` — CQRS ve okuma/yazma modelleri
- `domain-mimari-06` — Modüler monolit ve servis çıkarma

### Uygulama: Modüler sipariş uygulaması

- Domain, application ve infrastructure bağımlılıklarını çiz
- Fiyat politikasını Strategy ile değiştir
- DI kapsamlarını doğrula ve modüllerin veri sahipliğini belirle
- Bir kullanım senaryosunu bağımsız test et

## Seviye 12 — ASP.NET Core ve güvenli API tasarımı

### HTTP sözleşmeleri ve ASP.NET Core istek hattı

- `http-pipeline-01` — Middleware sırası ve short-circuit
- `http-pipeline-02` — Routing, binding ve endpoint filters
- `http-pipeline-03` — HTTP metotları ve idempotency
- `http-pipeline-04` — DTO, validation ve ProblemDetails
- `http-pipeline-05` — Pagination, ETag ve koşullu istekler
- `http-pipeline-06` — Streaming, request abort ve sınırlar

### Kimlik doğrulama ve kaynak yetkilendirmesi

- `api-yetki-01` — Authentication ve authorization ayrımı
- `api-yetki-02` — JWT doğrulama ve claim güveni
- `api-yetki-03` — Policy ve resource-based authorization
- `api-yetki-04` — Cookie, bearer token ve CSRF
- `api-yetki-05` — Çok kiracılı veri izolasyonu
- `api-yetki-06` — 401, 403 ve bilgi sızıntısı

### Girdi, secret ve API güvenlik sınırları

- `api-savunma-01` — Girdi doğrulama ve mass assignment
- `api-savunma-02` — Parametreli SQL ve çıktı kodlama
- `api-savunma-03` — Secret yönetimi ve anahtar rotasyonu
- `api-savunma-04` — Rate limiting ve kaynak bütçesi
- `api-savunma-05` — CORS, HTTPS ve reverse proxy güveni
- `api-savunma-06` — SSRF, dosya yükleme ve veri sızıntısı

### Uygulama: Çok kullanıcılı sipariş API’si

- Middleware sırasını kur ve hata yanıtlarını standartlaştır
- Kimlik ve kaynak yetkilendirmesini ayrı test et
- DTO, pagination ve iptal sözleşmelerini tanımla
- Gövde boyutu, rate limit ve secret yönetimini yapılandır

## Seviye 13 — EF Core ve veri mühendisliği

### EF Core modelleme ve change tracking

- `ef-model-01` — DbContext ömrü ve unit of work
- `ef-model-02` — İlişkiler, anahtarlar ve constraint’ler
- `ef-model-03` — Snapshot tracking ve DetectChanges
- `ef-model-04` — AsNoTracking ve identity resolution
- `ef-model-05` — Disconnected graph ve kontrollü güncelleme
- `ef-model-06` — Value conversion ve model sınırları

### LINQ çevirisi, SQL planları ve sorgu performansı

- `ef-sorgu-01` — IQueryable sağlayıcısı ve SQL çevirisi
- `ef-sorgu-02` — Projection ve gereksiz veri aktarımı
- `ef-sorgu-03` — N+1, Include ve split queries
- `ef-sorgu-04` — İndeksler ve execution plan okuma
- `ef-sorgu-05` — Keyset pagination ve kararlı sıralama
- `ef-sorgu-06` — Compiled query ve roundtrip bütçesi

### Transaction, optimistic concurrency ve migration

- `ef-tutarlilik-01` — SaveChanges ve atomik iş birimi
- `ef-tutarlilik-02` — İzolasyon seviyeleri ve anomaliler
- `ef-tutarlilik-03` — Optimistic concurrency token
- `ef-tutarlilik-04` — Retry, execution strategy ve bilinmeyen commit
- `ef-tutarlilik-05` — Migration, expand/contract ve schema drift
- `ef-tutarlilik-06` — Constraint, raw SQL ve toplu güncelleme

### Uygulama: Eşzamanlı stok rezervasyonu

- Gerçek ilişkisel veritabanıyla integration testi kur
- Projection ve keyset pagination uygula
- Concurrency token ile yarışan güncellemeyi işle
- Migration ve indeks değişikliğinin planını ölç

## Seviye 14 — Güvenilir servisler ve dağıtık sistemler

### Timeout, retry ve circuit breaker tasarımı

- `http-dayaniklilik-01` — Toplam süre bütçesi ve cancellation
- `http-dayaniklilik-02` — Transient hata sınıflandırması
- `http-dayaniklilik-03` — Exponential backoff ve jitter
- `http-dayaniklilik-04` — Circuit breaker ve half-open davranışı
- `http-dayaniklilik-05` — IHttpClientFactory ve bağlantı ömrü
- `http-dayaniklilik-06` — Idempotent retry ve hedging maliyeti

### Mesaj kuyrukları, outbox ve eventual consistency

- `mesaj-tutarlilik-01` — At-least-once teslim ve acknowledgement
- `mesaj-tutarlilik-02` — Transactional outbox
- `mesaj-tutarlilik-03` — Inbox, idempotency key ve deduplication
- `mesaj-tutarlilik-04` — Sıralama, partition ve poison message
- `mesaj-tutarlilik-05` — Saga, compensation ve kısmi başarısızlık
- `mesaj-tutarlilik-06` — Eventual consistency, replay ve şema sürümleme

### Background services, backpressure ve cache tutarlılığı

- `worker-kapasite-01` — Hosted service yaşam döngüsü
- `worker-kapasite-02` — Bounded channel ve overload politikası
- `worker-kapasite-03` — Graceful shutdown ve drain
- `worker-kapasite-04` — Concurrency, lease ve fencing
- `worker-kapasite-05` — Cache-aside, TTL ve invalidation
- `worker-kapasite-06` — Cache stampede ve kapasite ölçümü

### Uygulama: Dayanıklı sipariş ve bildirim akışı

- Toplam süre bütçesini ve retry politikasını belirle
- Sipariş ve outbox kaydını tek transaction içinde yaz
- Inbox/deduplication ile yinelenen mesajı işle
- Worker kapanışını, backlog ve hata kuyruğunu gözlemle

## Seviye 15 — Test, gözlemlenebilirlik ve üretim mühendisliği

### Unit, integration ve contract test mühendisliği

- `test-stratejisi-01` — Davranış testi ve test double seçimi
- `test-stratejisi-02` — WebApplicationFactory ve gerçek istek hattı
- `test-stratejisi-03` — Gerçek veritabanı ve test izolasyonu
- `test-stratejisi-04` — Consumer-driven contract ve geriye uyumluluk
- `test-stratejisi-05` — Property-based, fuzzing ve mutation testing
- `test-stratejisi-06` — Zaman, rastgelelik ve flaky testler

### OpenTelemetry, log korelasyonu ve servis hedefleri

- `otel-slo-01` — Yapılandırılmış log ve scope
- `otel-slo-02` — ActivitySource ve distributed tracing
- `otel-slo-03` — Meter, counter ve histogram
- `otel-slo-04` — OpenTelemetry pipeline ve sampling
- `otel-slo-05` — SLI, SLO ve error budget
- `otel-slo-06` — Alarm, yük testi ve olay incelemesi

### Container, CI/CD ve güvenli sürüm geçişleri

- `uretim-dagitim-01` — Tekrarlanabilir build ve artifact kimliği
- `uretim-dagitim-02` — Multi-stage container ve en az yetki
- `uretim-dagitim-03` — Liveness, readiness ve startup kontrolleri
- `uretim-dagitim-04` — Yapılandırma, secret ve ortam farkları
- `uretim-dagitim-05` — Rolling, canary ve rollback
- `uretim-dagitim-06` — Graceful shutdown ve dağıtım tatbikatı

### Uygulama: Üretime hazır bitirme projesi

- Unit, integration ve contract testlerini CI aşamalarına yerleştir
- Trace, metric ve log korelasyonunu kur
- Container, readiness ve graceful shutdown yapılandır
- Yük testi yap; SLO ve rollback tatbikatı hazırla
