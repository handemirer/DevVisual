export type Tree = Record<string, string>;
export interface Commit { commands?: string[]; id: string; message: string; parents: string[]; tree: Tree; branch: string; }
export interface GitState {
  initialized: boolean; working: Tree; index: Tree; commits: Commit[];
  branches: Record<string, string | null>; head: string; sequence: number;
  inspected: { status: number; log: number; statusHead: string | null; statusClean: boolean };
  merge: { parents: string[]; conflicts: string[]; source: string } | null;
}
export interface Result { state: GitState; output: string; error: boolean; }
export const emptyState = (): GitState => ({ initialized: false, working: { 'README.md': '# Merhaba DevVisual\n\nGit öğrenme yolculuğum burada başlıyor.\n' }, index: {}, commits: [], branches: { main: null }, head: 'main', sequence: 0, inspected: { status: 0, log: 0, statusHead: null, statusClean: false }, merge: null });
export const headCommit = (s: GitState): Commit | undefined => s.commits.find(c => c.id === s.branches[s.head]);
export const headTree = (s: GitState): Tree => headCommit(s)?.tree ?? {};
export const changed = (a: Tree, b: Tree): string[] => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter(p => a[p] !== b[p]).sort();
export const stagedFiles = (s: GitState) => changed(headTree(s), s.index);
export const workingFiles = (s: GitState) => changed(s.index, s.working);
const clone = (s: GitState): GitState => structuredClone(s);
const branchValid = (name: string) => /^[A-Za-z0-9][A-Za-z0-9_/-]*$/.test(name) && !name.includes('..') && !name.includes('//') && !name.endsWith('/') && !name.endsWith('.lock');
function tokenize(input: string): string[] {
  const tokens: string[] = []; let token = '', quote = '', started = false;
  for (const char of input.trim()) {
    if (quote) { if (char === quote) quote = ''; else token += char; }
    else if (char === '"' || char === "'") { quote = char; started = true; }
    else if (/\s/.test(char)) { if (started) { tokens.push(token); token = ''; started = false; } }
    else { token += char; started = true; }
  }
  if (quote) throw new Error('Tırnak kapatılmamış. Mesajı aynı tür tırnaklarla çevreleyin.');
  if (started) tokens.push(token);
  return tokens;
}
function commit(s: GitState, message: string, parents: string[]): Commit {
  s.sequence += 1;
  let hash = 2166136261;
  for (const char of JSON.stringify([s.sequence, parents, s.index, message])) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  const c: Commit = { id: (hash >>> 0).toString(16).padStart(8, '0'), message, parents, tree: { ...s.index }, branch: s.head };
  s.commits.push(c); s.branches[s.head] = c.id; return c;
}
function ancestors(s: GitState, id: string): Map<string, number> {
  const found = new Map<string, number>(); const queue: [string, number][] = [[id, 0]];
  while (queue.length) { const [current, distance] = queue.shift()!; if (found.has(current)) continue; found.set(current, distance); const c = s.commits.find(c => c.id === current); c?.parents.forEach(p => queue.push([p, distance + 1])); }
  return found;
}
export function execute(original: GitState, input: string): Result {
  const s = clone(original);
  const ok = (output: string): Result => ({ state: s, output, error: false });
  try {
    const [git, command, ...args] = tokenize(input);
    if (git !== 'git') throw new Error('Yalnızca tarayıcı içi Git komutları desteklenir. Komutlar için help yazın.');
    if (command === 'init') { if (args.length) throw new Error('Kullanım: git init'); if (s.initialized) return ok('Git deposu zaten başlatılmış.'); s.initialized = true; return ok('Boş Git deposu başlatıldı. Varsayılan branch: main'); }
    if (!s.initialized) throw new Error('Henüz bir Git deposu yok. Önce git init çalıştırın.');
    switch (command) {
      case 'status': {
        if (args.some(a => !['--short', '-s'].includes(a))) throw new Error('Kullanım: git status [--short]');
        s.inspected.status++;
        const staged = stagedFiles(s), unstaged = workingFiles(s);
        s.inspected.statusHead = s.branches[s.head]; s.inspected.statusClean = !staged.length && !unstaged.length;
        if (args.length) {
          const base = headTree(s);
          const mark = (a: Tree, b: Tree, p: string) => a[p] === b[p] ? ' ' : !(p in b) ? 'D' : !(p in a) ? 'A' : 'M';
          const paths = [...new Set([...staged, ...unstaged])].sort();
          return ok(paths.map(p => {
            if (!(p in base) && !(p in s.index)) return `?? ${p}`;
            if (s.merge?.conflicts.includes(p)) return `UU ${p}`;
            return `${mark(base, s.index, p)}${mark(s.index, s.working, p)} ${p}`;
          }).join('\n'));
        }
        const status = (paths: string[], a: Tree, b: Tree) => paths.map(p => `  ${!(p in b) ? 'silindi' : !(p in a) ? 'yeni dosya' : 'değiştirildi'}: ${p}`).join('\n');
        return ok(`Branch: ${s.head}\n${s.merge ? `Merge sürüyor. Çakışmalar: ${s.merge.conflicts.join(', ') || 'çözüldü; commit oluşturun'}\n` : ''}${staged.length ? `\nCommit için hazır:\n${status(staged, headTree(s), s.index)}\n` : ''}${unstaged.length ? `\nÇalışma dizininde:\n${status(unstaged, s.index, s.working)}\n` : ''}${!staged.length && !unstaged.length ? 'Çalışma ağacı temiz.' : ''}`);
      }
      case 'add': {
        if (!args.length) throw new Error('Kullanım: git add <dosya> veya git add .');
        const all = args.includes('.') || args.includes('-A');
        if (args.some(a => a.startsWith('-') && a !== '-A')) throw new Error('Desteklenen seçenek: -A');
        const paths = all ? [...new Set([...Object.keys(s.working), ...Object.keys(s.index)])] : args;
        for (const p of paths) { if (!(p in s.working) && !(p in s.index)) throw new Error(`Dosya bulunamadı: ${p}`); if (p in s.working) s.index[p] = s.working[p]; else delete s.index[p]; }
        if (s.merge) s.merge.conflicts = s.merge.conflicts.filter(p => !paths.includes(p));
        return ok(`${paths.length} dosyanın güncel hali staging area'ya alındı.`);
      }
      case 'commit': {
        if (args.length !== 2 || args[0] !== '-m' || !args[1].trim()) throw new Error('Kullanım: git commit -m "Mesaj"');
        if (s.merge?.conflicts.length) throw new Error('Önce çakışan dosyaları düzenleyip git add ile çözüldü olarak işaretleyin.');
        if (!stagedFiles(s).length && !s.merge) throw new Error('Commit için hazırlanmış değişiklik yok. Önce dosyayı düzenleyin ve git add çalıştırın.');
        const parents = s.merge?.parents ?? (s.branches[s.head] ? [s.branches[s.head]!] : []);
        const c = commit(s, args[1], parents); s.merge = null;
        return ok(`[${s.head} ${c.id.slice(0, 7)}] ${c.message}\n${c.parents.length > 1 ? 'İki parent içeren merge commit oluşturuldu.' : 'Anlık görüntü commit geçmişine kaydedildi.'}`);
      }
      case 'log': {
        if (args.some(a => !['--oneline', '--all'].includes(a))) throw new Error('Kullanım: git log [--oneline] [--all]');
        if (!s.commits.length) throw new Error('Henüz commit yok.');
        s.inspected.log++;
        const reachable = s.branches[s.head] ? ancestors(s, s.branches[s.head]!) : new Map();
        const list = s.commits.filter(c => args.includes('--all') || reachable.has(c.id)).reverse();
        return ok(list.map(c => `${c.id.slice(0, 7)}${Object.entries(s.branches).filter(([, id]) => id === c.id).map(([name]) => ` (${name === s.head ? 'HEAD → ' : ''}${name})`).join('')} ${c.message}${args.includes('--oneline') ? '' : `\n  Parent: ${c.parents.map(p => p.slice(0, 7)).join(', ') || 'ilk commit'}`}`).join('\n'));
      }
      case 'branch': {
        if (!args.length || (args.length === 1 && args[0] === '--list')) return ok(Object.keys(s.branches).map(b => `${b === s.head ? '* ' : '  '}${b}`).join('\n'));
        if (args.length !== 1 || !branchValid(args[0])) throw new Error('Kullanım: git branch <geçerli-isim>');
        if (!s.branches[s.head]) throw new Error('Branch oluşturmadan önce ilk commit’i oluşturun.');
        if (args[0] in s.branches) throw new Error(`Branch zaten var: ${args[0]}`);
        s.branches[args[0]] = s.branches[s.head]; return ok(`${args[0]} branch'i oluşturuldu. HEAD hâlâ ${s.head} üzerinde.`);
      }
      case 'switch': {
        const create = args[0] === '-c'; const name = args[create ? 1 : 0];
        if (!name || args.length !== (create ? 2 : 1)) throw new Error('Kullanım: git switch [-c] <branch>');
        if (s.merge) throw new Error('Önce devam eden merge işlemini tamamlayın veya git merge --abort kullanın.');
        if (stagedFiles(s).length || workingFiles(s).length) throw new Error('Bu simülatörde branch değiştirmeden önce değişiklikleri commit edin.');
        if (create) { if (!branchValid(name) || name in s.branches || !s.branches[s.head]) throw new Error('Geçerli, yeni bir branch adı ve en az bir commit gerekli.'); s.branches[name] = s.branches[s.head]; }
        if (!(name in s.branches)) throw new Error(`Branch bulunamadı: ${name}`);
        s.head = name; const tree = headTree(s); s.index = { ...tree }; s.working = { ...tree }; return ok(`HEAD → ${name}. Çalışma dizini bu branch'in commit'ine taşındı.`);
      }
      case 'merge': {
        if (args.length === 1 && args[0] === '--abort') { if (!s.merge) throw new Error('Devam eden merge yok.'); s.merge = null; s.working = { ...headTree(s) }; s.index = { ...s.working }; return ok('Merge iptal edildi. HEAD anlık görüntüsü geri yüklendi.'); }
        let source = '', noFF = false, message = '';
        for (let i = 0; i < args.length; i++) { if (args[i] === '--no-ff') noFF = true; else if (args[i] === '-m' && args[i + 1]) message = args[++i]; else if (!source && !args[i].startsWith('-')) source = args[i]; else throw new Error('Kullanım: git merge [--no-ff] <branch> [-m "Mesaj"]'); }
        if (!source || !(source in s.branches)) throw new Error('Birleştirilecek branch bulunamadı. Kullanım: git merge <branch>');
        if (s.merge) throw new Error('Devam eden merge işlemini tamamlayın.');
        if (stagedFiles(s).length || workingFiles(s).length) throw new Error('Merge öncesinde çalışma ağacı temiz olmalı.');
        const ours = s.branches[s.head], theirs = s.branches[source];
        if (!theirs) throw new Error('Kaynak branch üzerinde commit yok.');
        if (!ours) { s.branches[s.head] = theirs; s.working = { ...headTree(s) }; s.index = { ...s.working }; return ok('Fast-forward: branch işaretçisi ileri taşındı.'); }
        const ourAncestors = ancestors(s, ours), theirAncestors = ancestors(s, theirs);
        if (ourAncestors.has(theirs)) return ok('Zaten güncel. Kaynak geçmişi bu branch içinde.');
        if (theirAncestors.has(ours) && !noFF) { s.branches[s.head] = theirs; s.working = { ...headTree(s) }; s.index = { ...s.working }; return ok('Fast-forward: branch işaretçisi ileri taşındı. Yeni merge commit gerekmedi.'); }
        const common = [...ourAncestors.keys()].filter(id => theirAncestors.has(id)).sort((a, b) => (ourAncestors.get(a)! + theirAncestors.get(a)!) - (ourAncestors.get(b)! + theirAncestors.get(b)!));
        if (!common.length) throw new Error('Ortak geçmiş bulunamadı.');
        const base = s.commits.find(c => c.id === common[0])!.tree;
        const a = headTree(s), b = s.commits.find(c => c.id === theirs)!.tree;
        const merged: Tree = {}; const conflicts: string[] = [];
        for (const p of new Set([...Object.keys(base), ...Object.keys(a), ...Object.keys(b)])) {
          let value: string | undefined;
          if (a[p] === b[p]) value = a[p]; else if (a[p] === base[p]) value = b[p]; else if (b[p] === base[p]) value = a[p];
          else { conflicts.push(p); value = `<<<<<<< ${s.head}\n${a[p] ?? ''}\n=======\n${b[p] ?? ''}\n>>>>>>> ${source}\n`; }
          if (value !== undefined) merged[p] = value;
        }
        s.working = merged; s.index = { ...merged };
        if (conflicts.length) { for (const p of conflicts) { if (a[p] !== undefined) s.index[p] = a[p]; else delete s.index[p]; } s.merge = { parents: [ours, theirs], conflicts, source }; return ok(`CONFLICT: ${conflicts.join(', ')}\nDosya editöründe çakışmaları çözün, git add ve git commit ile tamamlayın. Ya da git merge --abort kullanın.`); }
        const c = commit(s, message || `Merge branch '${source}'`, [ours, theirs]); return ok(`Three-way merge tamamlandı: ${c.id.slice(0, 7)}\nİki parent içeren merge commit oluşturuldu.`);
      }
      default: throw new Error(`Desteklenmeyen komut: ${command ?? ''}. Desteklenenler: init, status, add, commit, log, branch, switch, merge.`);
    }
  } catch (error) { return { state: original, output: error instanceof Error ? error.message : 'Komut işlenemedi.', error: true }; }
}
export function editFile(s: GitState, path: string, value: string | null): GitState { const next = clone(s); if (value === null) delete next.working[path]; else next.working[path] = value; return next; }
