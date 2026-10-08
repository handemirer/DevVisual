import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const { levels, lessons } = JSON.parse(await readFile(new URL('src/modules/csharp/lessons/curriculum.json', root), 'utf8'));
const manifest = await readFile(new URL('docs/csharp-mufredat.md', root), 'utf8');
const expected = [...manifest.matchAll(/^- `([^`]+)` — (.+)$/gm)].map(([, id, title]) => ({ id, title }));
const topics = lessons.flatMap(lesson => lesson.topics);
assert.deepEqual(levels.map(level => level.number), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
assert.equal(lessons.length, 57, 'Temel ve ileri ders grupları korunmalı');
assert.equal(topics.length, 556, 'Genişletilen kapsam korunmalı');
assert.deepEqual(topics.map(({ id, title }) => ({ id, title })), expected, 'Kapsam kaydıyla konu başlıkları eşleşmeli');
assert.equal(new Set(lessons.map(lesson => lesson.id)).size, lessons.length);
assert.equal(new Set(topics.map(topic => topic.id)).size, topics.length);
assert.deepEqual(levels.map(level => lessons.filter(lesson => lesson.level === level.number).flatMap(lesson => lesson.topics).length), [54,50,57,34,41,41,53,54,45,37,18,18,18,18,18]);
for (const level of levels) {
  assert.ok(level.goal.length > 30);
  assert.equal(level.model.length, 3);
  assert.ok(level.project.scenario.length > 40);
  assert.ok(level.project.tasks.length >= 3);
  assert.ok(level.project.acceptance.length >= 3);
}
for (const lesson of lessons) {
  assert.ok(levels.some(level => level.number === lesson.level));
  assert.ok(lesson.scenario.length > 60, `${lesson.id}: gerçek hayat senaryosu`);
  assert.ok(lesson.code.length > 80, `${lesson.id}: kod örneği`);
  assert.ok(lesson.walkthrough.length > 60, `${lesson.id}: kod açıklaması`);
  assert.ok(lesson.exercise.length > 40, `${lesson.id}: uygulama`);
  assert.ok(lesson.acceptance.length >= 2, `${lesson.id}: kontrol ölçütleri`);
  assert.ok(lesson.tips.length >= 3, `${lesson.id}: önemli ipuçları`);
  for (const tip of lesson.tips) assert.ok(tip.length > 15);
  assert.ok(lesson.sources.length);
  for (const source of lesson.sources) assert.equal(new URL(source.url).protocol, 'https:');
  for (const topic of lesson.topics) {
    assert.ok(topic.explanation.length > 90, `${topic.id}: konu açıklaması`);
    assert.doesNotMatch(topic.explanation, /TODO|yakında|hazırlanıyor/i);
  }
}
console.log(`C# kapsamı doğrulandı: ${levels.length} seviye, ${lessons.length} ders, ${topics.length} konu, ${lessons.reduce((n, lesson) => n + lesson.tips.length, 0)} ipucu, ${levels.length} proje.`);
