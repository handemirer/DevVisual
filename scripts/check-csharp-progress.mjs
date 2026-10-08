import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

// Gerçek tarayıcı ilerlemesine dokunmadan store'un persistence ve kapsam kurallarını doğrula.
const values = new Map([['devvisual-lab-v1', 'git-ilerlemesi-korunmali']]);
globalThis.localStorage = {
  getItem: key => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
  removeItem: key => values.delete(key),
};
const { lessons } = JSON.parse(await readFile(new URL('../src/modules/csharp/lessons/curriculum.json', import.meta.url), 'utf8'));
const result = await build({ configFile: false, logLevel: 'silent', build: {
  write: false, minify: false,
  lib: { entry: fileURLToPath(new URL('../src/stores/useCSharp.ts', import.meta.url)), formats: ['es'] },
} });
const outputs = (Array.isArray(result) ? result : [result]).flatMap(item => item.output).filter(item => item.type === 'chunk');
assert.equal(outputs.length, 1);
const { useCSharp } = await import(`data:text/javascript;base64,${Buffer.from(outputs[0].code).toString('base64')}`);
const first = lessons[0], second = lessons[1], otherLevel = lessons.find(lesson => lesson.level === 2);
const state = () => useCSharp.getState();
state().select('bilinmeyen-ders');
assert.equal(state().lessonId, first.id);
state().select(first.id, 'bilinmeyen-konu');
assert.equal(state().topicId, first.topics[0].id);
state().markRead(first.topics[0].id);
state().markRead(first.topics[0].id);
state().markRead('bilinmeyen-konu');
assert.deepEqual(state().read, [first.topics[0].id]);
state().select(first.id, first.topics.at(-1).id);
assert.equal(state().read.length, 1, 'Son konuya atlamak dersi tamamlamamalı');
state().markRead(second.topics[0].id);
state().markRead(otherLevel.topics[0].id);
state().reset('lesson');
assert.deepEqual(state().read, [second.topics[0].id, otherLevel.topics[0].id]);
state().reset('level');
assert.deepEqual(state().read, [otherLevel.topics[0].id]);
assert.equal(state().lessonId, first.id);
state().reset('all');
assert.deepEqual(state().read, []);
assert.equal(state().topicId, first.topics[0].id);
values.set('devvisual-csharp-v1', JSON.stringify({ state: {
  lessonId: 'silinmis', topicId: 'silinmis', read: ['silinmis', first.topics[0].id, first.topics[0].id],
}, version: 0 }));
await useCSharp.persist.rehydrate();
assert.equal(state().lessonId, first.id);
assert.equal(state().topicId, first.topics[0].id);
assert.deepEqual(state().read, [first.topics[0].id]);
// Müfredat genişlerken mevcut kayıt korunur; yeni dersler de kaydedilebilir.
const advanced = lessons.find(lesson => lesson.level === 15);
state().select(advanced.id, advanced.topics.at(-1).id);
state().markRead(advanced.topics.at(-1).id);
await useCSharp.persist.rehydrate();
assert.equal(state().lessonId, advanced.id);
assert.equal(state().topicId, advanced.topics.at(-1).id);
assert.deepEqual(state().read, [first.topics[0].id, advanced.topics.at(-1).id]);
state().reset('level');
assert.deepEqual(state().read, [first.topics[0].id], 'Yeni seviye sıfırlanırken eski ilerleme korunmalı');
assert.equal(values.get('devvisual-lab-v1'), 'git-ilerlemesi-korunmali');
console.log('C# ilerlemesi doğrulandı: seçim sınırları, yinelenen kayıtlar, kapsamlı sıfırlama, eski kayıt normalizasyonu ve Git izolasyonu.');
