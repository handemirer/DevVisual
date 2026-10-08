import { curriculumLessons, levels } from './curriculum';
import type { Lesson, LessonStep, LessonAction } from '../../../core/lesson-engine/types';
import { emptyState, execute, editFile, stagedFiles, workingFiles, headCommit } from '../engine/git';
import type { GitState } from '../engine/git';
function applyActions(initial: GitState, actions: LessonAction[]): GitState {
  let state = initial;
  let prepared: string[] = [];
  for (const action of actions) {
    if (action.file) state = editFile(state, action.file.path, action.file.content);
    if (!action.command) continue;
    const result = execute(state, action.command);
    if (result.error) throw new Error(result.output);
    if (action.command.startsWith('git add ')) prepared.push(action.command);
    if (result.state.commits.length > state.commits.length) {
      result.state.commits[result.state.commits.length - 1].commands = [...prepared, action.command];
      prepared = [];
    }
    state = result.state;
  }
  return state;
}
const baseActions: LessonAction[] = [
  { command: 'git init' }, { command: 'git add .' }, { command: 'git commit -m "İlk commit"' },
];
const historyActions: LessonAction[] = [...baseActions,
  { file: { path: 'notlar.md', content: '# Git notlarım\n' } },
  { command: 'git add .' }, { command: 'git commit -m "Notlar eklendi"' },
];
const mergeActions: LessonAction[] = [...baseActions,
  { command: 'git switch -c feature' }, { file: { path: 'feature.md', content: '# Yeni özellik\n' } },
  { command: 'git add .' }, { command: 'git commit -m "Yeni özellik"' }, { command: 'git switch main' },
];
const initialCommit = () => applyActions(emptyState(), baseActions);
const historyInitial = () => applyActions(emptyState(), historyActions);
const mergeInitial = () => applyActions(emptyState(), mergeActions);
const step = (title: string, explanation: string, observation: string, action: LessonAction | LessonAction[], validate: LessonStep<GitState>['validate']): LessonStep<GitState> => ({ title, explanation, observation, action: Array.isArray(action) ? action : [action], validate });
const hasFeatureCommit = (s: GitState) => s.head === 'feature' && s.commits.some(c => c.id === s.branches.feature && c.branch === 'feature');
const originalLessons: Lesson<GitState>[] = [
  { id: 'git-nedir', title: 'Git nedir?', description: 'Dosyalarından bir zaman çizgisine.', difficulty: 'Başlangıç', duration: 5, objectives: ['Repository kavramını tanı', 'Çalışma dizini, staging ve commit ilişkisini keşfet'], initial: emptyState,
    steps: [
      step('Bir proje, birçok an', 'Git, projenin farklı anlardaki hallerini saklayan bir sürüm kontrol sistemidir. Repository bu geçmişi ve dosyalarını bir arada tutar. Bu adımda proje için bir depo başlatıldı.', 'Depo hazır. Henüz commit olmadığı için grafikte bir nokta yok; README.md çalışma dizininde bekliyor.', { command: 'git init' }, s => s.initialized),
      step('Neler değişti?', 'Çalışma dizini, üzerinde çalışılan dosyaları içerir. Staging area ise bir sonraki commit’in hazırlık alanıdır. Bu iki alanı aşağıda yan yana görebilirsin.', 'README.md çalışma dizininde görünüyor. Hazırlık alanı boş; dosya henüz kaydedilecekler arasına alınmadı.', { command: 'git status' }, s => s.inspected.status > 0),
      step('Bir anlık görüntüye hazırlan', 'Bir dosya hazırlık alanına alındığında o anki içeriği seçilmiş olur. Dosyada daha sonra yapılan değişiklikler kendiliğinden bu seçime dahil olmaz.', 'README.md artık staging area’da. Dosya yerinden taşınmadı; kaydedilecek hali hazırlandı.', { command: 'git add README.md' }, s => stagedFiles(s).includes('README.md')),
      step('Geçmişin ilk noktası', 'Commit, hazırlık alanının kalıcı bir anlık görüntüsüdür. HEAD bulunduğun branch’i, branch ise son commit’i işaret eder.', 'Grafikte ilk commit belirdi. main ve HEAD bu noktayı gösteriyor; hazırlanan dosya artık geçmişte saklanıyor.', { command: 'git commit -m "İlk commit"' }, s => s.commits.length > 0),
    ], complete: s => s.commits.length > 0 },
  { id: 'ilk-commit', title: 'İlk commit’in', description: 'Hazırla, kaydet, kontrol et.', difficulty: 'Başlangıç', duration: 7, objectives: ['Repository başlat', 'Dosya değişikliklerini hazırla', 'Commit ve status kullan'], initial: emptyState,
    steps: [
      step('Depoyu başlat', 'Her proje bir çalışma diziniyle başlar. Bu örnekte Git deposu başlatıldı; dosyalar var ama henüz kayıtlı bir geçmiş yok.', 'README.md çalışma dizininde. Commit grafiği boş; depo oluşturmak tek başına dosyaları geçmişe kaydetmez.', { command: 'git init' }, s => s.initialized),
      step('Dosyanı hazırla', 'Her dosyayı bir kayda dahil etmek gerekmez. Hazırlık alanı, bir sonraki anlık görüntüye hangi dosyaların gireceğini belirler.', 'README.md hazırlık alanında görünüyor. Şimdi kaydedilecek içerik belli, ancak henüz bir commit yok.', { command: 'git add README.md' }, s => stagedFiles(s).includes('README.md')),
      step('İlk kaydını oluştur', 'İyi bir commit mesajı değişikliğin amacını açıklar. Bu örnekte hazırlanan README dosyası “Proje başlatıldı” mesajıyla geçmişe kaydedildi.', 'İlk commit grafiğe eklendi. Noktaya tıklayarak mesajını ve sakladığı dosyayı inceleyebilirsin.', { command: 'git commit -m "Proje başlatıldı"' }, s => s.commits.length > 0),
      step('Temiz çalışma ağacı', 'Commit sonrası çalışma dizini ve hazırlık alanı son kayıtla aynı içeriğe sahipse çalışma ağacı temizdir. Bu, dosyaların silindiği değil, bekleyen değişiklik olmadığı anlamına gelir.', 'İki dosya alanında da bekleyen değişiklik yok. README.md hâlâ Dosyalar görünümünde ve commit’in anlık görüntüsünde duruyor.', { command: 'git status' }, s => s.commits.length > 0 && s.inspected.status > 0 && s.inspected.statusClean && s.inspected.statusHead === s.branches[s.head] && !stagedFiles(s).length && !workingFiles(s).length),
    ], complete: s => s.commits.length > 0 && s.inspected.status > 0 },
  { id: 'branchler', title: 'Branch ve HEAD', description: 'Aynı geçmiş, yeni olasılıklar.', difficulty: 'Başlangıç', duration: 8, objectives: ['Branch oluştur', 'HEAD’i taşı', 'Bağımsız bir commit kaydet'], preparation: baseActions, initial: initialCommit,
    steps: [
      step('Yeni bir yol aç', 'Branch dosyaların ayrı bir kopyası değildir; bir commit’i işaret eden hareketli bir referanstır. Yeni branch başlangıçta main ile aynı noktayı gösterir.', 'Aynı commit üzerinde main ve feature etiketleri var. Yeni bir branch oluşturmak yeni bir commit oluşturmadı.', { command: 'git branch feature' }, s => 'feature' in s.branches),
      step('HEAD’i taşı', 'HEAD hangi branch üzerinde çalışıldığını söyler. Branch değiştiğinde bundan sonra oluşturulacak kayıtların hangi yolu ilerleteceği de değişir.', 'HEAD artık feature etiketinde. Commit’lerin sayısı aynı; yalnızca üzerinde bulunulan branch değişti.', { command: 'git switch feature' }, s => s.head === 'feature'),
      step('Bir değişiklik yap', 'Bu örnekte feature üzerinde feature.md dosyası eklendi. Dosyanın içeriği çalışma dizinindedir; henüz hazırlık alanına veya geçmişe kaydedilmedi.', 'feature.md çalışma dizininde görünüyor. Grafikte hâlâ tek commit var; bir dosya değişikliği hemen yeni bir geçmiş noktası oluşturmaz.', { file: { path: 'feature.md', content: '# Yeni özellik\n\nBu değişiklik feature branch’inde.\n' } }, s => Boolean(s.working['feature.md']?.trim())),
      step('Kendi yolunda ilerle', 'Yeni dosya hazırlanıp commit olarak kaydedildi. Yeni commit yalnızca üzerinde bulunulan feature branch’ini ilerletir; main önceki noktada kalır.', 'feature yeni commit’i, main ilk commit’i gösteriyor. Aralarındaki çizgi yeni kaydın hangi commit’ten geldiğini anlatıyor.', [{ command: 'git add .' }, { command: 'git commit -m "Özellik eklendi"' }], s => hasFeatureCommit(s) && Boolean(headCommit(s)?.tree['feature.md'])),
    ], complete: s => hasFeatureCommit(s) && Boolean(headCommit(s)?.tree['feature.md']) },
  { id: 'commitler', title: 'Geçmişi okumak', description: 'Geçmişi oku, bağlantıları keşfet.', difficulty: 'Orta', duration: 7, objectives: ['Commit geçmişini incele', 'Parent ilişkisini gör', 'Yeni bir anlık görüntü oluştur'], preparation: historyActions, initial: historyInitial,
    steps: [
      step('Geçmişi oku', 'Her commit bir önceki commit’e parent bağıyla bağlanır. Grafikteki çizgiler bu geçmiş ilişkisini gösterir. Noktalara tıklayarak kayıtların ayrıntılarını okuyabilirsin.', 'Grafikte iki commit var. “Notlar eklendi” kaydı, “İlk commit” kaydına bağlı; her biri kendi dosya görüntüsünü saklıyor.', { command: 'git log --oneline' }, s => s.inspected.log > 0),
      step('Aynı dosya, yeni an', 'Commit’ler değişmez. Bir dosya düzenlendiğinde eski kayıt korunur; dosyanın yeni hali önce yalnızca çalışma dizininde bulunur.', 'notlar.md çalışma dizininde değişmiş görünüyor. Dosyalar görünümünde yeni satırı okuyabilirsin; grafikteki iki kayıt aynı kaldı.', { file: { path: 'notlar.md', content: '# Git notlarım\n\nHer commit bir anlık görüntüdür.\n' } }, s => s.working['notlar.md'] !== headCommit(s)?.tree['notlar.md']),
      step('Zinciri uzat', 'Değişiklik hazırlanıp kaydedildiğinde geçmişe yeni bir nokta eklenir. Yeni commit’in parent’ı önceki commit’tir; böylece zaman çizgisi uzar.', 'Üçüncü commit eklendi ve main yeni noktaya ilerledi. Önceki kayıtlar ve bağlantıları korunuyor.', [{ command: 'git add notlar.md' }, { command: 'git commit -m "Notlar güncellendi"' }], s => s.commits.length >= 3 && headCommit(s)?.tree['notlar.md'] !== s.commits[1].tree['notlar.md']),
    ], complete: s => s.inspected.log > 0 && s.commits.length >= 3 },
  { id: 'merge', title: 'Three-way merge', description: 'Ayrılan yolları yeniden buluştur.', difficulty: 'Orta', duration: 10, objectives: ['Fast-forward merge uygula', 'Geçmişi iki kola ayır', 'Three-way merge oluştur'], preparation: mergeActions, initial: mergeInitial,
    steps: [
      step('Fast-forward', 'feature bir commit ileride ve main üzerinde ayrı bir değişiklik yok. Fast-forward birleşiminde main işaretçisi feature’ın bulunduğu noktaya ilerler.', 'main ve feature aynı commit’i gösteriyor. Commit sayısı artmadı; yeni bir birleşim kaydı gerekmiyordu.', { command: 'git merge feature' }, s => s.head === 'main' && s.branches.main === s.branches.feature),
      step('Feature tekrar ilerlesin', 'Şimdi feature üzerinde ui.md dosyasını içeren yeni bir kayıt var. main henüz ilerlemediği için iki branch yeniden farklı noktaları gösteriyor.', 'feature yeni commit’te, main önceki noktada. Dosyalar görünümünde feature’a eklenen ui.md dosyasını okuyabilirsin.', [{ command: 'git switch feature' }, { file: { path: 'ui.md', content: '# Arayüz\n' } }, { command: 'git add .' }, { command: 'git commit -m "Arayüz"' }], s => s.commits.some(c => c.branch === 'feature' && Boolean(c.tree['ui.md']))),
      step('Main kendi yolunda', 'Main üzerinde api.md dosyasını içeren ayrı bir commit oluşturuldu. Artık iki branch de ortak noktadan sonra kendi değişikliğine sahip.', 'Grafikte yollar iki kola ayrılıyor. main API kaydında, feature arayüz kaydında; tek bir işaretçiyi ilerletmek iki değişikliği birleştirmeye yetmez.', [{ command: 'git switch main' }, { file: { path: 'api.md', content: '# API\n' } }, { command: 'git add .' }, { command: 'git commit -m "API"' }], s => s.commits.some(c => c.branch === 'main' && Boolean(c.tree['api.md']))),
      step('İki parent, tek geçmiş', 'Three-way merge ortak atayı ve iki branch’in son halini karşılaştırır. Burada farklı dosyalardaki değişiklikler birleşir. Oluşan commit her iki geçmişe de bağlanır.', 'Yeni birleşim commit’ine iki çizgi geliyor: iki parent’ı var. main bu kaydı gösteriyor; anlık görüntü hem api.md hem ui.md içeriyor.', { command: 'git merge feature' }, s => s.head === 'main' && Boolean(headCommit(s)?.parents.length === 2 && headCommit(s)?.tree['api.md'] && headCommit(s)?.tree['ui.md'])),
    ], complete: s => s.head === 'main' && Boolean(headCommit(s)?.parents.length === 2 && headCommit(s)?.tree['api.md'] && headCommit(s)?.tree['ui.md']) },
];
const originalPositions = [1, 8, 12, 9, 26];
export const lessons: Lesson<GitState>[] = [
  ...originalLessons.map((lesson, index) => ({ number: originalPositions[index], lesson })),
  ...curriculumLessons,
].sort((a, b) => a.number - b.number).map(({ number, lesson }) => ({
  ...lesson, difficulty: levels[Math.floor((number - 1) / 12)],
}));
export const totalDuration = lessons.reduce((total, lesson) => total + lesson.duration, 0);
export function snapshot(lesson: Lesson<GitState>, index: number): GitState {
  if (lesson.steps[index]?.scene) {
    let state = lesson.initial();
    for (const action of lesson.steps.slice(0, index + 1).flatMap(step => step.action)) {
      if (action.file) state = editFile(state, action.file.path, action.file.content);
    }
    return state;
  }
  return applyActions(lesson.initial(), lesson.steps.slice(0, index + 1).flatMap(step => step.action));
}
